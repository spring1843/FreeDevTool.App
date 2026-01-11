import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { checkEditorsForDefault } from "./check-default-editor-value";
import { DEFAULT_JSONC } from "../../../client/src/data/defaults";

test.describe("JSONC Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/jsonc-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_JSONC.substring(0, 30),
      output => output.split("\n").length === 48
    );

    await expectNoErrors(page);
  });
});
