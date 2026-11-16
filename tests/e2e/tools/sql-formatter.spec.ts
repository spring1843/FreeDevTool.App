import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_SQL } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("SQL Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/sql-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_SQL,
      output => output.startsWith("SELECT") && output.split("\n").length > 20
    );

    await expectNoErrors(page);
  });

  test("should re-format when keyword case changes", async ({ page }) => {
    const output = page.locator("#output .cm-content");
    await expect(output).toContainText("SELECT");

    await page.getByTestId("sql-keyword-case").click();
    await page.getByRole("option", { name: "lower", exact: true }).click();

    await expect(output).toContainText("select");
    await expect(output).not.toContainText("SELECT");
    await expectNoErrors(page);
  });
});
