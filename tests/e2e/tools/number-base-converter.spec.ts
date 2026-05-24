import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Number Base Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/number-base-converter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should not overflow when a very large number is entered", async ({
    page,
  }) => {
    const largeNumber =
      "4223232323232323232323232323232323232323232323232323232323232";

    const numberInput = page.getByTestId("number-input");
    await numberInput.fill(largeNumber);

    // The input summary should be visible and not cause horizontal overflow
    const inputSummary = page.locator(".bg-blue-50, .bg-blue-900\\/20").first();
    await expect(inputSummary).toBeVisible();

    // The page should not have horizontal scrollbar (scrollWidth <= clientWidth)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth >
        document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    await expectNoErrors(page);
  });
});
