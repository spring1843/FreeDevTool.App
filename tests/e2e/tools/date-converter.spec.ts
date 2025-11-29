import { test, expect } from "@playwright/test";
import {
  setupJSErrorCollection,
  expectNoErrors,
  expectDefaultValue,
} from "./utils";

test.describe("Date Converter Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/date-converter");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
    await expectDefaultValue(page);
  });

  test("should not have a Convert Date button (auto-converts)", async ({
    page,
  }) => {
    // Verify there's no Convert Date button
    const convertButton = page.locator('[data-testid="convert-button"]');
    await expect(convertButton).toHaveCount(0);

    // Verify formats are shown automatically on load (auto-conversion)
    await expect(page.getByText("Converted Formats")).toBeVisible();

    await expectNoErrors(page);
  });

  test("should auto-convert when input changes", async ({ page }) => {
    // Wait for initial load
    await expect(page.getByText("Converted Formats")).toBeVisible();

    // Enter a new timestamp
    const input = page.getByTestId("date-input");
    await input.fill("1609459200");

    // Wait for auto-conversion - check for 2021 in the output (Jan 1, 2021)
    await expect(page.locator("text=/2021/").first()).toBeVisible();

    await expectNoErrors(page);
  });

  test("should accept and convert negative Unix timestamp", async ({
    page,
  }) => {
    // Enter the negative timestamp
    const input = page.getByTestId("date-input");
    await input.fill("-1000000000");

    // Wait for auto-conversion to complete - check for 1938 in the output
    await expect(page.locator("text=/1938/").first()).toBeVisible();

    // Verify no error is shown
    await expect(page.getByText("Invalid date input")).not.toBeVisible();

    await expectNoErrors(page);
  });

  test("should display formats in two columns on desktop", async ({
    page,
  }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 800 });

    // Wait for formats to load
    await expect(page.getByText("Converted Formats")).toBeVisible();

    // Check that the grid has lg:grid-cols-2 class (two columns on large screens)
    const formatGrid = page.locator(".lg\\:grid-cols-2").first();
    await expect(formatGrid).toBeVisible();

    await expectNoErrors(page);
  });
});
