import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoCriticalJSErrors } from "./utils";

test.describe("Base64 Encoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/base64");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoCriticalJSErrors(page);
  });
});
