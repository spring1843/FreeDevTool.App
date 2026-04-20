import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("CBOR Encoder Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/cbor-encoder");
  });

  test("should load without errors and show default JSON", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();
    await checkEditorsForDefault(
      page,
      "json-input",
      "cbor-output",
      "CBOR example",
      output => output.trim().length > 0
    );
    await expectNoErrors(page);
  });

  test("should show non-empty hex output by default", async ({ page }) => {
    await expect(page.locator("#cbor-output")).toBeVisible();
    const outputValue = await page.evaluate(() => {
      const lines = Array.from(
        document.querySelectorAll("#cbor-output .cm-content .cm-line")
      );
      return lines.map(l => l.textContent ?? "").join(" ");
    });
    expect(outputValue.trim()).not.toBe("");
    expect(outputValue).toMatch(/[0-9a-f]{2}/);
  });

  test("should switch between hex and base64 tabs with different output", async ({
    page,
  }) => {
    await expect(page.locator("#cbor-output")).toBeVisible();
    const getOutput = () =>
      page.evaluate(() => {
        const lines = Array.from(
          document.querySelectorAll("#cbor-output .cm-content .cm-line")
        );
        return lines.map(l => l.textContent ?? "").join(" ");
      });

    const hexOutput = await getOutput();

    await page.getByRole("button", { name: "Base64" }).click();
    const base64Output = await getOutput();

    expect(hexOutput.trim()).not.toBe("");
    expect(base64Output.trim()).not.toBe("");
    expect(hexOutput).not.toBe(base64Output);
  });

  test("should show error for invalid JSON input", async ({ page }) => {
    const inputEditor = page.locator("#json-input .cm-content");
    await inputEditor.click();
    await page.keyboard.press("Control+a");
    await page.keyboard.type("{not valid json}");

    await page.getByRole("button", { name: "Encode" }).click();
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expectNoErrors(page);
  });
});
