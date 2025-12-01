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

  test("version.json exists with non-empty version and past builtAt", async ({
    page,
  }) => {
    const res = await page.goto("/version.json");
    expect(res?.ok()).toBeTruthy();

    const body = await res!.text();
    expect(body).toBeTruthy();

    let payload: { version?: string; builtAt?: string } = {};
    try {
      payload = JSON.parse(String(body));
    } catch {
      throw new Error("version.json is not valid JSON");
    }

    expect(typeof payload.version).toBe("string");
    expect((payload.version || "").trim().length).toBeGreaterThan(0);

    expect(typeof payload.builtAt).toBe("string");
    const built = Date.parse(String(payload.builtAt));
    expect(Number.isNaN(built)).toBeFalsy();
    const now = Date.now();
    expect(built).toBeLessThanOrEqual(now);
  });
});
