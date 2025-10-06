import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_JSON } from "../../../client/src/data/defaults";

test.describe("JSON Formatter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/json-formatter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);

    // Find the input editor and verify default content is loaded
    const inputEditor = page.locator("#input");
    await expect(inputEditor).toBeVisible();

    const inputEditorValue = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#input .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });

    expect(inputEditorValue).toBe(DEFAULT_JSON);

    const outputEditorValue = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#output .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });

    // the output should have 14 lines
    expect(outputEditorValue.split("\n").length).toBe(14);
    await expectNoErrors(page);
  });
});
