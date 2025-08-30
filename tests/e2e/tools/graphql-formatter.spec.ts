import { test } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("GraphQL Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/graphql-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expectNoErrors(page);
  });
});
