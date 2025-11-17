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
    // Clear and enter plain text
    const plainTextInput = page.locator('[data-testid="plain-text-input"]');
    await plainTextInput.click();
    await plainTextInput.fill("hello world & test!");

    // Click encode button
    const encodeButton = page.getByRole("button", { name: /encode url/i });
    await encodeButton.click();

    // Verify encoded output
    const encodedOutput = page.locator('[data-testid="encoded-text-output"]');
    await expect(encodedOutput).toHaveValue("hello%20world%20%26%20test!");

    await expectNoErrors(page);
  });

  test("should decode URL correctly", async ({ page }) => {
    // Enter encoded text
    const encodedInput = page.locator('[data-testid="encoded-text-output"]');
    await encodedInput.click();
    await encodedInput.fill("hello%20world%20%26%20test!");

    // Click decode button
    const decodeButton = page.getByRole("button", { name: /decode url/i });
    await decodeButton.click();

    // Verify decoded output appears in plain text field
    const plainTextOutput = page.locator('[data-testid="plain-text-input"]');
    await expect(plainTextOutput).toHaveValue("hello world & test!");

    await expectNoErrors(page);
  });

  test("should handle complex URL encoding/decoding", async ({ page }) => {
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
      // Test encoding
      const plainTextInput = page.locator('[data-testid="plain-text-input"]');
      await plainTextInput.click();
      await plainTextInput.fill(testCase.plain);

      const encodeButton = page.getByRole("button", { name: /encode url/i });
      await encodeButton.click();

      const encodedOutput = page.locator('[data-testid="encoded-text-output"]');
      await expect(encodedOutput).toHaveValue(testCase.encoded);

      // Test decoding
      await encodedOutput.click();
      await encodedOutput.fill(testCase.encoded);

      const decodeButton = page.getByRole("button", { name: /decode url/i });
      await decodeButton.click();

      await expect(plainTextInput).toHaveValue(testCase.plain);
    }

    await expectNoErrors(page);
  });

  test("should reset to default values", async ({ page }) => {
    // Change values
    const plainTextInput = page.locator('[data-testid="plain-text-input"]');
    await plainTextInput.click();
    await plainTextInput.fill("test data");

    const encodeButton = page.getByRole("button", { name: /encode url/i });
    await encodeButton.click();

    // Click reset
    const resetButton = page.getByRole("button", { name: /reset/i });
    await resetButton.click();

    // Verify reset to defaults
    await expect(plainTextInput).toHaveValue(DEFAULT_URL_ENCODER);

    const encodedOutput = page.locator('[data-testid="encoded-text-output"]');
    await expect(encodedOutput).toHaveValue("");

    await expectNoErrors(page);
  });
});
