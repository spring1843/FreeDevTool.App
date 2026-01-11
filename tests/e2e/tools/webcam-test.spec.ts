import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";

test.describe("Camera Test Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/webcam-test");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();
    await expectNoErrors(page);
  });

  test("should show 'Not Requested' permission status initially", async ({
    page,
  }) => {
    await expect(page.getByText("Permission: Not Requested")).toBeVisible();
  });

  test("should show 'Request Camera Permission' button when permission not granted", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Request Camera Permission" })
    ).toBeVisible();
  });

  test("should show camera preview placeholder", async ({ page }) => {
    await expect(
      page.getByText("Camera preview will appear here")
    ).toBeVisible();
    await expect(page.getByText('Click "Start Camera" to begin')).toBeVisible();
  });

  test("should show 'Granted' permission status when camera permission is granted", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      navigator.permissions.query = async () =>
        ({ state: "granted" }) as PermissionStatus;
    });
    await page.goto("/tools/webcam-test");
    await expect(page.getByText("Permission: Granted")).toBeVisible();
  });

  test("should show 'Denied' permission status when camera permission is denied", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      navigator.permissions.query = async () =>
        ({ state: "denied" }) as PermissionStatus;
    });
    await page.goto("/tools/webcam-test");
    await expect(page.getByText("Permission: Denied")).toBeVisible();
  });
});
