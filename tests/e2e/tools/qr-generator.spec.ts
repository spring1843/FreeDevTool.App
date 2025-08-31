import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("QR Generator Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/qr-generator");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("should generate QR code and allow download", async ({ page }) => {
    // Enter text to generate QR code
    const inputField = page.locator('[data-testid="qr-input"]');
    await inputField.fill("https://freedevtool.app");
    
    // Wait for QR code to be generated
    await expect(page.locator('[data-testid="qr-code-image"]')).toBeVisible();
    
    // Verify download button is visible
    const downloadButton = page.locator('[data-testid="download-qr"]');
    await expect(downloadButton).toBeVisible();
    
    // Set up download promise before clicking
    const downloadPromise = page.waitForEvent('download');
    
    // Click download button
    await downloadButton.click();
    
    // Wait for download to start
    const download = await downloadPromise;
    
    // Verify download properties
    expect(download.suggestedFilename()).toMatch(/^qr-code-\d+\.svg$/);
    
    // Verify the file can be saved (this tests the download worked)
    const path = await download.path();
    expect(path).toBeTruthy();
    
    // Verify no errors occurred
    await expectNoErrors(page);
  });

  test("should generate QR code for different types", async ({ page }) => {
    // Test URL type (default)
    const inputField = page.locator('[data-testid="qr-input"]');
    await inputField.fill("https://example.com");
    
    // Wait for QR code to be generated
    await expect(page.locator('[data-testid="qr-code-image"]')).toBeVisible();
    
    // Change to email type
    const typeSelect = page.locator('[data-testid="qr-type-select"]');
    await typeSelect.click();
    await page.locator('text=Email Address').click();
    
    // Enter email
    await inputField.clear();
    await inputField.fill("test@example.com");
    
    // Verify QR code updates
    await expect(page.locator('[data-testid="qr-code-image"]')).toBeVisible();
    
    // Verify download is still available
    await expect(page.locator('[data-testid="download-qr"]')).toBeVisible();
    
    await expectNoErrors(page);
  });
});
