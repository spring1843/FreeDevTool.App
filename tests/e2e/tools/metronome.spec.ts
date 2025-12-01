import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("Metronome Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/metronome");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("Space key should toggle metronome start/stop", async ({ page }) => {
    const startButton = page.getByTestId("start-button");
    const stopButton = page.getByTestId("stop-button");

    // Initially should show start button
    await expect(startButton).toBeVisible();

    // Press Space to start
    await page.keyboard.press("Space");
    await expect(stopButton).toBeVisible();

    // Press Space to stop
    await page.keyboard.press("Space");
    await expect(startButton).toBeVisible();

    await expectNoErrors(page);
  });

  test("Escape key should toggle metronome start/stop", async ({ page }) => {
    const startButton = page.getByTestId("start-button");
    const stopButton = page.getByTestId("stop-button");

    // Initially should show start button
    await expect(startButton).toBeVisible();

    // Press Escape to start
    await page.keyboard.press("Escape");
    await expect(stopButton).toBeVisible();

    // Press Escape to stop
    await page.keyboard.press("Escape");
    await expect(startButton).toBeVisible();

    // Press Escape again to start (verifying toggle works both ways)
    await page.keyboard.press("Escape");
    await expect(stopButton).toBeVisible();

    await expectNoErrors(page);
  });

  test("Enter key should only start metronome", async ({ page }) => {
    const startButton = page.getByTestId("start-button");
    const stopButton = page.getByTestId("stop-button");

    // Initially should show start button
    await expect(startButton).toBeVisible();

    // Press Enter to start
    await page.keyboard.press("Enter");
    await expect(stopButton).toBeVisible();

    // Press Enter again - should stay running (Enter only starts, doesn't stop)
    await page.keyboard.press("Enter");
    await expect(stopButton).toBeVisible();

    await expectNoErrors(page);
  });
});
