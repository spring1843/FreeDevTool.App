import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";
import { DEFAULT_URL_TO_JSON } from "../../../client/src/data/defaults";

test.describe("URL to JSON Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/url-to-json");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should not display domain name as TLD when TLD is missing", async ({
    page,
  }) => {
    const urlInput = page.getByTestId("url-input");

    // Enter a URL without a valid TLD (e.g., "google" becomes "https://google")
    await urlInput.fill("google");
    await page.getByTestId("parse-button").click();

    // The output should NOT show "google" as the TLD
    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    // TLD should be empty or undefined, not "google"
    expect(parsed.tld).toBeUndefined();
    expect(parsed.domain).toBe("google");
  });

  test("should correctly identify valid TLDs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    // Enter a URL with a valid TLD
    await urlInput.fill("https://example.com");
    await page.getByTestId("parse-button").click();

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.tld).toBe("com");
    expect(parsed.domain).toBe("example");
  });

  test("should have Reset and Clear buttons", async ({ page }) => {
    const resetButton = page.getByTestId("reset-button");
    const clearButton = page.getByTestId("clear-button");

    await expect(resetButton).toBeVisible();
    await expect(clearButton).toBeVisible();
  });

  test("Reset button should be disabled when at default URL", async ({
    page,
  }) => {
    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeDisabled();
  });

  test("Clear button should clear URL input with confirmation", async ({
    page,
  }) => {
    const urlInput = page.getByTestId("url-input");
    await urlInput.fill("https://modified-example.com/path");

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(urlInput).toHaveValue("");
    await expectNoErrors(page);
  });

  test("Reset button should restore default URL after modification", async ({
    page,
  }) => {
    const urlInput = page.getByTestId("url-input");
    await urlInput.fill("https://modified-url.com");

    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(urlInput).toHaveValue(DEFAULT_URL_TO_JSON);
    await expectNoErrors(page);
  });

  test("Cancel button should preserve modified URL", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");
    const modifiedUrl = "https://keep-this-url.com/test";
    await urlInput.fill(modifiedUrl);

    const resetButton = page.getByTestId("reset-button");
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(urlInput).toHaveValue(modifiedUrl);
    await expectNoErrors(page);
  });
});
