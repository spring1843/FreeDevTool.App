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

    // Wait for auto-conversion to complete (auto-update is enabled by default)
    await page.waitForTimeout(1000);

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Verify the ISO format shows 1938-04-24 (the correct date for -1000000000)
    await expect(page.getByText("1938-04-24T22:13:20.000Z")).toBeVisible();
  });

  test("should convert negative Unix timestamp -1 correctly", async ({
    page,
  }) => {
    // Enter -1 (one second before epoch)
    const input = page.getByTestId("date-input");
    await input.clear();
    await input.fill("-0000000001");

    // Wait for auto-conversion to complete
    await page.waitForTimeout(1000);

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Check that the correct date appears (1969-12-31T23:59:59.000Z)
    await expect(page.getByText("1969-12-31T23:59:59.000Z")).toBeVisible();
  });

  test("should convert positive Unix timestamp correctly (baseline)", async ({
    page,
  }) => {
    // Test with a positive timestamp to ensure we didn't break existing functionality
    const input = page.getByTestId("date-input");
    await input.clear();
    await input.fill("1699123456");

    // Wait for auto-conversion to complete
    await page.waitForTimeout(1000);

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    // Check that the correct date appears (2023-11-04T18:44:16.000Z)
    await expect(page.getByText("2023-11-04T18:44:16.000Z")).toBeVisible();
  });
});
