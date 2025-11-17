import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Date Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/date-converter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should accept and convert negative Unix timestamp", async ({
    page,
  }) => {
    // Enter the negative timestamp
    const input = page.getByTestId("date-input");
    await input.fill("-1000000000");

    // Wait for auto-conversion to complete (auto-update is enabled by default)
    await page.waitForTimeout(1500);

    // Verify no error is shown - the main indicator that negative timestamps are accepted
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Verify that "Converted Formats" heading is visible (indicates successful conversion)
    await expect(page.getByText("Converted Formats")).toBeVisible();

    // Verify that the year 1938 appears somewhere in the output (for -1000000000 timestamp)
    await expect(page.locator("text=/1938/").first()).toBeVisible();
  });
});
