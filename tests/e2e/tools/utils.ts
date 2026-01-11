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

export async function expectNoErrors(page: Page) {
  const errors = await page.evaluate(
    () => (window as typeof window & { jsErrors?: string[] }).jsErrors || []
  );

  const consoleMessages = await page.evaluate(
    () =>
      (window as typeof window & { consoleMessages?: string[] })
        .consoleMessages || []
  );

  const allErrors = [...errors, ...consoleMessages];

  expect(
    allErrors,
    `Expected no critical JS errors or warnings, but found: ${allErrors.join(
      ", "
    )}`
  ).toHaveLength(0);
}

export async function expectDefaultValue(page: Page) {
  const defaultInput = page.locator('[data-default-input="true"]');
  await expect(defaultInput).toBeVisible();
  await expect(defaultInput).not.toHaveValue("");
}
