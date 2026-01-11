import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Unit Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/unit-converter");
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

  test("Reset button should be disabled when at default value", async ({
    page,
  }) => {
    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeDisabled();
  });

  test("Clear button should clear input value with confirmation", async ({
    page,
  }) => {
    const valueInput = page.locator('[data-default-input="true"]');
    await valueInput.fill("999");

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(valueInput).toHaveValue("0");
    await expectNoErrors(page);
  });

  test("Reset button should restore default value after modification", async ({
    page,
  }) => {
    const valueInput = page.locator('[data-default-input="true"]');
    await valueInput.fill("500");

    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(valueInput).toHaveValue("100");
    await expectNoErrors(page);
  });

  test("Cancel button should preserve modified value", async ({ page }) => {
    const valueInput = page.locator('[data-default-input="true"]');
    await valueInput.fill("750");

    const resetButton = page.getByTestId("reset-button");
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(valueInput).toHaveValue("750");
    await expectNoErrors(page);
  });
});
