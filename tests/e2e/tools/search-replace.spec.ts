import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_SEARCH_REPLACE_TEXT } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("Search & Replace Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/search-replace");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_SEARCH_REPLACE_TEXT,
      output => output.split("\n").length === 3
    );

    await expectNoErrors(page);
  });

  test("should treat special characters as literal when regex mode is off", async ({
    page,
  }) => {
    // Test that special regex characters are treated as literals
    const inputEditor = page.locator("#input .cm-content");
    const searchInput = page.locator("#search-text");
    const replaceInput = page.locator("#replace-text");

    // Clear default values and set test data for input (CodeMirror editor)
    await inputEditor.click();
    const selectAllKey = process.platform === "darwin" ? "Meta+a" : "Control+a";
    await page.keyboard.press(selectAllKey);
    await page.keyboard.type("Price: $100.00");

    // Set search and replace values (regular inputs)
    await searchInput.fill("$100.00");
    await replaceInput.fill("$200.00");

    // Verify regex mode is off (default)
    const regexSwitch = page.locator("#regex-mode");
    await expect(regexSwitch).not.toBeChecked();

    // Wait for the result and verify special characters are treated as literals
    const outputEditorValue = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#output .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });

    expect(outputEditorValue).toBe("Price: $200.00");

    await expectNoErrors(page);
  });

  test("should handle $ in replacement text literally when regex mode is off", async ({
    page,
  }) => {
    // Test that $& and other special replacement patterns are treated as literals
    const inputEditor = page.locator("#input .cm-content");
    const searchInput = page.locator("#search-text");
    const replaceInput = page.locator("#replace-text");

    // Clear default values and set test data for input (CodeMirror editor)
    await inputEditor.click();
    const selectAllKey = process.platform === "darwin" ? "Meta+a" : "Control+a";
    await page.keyboard.press(selectAllKey);
    await page.keyboard.type("Hello World");

    // Set search and replace values (regular inputs)
    await searchInput.fill("World");
    await replaceInput.fill("$& Universe");

    // Verify regex mode is off (default)
    const regexSwitch = page.locator("#regex-mode");
    await expect(regexSwitch).not.toBeChecked();

    // $& should be treated as literal text, not as "matched text" replacement pattern
    const outputEditorValue = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#output .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });

    expect(outputEditorValue).toBe("Hello $& Universe");

    await expectNoErrors(page);
  });
});
