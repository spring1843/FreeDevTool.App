import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import {
  DEFAULT_TEXT_DIFF_1,
  DEFAULT_TEXT_DIFF_2,
} from "../../../client/src/data/defaults";
import { checkInputForDefault } from "./check-default-editor-value";

test.describe("Text Diff Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/text-diff");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkInputForDefault(page, "input1", DEFAULT_TEXT_DIFF_1);

    await checkInputForDefault(page, "input2", DEFAULT_TEXT_DIFF_2);

    await expectNoErrors(page);
  });
});
