import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("CBOR Encoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/cbor-encoder");
  });

  test("should load without errors and show default JSON", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should encode JSON to non-empty hex output", async ({ page }) => {
    const output = page.getByTestId("cbor-output");
    await expect(output).not.toHaveValue("");
  });

  test("should produce different output for hex and base64 tabs", async ({
    page,
  }) => {
    const hexOutput = await page
      .getByTestId("cbor-output")
      .inputValue()
      .catch(() =>
        page
          .getByTestId("cbor-output")
          .evaluate(el => (el as HTMLTextAreaElement).value)
      );

    await page.getByRole("button", { name: "Base64" }).click();

    const base64Output = await page
      .getByTestId("cbor-output")
      .inputValue()
      .catch(() =>
        page
          .getByTestId("cbor-output")
          .evaluate(el => (el as HTMLTextAreaElement).value)
      );

    expect(hexOutput).not.toBe("");
    expect(base64Output).not.toBe("");
    expect(hexOutput).not.toBe(base64Output);
  });

  test("should round-trip encode then decode back to original JSON", async ({
    page,
  }) => {
    const jsonInput = page.getByTestId("cbor-json-input");
    const originalJson = await jsonInput
      .inputValue()
      .catch(() => jsonInput.evaluate(el => (el as HTMLTextAreaElement).value));

    // Encode, then decode back
    await page.getByRole("button", { name: "Encode" }).click();
    await page.getByRole("button", { name: "Decode" }).click();

    const afterRoundTrip = await jsonInput
      .inputValue()
      .catch(() => jsonInput.evaluate(el => (el as HTMLTextAreaElement).value));

    // Values should represent the same JSON structure
    expect(JSON.parse(afterRoundTrip)).toEqual(JSON.parse(originalJson));
  });

  test("should show error for invalid JSON input", async ({ page }) => {
    const jsonInput = page.getByTestId("cbor-json-input");
    await jsonInput.fill("{not valid json}");
    await page.getByRole("button", { name: "Encode" }).click();
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });
});
