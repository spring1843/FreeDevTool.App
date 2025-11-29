import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("JWT Decoder Reset Bug", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/jwt-decoder");
  });

  test("should not show error when clicking reset button", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();

    // Type invalid token to modify the input
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type("invalid.token.here");

    // Wait for state to settle
    await page.waitForTimeout(500);

    // Click reset button
    const resetButton = page.getByRole("button", { name: /reset/i });
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    // Click confirm in the dialog
    const confirmButton = page.getByRole("button", { name: /confirm/i });
    await confirmButton.click();

    // Wait for reset to complete
    await page.waitForTimeout(500);

    // Check for error alert - should NOT be visible after reset
    const errorAlert = page.locator(".border-red-200");
    await expect(errorAlert).not.toBeVisible();
    await expectNoErrors(page);
  });
});
