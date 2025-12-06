import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("Keyboard Test Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/keyboard-test");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("should auto-focus the keyboard input area on load", async ({
    page,
  }) => {
    const focusArea = page.getByTestId("keyboard-focus-area");
    await expect(focusArea).toBeVisible();
    await expect(focusArea).toBeFocused();
  });

  test("should auto-focus when starting testing after stopping", async ({
    page,
  }) => {
    const focusArea = page.getByTestId("keyboard-focus-area");

    // Stop testing
    await page.getByRole("button", { name: /stop testing/i }).click();
    await expect(focusArea).not.toBeFocused();

    // Start testing again
    await page.getByRole("button", { name: /start testing/i }).click();
    await expect(focusArea).toBeFocused();
  });
});
