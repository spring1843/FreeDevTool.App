import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("Base64 Encoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/base64");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("should show error when Decode is clicked with empty encoded field", async ({
    page,
  }) => {
    // Disable auto-process so encoding doesn't fire automatically
    await page.getByTestId("auto-process-switch").click();

    // Clear empties both fields; then only type in plain text to leave encoded empty
    await page.getByTestId("clear-button").click();

    // Type into the plain text CodeMirror editor so encodedText stays empty
    await page.locator("#input").locator(".cm-content").click();
    await page.keyboard.type("hello");

    // Click Decode with empty encoded field
    await page.getByRole("button", { name: "Decode" }).click();

    // Error banner should appear
    await expect(page.getByRole("alert")).toBeVisible();
    // Plain text should still contain the text we typed
    const plainText = await page
      .locator("#input")
      .locator(".cm-content")
      .textContent();
    expect(plainText?.trim()).not.toBe("");
  });

  test("should show error when Encode is clicked with empty plain text field", async ({
    page,
  }) => {
    // Clear empties both fields
    await page.getByTestId("clear-button").click();

    // Click Encode with empty plain text
    await page.getByRole("button", { name: "Encode" }).click();

    await expect(page.getByRole("alert")).toBeVisible();
  });
});
