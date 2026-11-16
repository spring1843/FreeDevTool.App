import { describe, expect, it } from "vitest";
import {
  convertMarkdownToHtml,
  extractTitle,
  slugifyFilename,
  wrapHtmlDocument,
} from "../../client/src/lib/markdown-to-html";

describe("convertMarkdownToHtml", () => {
  it("converts headings and emphasis", () => {
    const html = convertMarkdownToHtml(
      "# Title\n\nSome **bold** and *italic*."
    );
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
  });

  it("supports GFM tables, task lists, and strikethrough", () => {
    const html = convertMarkdownToHtml(
      "| A | B |\n| - | - |\n| 1 | 2 |\n\n- [x] done\n- [ ] todo\n\n~~gone~~"
    );
    expect(html).toContain("<table>");
    expect(html).toContain("<td>1</td>");
    expect(html).toMatch(
      /<input[^>]*checked[^>]*type="checkbox"|<input[^>]*type="checkbox"[^>]*checked/
    );
    expect(html).toContain("<del>gone</del>");
  });

  it("converts fenced code blocks and escapes their content", () => {
    const html = convertMarkdownToHtml("```js\nconst a = 1 < 2;\n```");
    expect(html).toContain('<code class="language-js">');
    expect(html).toContain("1 &lt; 2");
  });
});

describe("extractTitle", () => {
  it("uses the first level-1 heading without inline markup", () => {
    expect(extractTitle("intro\n\n# My **Great** Doc\n\n# Other")).toBe(
      "My Great Doc"
    );
  });

  it("falls back to Document", () => {
    expect(extractTitle("## Only h2\n\ntext")).toBe("Document");
    expect(extractTitle("")).toBe("Document");
  });
});

describe("slugifyFilename", () => {
  it("creates a filesystem-friendly slug", () => {
    expect(slugifyFilename("Sample Markdown Document!")).toBe(
      "sample-markdown-document"
    );
    expect(slugifyFilename("Café über")).toBe("cafe-uber");
    expect(slugifyFilename("???")).toBe("document");
  });
});

describe("wrapHtmlDocument", () => {
  it("builds a standalone document with an escaped title", () => {
    const doc = wrapHtmlDocument("<p>Hi</p>", "A <b> & C");
    expect(doc.startsWith("<!doctype html>")).toBe(true);
    expect(doc).toContain("<title>A &lt;b&gt; &amp; C</title>");
    expect(doc).toContain('<meta charset="UTF-8">');
    expect(doc).toContain("<style>");
    expect(doc).toContain("<body>\n<p>Hi</p>\n</body>");
  });

  it("applies an explicit theme when given", () => {
    expect(wrapHtmlDocument("", "t", "dark")).toContain(
      '<html lang="en" data-theme="dark">'
    );
  });
});
