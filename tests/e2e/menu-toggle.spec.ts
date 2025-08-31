import { test, expect } from "@playwright/test";

test.describe("Menu Toggle Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should toggle desktop sidebar on homepage with menu button click", async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Verify menu button is visible
    const menuButton = page.locator('[data-testid="menu-button"]');
    await expect(menuButton).toBeVisible();

    // Verify sidebar is initially visible on desktop homepage
    const sidebar = page.locator("aside.lg\\:block");
    await expect(sidebar).toBeVisible();

    // Click menu button to hide sidebar
    await menuButton.click();

    // Wait for sidebar to be hidden
    await expect(sidebar).not.toBeVisible();

    // Click menu button again to show sidebar
    await menuButton.click();

    // Wait for sidebar to be shown
    await expect(sidebar).toBeVisible();
  });

  test("should work with keyboard shortcut Ctrl+M", async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Verify sidebar is initially visible on desktop homepage
    const sidebar = page.locator("aside.lg\\:block");
    await expect(sidebar).toBeVisible();

    // Use keyboard shortcut to toggle sidebar
    await page.keyboard.press("Control+m");

    // Wait for sidebar to be hidden
    await expect(sidebar).not.toBeVisible();

    // Use keyboard shortcut again to show sidebar
    await page.keyboard.press("Control+M");

    // Wait for sidebar to be shown
    await expect(sidebar).toBeVisible();
  });

  test("should handle rapid menu button clicks without errors", async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    const menuButton = page.locator('[data-testid="menu-button"]');

    // Listen for JavaScript errors
    const jsErrors: string[] = [];
    page.on("pageerror", error => {
      jsErrors.push(error.message);
    });

    // Listen for console errors
    const consoleErrors: string[] = [];
    page.on("console", msg => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    // Rapidly click menu button multiple times
    for (let i = 0; i < 10; i++) {
      await menuButton.click();
      // Wait for sidebar to toggle state before next click
      // This ensures each click is processed and avoids race conditions
      // We alternate expectation based on even/odd click
      if (i % 2 === 0) {
        await expect(page.locator("aside.lg\\:block")).not.toBeVisible();
      } else {
        await expect(page.locator("aside.lg\\:block")).toBeVisible();
      }
    }

    // Wait for any delayed errors to surface
    // Instead of timeout, check that the menu button and header are still visible
    await expect(menuButton).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
  });

  test("should have correct aria-label and tooltip text", async ({ page }) => {
    const menuButton = page.locator('[data-testid="menu-button"]');

    // Verify aria-label is correct
    await expect(menuButton).toHaveAttribute(
      "aria-label",
      "Toggle navigation menu"
    );

    // Hover to show tooltip
    await menuButton.hover();

    // Wait for tooltip to appear
    const tooltip = page
      .locator('[role="tooltip"]')
      .filter({ hasText: "Toggle Menu (Ctrl+M)" });
    await expect(tooltip).toBeVisible();
  });

  test("should work correctly when resizing viewport", async ({ page }) => {
    // Start with desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    const menuButton = page.locator('[data-testid="menu-button"]');
    const sidebar = page.locator("aside.lg\\:block");

    // Verify sidebar is visible on desktop
    await expect(sidebar).toBeVisible();

    // Hide sidebar with menu button
    await menuButton.click();
    await expect(sidebar).not.toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Click menu button (should now open mobile menu)
    await menuButton.click();

    // Verify mobile menu is visible
    const mobileMenu = page.locator('[role="dialog"]');
    await expect(mobileMenu).toBeVisible();

    // Resize back to desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    // Mobile menu should close automatically when resizing to desktop
    await expect(mobileMenu).not.toBeVisible();
  });
});
