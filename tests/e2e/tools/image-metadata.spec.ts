import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

function addPngTextChunk(png: Buffer, keyword: string, text: string): Buffer {
  const data = Buffer.from(`${keyword}\0${text}`, "latin1");
  const header = Buffer.alloc(8);
  header.writeUInt32BE(data.length);
  header.write("tEXt", 4, "ascii");
  const crc = Buffer.alloc(4);
  const iend = png.lastIndexOf(Buffer.from([0, 0, 0, 0, 73, 69, 78, 68]));
  return Buffer.concat([
    png.subarray(0, iend),
    header,
    data,
    crc,
    png.subarray(iend),
  ]);
}

test.describe("Image Metadata Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/image-metadata");
  });

  test("reads metadata from an uploaded image locally", async ({ page }) => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/WQ0AAAAASUVORK5CYII=",
      "base64"
    );

    await page.getByTestId("image-file-input").setInputFiles({
      name: "one-pixel.png",
      mimeType: "image/png",
      buffer: png,
    });

    await expect(page.getByText("one-pixel.png")).toBeVisible();
    await expect(page.getByTestId("image-metadata-output")).toBeVisible();
    await expect(page.getByTestId("image-metadata-output")).toContainText(
      "ImageWidth"
    );
    await expect(page.getByTestId("no-ai-indicators")).toBeVisible();
    await expect(page.getByTestId("no-c2pa")).toBeVisible();
    await expectNoErrors(page);
  });

  test("can disable automatic extraction and process on demand", async ({
    page,
  }) => {
    await page.getByTestId("auto-process-switch").click();
    await page.getByTestId("image-file-input").setInputFiles({
      name: "one-pixel.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/WQ0AAAAASUVORK5CYII=",
        "base64"
      ),
    });

    await expect(page.getByTestId("extract-metadata")).toBeEnabled();
    await page.getByTestId("extract-metadata").click();
    await expect(page.getByTestId("image-metadata-output")).toBeVisible();
    await expectNoErrors(page);
  });

  test("detects Stable Diffusion metadata embedded in PNG text", async ({
    page,
  }) => {
    const png = addPngTextChunk(
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/WQ0AAAAASUVORK5CYII=",
        "base64"
      ),
      "parameters",
      "Steps: 25, Sampler: Euler a, CFG scale: 7"
    );

    await page.getByTestId("image-file-input").setInputFiles({
      name: "generated.png",
      mimeType: "image/png",
      buffer: png,
    });

    await expect(page.getByTestId("ai-indicators-found")).toContainText(
      "AI-generation indicators were found"
    );
    await expect(page.getByTestId("image-metadata-output")).toContainText(
      "PNG Text.parameters"
    );
    await expectNoErrors(page);
  });
});
