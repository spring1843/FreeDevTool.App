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
    // Parsing occurs automatically on input change; wait for output update

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

  test("should show warning for unknown TLD", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    // Enter a URL with an unknown TLD
    await urlInput.fill("https://example.invalidtld123");

    // Check that the warning message is displayed
    const warningText = page.locator("text=This TLD is not recognized");
    await expect(warningText).toBeVisible();
    await expectNoErrors(page);
  });

  test("should not show warning for known TLD", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    // Enter a URL with a known TLD
    await urlInput.fill("https://example.com");

    // Check that the warning message is NOT displayed
    const warningText = page.locator("text=This TLD is not recognized");
    await expect(warningText).not.toBeVisible();
    await expectNoErrors(page);
  });

  test("should correctly parse FTP URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("ftp://ftp.example.com/pub/files");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("ftp");
    expect(parsed.hostname).toBe("ftp.example.com");
    expect(parsed.tld).toBe("com");
    expect(parsed.domain).toBe("example");
    expect(parsed.subdomain).toBe("ftp");
    await expectNoErrors(page);
  });

  test("should correctly parse FILE URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("file:///home/user/documents/file.txt");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("file");
    expect(parsed.pathname).toBe("/home/user/documents/file.txt");
    await expectNoErrors(page);
  });

  test("should correctly parse MAILTO URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("mailto:user@example.com?subject=Hello");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("mailto");
    await expectNoErrors(page);
  });

  test("should correctly parse TEL URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("tel:+1-555-123-4567");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("tel");
    await expectNoErrors(page);
  });

  test("should correctly parse IRC URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("irc://irc.freenode.net/channel");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("irc");
    expect(parsed.hostname).toBe("irc.freenode.net");
    await expectNoErrors(page);
  });

  test("should correctly parse SSH URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("ssh://user@server.example.com:22/path");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("ssh");
    expect(parsed.hostname).toBe("server.example.com");
    expect(parsed.port).toBe("22");
    await expectNoErrors(page);
  });

  test("should correctly parse WebSocket URLs", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("wss://socket.example.com/ws");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("wss");
    expect(parsed.hostname).toBe("socket.example.com");
    expect(parsed.pathname).toBe("/ws");
    await expectNoErrors(page);
  });

  test("should handle HTTPS URLs correctly", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("https://secure.example.com:443/api/v1");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("https");
    expect(parsed.hostname).toBe("secure.example.com");
    expect(parsed.pathname).toBe("/api/v1");
    await expectNoErrors(page);
  });

  test("should handle HTTP URLs correctly", async ({ page }) => {
    const urlInput = page.getByTestId("url-input");

    await urlInput.fill("http://www.example.com/page?id=123");

    const jsonOutput = page.locator("#output .cm-content");
    await expect(jsonOutput).toBeVisible();
    const outputText = await jsonOutput.textContent();
    const parsed = JSON.parse(outputText || "{}");

    expect(parsed.protocol).toBe("http");
    expect(parsed.hostname).toBe("www.example.com");
    expect(parsed.queryParams).toEqual({ id: "123" });
    await expectNoErrors(page);
  });
});
