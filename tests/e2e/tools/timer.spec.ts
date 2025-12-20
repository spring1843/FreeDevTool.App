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

  test("Pause All should pause timers without resetting time", async ({
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

    // Click Pause All
    await page.getByTestId("pause-all-timers").click();

    // Get the displayed time - should be around 8 seconds (not reset to 10)
    const timeText = await timeDisplay.textContent();

    // The time should NOT be the original duration (00:10)
    // It should be somewhere around 00:06-00:09 (accounting for timing variance)
    expect(timeText).not.toBe("00:10");
    expect(timeText).toMatch(/00:0[5-9]/);
  });

  test("Start All appears when timers haven't started and starts them", async ({
    page,
  }) => {
    // Use URL params to create two timers that haven't started
    await page.goto("/tools/timer?m=0&s=05");
    await expect(page.locator("main")).toBeVisible();

    // Add a second timer via form
    await page.getByTestId("add-timer-toggle").click();
    await page.getByTestId("timer-minutes-input").fill("0");
    await page.getByTestId("timer-seconds-input").fill("07");
    await page.getByTestId("add-timer-confirm").click();

    // Verify Start All button appears
    const startAll = page.getByTestId("start-all-timers");
    await expect(startAll).toBeVisible();

    // Click Start All and ensure both timers start (Running badge appears)
    await startAll.click();
    const runningBadges = page.locator("text=Running");
    await expect(runningBadges).toHaveCount(2);
  });
});
