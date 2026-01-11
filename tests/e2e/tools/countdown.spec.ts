import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Countdown Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/countdown");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should start in stopped state and not auto-run", async ({ page }) => {
    await expect(page.locator("main")).toBeVisible();

    // Verify the Start button is visible (not Pause), indicating stopped state
    await expect(page.getByTestId("button-start")).toBeVisible();
    await expect(page.getByTestId("button-pause")).not.toBeVisible();

    // Verify the status shows "Stopped"
    await expect(page.getByText("Stopped")).toBeVisible();
  });

  test("should not flicker when clicking preset buttons", async ({ page }) => {
    // Wait for the page to be fully loaded
    await expect(page.locator("main")).toBeVisible();

    // Find the days display element
    const daysDisplay = page
      .locator("text=Days")
      .locator("..")
      .locator("div")
      .first();
    await expect(daysDisplay).toBeVisible();

    // Click the "1 Hour" preset button
    await page.getByRole("button", { name: "1 Hour" }).click();

    // Collect the days value multiple times over 500ms to detect flickering
    const values: string[] = [];
    for (let i = 0; i < 5; i++) {
      const text = await daysDisplay.textContent();
      values.push(text || "");
      await page.waitForTimeout(100);
    }

    // All values should be "0" for 1 hour preset (no flickering between different values)
    const uniqueValues = [...new Set(values)];
    expect(uniqueValues.length).toBe(1);
    expect(uniqueValues[0]).toBe("0");

    // Click another preset and verify stability
    await page.getByRole("button", { name: "1 Week" }).click();

    const valuesAfterSwitch: string[] = [];
    for (let i = 0; i < 5; i++) {
      const text = await daysDisplay.textContent();
      valuesAfterSwitch.push(text || "");
      await page.waitForTimeout(100);
    }

    // Values should be consistent (either 6 or 7 days depending on timing)
    const uniqueValuesAfterSwitch = [...new Set(valuesAfterSwitch)];
    expect(uniqueValuesAfterSwitch.length).toBeLessThanOrEqual(2); // Allow for 1 decrement during test
  });

  test("should show visual feedback for selected preset", async ({ page }) => {
    // Wait for the page to be fully loaded
    await expect(page.locator("main")).toBeVisible();

    // New Year should be selected by default (variant="default" has different styling)
    const newYearButton = page.getByRole("button", { name: "New Year" });
    const oneHourButton = page.getByRole("button", { name: "1 Hour" });

    // New Year button should have default variant (solid background)
    await expect(newYearButton).not.toHaveClass(/border/);

    // Click 1 Hour preset
    await oneHourButton.click();

    // Now 1 Hour should be selected and New Year should be outline
    await expect(oneHourButton).not.toHaveClass(/border/);
  });
});
