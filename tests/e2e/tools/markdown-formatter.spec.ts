import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_MARKDOWN } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("Markdown Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/markdown-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_MARKDOWN.substring(0, 30),
      output => output.split("\n").length === 59
    );

    await expectNoErrors(page);
  });
});
