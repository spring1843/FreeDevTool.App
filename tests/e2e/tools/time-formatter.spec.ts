import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Time Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/time-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should show an error when the year has more than 4 digits", async ({
    page,
  }) => {
    const dateInput = page.getByTestId("input-date");

    // Bypass the browser's native date-input UI controls by setting the value
    // and firing synthetic change events that React's synthetic event system picks up.
    await dateInput.evaluate(el => {
      const input = el as HTMLInputElement;
      const nativeValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeValueSetter) {
        nativeValueSetter.call(input, "12345-01-01");
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Error banner should appear
    const yearError = page.getByTestId("year-error");
    await expect(yearError).toBeVisible();
    await expect(yearError).toContainText("4 digits");

    // No formatted results should be shown
    await expect(page.locator('[data-testid="format-0"]')).not.toBeVisible();

    await expectNoErrors(page);
  });
});
