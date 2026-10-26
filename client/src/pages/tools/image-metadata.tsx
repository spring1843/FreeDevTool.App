import { useCallback, useEffect, useRef, useState } from "react";
import { parse } from "exifr";
import { Copy, FileImage, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ActionButtonGroup,
  ClearButton,
  DataButtonGroup,
  ToolButtonGroup,
} from "@/components/ui/tool-button";
import { SecurityBanner } from "@/components/ui/security-banner";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { Switch } from "@/components/ui/switch";
import { ToolExplanations } from "@/components/tool-explanations";
import { getToolByPath } from "@/data/tools";
import {
  findC2paDigitalSourceTypes,
  readC2paManifest,
} from "@/lib/c2pa-metadata";
import { findImageAiIndicators } from "@/lib/image-ai-indicators";
import { extractPngTextMetadata } from "@/lib/png-text-metadata";
import { useToast } from "@/hooks/use-toast";
import type { ManifestStore } from "@contentauth/c2pa-web";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function stringifyMetadata(metadata: Record<string, unknown>): string {
  return JSON.stringify(
    metadata,
    (_, value: unknown) => {
      if (typeof value === "bigint") return value.toString();
      if (value instanceof Uint8Array) {
        return Array.from(value, byte =>
          byte.toString(16).padStart(2, "0")
        ).join(" ");
      }
      return value;
    },
    2
  );
}

