import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Date/Time Difference Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/datetime-diff");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should have Reset and Clear buttons", async ({ page }) => {
    const resetButton = page.getByTestId("reset-button");
    const clearButton = page.getByTestId("clear-button");

    await expect(resetButton).toBeVisible();
    await expect(clearButton).toBeVisible();
  });

  test("Clear button should be disabled when inputs are empty", async ({
    page,
  }) => {
    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    if (await confirmDialog.isVisible()) {
      const confirmButton = page.getByRole("button", { name: "Confirm" });
      await confirmButton.click();
    }

    await expect(clearButton).toBeDisabled();
    await expectNoErrors(page);
  });

  test("Clear button should clear date inputs with confirmation", async ({
    page,
  }) => {
    const startDateInput = page.locator('[data-default-input="true"]');
    await startDateInput.fill("2024-01-15");

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(startDateInput).toHaveValue("");
    await expectNoErrors(page);
  });

  test("Cancel button should preserve date inputs", async ({ page }) => {
    const startDateInput = page.locator('[data-default-input="true"]');
    await startDateInput.fill("2024-06-20");

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(startDateInput).toHaveValue("2024-06-20");
    await expectNoErrors(page);
  });
});
