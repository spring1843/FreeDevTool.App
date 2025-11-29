import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_JWT } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("JWT Decoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/jwt-decoder");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output1",
      DEFAULT_JWT,
      output => output.split("\n").length === 4
    );

    await checkEditorsForDefault(
      page,
      "input",
      "output2",
      DEFAULT_JWT,
      output => output.split("\n").length === 5
    );

    await checkEditorsForDefault(
      page,
      "input",
      "output3",
      DEFAULT_JWT,
      output => output.split("\n").length === 1
    );

    await expectNoErrors(page);
  });

  test("should reset to default JWT after modification", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();

    // Type invalid token to modify the input
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type("invalid.token.here");

    // Wait for error to appear (confirms input was processed)
    const errorAlert = page.locator(".border-red-200");
    await expect(errorAlert).toBeVisible();

    // Click reset button
    const resetButton = page.getByRole("button", { name: /reset/i });
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    // Click confirm in the dialog
    const confirmButton = page.getByRole("button", { name: /confirm/i });
    await confirmButton.click();

    // Error should not be visible after reset
    await expect(errorAlert).not.toBeVisible();
    await expectNoErrors(page);
  });
});
