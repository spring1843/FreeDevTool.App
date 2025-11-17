import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_URL_ENCODER } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("URL Encoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/url-encoder");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_URL_ENCODER,
      output => output.split("\n").length === 1
    );

    await expectNoErrors(page);
  });

  test("should encode URL correctly", async ({ page }) => {
    // Clear and enter plain text using CodeMirror
    const inputEditor = page.locator("#input");
    await inputEditor.click();

    // Clear existing content and type new content
    await page.keyboard.press("Meta+a");
    await page.keyboard.type("hello world & test!");

    // Click encode button
    const encodeButton = page.getByRole("button", { name: /encode url/i });
    await encodeButton.click();

    // Verify encoded output using CodeMirror content
    const encodedOutput = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#output .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });

    expect(encodedOutput).toBe("hello%20world%20%26%20test!");

    await expectNoErrors(page);
  });

  test("should decode URL correctly", async ({ page }) => {
    // Enter encoded text using CodeMirror
    const outputEditor = page.locator("#output");
    await outputEditor.click();

    // Clear and type encoded text
    await page.keyboard.press("Meta+a");
    await page.keyboard.type("hello%20world%20%26%20test!");

    // Click decode button
    const decodeButton = page.getByRole("button", { name: /decode url/i });
    await decodeButton.click();

    // Verify decoded output appears in input field
    const plainTextOutput = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#input .cm-content .cm-line")
      );
      return lines.map(line => line.textContent || "").join("\n");
    });

    expect(plainTextOutput).toBe("hello world & test!");

    await expectNoErrors(page);
  });

  test("should handle complex URL encoding/decoding", async ({ page }) => {
    // Reload page to start fresh
    await page.reload();
    await page.waitForLoadState("networkidle");

    const testCases = [
      {
        plain: "https://example.com?query=value&name=John Doe",
        encoded:
          "https%3A%2F%2Fexample.com%3Fquery%3Dvalue%26name%3DJohn%20Doe",
      },
      {
        plain: "test@email.com",
        encoded: "test%40email.com",
      },
      {
        plain: "special chars: #$%^&*()",
        encoded: "special%20chars%3A%20%23%24%25%5E%26*()",
      },
    ];

    for (const testCase of testCases) {
      // Clear both fields before each test case
      const inputEditor = page.locator("#input");
      await inputEditor.click();
      await page.keyboard.press("Meta+a");
      await page.keyboard.press("Backspace");

      const outputEditor = page.locator("#output");
      await outputEditor.click();
      await page.keyboard.press("Meta+a");
      await page.keyboard.press("Backspace");

      // Test encoding
      await inputEditor.click();
      await page.keyboard.type(testCase.plain);

      const encodeButton = page.getByRole("button", { name: /encode url/i });
      await encodeButton.click();

      // Wait for encoding to complete
      await page.waitForTimeout(200);

      const encodedOutput = await page.evaluate(() => {
        const lines = Array.from(
          document.querySelectorAll("#output .cm-content .cm-line")
        );
        return lines.map(line => line.textContent || "").join("\n");
      });

      expect(encodedOutput).toBe(testCase.encoded);

      // Clear fields again for decoding test
      await inputEditor.click();
      await page.keyboard.press("Meta+a");
      await page.keyboard.press("Backspace");

      await outputEditor.click();
      await page.keyboard.press("Meta+a");
      await page.keyboard.press("Backspace");

      // Test decoding
      await outputEditor.click();
      await page.keyboard.type(testCase.encoded);

      const decodeButton = page.getByRole("button", { name: /decode url/i });
      await decodeButton.click();

      // Wait for decoding to complete
      await page.waitForTimeout(200);

      const plainTextOutput = await page.evaluate(() => {
        const lines = Array.from(
          document.querySelectorAll("#input .cm-content .cm-line")
        );
        return lines.map(line => line.textContent || "").join("\n");
      });

      expect(plainTextOutput).toBe(testCase.plain);
    }

    await expectNoErrors(page);
  });
});
