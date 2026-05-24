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

    // The rendered input summary should be visible and not overflow horizontally.
    // Prefer a content-based locator here to avoid coupling the test to Tailwind classes.
    const inputSummary = page.getByText(largeNumber, { exact: false }).first();
    await expect(inputSummary).toBeVisible();

    // Assert overflow on the summary element itself with a small tolerance for
    // browser rounding/sub-pixel layout differences.
    const hasHorizontalOverflow = await inputSummary.evaluate(
      element => element.scrollWidth - element.clientWidth > 1
    );
    expect(hasHorizontalOverflow).toBe(false);

    await expectNoErrors(page);
  });
});
