import {
  buildEncodeOptions,
  flattenAlpha,
  type FormatSettingValues,
  type ImageFormatId,
} from "./image-compression";

export interface EncodeRequest {
  id: number;
  formatId: ImageFormatId;
  width: number;
  height: number;
  pixels: Uint8ClampedArray;
  settings: FormatSettingValues;
}

export type EncodeResponse =
  | { id: number; ok: true; buffer: ArrayBuffer; durationMs: number }
  | { id: number; ok: false; error: string };

async function encode(
  formatId: ImageFormatId,
  image: ImageData,
  settings: FormatSettingValues
): Promise<ArrayBuffer> {
  const options = buildEncodeOptions(formatId, settings);
  switch (formatId) {
    case "qoi": {
      const { default: encodeQoi } = await import("@jsquash/qoi/encode.js");
      return encodeQoi(image);
    }
    case "jpeg": {
      const { default: encodeJpeg } = await import("@jsquash/jpeg/encode.js");
      const opaque = new ImageData(
        flattenAlpha(image.data),
        image.width,
        image.height
      );
      return encodeJpeg(opaque, options);
    }
    case "png": {
      const { default: optimise } = await import("@jsquash/oxipng/optimise.js");
      return optimise(image, options);
    }
    case "webp": {
      const { default: encodeWebp } = await import("@jsquash/webp/encode.js");
      return encodeWebp(image, options);
    }
    case "jxl": {
      const { default: encodeJxl } = await import("@jsquash/jxl/encode.js");
      return encodeJxl(image, options);
    }
    case "avif": {
      const { default: encodeAvif } = await import("@jsquash/avif/encode.js");
      return encodeAvif(image, options);
    }
    default:
      throw new Error(`Unknown image format: ${String(formatId)}`);
  }
}

self.onmessage = async (event: MessageEvent<EncodeRequest>) => {
  const { id, formatId, width, height, pixels, settings } = event.data;
  const started = performance.now();
  try {
    const buffer = await encode(
      formatId,
      new ImageData(pixels, width, height),
      settings
    );
    const response: EncodeResponse = {
      id,
      ok: true,
      buffer,
      durationMs: performance.now() - started,
    };
    self.postMessage(response, { transfer: [buffer] });
  } catch (cause) {
    const response: EncodeResponse = {
      id,
      ok: false,
      error: cause instanceof Error ? cause.message : String(cause),
    };
    self.postMessage(response);
  }
};
