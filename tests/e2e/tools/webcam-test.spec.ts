import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoCriticalJSErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Camera Test Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/webcam-test");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoCriticalJSErrors(page);
    await expectDefaultValue(page);
  });
});
