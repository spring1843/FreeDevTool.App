import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { checkEditorsForDefault } from "./check-default-editor-value";
import { DEFAULT_TYPESCRIPT } from "../../../client/src/data/defaults";

test.describe("JavaScript/TypeScript Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/typescript-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_TYPESCRIPT.substring(0, 30),
      output => output.split("\n").length === 80
    );

    await expectNoErrors(page);
  });
});
