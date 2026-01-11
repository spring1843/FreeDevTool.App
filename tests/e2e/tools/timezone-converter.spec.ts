import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Timezone Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/timezone-converter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should filter and select timezone from dropdown", async ({ page }) => {
    await page.getByRole("combobox").first().click();
    await page.getByPlaceholder("Search timezones...").fill("Tokyo");
    await expect(page.getByText("Tokyo, Japan")).toBeVisible();
    await page.getByText("Tokyo, Japan").click();
    await expect(page.getByRole("combobox").first()).toContainText("Tokyo");
  });
});
