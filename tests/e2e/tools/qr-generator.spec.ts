import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";
import { DEFAULT_QR_GENERATOR } from "../../../client/src/data/defaults";

test.describe("QR Generator Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/qr-generator");
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

  test("Clear button should clear QR content with confirmation", async ({
    page,
  }) => {
    const contentInput = page.locator('[data-default-input="true"]');
    await contentInput.fill("https://modified-url.com");

    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(contentInput).toHaveValue("");
    await expectNoErrors(page);
  });

  test("Reset button should restore default content after modification", async ({
    page,
  }) => {
    const contentInput = page.locator('[data-default-input="true"]');
    await contentInput.fill("https://test-url.com");

    const resetButton = page.getByTestId("reset-button");
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(contentInput).toHaveValue(DEFAULT_QR_GENERATOR);
    await expectNoErrors(page);
  });

  test("Cancel button should preserve modified content", async ({ page }) => {
    const contentInput = page.locator('[data-default-input="true"]');
    const modifiedContent = "https://keep-this-url.com";
    await contentInput.fill(modifiedContent);

    const resetButton = page.getByTestId("reset-button");
    await resetButton.click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();

    const cancelButton = page.getByRole("button", { name: "Cancel" });
    await cancelButton.click();

    await expect(confirmDialog).not.toBeVisible();
    await expect(contentInput).toHaveValue(modifiedContent);
    await expectNoErrors(page);
  });
});
