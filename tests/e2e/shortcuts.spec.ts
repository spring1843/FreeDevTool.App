import { test, expect } from "@playwright/test";

test.describe("Keyboard Shortcut Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    // Use desktop viewport so the sidebar doesn't interfere
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test("Ctrl+Shift+1 should navigate to Date Converter", async ({ page }) => {
    await page.keyboard.press("Control+Shift+1");
    await expect(page).toHaveURL("/tools/date-converter");
  });

  test("Ctrl+Shift+2 should navigate to the correct tool", async ({ page }) => {
    await page.keyboard.press("Control+Shift+2");
    // Should leave the homepage
    await expect(page).not.toHaveURL("/");
    await expect(page.locator("main")).toBeVisible();
  });

  test("Ctrl+Shift+\\ should navigate to the correct tool", async ({
    page,
  }) => {
    await page.keyboard.press("Control+Shift+\\");
    // Should leave the homepage
    await expect(page).not.toHaveURL("/");
    await expect(page.locator("main")).toBeVisible();
  });

  test("Ctrl+S should still focus search (not affected by Shift fix)", async ({
    page,
  }) => {
    await page.keyboard.press("Control+s");
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeFocused();
  });
});
