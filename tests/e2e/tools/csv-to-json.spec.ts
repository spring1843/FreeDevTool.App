import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { checkEditorsForDefault } from "./check-default-editor-value";
import { DEFAULT_CSV_TO_JSON } from "../../../client/src/data/defaults";

test.describe("CSV to JSON Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/csv-to-json");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_CSV_TO_JSON,
      output => output.split("\n").length === 20
    );

    await expectNoErrors(page);
  });
});
