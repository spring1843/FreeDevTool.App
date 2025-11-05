import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("Microphone Test Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/microphone-test");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("should hide dropdown and show request permission button when no permission granted", async ({
    page,
  }) => {
    // Wait for page to be fully loaded
    await expect(page.locator("main")).toBeVisible();

    // The dropdown should not be visible (hidden because no permission = no device labels)
    const dropdown = page.getByTestId("microphone-select");
    await expect(dropdown).not.toBeVisible();

    // The request permission button should be visible and enabled
    const requestButton = page.getByTestId("request-microphone-permission");
    await expect(requestButton).toBeVisible();
    await expect(requestButton).toBeEnabled();

    // Verify no errors
    await expectNoErrors(page);
  });
});
