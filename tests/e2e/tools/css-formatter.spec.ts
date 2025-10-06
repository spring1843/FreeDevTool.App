import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { checkEditorsForDefault } from "./check-default-editor-value";
import { DEFAULT_CSS } from "../../../client/src/data/defaults";

test.describe("CSS/LESS/SCSS Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/css-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_CSS.substring(0, 20),
      output => output.split("\n").length === 64
    );

    await expectNoErrors(page);
  });
});
