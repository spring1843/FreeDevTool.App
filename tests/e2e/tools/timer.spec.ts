import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("Timer Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/timer");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("Stop All should pause timers without resetting time", async ({
    page,
  }) => {
    // Navigate to page with a 10-second timer via URL params
    await page.goto("/tools/timer?m=0&s=10");

    // Wait for timer to load
    await expect(page.locator("main")).toBeVisible();

    // Get the time display element
    const timeDisplay = page.locator(".font-mono.text-6xl").first();
    await expect(timeDisplay).toBeVisible();

    // Verify initial time is 00:10
    await expect(timeDisplay).toHaveText("00:10");

    // Start the timer
    const startButton = page.locator('[data-testid^="toggle-timer-"]').first();
    await startButton.click();

    // Wait 2 seconds for timer to count down
    await page.waitForTimeout(2000);

    // Click Stop All
    await page.getByTestId("stop-all-timers").click();

    // Get the displayed time - should be around 8 seconds (not reset to 10)
    const timeText = await timeDisplay.textContent();

    // The time should NOT be the original duration (00:10)
    // It should be somewhere around 00:06-00:09 (accounting for timing variance)
    expect(timeText).not.toBe("00:10");
    expect(timeText).toMatch(/00:0[5-9]/);
  });
});
