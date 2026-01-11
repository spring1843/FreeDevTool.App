import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_HTML } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("HTML Beautifier Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/html-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_HTML,
      output => output.split("\n").length === 72
    );

    await expectNoErrors(page);
  });
});
