export type ImageFormatId = "qoi" | "jpeg" | "png" | "webp" | "jxl" | "avif";

export type FormatSetting =
  | {
      type: "range";
      key: string;
      label: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
      /** Disable this control while the given boolean setting is on. */
      disabledWhen?: string;
    }
  | {
      type: "boolean";
      key: string;
      label: string;
      defaultValue: boolean;
    }
  | {
      type: "select";
      key: string;
      label: string;
      options: Array<{ value: string; label: string }>;
      defaultValue: string;
    };

export type FormatSettingValues = Record<string, number | boolean | string>;

export interface ImageFormat {
  id: ImageFormatId;
  label: string;
  codec: string;
  mime: string;
  extension: string;
  supportsAlpha: boolean;
  settings: FormatSetting[];
}

/** Ordered roughly fastest-to-slowest so results fill in progressively. */
export const IMAGE_FORMATS: ImageFormat[] = [
  {
    id: "qoi",
    label: "QOI",
    codec: "QOI",
    mime: "image/qoi",
    extension: "qoi",
    supportsAlpha: true,
    settings: [],
  },
  {
    id: "jpeg",
    label: "JPEG",
    codec: "MozJPEG",
    mime: "image/jpeg",
    extension: "jpg",
    supportsAlpha: false,
    settings: [
      {
        type: "range",
        key: "quality",
        label: "Quality",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 75,
      },
      {
        type: "boolean",
        key: "progressive",
        label: "Progressive",
        defaultValue: true,
      },
      {
        type: "select",
        key: "subsample",
        label: "Chroma subsampling",
        options: [
          { value: "420", label: "4:2:0 (smaller)" },
          { value: "444", label: "4:4:4 (sharper color)" },
        ],
        defaultValue: "420",
      },
    ],
  },
  {
    id: "png",
    label: "PNG",
    codec: "OxiPNG",
    mime: "image/png",
    extension: "png",
    supportsAlpha: true,
    settings: [
      {
        type: "range",
        key: "level",
        label: "Optimization level",
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 2,
      },
      {
        type: "boolean",
        key: "interlace",
        label: "Interlaced",
        defaultValue: false,
      },
    ],
  },
  {
    id: "webp",
    label: "WebP",
    codec: "libwebp",
    mime: "image/webp",
    extension: "webp",
    supportsAlpha: true,
    settings: [
      {
        type: "boolean",
        key: "lossless",
        label: "Lossless",
        defaultValue: false,
      },
      {
        type: "range",
        key: "quality",
        label: "Quality",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 75,
        disabledWhen: "lossless",
      },
      {
        type: "range",
        key: "effort",
        label: "Effort",
        min: 0,
        max: 6,
        step: 1,
        defaultValue: 4,
      },
    ],
  },
  {
    id: "jxl",
    label: "JPEG XL",
    codec: "libjxl",
    mime: "image/jxl",
    extension: "jxl",
    supportsAlpha: true,
    settings: [
      {
        type: "boolean",
        key: "lossless",
        label: "Lossless",
        defaultValue: false,
      },
      {
        type: "range",
        key: "quality",
        label: "Quality",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 75,
        disabledWhen: "lossless",
      },
      {
        type: "range",
        key: "effort",
        label: "Effort",
        min: 1,
        max: 9,
        step: 1,
        defaultValue: 7,
      },
    ],
  },
  {
    id: "avif",
    label: "AVIF",
    codec: "libavif",
    mime: "image/avif",
    extension: "avif",
    supportsAlpha: true,
    settings: [
      {
        type: "boolean",
        key: "lossless",
        label: "Lossless",
        defaultValue: false,
      },
      {
        type: "range",
        key: "quality",
        label: "Quality",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        disabledWhen: "lossless",
      },
      {
        type: "range",
        key: "speed",
        label: "Speed (higher is faster, larger)",
        min: 0,
        max: 10,
        step: 1,
        defaultValue: 6,
      },
      {
        type: "select",
        key: "subsample",
        label: "Chroma subsampling",
        options: [
          { value: "420", label: "4:2:0 (smaller)" },
          { value: "444", label: "4:4:4 (sharper color)" },
        ],
        defaultValue: "420",
      },
    ],
  },
];

