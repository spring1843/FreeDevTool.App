import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

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
});
