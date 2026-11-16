import { describe, it, expect } from "vitest";
import {
  IMAGE_FORMATS,
  buildEncodeOptions,
  fitDimensions,
  flattenAlpha,
  formatBytes,
  getAllDefaultSettings,
  getDefaultSettings,
  outputFileName,
  percentOfOriginal,
} from "../../client/src/lib/image-compression";

describe("Image compression formats", () => {
  it("defines every format with unique ids and extensions", () => {
    const ids = IMAGE_FORMATS.map(format => format.id);
    expect(ids).toEqual(["qoi", "jpeg", "png", "webp", "jxl", "avif"]);
    expect(new Set(IMAGE_FORMATS.map(f => f.extension)).size).toBe(ids.length);
    for (const format of IMAGE_FORMATS) {
      expect(format.mime).toMatch(/^image\//);
    }
  });

  it("has defaults that sit inside each range setting", () => {
    for (const format of IMAGE_FORMATS) {
      for (const setting of format.settings) {
        if (setting.type === "range") {
          expect(setting.defaultValue).toBeGreaterThanOrEqual(setting.min);
          expect(setting.defaultValue).toBeLessThanOrEqual(setting.max);
        }
        if (setting.type === "select") {
          expect(setting.options.map(o => o.value)).toContain(
            setting.defaultValue
          );
        }
        if (setting.type === "range" && setting.disabledWhen) {
          expect(format.settings.map(s => s.key)).toContain(
            setting.disabledWhen
          );
        }
      }
    }
  });

  it("builds defaults for all formats", () => {
    const all = getAllDefaultSettings();
    expect(Object.keys(all)).toHaveLength(IMAGE_FORMATS.length);
    expect(getDefaultSettings("jpeg")).toEqual({
      quality: 75,
      progressive: true,
      subsample: "420",
    });
    expect(getDefaultSettings("qoi")).toEqual({});
  });
});

describe("buildEncodeOptions", () => {
  it("maps JPEG settings to MozJPEG options", () => {
    expect(buildEncodeOptions("jpeg")).toEqual({
      quality: 75,
      progressive: true,
      baseline: false,
      auto_subsample: false,
      chroma_subsample: 2,
    });
    expect(
      buildEncodeOptions("jpeg", { progressive: false, subsample: "444" })
    ).toMatchObject({
      progressive: false,
      baseline: true,
      chroma_subsample: 1,
    });
  });

  it("maps WebP lossless to numeric libwebp flags", () => {
    expect(buildEncodeOptions("webp", { lossless: true, quality: 40 })).toEqual(
      { quality: 100, method: 4, lossless: 1, exact: 1 }
    );
    expect(buildEncodeOptions("webp")).toMatchObject({
      quality: 75,
      lossless: 0,
    });
  });

  it("maps AVIF and JPEG XL options", () => {
    expect(buildEncodeOptions("avif", { subsample: "444" })).toEqual({
      quality: 50,
      speed: 6,
      lossless: false,
      subsample: 3,
    });
    expect(buildEncodeOptions("jxl", { lossless: true })).toEqual({
      quality: 100,
      effort: 7,
      lossless: true,
    });
  });

  it("maps PNG settings to OxiPNG options", () => {
    expect(buildEncodeOptions("png", { level: 4, interlace: true })).toEqual({
      level: 4,
      interlace: true,
    });
    expect(buildEncodeOptions("qoi")).toEqual({});
  });
});

describe("helpers", () => {
  it("formats byte sizes", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2.0 KB");
    expect(formatBytes(3 * 1024 * 1024)).toBe("3.0 MB");
  });

  it("computes percent of original", () => {
    expect(percentOfOriginal(25, 100)).toBe(25);
    expect(percentOfOriginal(150, 100)).toBe(150);
    expect(percentOfOriginal(10, 0)).toBe(0);
  });

  it("fits dimensions without upscaling", () => {
    expect(fitDimensions(4000, 3000, 1000)).toEqual({
      width: 1000,
      height: 750,
    });
    expect(fitDimensions(4000, 3000, 1000, 300)).toEqual({
      width: 400,
      height: 300,
    });
    expect(fitDimensions(100, 50, 1000, 1000)).toEqual({
      width: 100,
      height: 50,
    });
    expect(fitDimensions(100, 50)).toEqual({ width: 100, height: 50 });
  });

  it("names output files with the format extension", () => {
    const jpeg = IMAGE_FORMATS.find(f => f.id === "jpeg")!;
    expect(outputFileName("holiday.photo.png", jpeg)).toBe("holiday.photo.jpg");
    expect(outputFileName("noext", jpeg)).toBe("noext.jpg");
    expect(outputFileName(".png", jpeg)).toBe("image.jpg");
  });

  it("flattens transparent pixels onto white", () => {
    const pixels = new Uint8ClampedArray([
      0,
      0,
      0,
      0, // fully transparent
      255,
      0,
      0,
      255, // opaque red
      0,
      0,
      0,
      128, // half-transparent black
    ]);
    expect(Array.from(flattenAlpha(pixels))).toEqual([
      255, 255, 255, 255, 255, 0, 0, 255, 127, 127, 127, 255,
    ]);
  });
});
