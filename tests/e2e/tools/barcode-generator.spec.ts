import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Barcode Generator Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/barcode-generator");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should generate barcode and allow download", async ({ page }) => {
    // Enter text to generate barcode
    const inputField = page.locator('[data-testid="barcode-input"]');
    await inputField.fill("123456789012");

    // Wait for barcode to be generated
    await expect(page.locator("canvas")).toBeVisible();

    // Verify download button is visible
    const downloadButton = page.locator('[data-testid="download-barcode"]');
    await expect(downloadButton).toBeVisible();

    // Set up download promise before clicking
    const downloadPromise = page.waitForEvent("download");

    // Click download button
    await downloadButton.click();

    // Wait for download to start
    const download = await downloadPromise;

    // Verify download properties
    expect(download.suggestedFilename()).toMatch(
      /^barcode-[a-zA-Z0-9]+-\d+\.png$/
    );

    // Verify the file can be saved (this tests the download worked)
    const path = await download.path();
    expect(path).toBeTruthy();

    // Verify no errors occurred
    await expectNoErrors(page);
  });

  test("should generate barcode for different formats and allow download", async ({
    page,
  }) => {
    // Test with default format first
    const inputField = page.locator('[data-testid="barcode-input"]');
    await inputField.fill("1234567890");

    // Wait for barcode to be generated
    await expect(page.locator("canvas")).toBeVisible();

    // Change barcode format
    const formatSelect = page.locator('[data-testid="barcode-format-select"]');
    await formatSelect.click();
    await page.locator("text=Code 39").click();

    // Enter text compatible with Code 39
    await inputField.clear();
    await inputField.fill("ABC123");

    // Verify barcode updates
    await expect(page.locator("canvas")).toBeVisible();

    // Verify download is still available
    const downloadButton = page.locator('[data-testid="download-barcode"]');
    await expect(downloadButton).toBeVisible();

    // Test download with different format
    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();
    const download = await downloadPromise;

    // Verify download works for different format
    expect(download.suggestedFilename()).toMatch(
      /^barcode-[a-zA-Z0-9]+-\d+\.png$/
    );
    const path = await download.path();
    expect(path).toBeTruthy();

    await expectNoErrors(page);
  });
});