function getImageFormat(id: ImageFormatId): ImageFormat {
  const format = IMAGE_FORMATS.find(candidate => candidate.id === id);
  if (!format) throw new Error(`Unknown image format: ${id}`);
  return format;
}

export function getDefaultSettings(id: ImageFormatId): FormatSettingValues {
  return Object.fromEntries(
    getImageFormat(id).settings.map(setting => [
      setting.key,
      setting.defaultValue,
    ])
  );
}

export function getAllDefaultSettings(): Record<
  ImageFormatId,
  FormatSettingValues
> {
  return Object.fromEntries(
    IMAGE_FORMATS.map(format => [format.id, getDefaultSettings(format.id)])
  ) as Record<ImageFormatId, FormatSettingValues>;
}

function num(values: FormatSettingValues, key: string): number {
  return Number(values[key]);
}

function bool(values: FormatSettingValues, key: string): boolean {
  return values[key] === true;
}

/**
 * Translate UI settings into the option object each jSquash codec expects.
 * Missing values fall back to the format's defaults.
 */
export function buildEncodeOptions(
  id: ImageFormatId,
  settings: FormatSettingValues = {}
): Record<string, number | boolean> {
  const values = { ...getDefaultSettings(id), ...settings };

  switch (id) {
    case "qoi":
      return {};
    case "jpeg":
      return {
        quality: num(values, "quality"),
        progressive: bool(values, "progressive"),
        baseline: !bool(values, "progressive"),
        auto_subsample: false,
        // MozJPEG: 2 = 2x2 subsampling (4:2:0), 1 = none (4:4:4)
        chroma_subsample: values.subsample === "444" ? 1 : 2,
      };
    case "png":
      return {
        level: num(values, "level"),
        interlace: bool(values, "interlace"),
      };
    case "webp":
      return {
        quality: bool(values, "lossless") ? 100 : num(values, "quality"),
        method: num(values, "effort"),
        lossless: bool(values, "lossless") ? 1 : 0,
        exact: bool(values, "lossless") ? 1 : 0,
      };
    case "jxl":
      return {
        quality: bool(values, "lossless") ? 100 : num(values, "quality"),
        effort: num(values, "effort"),
        lossless: bool(values, "lossless"),
      };
    case "avif":
      return {
        quality: bool(values, "lossless") ? 100 : num(values, "quality"),
        speed: num(values, "speed"),
        lossless: bool(values, "lossless"),
        // libavif: 1 = 4:2:0, 3 = 4:4:4
        subsample: values.subsample === "444" ? 3 : 1,
      };
    default:
      throw new Error(`Unknown image format: ${String(id)}`);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Size of `size` relative to `original`, as a whole-number percentage. */
export function percentOfOriginal(size: number, original: number): number {
  if (original <= 0) return 0;
  return Math.round((size / original) * 100);
}

/** Scale dimensions to fit within maxWidth x maxHeight, never upscaling. */
export function fitDimensions(
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  const scale = Math.min(
    1,
    maxWidth && maxWidth > 0 ? maxWidth / width : 1,
    maxHeight && maxHeight > 0 ? maxHeight / height : 1
  );
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

export function outputFileName(
  originalName: string,
  format: ImageFormat
): string {
  const base = originalName.replace(/\.[^./\\]+$/, "") || "image";
  return `${base}.${format.extension}`;
}

/** Composite RGBA pixels onto an opaque background (for formats without alpha). */
export function flattenAlpha(
  data: Uint8ClampedArray,
  background: [number, number, number] = [255, 255, 255]
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3] / 255;
    out[i] = data[i] * alpha + background[0] * (1 - alpha);
    out[i + 1] = data[i + 1] * alpha + background[1] * (1 - alpha);
    out[i + 2] = data[i + 2] * alpha + background[2] * (1 - alpha);
    out[i + 3] = 255;
  }
  return out;
}
