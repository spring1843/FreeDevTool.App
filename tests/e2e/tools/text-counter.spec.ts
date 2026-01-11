import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_TEXT_COUNTER } from "../../../client/src/data/defaults";
import { checkInputForDefault } from "./check-default-editor-value";

test.describe("Word Counter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/text-counter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkInputForDefault(page, "input", DEFAULT_TEXT_COUNTER);

    await expectNoErrors(page);
  });
});
