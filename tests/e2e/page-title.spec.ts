import { test, expect } from "@playwright/test";

test.describe("Dynamic Page Title", () => {
  test("should show correct title on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle("FreeDevTool.app - Free Developer Tools");
  });

  test("should update title when navigating to a tool page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.goto("/tools/json-formatter");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle("JSON Formatter - FreeDevTool.app");
  });

  test("should update title on SPA navigation between tools", async ({
    page,
  }) => {
    await page.goto("/tools/json-formatter");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle("JSON Formatter - FreeDevTool.app");

    const menuButton = page.locator('[data-testid="menu-button"]');
    await menuButton.click();

    const yamlLink = page.locator('a[href="/tools/yaml-formatter"]').first();
    await expect(yamlLink).toBeVisible();
    await yamlLink.click();

    await page.waitForURL("/tools/yaml-formatter");

    await expect(page).toHaveTitle("YAML Formatter - FreeDevTool.app");
  });

  test("should update title when navigating back to homepage", async ({
    page,
  }) => {
    await page.goto("/tools/json-formatter");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle("JSON Formatter - FreeDevTool.app");

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle("FreeDevTool.app - Free Developer Tools");
  });

  test("should update title for various tools", async ({ page }) => {
    const toolsToTest = [
      { path: "/tools/base64-encoder", expectedTitle: "Base64 Encoder" },
      {
        path: "/tools/password-generator",
        expectedTitle: "Password Generator",
      },
      { path: "/tools/uuid-generator", expectedTitle: "UUID Generator" },
      { path: "/tools/url-encoder", expectedTitle: "URL Encoder" },
      { path: "/tools/md5-hash", expectedTitle: "MD5 Hash" },
    ];

    for (const tool of toolsToTest) {
      await page.goto(tool.path);
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveTitle(`${tool.expectedTitle} - FreeDevTool.app`);
    }
  });
});
