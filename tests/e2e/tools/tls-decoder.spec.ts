import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_TLS_DECODER } from "../../../client/src/data/defaults";
import { checkInputForDefault } from "./check-default-editor-value";

test.describe("TLS Certificate Decoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/tls-decoder");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkInputForDefault(page, "input", DEFAULT_TLS_DECODER);

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

  test("Clear button should clear certificate input with confirmation", async ({
    page,
  }) => {
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type(
      "-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----"
    );

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expectNoErrors(page);
  });

  test("Reset button should restore default certificate after modification", async ({
    page,
  }) => {
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type(
      "-----BEGIN CERTIFICATE-----\nmodified\n-----END CERTIFICATE-----"
    );

    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();

    await checkInputForDefault(page, "input", DEFAULT_TLS_DECODER);
    await expectNoErrors(page);
  });

  test("Cancel button should preserve modified certificate", async ({
    page,
  }) => {
    const inputEditor = page.locator("#input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type("modified certificate content");

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
