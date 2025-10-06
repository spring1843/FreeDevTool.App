import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_JWT } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("JWT Decoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/jwt-decoder");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output1",
      DEFAULT_JWT,
      output => output.split("\n").length === 4
    );

    await checkEditorsForDefault(
      page,
      "input",
      "output2",
      DEFAULT_JWT,
      output => output.split("\n").length === 5
    );

    await checkEditorsForDefault(
      page,
      "input",
      "output3",
      DEFAULT_JWT,
      output => output.split("\n").length === 1
    );

    await expectNoErrors(page);
  });
});
