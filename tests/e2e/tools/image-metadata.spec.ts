import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

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
});
