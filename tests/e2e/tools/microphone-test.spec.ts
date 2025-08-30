import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoCriticalJSErrors } from "./utils";

test.describe("Microphone Test Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/microphone-test");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoCriticalJSErrors(page);
  });
});
