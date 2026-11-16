import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownWideNarrow,
  Columns2,
  ChevronDown,
  Download,
  Loader2,
  Upload,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  ActionButtonGroup,
  ClearButton,
  DataButtonGroup,
  ToolButtonGroup,
} from "@/components/ui/tool-button";
import { SecurityBanner } from "@/components/ui/security-banner";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { ToolExplanations } from "@/components/tool-explanations";
import {
  CHECKERBOARD,
  ImageCompare,
  type CompareSource,
} from "@/components/image-compare";
import { getToolByPath } from "@/data/tools";
import {
  IMAGE_FORMATS,
  fitDimensions,
  formatBytes,
  getAllDefaultSettings,
  outputFileName,
  percentOfOriginal,
  type FormatSetting,
  type FormatSettingValues,
  type ImageFormat,
  type ImageFormatId,
} from "@/lib/image-compression";
import type {
  EncodeRequest,
  EncodeResponse,
} from "@/lib/image-compression.worker";
import { cn } from "@/lib/utils";

interface WorkingImage {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
}

type FormatResult =
  | { status: "encoding" }
  | { status: "error"; error: string }
  | {
      status: "done";
      blob: Blob;
      url: string;
      size: number;
      durationMs: number;
      previewFailed?: boolean;
    };

const SETTINGS_DEBOUNCE_MS = 300;
const RESIZE_DEBOUNCE_MS = 400;

function parseDimension(value: string): number | undefined {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function rasterize(
  bitmap: ImageBitmap,
  maxWidth?: number,
  maxHeight?: number
): WorkingImage {
  const { width, height } = fitDimensions(
    bitmap.width,
    bitmap.height,
    maxWidth,
    maxHeight
  );
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D context is not available");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  return {
    width,
    height,
    pixels: context.getImageData(0, 0, width, height).data,
  };
}

