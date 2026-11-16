import { test, expect, type Page } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

const FORMATS = ["qoi", "jpeg", "png", "webp", "jxl", "avif"] as const;

/** Render a gradient PNG in the browser so codecs have real pixels to work with. */
async function makeTestPng(
  page: Page,
  width = 64,
  height = 48
): Promise<Buffer> {
  const base64 = await page.evaluate(
    ([w, h]) => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const context = canvas.getContext("2d")!;
      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#ff0080");
      gradient.addColorStop(1, "#00c8ff");
      context.fillStyle = gradient;
      context.fillRect(0, 0, w, h);
      context.clearRect(0, 0, 16, 16);
      return canvas.toDataURL("image/png").split(",")[1];
    },
    [width, height]
  );
  return Buffer.from(base64, "base64");
}

async function uploadTestImage(page: Page, width = 64, height = 48) {
  await page.getByTestId("image-file-input").setInputFiles({
    name: "gradient.png",
    mimeType: "image/png",
    buffer: await makeTestPng(page, width, height),
  });
}

async function waitForAllResults(page: Page) {
  for (const format of FORMATS) {
    await expect(page.getByTestId(`result-size-${format}`)).toBeVisible({
      timeout: 60_000,
    });
  }
}

test.describe("Image Compressor Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/image-compressor");
  });

  test("encodes an uploaded image into every format", async ({ page }) => {
    await uploadTestImage(page);

    await expect(page.getByText("gradient.png")).toBeVisible();
    await expect(page.getByText("64 × 48px")).toBeVisible();
    await waitForAllResults(page);

    for (const format of FORMATS) {
      await expect(page.getByTestId(`result-size-${format}`)).toContainText(
        /\d+(\.\d+)? (B|KB|MB)/
      );
      await expect(page.getByTestId(`download-${format}`)).toBeEnabled();
    }
    await expect(page.locator('[data-testid^="smallest-"]')).toHaveCount(1);
    await expect(page.getByTestId("preview-png")).toBeVisible();

    await expectNoErrors(page);
  });

  test("downloads a format with the right file name", async ({ page }) => {
    await uploadTestImage(page);
    await expect(page.getByTestId("result-size-webp")).toBeVisible({
      timeout: 60_000,
    });

    const downloadPromise = page.waitForEvent("download");
    await page.getByTestId("download-webp").click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("gradient.webp");
  });

  test("re-encodes a format when its settings change", async ({ page }) => {
    await uploadTestImage(page);
    await waitForAllResults(page);

    const size = page.getByTestId("result-size-jpeg");
    const before = await size.textContent();

    await page.getByTestId("settings-toggle-jpeg").click();
    const slider = page.getByTestId("setting-jpeg-quality");
    await slider.locator('[role="slider"]').focus();
    await page.keyboard.press("End");

    await expect(size).not.toHaveText(before ?? "", { timeout: 30_000 });
    await expectNoErrors(page);
  });

  test("resizes before compressing", async ({ page }) => {
    await uploadTestImage(page);
    await page.getByTestId("max-width-input").fill("32");
    await expect(page.getByTestId("output-dimensions")).toHaveText(
      "Output: 32 × 24px"
    );
    await waitForAllResults(page);
  });

  test("clears the image and results", async ({ page }) => {
    await uploadTestImage(page);
    await expect(page.getByTestId("results-grid")).toBeVisible();

    await page.getByTestId("clear-button").click();
    await page.getByTestId("button-clear-confirm").click();

    await expect(page.getByTestId("results-grid")).toHaveCount(0);
    await expect(page.getByText("gradient.png")).toHaveCount(0);
  });

  test("compares two images side by side at true size", async ({ page }) => {
    await uploadTestImage(page);
    await waitForAllResults(page);

    await page.getByTestId("compare-webp").click();
    const dialog = page.getByTestId("image-compare-dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByTestId("compare-select-left")).toContainText(
      "Original"
    );
    await expect(page.getByTestId("compare-select-right")).toContainText(
      "WebP"
    );

    const ratio = await page.evaluate(() => window.devicePixelRatio);
    const left = page.getByTestId("compare-image-left");
    const right = page.getByTestId("compare-image-right");
    await expect(left).toBeVisible();
    await expect(right).toBeVisible();
    for (const image of [left, right]) {
      const box = await image.boundingBox();
      expect(box?.width).toBeCloseTo(64 / ratio, 0);
      expect(box?.height).toBeCloseTo(48 / ratio, 0);
    }

    await page.getByTestId("compare-zoom-200%").click();
    expect((await right.boundingBox())?.width).toBeCloseTo(128 / ratio, 0);

    await page.getByTestId("compare-swap").click();
    await expect(page.getByTestId("compare-select-left")).toContainText("WebP");
    await expect(page.getByTestId("compare-select-right")).toContainText(
      "Original"
    );

    await page.getByTestId("compare-close").click();
    await expect(dialog).toHaveCount(0);
    await expectNoErrors(page);
  });

  test("pans both comparison panes together", async ({ page }) => {
    await uploadTestImage(page, 2400, 1800);
    await expect(page.getByTestId("result-size-png")).toBeVisible({
      timeout: 60_000,
    });

    await page.getByTestId("compare-png").click();
    const leftViewport = page.getByTestId("compare-viewport-left");
    const rightViewport = page.getByTestId("compare-viewport-right");
    await expect(page.getByTestId("compare-image-right")).toBeVisible();

    await leftViewport.evaluate(element => {
      element.scrollLeft = 150;
      element.scrollTop = 120;
    });
    await expect
      .poll(() =>
        rightViewport.evaluate(element => [
          Math.round(element.scrollLeft),
          Math.round(element.scrollTop),
        ])
      )
      .toEqual([150, 120]);
  });
});
