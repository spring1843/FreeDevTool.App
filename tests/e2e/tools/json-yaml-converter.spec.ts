import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { checkEditorsForDefault } from "./check-default-editor-value";
import { DEFAULT_JSON, DEFAULT_YAML } from "../../../client/src/data/defaults";

test.describe("JSON ↔ YAML Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/json-yaml-converter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input1",
      "output1",
      DEFAULT_JSON,
      output => output.split("\n").length === 11
    );

    await checkEditorsForDefault(
      page,
      "input2",
      "output2",
      DEFAULT_YAML,
      output => output.split("\n").length === 36
    );

    await expectNoErrors(page);
  });
});