function SettingControl({
  formatId,
  setting,
  values,
  onChange,
}: {
  formatId: ImageFormatId;
  setting: FormatSetting;
  values: FormatSettingValues;
  onChange: (key: string, value: number | boolean | string) => void;
}) {
  const id = `${formatId}-${setting.key}`;

  if (setting.type === "boolean") {
    return (
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="cursor-pointer">
          {setting.label}
        </Label>
        <Switch
          id={id}
          checked={values[setting.key] === true}
          onCheckedChange={checked => onChange(setting.key, checked)}
          data-testid={`setting-${id}`}
        />
      </div>
    );
  }

  if (setting.type === "select") {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={id}>{setting.label}</Label>
        <Select
          value={String(values[setting.key])}
          onValueChange={value => onChange(setting.key, value)}
        >
          <SelectTrigger id={id} data-testid={`setting-${id}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {setting.options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  const disabled =
    setting.disabledWhen !== undefined && values[setting.disabledWhen] === true;
  const value = Number(values[setting.key]);

  return (
    <div className={cn("space-y-2", disabled && "opacity-50")}>
      <div className="flex items-center justify-between text-sm">
        <Label htmlFor={id}>{setting.label}</Label>
        <span className="font-mono text-slate-600 dark:text-slate-400">
          {value}
        </span>
      </div>
      <Slider
        id={id}
        min={setting.min}
        max={setting.max}
        step={setting.step}
        value={[value]}
        disabled={disabled}
        onValueChange={([next]) => onChange(setting.key, next)}
        data-testid={`setting-${id}`}
      />
    </div>
  );
}

export default function ImageCompressor() {
  const tool = getToolByPath("/tools/image-compressor");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [sourceSize, setSourceSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [workingImage, setWorkingImage] = useState<WorkingImage | null>(null);
  const [maxWidth, setMaxWidth] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [settings, setSettings] = useState(getAllDefaultSettings);
  const [results, setResults] = useState<
    Partial<Record<ImageFormatId, FormatResult>>
  >({});
  const [openSettings, setOpenSettings] = useState<
    Partial<Record<ImageFormatId, boolean>>
  >({});
  const [sortBySize, setSortBySize] = useState(false);
  const [compare, setCompare] = useState<{
    left: string;
    right: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bitmapRef = useRef<ImageBitmap | null>(null);
  const workingImageRef = useRef<WorkingImage | null>(null);
  const settingsRef = useRef(settings);
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef(
    new Map<
      number,
      { resolve: (r: EncodeResponse) => void; reject: (e: Error) => void }
    >()
  );
  const requestIdRef = useRef(0);
  const queueRef = useRef<ImageFormatId[]>([]);
  const runningRef = useRef(false);
  const sessionRef = useRef(0);
  const versionsRef = useRef<Partial<Record<ImageFormatId, number>>>({});
  const settingTimersRef = useRef<
    Partial<Record<ImageFormatId, ReturnType<typeof setTimeout>>>
  >({});
  const urlsRef = useRef(new Set<string>());

  settingsRef.current = settings;

  const trackUrl = (url: string) => {
    urlsRef.current.add(url);
    return url;
  };

  const revokeUrl = (url: string) => {
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);
  };

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      const worker = new Worker(
        new URL("../../lib/image-compression.worker.ts", import.meta.url),
        { type: "module" }
      );
      worker.onmessage = (event: MessageEvent<EncodeResponse>) => {
        const pending = pendingRef.current.get(event.data.id);
        if (!pending) return;
        pendingRef.current.delete(event.data.id);
        pending.resolve(event.data);
      };
      worker.onerror = event => {
        const failure = new Error(event.message || "Encoder worker crashed");
        pendingRef.current.forEach(pending => pending.reject(failure));
        pendingRef.current.clear();
        worker.terminate();
        if (workerRef.current === worker) workerRef.current = null;
      };
      workerRef.current = worker;
    }
    return workerRef.current;
  }, []);

  const encodeInWorker = useCallback(
    (
      formatId: ImageFormatId,
      image: WorkingImage,
      formatSettings: FormatSettingValues
    ) =>
      new Promise<EncodeResponse>((resolve, reject) => {
        const id = ++requestIdRef.current;
        pendingRef.current.set(id, { resolve, reject });
        const request: EncodeRequest = {
          id,
          formatId,
          width: image.width,
          height: image.height,
          pixels: image.pixels,
          settings: formatSettings,
        };
        getWorker().postMessage(request);
      }),
    [getWorker]
  );

  const setResult = useCallback(
    (formatId: ImageFormatId, result: FormatResult) => {
      setResults(previous => {
        const old = previous[formatId];
        if (
          old?.status === "done" &&
          (result.status !== "done" || old.url !== result.url)
        ) {
          revokeUrl(old.url);
        }
        return { ...previous, [formatId]: result };
      });
    },
    []
  );

  const runQueue = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    const session = sessionRef.current;

    while (queueRef.current.length > 0) {
      const formatId = queueRef.current.shift()!;
      const image = workingImageRef.current;
      if (!image) continue;
      const version = versionsRef.current[formatId] ?? 0;
      setResult(formatId, { status: "encoding" });

      let response: EncodeResponse;
      try {
        response = await encodeInWorker(
          formatId,
          image,
          settingsRef.current[formatId]
        );
      } catch (cause) {
        if (session !== sessionRef.current) return;
        response = {
          id: 0,
          ok: false,
          error: cause instanceof Error ? cause.message : String(cause),
        };
      }

      if (session !== sessionRef.current) return;
      if (version !== (versionsRef.current[formatId] ?? 0)) continue;

      const format = IMAGE_FORMATS.find(f => f.id === formatId)!;
      if (response.ok) {
        const blob = new Blob([response.buffer], { type: format.mime });
        setResult(formatId, {
          status: "done",
          blob,
          url: trackUrl(URL.createObjectURL(blob)),
          size: blob.size,
          durationMs: response.durationMs,
        });
      } else {
        setResult(formatId, { status: "error", error: response.error });
      }
    }

    runningRef.current = false;
  }, [encodeInWorker, setResult]);

  const enqueue = useCallback(
    (formatIds: ImageFormatId[]) => {
      for (const formatId of formatIds) {
        versionsRef.current[formatId] =
          (versionsRef.current[formatId] ?? 0) + 1;
        if (!queueRef.current.includes(formatId)) {
          queueRef.current.push(formatId);
        }
        setResult(formatId, { status: "encoding" });
      }
      void runQueue();
    },
    [runQueue, setResult]
  );

  /** Abandon all in-flight work: new session, fresh worker, empty queue. */
  const resetEncoding = useCallback(() => {
    sessionRef.current += 1;
    queueRef.current = [];
    runningRef.current = false;
    Object.values(settingTimersRef.current).forEach(timer =>
      clearTimeout(timer)
    );
    settingTimersRef.current = {};
    workerRef.current?.terminate();
    workerRef.current = null;
    const aborted = new Error("Encoding cancelled");
    pendingRef.current.forEach(pending => pending.reject(aborted));
    pendingRef.current.clear();
    setResults(previous => {
      Object.values(previous).forEach(result => {
        if (result?.status === "done") revokeUrl(result.url);
      });
      return {};
    });
  }, []);

  // Re-rasterize when the image or resize bounds change, then encode everything.
  useEffect(() => {
    const bitmap = bitmapRef.current;
    if (!bitmap || !imageFile) return undefined;
    const timer = setTimeout(
      () => {
        try {
          const image = rasterize(
            bitmap,
            parseDimension(maxWidth),
            parseDimension(maxHeight)
          );
          resetEncoding();
          workingImageRef.current = image;
          setWorkingImage(image);
          enqueue(IMAGE_FORMATS.map(format => format.id));
        } catch (cause) {
          setError(
            cause instanceof Error ? cause.message : "Could not read the image"
          );
        }
      },
      workingImageRef.current ? RESIZE_DEBOUNCE_MS : 0
    );
    return () => clearTimeout(timer);
  }, [imageFile, sourceSize, maxWidth, maxHeight, enqueue, resetEncoding]);

  useEffect(
    () => () => {
      sessionRef.current += 1;
      workerRef.current?.terminate();
      bitmapRef.current?.close();
      Object.values(settingTimersRef.current).forEach(timer =>
        clearTimeout(timer)
      );
      urlsRef.current.forEach(url => URL.revokeObjectURL(url));
      urlsRef.current.clear();
    },
    []
  );

  const clearImage = () => {
    setCompare(null);
    resetEncoding();
    bitmapRef.current?.close();
    bitmapRef.current = null;
    workingImageRef.current = null;
    if (originalUrl) revokeUrl(originalUrl);
    setOriginalUrl(null);
    setImageFile(null);
    setSourceSize(null);
    setWorkingImage(null);
    setError(null);
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/") && file.type !== "") {
      setError("Please choose an image file.");
      return;
    }
    clearImage();
    try {
      const bitmap = await createImageBitmap(file);
      bitmapRef.current = bitmap;
      setOriginalUrl(trackUrl(URL.createObjectURL(file)));
      setSourceSize({ width: bitmap.width, height: bitmap.height });
      setImageFile(file);
    } catch {
      setError(
        "This browser could not decode the image. Try a JPEG, PNG, WebP, GIF, or AVIF file."
      );
    }
  };

  const updateSetting = (
    formatId: ImageFormatId,
    key: string,
    value: number | boolean | string
  ) => {
    setSettings(previous => {
      const next = {
        ...previous,
        [formatId]: { ...previous[formatId], [key]: value },
      };
      settingsRef.current = next;
      return next;
    });
    if (!workingImageRef.current) return;
    clearTimeout(settingTimersRef.current[formatId]);
    settingTimersRef.current[formatId] = setTimeout(() => {
      delete settingTimersRef.current[formatId];
      enqueue([formatId]);
    }, SETTINGS_DEBOUNCE_MS);
  };

  const resetSettings = (formatId: ImageFormatId) => {
    const defaults = getAllDefaultSettings()[formatId];
    setSettings(previous => {
      const next = { ...previous, [formatId]: defaults };
      settingsRef.current = next;
      return next;
    });
    if (workingImageRef.current) enqueue([formatId]);
  };

  const download = (format: ImageFormat, result: FormatResult) => {
    if (result.status !== "done" || !imageFile) return;
    const link = document.createElement("a");
    link.href = result.url;
    link.download = outputFileName(imageFile.name, format);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const smallestId = useMemo(() => {
    let best: { id: ImageFormatId; size: number } | null = null;
    for (const format of IMAGE_FORMATS) {
      const result = results[format.id];
      if (result?.status === "done" && (!best || result.size < best.size)) {
        best = { id: format.id, size: result.size };
      }
    }
    return best?.id ?? null;
  }, [results]);

  const orderedFormats = useMemo(() => {
    if (!sortBySize) return IMAGE_FORMATS;
    const sizeOf = (id: ImageFormatId) => {
      const result = results[id];
      return result?.status === "done" ? result.size : Number.POSITIVE_INFINITY;
    };
    return [...IMAGE_FORMATS].sort((a, b) => sizeOf(a.id) - sizeOf(b.id));
  }, [results, sortBySize]);

  const compareSources = useMemo<CompareSource[]>(() => {
    if (!imageFile || !originalUrl) return [];
    const resized =
      workingImage &&
      sourceSize &&
      (workingImage.width !== sourceSize.width ||
        workingImage.height !== sourceSize.height);
    const sources: CompareSource[] = [
      {
        id: "original",
        label: resized ? "Original (resized)" : "Original",
        detail: formatBytes(imageFile.size),
        url: originalUrl,
      },
    ];
    for (const format of IMAGE_FORMATS) {
      const result = results[format.id];
      if (result?.status === "done" && result.previewFailed) continue;
      sources.push({
        id: format.id,
        label: format.label,
        detail:
          result?.status === "done"
            ? `${formatBytes(result.size)} · ${percentOfOriginal(result.size, imageFile.size)}%`
            : undefined,
        url: result?.status === "done" ? result.url : undefined,
      });
    }
    return sources;
  }, [imageFile, originalUrl, results, sourceSize, workingImage]);

  const hiddenFromCompare = IMAGE_FORMATS.filter(format => {
    const result = results[format.id];
    return result?.status === "done" && result.previewFailed;
  }).map(format => format.label);

  const canCompare = (formatId: ImageFormatId) => {
    const result = results[formatId];
    return result?.status === "done" && !result.previewFailed;
  };

  const openCompare = (right: string, left = "original") =>
    setCompare({ left, right });

  const isEncoding = Object.values(results).some(
    result => result?.status === "encoding"
  );

  const markPreviewFailed = (formatId: ImageFormatId) =>
    setResults(previous => {
      const current = previous[formatId];
      if (current?.status !== "done") return previous;
      return {
        ...previous,
        [formatId]: { ...current, previewFailed: true },
      };
    });

  const renderPreview = (format: ImageFormat, result?: FormatResult) => {
    if (result?.status === "done") {
      if (result.previewFailed) {
        return (
          <p className="px-4 text-center text-sm text-slate-600 dark:text-slate-300">
            Your browser can&apos;t display {format.label} images. The file was
            still created and can be downloaded.
          </p>
        );
      }
      return (
        <img
          src={result.url}
          alt={`${format.label} preview`}
          className="max-h-full max-w-full object-contain"
          data-testid={`preview-${format.id}`}
          onError={() => markPreviewFailed(format.id)}
        />
      );
    }
    if (result?.status === "error") {
      return (
        <p
          className="px-4 text-center text-sm text-red-600 dark:text-red-400"
          data-testid={`result-error-${format.id}`}
        >
          Encoding failed: {result.error}
        </p>
      );
    }
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <Loader2 className="h-4 w-4 animate-spin" />
        Encoding…
      </div>
    );
  };

  const renderResultCard = (format: ImageFormat) => {
    const result = results[format.id];
    const values = settings[format.id];
    const settingsOpen = openSettings[format.id] === true;
    const percent =
      result?.status === "done" && imageFile
        ? percentOfOriginal(result.size, imageFile.size)
        : null;

    return (
      <Card
        key={format.id}
        className={cn(
          "flex flex-col",
          smallestId === format.id && "ring-2 ring-green-500"
        )}
        data-testid={`result-card-${format.id}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                {format.label}
                {smallestId === format.id ? (
                  <Badge
                    className="bg-green-600 text-white hover:bg-green-600"
                    data-testid={`smallest-${format.id}`}
                  >
                    Smallest
                  </Badge>
                ) : null}
              </CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {format.codec} · .{format.extension}
                {format.supportsAlpha ? "" : " · no transparency"}
              </p>
            </div>
            <div className="text-right">
              {result?.status === "done" ? (
                <>
                  <div
                    className="font-mono text-lg font-semibold"
                    data-testid={`result-size-${format.id}`}
                  >
                    {formatBytes(result.size)}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      percent !== null && percent < 100
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {percent}% of original · {Math.round(result.durationMs)} ms
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3">
          <div
            className={cn(
              "flex aspect-video items-center justify-center overflow-hidden rounded-md border",
              CHECKERBOARD
            )}
          >
            {renderPreview(format, result)}
          </div>

          <div className="mt-auto flex gap-2">
            <Button
              className="flex-1"
              onClick={() => result && download(format, result)}
              disabled={result?.status !== "done"}
              data-testid={`download-${format.id}`}
            >
              <Download className="mr-2 h-4 w-4" />
              Download .{format.extension}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => openCompare(format.id)}
              disabled={!canCompare(format.id)}
              aria-label={`Compare ${format.label} with the original at 100%`}
              title="Compare with original at 100%"
              data-testid={`compare-${format.id}`}
            >
              <Columns2 className="h-4 w-4" />
            </Button>
            {format.settings.length > 0 ? (
              <Button
                variant="outline"
                onClick={() =>
                  setOpenSettings(previous => ({
                    ...previous,
                    [format.id]: !settingsOpen,
                  }))
                }
                aria-expanded={settingsOpen}
                data-testid={`settings-toggle-${format.id}`}
              >
                Settings
                <ChevronDown
                  className={cn(
                    "ml-1 h-4 w-4 transition-transform",
                    settingsOpen && "rotate-180"
                  )}
                />
              </Button>
            ) : null}
          </div>

          {settingsOpen ? (
            <div className="space-y-4 rounded-md border p-3">
              {format.settings.map(setting => (
                <SettingControl
                  key={setting.key}
                  formatId={format.id}
                  setting={setting}
                  values={values}
                  onChange={(key, value) =>
                    updateSetting(format.id, key, value)
                  }
                />
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => resetSettings(format.id)}
              >
                Reset to defaults
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Image Compressor
          {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Compress an image into multiple formats and compare sizes side by
            side
          </p>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      {error ? (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      ) : null}

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <Button
            variant={sortBySize ? "default" : "outline"}
            onClick={() => setSortBySize(previous => !previous)}
            disabled={!imageFile}
            aria-pressed={sortBySize}
            data-testid="sort-by-size"
          >
            <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            Sort by size
          </Button>
          <Button
            variant="outline"
            onClick={() => openCompare(smallestId ?? "original")}
            disabled={!imageFile || !smallestId}
            data-testid="open-compare"
          >
            <Columns2 className="mr-2 h-4 w-4" />
            Compare quality
          </Button>
          {isEncoding ? (
            <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Encoding…
            </span>
          ) : null}
        </ActionButtonGroup>
        <DataButtonGroup>
          <ClearButton
            onClick={clearImage}
            tooltip="Remove the selected image and results"
            hasModifiedData={imageFile !== null}
            disabled={imageFile === null}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <div className="mb-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Choose an image</CardTitle>
          </CardHeader>
          <CardContent>
            <label
              htmlFor="image-compressor-file"
              onDragOver={event => event.preventDefault()}
              onDrop={event => {
                event.preventDefault();
                void handleFile(event.dataTransfer.files[0]);
              }}
              className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-primary dark:border-slate-700"
            >
              {originalUrl ? (
                <img
                  src={originalUrl}
                  alt="Original"
                  className="mb-3 max-h-40 max-w-full rounded object-contain"
                  data-testid="original-preview"
                />
              ) : (
                <Upload className="mb-3 h-8 w-8 text-slate-500" />
              )}
              <span className="font-medium">
                {imageFile ? "Choose a different image" : "Choose an image"}
              </span>
              <span className="mt-1 text-sm text-slate-500">
                or drag and drop an image here
              </span>
              <Input
                ref={fileInputRef}
                id="image-compressor-file"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={event => {
                  void handleFile(event.currentTarget.files?.[0]);
                  event.currentTarget.value = "";
                }}
                data-testid="image-file-input"
              />
            </label>

            {imageFile ? (
              <div
                className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400"
                data-testid="original-info"
              >
                <span className="break-all font-medium text-slate-900 dark:text-slate-100">
                  {imageFile.name}
                </span>
                <span data-testid="original-size">
                  {formatBytes(imageFile.size)}
                </span>
                {sourceSize ? (
                  <span>
                    {sourceSize.width} × {sourceSize.height}px
                  </span>
                ) : null}
                {imageFile.type ? <span>{imageFile.type}</span> : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resize (optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Shrink the image to fit within these bounds before compressing.
              Aspect ratio is kept and images are never enlarged.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="max-width">Max width (px)</Label>
                <Input
                  id="max-width"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder={sourceSize ? String(sourceSize.width) : "Auto"}
                  value={maxWidth}
                  onChange={event => setMaxWidth(event.target.value)}
                  data-testid="max-width-input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="max-height">Max height (px)</Label>
                <Input
                  id="max-height"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  placeholder={sourceSize ? String(sourceSize.height) : "Auto"}
                  value={maxHeight}
                  onChange={event => setMaxHeight(event.target.value)}
                  data-testid="max-height-input"
                />
              </div>
            </div>
            {workingImage &&
            sourceSize &&
            (workingImage.width !== sourceSize.width ||
              workingImage.height !== sourceSize.height) ? (
              <p
                className="text-sm font-medium"
                data-testid="output-dimensions"
              >
                Output: {workingImage.width} × {workingImage.height}px
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {imageFile ? (
        <div
          className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-testid="results-grid"
        >
          {orderedFormats.map(renderResultCard)}
        </div>
      ) : null}

      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
        Compression runs on this device with WebAssembly encoders. Your image is
        never uploaded. Output files do not keep the original metadata (EXIF,
        GPS, color profiles).
      </p>

      {compare && workingImage ? (
        <ImageCompare
          open
          onOpenChange={open => {
            if (!open) setCompare(null);
          }}
          sources={compareSources}
          leftId={compare.left}
          rightId={compare.right}
          onLeftChange={left =>
            setCompare(previous => previous && { ...previous, left })
          }
          onRightChange={right =>
            setCompare(previous => previous && { ...previous, right })
          }
          width={workingImage.width}
          height={workingImage.height}
          note={
            hiddenFromCompare.length
              ? `${hiddenFromCompare.join(", ")} can't be shown because this browser can't display ${hiddenFromCompare.length === 1 ? "it" : "them"}.`
              : undefined
          }
        />
      ) : null}

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
