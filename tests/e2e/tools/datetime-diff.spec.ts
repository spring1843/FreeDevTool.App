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

  test("Quick Presets section should be visible", async ({ page }) => {
    const presetsCard = page.locator("text=Quick Presets");
    await expect(presetsCard).toBeVisible();

    // Verify all three preset categories are visible (using heading role for specificity)
    await expect(
      page.getByRole("heading", { name: "Quick Future Intervals" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Historical Periods" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Far Future" })
    ).toBeVisible();
  });

  test("Quick Future Interval preset should populate fields and show results", async ({
    page,
  }) => {
    // Clear inputs first to test that preset actually populates them
    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();
    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    // Verify no results are shown when inputs are empty
    const noCalculationText = page.locator("text=No Calculation Yet");
    await expect(noCalculationText).toBeVisible();

    // Click the "1 hour" preset (index 1 in quick presets)
    const hourPreset = page.getByTestId("preset-quick-1");
    await expect(hourPreset).toBeVisible();
    await hourPreset.click();

    // Verify toast notification appears (aria-live region)
    const toast = page
      .locator('[role="status"]')
      .filter({ hasText: "Preset Applied" })
      .first();
    await expect(toast).toBeVisible();

    // Verify results are now displayed (No Calculation Yet should disappear)
    await expect(noCalculationText).not.toBeVisible();

    // Verify Total Hours copy button appears (meaning results are shown)
    const totalHoursRow = page.locator('[data-testid="copy-totalHours"]');
    await expect(totalHoursRow).toBeVisible();

    await expectNoErrors(page);
  });

  test("Historical preset should populate fields with past date", async ({
    page,
  }) => {
    // Click "From Unix epoch to now" preset (index 2 in historical presets)
    const unixEpochPreset = page.getByTestId("preset-historical-2");
    await expect(unixEpochPreset).toBeVisible();
    await unixEpochPreset.click();

    // Verify toast notification appears (aria-live region)
    const toast = page
      .locator('[role="status"]')
      .filter({ hasText: "Preset Applied" })
      .first();
    await expect(toast).toBeVisible();

    // Verify start date is set to Unix epoch
    const startDateInput = page.getByTestId("start-date-input");
    await expect(startDateInput).toHaveValue("1970-01-01");

    // Verify results are displayed
    const summaryCard = page.locator("text=Duration Summary");
    await expect(summaryCard).toBeVisible();

    await expectNoErrors(page);
  });

  test("Far Future preset should populate fields with future date", async ({
    page,
  }) => {
    // Click "To year 3000" preset (index 3 in future presets)
    const futurePreset = page.getByTestId("preset-future-3");
    await expect(futurePreset).toBeVisible();
    await futurePreset.click();

    // Verify toast notification appears (aria-live region)
    const toast = page
      .locator('[role="status"]')
      .filter({ hasText: "Preset Applied" })
      .first();
    await expect(toast).toBeVisible();

    // Verify end date is set to year 3000
    const endDateInput = page.getByTestId("end-date-input");
    await expect(endDateInput).toHaveValue("3000-01-01");

    // Verify results are displayed
    const summaryCard = page.locator("text=Duration Summary");
    await expect(summaryCard).toBeVisible();

    await expectNoErrors(page);
  });

  test("Multiple presets can be applied sequentially", async ({ page }) => {
    // First apply a quick preset
    const quickPreset = page.getByTestId("preset-quick-0");
    await quickPreset.click();

    // Wait for toast (aria-live region)
    const toast = page
      .locator('[role="status"]')
      .filter({ hasText: "Preset Applied" })
      .first();
    await expect(toast).toBeVisible();

    // Then apply a historical preset
    const historicalPreset = page.getByTestId("preset-historical-0");
    await historicalPreset.click();

    // Verify start date changed to year 1 AD
    const startDateInput = page.getByTestId("start-date-input");
    await expect(startDateInput).toHaveValue("0001-01-01");

    await expectNoErrors(page);
  });

  test("Now buttons should set current date/time", async ({ page }) => {
    // Clear the inputs first
    const clearButton = page.getByTestId("clear-button");
    await clearButton.click();
    const confirmButton = page.getByRole("button", { name: "Confirm" });
    await confirmButton.click();

    // Click the Now button for start date
    const nowButtons = page.getByTestId("now-button");
    await nowButtons.first().click();

    // Verify toast appears
    const toast = page.locator("text=Start time updated");
    await expect(toast).toBeVisible();

    // Verify start date is no longer empty
    const startDateInput = page.getByTestId("start-date-input");
    await expect(startDateInput).not.toHaveValue("");

    await expectNoErrors(page);
  });
});
