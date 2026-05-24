import { test, expect } from "@playwright/test";

test.describe("Keyboard Shortcut Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  // ── Ctrl+Shift+* ────────────────────────────────────────────────────────────

  test("Ctrl+Shift+1 navigates to Date Converter from homepage", async ({
    page,
  }) => {
    await page.keyboard.press("Control+Shift+1");
    await expect(page).toHaveURL("/tools/date-converter");
  });

  test("Ctrl+Shift+B navigates to Base64 Encoder from homepage", async ({
    page,
  }) => {
    await page.keyboard.press("Control+Shift+B");
    await expect(page).toHaveURL("/tools/base64");
  });

  test("Ctrl+Shift+B navigates to Base64 Encoder from a tool page", async ({
    page,
  }) => {
    // Start on a different tool page
    await page.goto("/tools/date-converter");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Control+Shift+B");
    await expect(page).toHaveURL("/tools/base64");
  });

  test("Ctrl+Shift+1 navigates to Date Converter with search input focused", async ({
    page,
  }) => {
    // Focus the search input first
    await page.keyboard.press("Control+s");
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeFocused();

    // Shortcut should still fire even with search focused
    await page.keyboard.press("Control+Shift+1");
    await expect(page).toHaveURL("/tools/date-converter");
  });

  // ── Ctrl+Shift+Alt+* ────────────────────────────────────────────────────────

  test("Ctrl+Shift+Alt+U navigates to URL Encoder from homepage", async ({
    page,
  }) => {
    await page.keyboard.press("Control+Shift+Alt+U");
    await expect(page).toHaveURL("/tools/url-encoder");
  });

  test("Ctrl+Shift+Alt+G navigates to UUID Generator from homepage", async ({
    page,
  }) => {
    await page.keyboard.press("Control+Shift+Alt+G");
    await expect(page).toHaveURL("/tools/uuid-generator");
  });

  test("Ctrl+Shift+Alt+U navigates to URL Encoder from a tool page", async ({
    page,
  }) => {
    await page.goto("/tools/base64");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Control+Shift+Alt+U");
    await expect(page).toHaveURL("/tools/url-encoder");
  });

  test("Ctrl+Shift+Alt+G navigates to UUID Generator with search input focused", async ({
    page,
  }) => {
    await page.keyboard.press("Control+s");
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeFocused();

    await page.keyboard.press("Control+Shift+Alt+G");
    await expect(page).toHaveURL("/tools/uuid-generator");
  });

  // ── Ctrl+Shift+Alt does NOT trigger plain Ctrl+Shift shortcuts ───────────────

  test("Ctrl+Shift+Alt+U does not trigger the Ctrl+Shift+U (Unit Converter) shortcut", async ({
    page,
  }) => {
    await page.keyboard.press("Control+Shift+Alt+U");
    // Should go to URL Encoder, not Unit Converter
    await expect(page).toHaveURL("/tools/url-encoder");
    await expect(page).not.toHaveURL("/tools/unit-converter");
  });

  // ── Ctrl-only shortcuts are unaffected ──────────────────────────────────────

  test("Ctrl+S still focuses search", async ({ page }) => {
    await page.keyboard.press("Control+s");
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeFocused();
  });
});
