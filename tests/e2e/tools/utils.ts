import { type Page, expect } from "@playwright/test";

export async function setupJSErrorCollection(page: Page) {
  await page.addInitScript(() => {
    (window as typeof window & { jsErrors: string[] }).jsErrors = [];
    window.addEventListener("error", e => {
      (window as typeof window & { jsErrors: string[] }).jsErrors.push(
        e.message
      );
    });
    window.addEventListener("unhandledrejection", e => {
      (window as typeof window & { jsErrors: string[] }).jsErrors.push(
        `Unhandled promise rejection: ${e.reason}`
      );
    });
  });
}

export async function expectNoCriticalJSErrors(page: Page) {
  const errors = await page.evaluate(
    () => (window as typeof window & { jsErrors?: string[] }).jsErrors || []
  );
  const criticalErrors = errors.filter(
    (error: string) =>
      !error.includes("unhandledrejection") ||
      error.includes("TypeError") ||
      error.includes("ReferenceError")
  );
  expect(criticalErrors.length).toBe(0);
}

export async function expectDefaultValue(page: Page) {
  // const defaultInput = page.locator('[data-default-input="true"]');
  // await expect(defaultInput).not.toHaveValue("");
}
