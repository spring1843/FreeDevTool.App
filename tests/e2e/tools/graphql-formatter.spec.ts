import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_GRAPHQL } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("GraphQL Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/graphql-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_GRAPHQL,
      output => output.split("\n").length === 35
    );

    await expectNoErrors(page);
  });
});