export default function ImageMetadata() {
  const tool = getToolByPath("/tools/image-metadata");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(
    null
  );
  const [c2paManifest, setC2paManifest] = useState<ManifestStore | null>(null);
  const [c2paError, setC2paError] = useState<string | null>(null);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [autoProcess, setAutoProcess] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const extractionId = useRef(0);
  const { toast } = useToast();

  const extractMetadata = useCallback(async (file: File) => {
    const currentExtractionId = ++extractionId.current;
    setIsExtracting(true);
    setError(null);
    setMetadata(null);
    setC2paManifest(null);
    setC2paError(null);
    setHasProcessed(false);

    try {
      const [result, pngText, c2paResult] = await Promise.all([
        parse(file, true),
        extractPngTextMetadata(file),
        readC2paManifest(file)
          .then(manifest => ({ manifest }))
          .catch(cause => ({
            error:
              cause instanceof Error
                ? cause.message
                : "Unknown C2PA verification error",
          })),
      ]);
      if (currentExtractionId !== extractionId.current) return;

      const manifest = "manifest" in c2paResult ? c2paResult.manifest : null;
      setC2paManifest(manifest);
      setC2paError("error" in c2paResult ? c2paResult.error : null);
      setMetadata(
        Object.assign(
          {},
          result && typeof result === "object"
            ? Object.fromEntries(Object.entries(result))
            : {},
          pngText,
          manifest ? { C2PA: manifest } : {}
        )
      );
      setHasProcessed(true);
    } catch (cause) {
      if (currentExtractionId !== extractionId.current) return;
      setError(
        cause instanceof Error
          ? `Could not read this image: ${cause.message}`
          : "Could not read this image. The format may not be supported or the file may be invalid."
      );
    } finally {
      if (currentExtractionId === extractionId.current) {
        setIsExtracting(false);
      }
    }
  }, []);

  useEffect(() => {
    if (autoProcess && imageFile) {
      void extractMetadata(imageFile);
    }
  }, [autoProcess, extractMetadata, imageFile]);

  useEffect(
    () => () => {
      extractionId.current += 1;
    },
    []
  );

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    extractionId.current += 1;
    setIsExtracting(false);
    setError(null);
    setMetadata(null);
    setC2paManifest(null);
    setC2paError(null);
    setHasProcessed(false);
    setImageFile(file);
  };

  const handleClear = () => {
    extractionId.current += 1;
    setImageFile(null);
    setMetadata(null);
    setC2paManifest(null);
    setC2paError(null);
    setHasProcessed(false);
    setIsExtracting(false);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyMetadata = async () => {
    if (!metadata) return;
    try {
      await navigator.clipboard.writeText(stringifyMetadata(metadata));
      toast({
        title: "Metadata copied",
        description: "Image metadata copied to the clipboard.",
      });
    } catch (cause) {
      console.error("Failed to copy image metadata:", cause);
      toast({
        title: "Copy failed",
        description: "Could not copy metadata to the clipboard.",
        variant: "destructive",
      });
    }
  };

  const metadataText = metadata ? stringifyMetadata(metadata) : "";
  const hasMetadata = metadata !== null && Object.keys(metadata).length > 0;
  const aiIndicators = metadata ? findImageAiIndicators(metadata) : [];
  const c2paSourceTypes = c2paManifest
    ? findC2paDigitalSourceTypes(c2paManifest)
    : [];
  const aiSourceTypes = c2paSourceTypes.filter(sourceType =>
    /(?:trainedAlgorithmicMedia|compositeWithTrainedAlgorithmicMedia|algorithmicallyEnhanced)$/i.test(
      sourceType
    )
  );

  const renderMetadataContent = () => {
    if (isExtracting) {
      return (
        <p role="status" className="text-sm text-slate-600 dark:text-slate-400">
          Reading image metadata locally...
        </p>
      );
    }
    if (hasMetadata) {
      return (
        <pre
          className="max-h-[600px] overflow-auto whitespace-pre-wrap break-words rounded-md bg-slate-100 p-4 font-mono text-sm dark:bg-slate-900"
          data-testid="image-metadata-output"
        >
          {metadataText}
        </pre>
      );
    }
    return (
      <p
        data-testid="no-image-metadata"
        className="text-sm text-slate-600 dark:text-slate-400"
      >
        No embedded metadata was found in this image.
      </p>
    );
  };

  const renderOriginIndicators = () => {
    if (isExtracting) {
      return (
        <p role="status" className="text-sm text-slate-600 dark:text-slate-400">
          Checking embedded metadata...
        </p>
      );
    }
    if (aiIndicators.length > 0) {
      return (
        <div
          className="space-y-3"
          data-testid="ai-indicators-found"
          role="status"
        >
          <p className="font-medium text-amber-800 dark:text-amber-300">
            AI-generation indicators were found in this file&apos;s metadata.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
            {aiIndicators.map((indicator, index) => (
              <li key={`${indicator.field}-${index}`}>
                <span className="font-mono">{indicator.field}</span>:{" "}
                {indicator.evidence}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <p
        className="text-sm text-slate-600 dark:text-slate-400"
        data-testid="no-ai-indicators"
      >
        No common AI-generation indicators were found in the metadata. This does
        not prove the image was not AI-generated; metadata can be missing,
        edited, or removed.
      </p>
    );
  };

  const renderC2paContent = () => {
    if (isExtracting) {
      return (
        <p role="status" className="text-sm text-slate-600 dark:text-slate-400">
          Checking for C2PA Content Credentials...
        </p>
      );
    }
    if (c2paError) {
      return (
        <p
          className="text-sm text-red-700 dark:text-red-300"
          data-testid="c2pa-read-error"
        >
          Could not inspect C2PA credentials locally: {c2paError}
        </p>
      );
    }
    if (!c2paManifest) {
      return (
        <p
          className="text-sm text-slate-600 dark:text-slate-400"
          data-testid="no-c2pa"
        >
          No embedded C2PA Content Credentials were found.
        </p>
      );
    }

    return (
      <div className="space-y-3" data-testid="c2pa-found">
        <p className="text-sm">
          C2PA manifest found. Validation state:{" "}
          <strong>{c2paManifest.validation_state ?? "not reported"}</strong>.
        </p>
        {aiSourceTypes.length > 0 ? (
          <div
            className="text-sm text-amber-800 dark:text-amber-300"
            data-testid="c2pa-ai-source"
          >
            The manifest asserts AI-generated or AI-edited content:
            <ul className="mt-1 list-disc pl-5">
              {aiSourceTypes.map(sourceType => (
                <li className="break-all font-mono" key={sourceType}>
                  {sourceType}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p
            className="text-sm text-slate-600 dark:text-slate-400"
            data-testid="c2pa-no-ai-source"
          >
            The manifest contains no recognized AI-source type. That does not
            establish that the image was not AI-generated.
          </p>
        )}
        {c2paManifest.validation_status?.length ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
            {c2paManifest.validation_status.map((status, index) => (
              <li key={`${status.code}-${index}`}>
                <span className="font-mono">{status.code}</span>
                {status.explanation ? `: ${status.explanation}` : ""}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Validation was performed locally. Remote manifest and
          certificate-status lookups are disabled.
        </p>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h2 className="mb-2 flex items-center gap-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Image Metadata
          {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Read EXIF, GPS, camera, and other embedded image details
          </p>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        Your image stays on this device. Metadata can include private
        information such as GPS coordinates. SynthID watermark detection is not
        available in this offline tool.
      </p>

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
            onClick={() => imageFile && void extractMetadata(imageFile)}
            disabled={!imageFile || isExtracting}
            data-testid="extract-metadata"
          >
            <FileImage className="mr-2 h-4 w-4" />
            {isExtracting ? "Extracting..." : "Extract Metadata"}
          </Button>
          <div className="flex items-center space-x-2">
            <Switch
              id="image-metadata-auto-process"
              checked={autoProcess}
              onCheckedChange={setAutoProcess}
              data-testid="auto-process-switch"
            />
            <Label
              htmlFor="image-metadata-auto-process"
              className="cursor-pointer"
            >
              Auto Process
            </Label>
          </div>
        </ActionButtonGroup>
        <DataButtonGroup>
          <ClearButton
            onClick={handleClear}
            tooltip="Remove the selected image and metadata"
            hasModifiedData={imageFile !== null}
            disabled={imageFile === null}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Choose an image</CardTitle>
        </CardHeader>
        <CardContent>
          <label
            htmlFor="image-metadata-file"
            onDragOver={event => event.preventDefault()}
            onDrop={event => {
              event.preventDefault();
              handleFile(event.dataTransfer.files[0]);
            }}
            className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 text-center transition-colors hover:border-primary dark:border-slate-700"
          >
            <Upload className="mb-3 h-8 w-8 text-slate-500" />
            <span className="font-medium">
              {imageFile ? "Choose a different image" : "Choose an image"}
            </span>
            <span className="mt-1 text-sm text-slate-500">
              or drag and drop an image here
            </span>
            <Input
              ref={fileInputRef}
              id="image-metadata-file"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={event => {
                handleFile(event.currentTarget.files?.[0]);
                event.currentTarget.value = "";
              }}
              data-testid="image-file-input"
            />
          </label>

          {imageFile ? (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="break-all font-medium text-slate-900 dark:text-slate-100">
                {imageFile.name}
              </span>
              <span>{formatBytes(imageFile.size)}</span>
              {imageFile.type ? <span>{imageFile.type}</span> : null}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {hasProcessed || isExtracting ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>C2PA Content Credentials</CardTitle>
          </CardHeader>
          <CardContent>{renderC2paContent()}</CardContent>
        </Card>
      ) : null}

      {hasProcessed || isExtracting ? (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Image Origin Indicators</CardTitle>
          </CardHeader>
          <CardContent>{renderOriginIndicators()}</CardContent>
        </Card>
      ) : null}

      {hasProcessed || isExtracting ? (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>Extracted Metadata</CardTitle>
            {hasMetadata ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => void copyMetadata()}
                data-testid="copy-metadata"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy JSON
              </Button>
            ) : null}
          </CardHeader>
          <CardContent>{renderMetadataContent()}</CardContent>
        </Card>
      ) : null}

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
