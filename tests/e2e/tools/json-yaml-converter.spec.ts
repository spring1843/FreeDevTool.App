import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("JSON ↔ YAML Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/json-yaml-converter");
  });

  test("should load with default JSON converted to YAML", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();

    // Check JSON input has default value
    const jsonInput = page.locator('[data-testid="json-input"]');
    await expect(jsonInput).toBeVisible();

    // Check YAML output has converted content (not empty)
    const yamlOutput = page.locator('[data-testid="yaml-output"]');
    await expect(yamlOutput).toBeVisible();

    // Verify YAML contains converted content from default JSON
    // The default JSON has "name", "version", etc. which should appear in YAML
    const yamlContent = await yamlOutput.locator(".cm-content").textContent();
    expect(yamlContent).toContain("name");
    expect(yamlContent).toContain("version");

    await expectNoErrors(page);
  });

  test("should convert JSON to YAML when button is clicked", async ({
    page,
  }) => {
    // Clear both inputs first
    await page.click('[data-testid="button-clear"]');

    // Enter new JSON
    const jsonInput = page.locator('[data-testid="json-input"]');
    await jsonInput.click();
    await page.keyboard.type('{"test": "value"}');

    // YAML should still be empty (no auto-convert)
    const yamlOutput = page.locator('[data-testid="yaml-output"]');
    const yamlBeforeClick = await yamlOutput
      .locator(".cm-content")
      .textContent();
    expect(yamlBeforeClick?.trim()).toBe("");

    // Click JSON → YAML button
    await page.click('button:has-text("JSON → YAML")');

    // Now YAML should have converted content
    const yamlAfterClick = await yamlOutput
      .locator(".cm-content")
      .textContent();
    expect(yamlAfterClick).toContain("test");
    expect(yamlAfterClick).toContain("value");

    await expectNoErrors(page);
  });

  test("should convert YAML to JSON when button is clicked", async ({
    page,
  }) => {
    // Clear both inputs first
    await page.click('[data-testid="button-clear"]');

    // Enter YAML in the YAML input
    const yamlOutput = page.locator('[data-testid="yaml-output"]');
    await yamlOutput.click();
    await page.keyboard.type("foo: bar");

    // JSON should still be empty (no auto-convert)
    const jsonInput = page.locator('[data-testid="json-input"]');
    const jsonBeforeClick = await jsonInput
      .locator(".cm-content")
      .textContent();
    expect(jsonBeforeClick?.trim()).toBe("");

    // Click YAML → JSON button
    await page.click('button:has-text("YAML → JSON")');

    // Now JSON should have converted content
    const jsonAfterClick = await jsonInput.locator(".cm-content").textContent();
    expect(jsonAfterClick).toContain("foo");
    expect(jsonAfterClick).toContain("bar");

    await expectNoErrors(page);
  });

  test("should reset to default values", async ({ page }) => {
    // Clear first
    await page.click('[data-testid="button-clear"]');

    // Both should be empty
    const jsonInput = page.locator('[data-testid="json-input"]');
    const _yamlOutput = page.locator('[data-testid="yaml-output"]');

    const jsonEmpty = await jsonInput.locator(".cm-content").textContent();
    expect(jsonEmpty?.trim()).toBe("");

    // Click Reset
    await page.click('[data-testid="button-reset"]');

    // JSON should have default value again
    const jsonAfterReset = await jsonInput.locator(".cm-content").textContent();
    expect(jsonAfterReset).toContain("name");

    await expectNoErrors(page);
  });

  test("should not have a Swap button", async ({ page }) => {
    // Verify there's no Swap button
    const swapButton = page.locator('button:has-text("Swap")');
    await expect(swapButton).toHaveCount(0);

    await expectNoErrors(page);
  });
});
