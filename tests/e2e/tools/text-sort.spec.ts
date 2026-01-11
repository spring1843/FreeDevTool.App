import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_TEXT_SORT } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("Text Sorter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/text-sort");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_TEXT_SORT,
      output => output.split("\n").length === 18
    );

    await expectNoErrors(page);
  });
});
