import { test, expect } from "@playwright/test";

test.describe("Site metadata files", () => {
  test("sitemap.xml exists and is valid-ish", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.ok()).toBeTruthy();
    const content = await page.locator("body").textContent();
    expect(content).toBeTruthy();
    expect(content).toContain("<urlset");
    // basic sanity: should include at least the homepage
    expect(content).toMatch(/<loc>.*\/.<\/loc>|<loc>.*\/</);
  });

  test("robots.txt environment rules", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.ok()).toBeTruthy();
    const text = await page.locator("body").textContent();
    expect(text).toBeTruthy();

    // Basic format checks
    expect(text).toMatch(/User-agent:\s*\*/i);

    const lines = (text || "")
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => l.length > 0);
    const first = lines[0] || "";

    // Determine environment from first line marker
    const isProd = /^#\s*prod\s*$/i.test(first);
    const isNonProd = /^#\s*non-prod\s*$/i.test(first);
    expect(isProd || isNonProd).toBeTruthy();

    // Assert Disallow rules by environment
    const disallowLines = lines.filter(l => /^Disallow:/i.test(l));
    // There should be at least one Disallow line
    expect(disallowLines.length).toBeGreaterThan(0);

    if (isProd) {
      // On prod: open indexing (empty disallow)
      // Allow either "Disallow:" or "Disallow: " (with trailing space) but not "/"
      expect(disallowLines.some(l => /^Disallow:\s*$/i.test(l))).toBeTruthy();
      expect(disallowLines.some(l => /^Disallow:\s*\/$/i.test(l))).toBeFalsy();
    } else {
      // On non-prod: block indexing of everything
      expect(disallowLines.some(l => /^Disallow:\s*\/$/i.test(l))).toBeTruthy();
    }
  });
});
