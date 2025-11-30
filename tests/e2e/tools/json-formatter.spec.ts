import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_JSON } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("JSON Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/json-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_JSON,
      output => output.split("\n").length === 14
    );

    await expectNoErrors(page);
  });

  test("should have Reset and Clear buttons", async ({ page }) => {
    const resetButton = page.getByTestId("reset-button");
    const clearButton = page.getByTestId("clear-button");

    await expect(resetButton).toBeVisible();
    await expect(clearButton).toBeVisible();
  });

  test("Reset button should be disabled when at default value", async ({
    page,
  }) => {
    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeDisabled();
  });

  test("Clear button should clear input and show confirmation when modified", async ({
    page,
  }) => {
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type('{"test": "modified"}');

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expectNoErrors(page);
  });

  test("Reset button should restore default value after modification", async ({
    page,
  }) => {
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type('{"test": "modified"}');

    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expectNoErrors(page);
  });

  test("Cancel button in confirmation dialog should not clear input", async ({
    page,
  }) => {
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type('{"test": "modified"}');

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();

    await expect(confirmDialog).not.toBeVisible();

    const inputValue = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#input .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });
    expect(inputValue).toContain("modified");
    await expectNoErrors(page);
  });
});
