import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";
import { DEFAULT_REGEX_TEXT } from "../../../client/src/data/defaults";
import { checkInputForDefault } from "./check-default-editor-value";

test.describe("Regex Tester Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/regex-tester");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkInputForDefault(page, "input", DEFAULT_REGEX_TEXT);

    await expectNoErrors(page);
    await expectDefaultValue(page);
  });
});
