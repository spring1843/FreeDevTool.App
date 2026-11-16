import { test, expect } from "@playwright/test";
import { setupJSErrorCollection, expectNoErrors } from "./utils";
import { DEFAULT_MARKDOWN } from "../../../client/src/data/defaults";
import { checkEditorsForDefault } from "./check-default-editor-value";

test.describe("Markdown to HTML Tool", () => {
  test.beforeEach(async ({ page }) => {
    await setupJSErrorCollection(page);
    await page.goto("/tools/markdown-to-html");
  });

  test("should load without errors and have default value", async ({
    page,
  }) => {
    await expect(page.locator("main")).toBeVisible();

    await checkEditorsForDefault(
      page,
      "input",
      "output",
      DEFAULT_MARKDOWN.substring(0, 30),
      output =>
        output.startsWith("<!doctype html>") &&
        /<h1>\s*Sample Markdown Document\s*<\/h1>/.test(output)
    );

    await expectNoErrors(page);
  });

  test("should render the Markdown preview", async ({ page }) => {
    const preview = page
      .getByTestId("markdown-preview")
      .contentFrame()
      .locator("h1");
    await expect(preview).toHaveText("Sample Markdown Document");
    await expectNoErrors(page);
  });

  test("should download the HTML file", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download HTML" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("sample-markdown-document.html");
    await expectNoErrors(page);
  });
});
