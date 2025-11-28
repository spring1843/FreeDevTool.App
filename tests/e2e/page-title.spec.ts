import { test, expect } from "@playwright/test";

const SITE_NAME = "FreeDevTool.App";
const HOMEPAGE_TITLE = `${SITE_NAME} | Free Developer Tools`;

test.describe("Dynamic Page Title", () => {
  test("should show correct title on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(HOMEPAGE_TITLE);
  });

  test("should update title when navigating to a tool page", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.goto("/tools/json-formatter");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(
      `JSON Formatter - Format and Validate JSON | ${SITE_NAME}`
    );
  });

  test("should update title on SPA navigation between tools", async ({
    page,
  }) => {
    await page.goto("/tools/json-formatter");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(
      `JSON Formatter - Format and Validate JSON | ${SITE_NAME}`
    );

    const menuButton = page.locator('[data-testid="menu-button"]');
    await menuButton.click();

    const yamlLink = page.locator('a[href="/tools/yaml-formatter"]').first();
    await expect(yamlLink).toBeVisible();
    await yamlLink.click();

    await page.waitForURL("/tools/yaml-formatter");

    await expect(page).toHaveTitle(
      `YAML Formatter - Format and Validate YAML | ${SITE_NAME}`
    );
  });

  test("should update title when navigating back to homepage", async ({
    page,
  }) => {
    await page.goto("/tools/json-formatter");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(
      `JSON Formatter - Format and Validate JSON | ${SITE_NAME}`
    );

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveTitle(HOMEPAGE_TITLE);
  });

  test("should update title for various tools", async ({ page }) => {
    const toolsToTest = [
      {
        path: "/tools/base64",
        expectedTitle: "Base64 Encoder/Decoder - Encode and Decode Base64",
      },
      {
        path: "/tools/password-generator",
        expectedTitle: "Password Generator - Generate Secure Passwords",
      },
      {
        path: "/tools/uuid-generator",
        expectedTitle: "UUID Generator - Generate Unique Identifiers",
      },
      {
        path: "/tools/url-encoder",
        expectedTitle: "URL Encoder/Decoder - Encode and Decode URLs",
      },
      {
        path: "/tools/md5-hash",
        expectedTitle: "MD5 Hash Generator - Generate MD5 Hashes",
      },
    ];

    for (const tool of toolsToTest) {
      await page.goto(tool.path);
      await page.waitForLoadState("networkidle");

      await expect(page).toHaveTitle(`${tool.expectedTitle} | ${SITE_NAME}`);
    }
  });
});
