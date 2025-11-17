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

  test("should convert negative Unix timestamp -1000000000 correctly", async ({
    page,
  }) => {
    // Enter the negative timestamp
    const input = page.getByTestId("date-input");
    await input.clear();
    await input.fill("-1000000000");

    // Click convert button
    await page.getByTestId("convert-button").click();

    // Wait for conversion to complete
    await page.waitForTimeout(500);

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Verify the ISO format shows 1938
    const isoFormatSection = page.locator("text=ISO 8601").first();
    await expect(isoFormatSection).toBeVisible();

    // Check that 1938 appears in the converted output
    await expect(page.locator("text=/1938/")).toBeVisible();

    // Verify the Unix timestamp conversion (should match the input)
    const unixTimestampValue = page
      .locator('[class*="font-mono"]')
      .filter({ hasText: "-1000000000" })
      .first();
    await expect(unixTimestampValue).toBeVisible();
  });

  test("should convert negative Unix timestamp -1 correctly", async ({
    page,
  }) => {
    // Enter -1 (one second before epoch)
    const input = page.getByTestId("date-input");
    await input.clear();
    await input.fill("-0000000001");

    // Click convert button
    await page.getByTestId("convert-button").click();

    // Wait for conversion to complete
    await page.waitForTimeout(500);

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Check that 1969 appears in the converted output (one second before 1970)
    await expect(page.locator("text=/1969/")).toBeVisible();
  });

  test("should convert positive Unix timestamp correctly (baseline)", async ({
    page,
  }) => {
    // Test with a positive timestamp to ensure we didn't break existing functionality
    const input = page.getByTestId("date-input");
    await input.clear();
    await input.fill("1699123456");

    // Click convert button
    await page.getByTestId("convert-button").click();

    // Wait for conversion to complete
    await page.waitForTimeout(500);

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Check that 2023 appears in the converted output
    await expect(page.locator("text=/2023/")).toBeVisible();
  });
});
