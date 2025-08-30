import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoCriticalJSErrors,
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
    await expectNoCriticalJSErrors(page);
    await expectDefaultValue(page);
  });
});
