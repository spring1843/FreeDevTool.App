import { expect, type Page } from "@playwright/test";
import { expectNoErrors } from "./utils";

export async function checkEditorsForDefault(
  page: Page,
  inputName: string,
  outputName: string,
  defaultInput: string,
  outputCheckCondition: (output: string) => boolean
): Promise<void> {
  await checkInputForDefault(page, inputName, defaultInput);

  const outputEditorValue = await page.evaluate((name: string) => {
    const lines = Array.from(
      document.querySelectorAll(`#${name} .cm-content .cm-line`)
    );
    return lines.map(line => line.textContent || "").join("\n");
  }, outputName);

  expect(outputCheckCondition(outputEditorValue)).toBe(true);
  await expectNoErrors(page);
}

export async function checkInputForDefault(
  page: Page,
  inputName: string,
  defaultInput: string
): Promise<void> {
  const inputEditor = page.locator(`#${inputName}`);
  await expect(inputEditor).toBeVisible();

  const inputEditorValue = await page.evaluate((name: string) => {
    const lines = Array.from(
      document.querySelectorAll(`#${name} .cm-content .cm-line`)
    );
    return lines.map(line => line.textContent || "").join("\n");
  }, inputName);

  expect(inputEditorValue).toContain(defaultInput);
}
