import { marked } from "marked";

/**
 * Stylesheet embedded in both the live preview and downloaded full HTML
 * documents, so the downloaded file renders the same as the preview.
 */
const MARKDOWN_HTML_STYLES = `
:root { color-scheme: light dark; --fg: #1e293b; --bg: #ffffff; --muted: #64748b; --border: #e2e8f0; --code-bg: #f1f5f9; --link: #2563eb; }
@media (prefers-color-scheme: dark) {
  :root { --fg: #e2e8f0; --bg: #0f172a; --muted: #94a3b8; --border: #334155; --code-bg: #1e293b; --link: #60a5fa; }
}
:root[data-theme="light"] { --fg: #1e293b; --bg: #ffffff; --muted: #64748b; --border: #e2e8f0; --code-bg: #f1f5f9; --link: #2563eb; color-scheme: light; }
:root[data-theme="dark"] { --fg: #e2e8f0; --bg: #0f172a; --muted: #94a3b8; --border: #334155; --code-bg: #1e293b; --link: #60a5fa; color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0 auto; max-width: 48rem; padding: 1.5rem 1rem; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: var(--fg); background: var(--bg); overflow-wrap: break-word; }
h1, h2, h3, h4, h5, h6 { line-height: 1.25; margin: 1.5em 0 0.5em; }
h1 { font-size: 2em; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
h2 { font-size: 1.5em; border-bottom: 1px solid var(--border); padding-bottom: 0.3em; }
h1:first-child, h2:first-child { margin-top: 0; }
a { color: var(--link); }
img { max-width: 100%; }
code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.9em; background: var(--code-bg); padding: 0.15em 0.35em; border-radius: 4px; }
pre { background: var(--code-bg); padding: 1rem; border-radius: 6px; overflow-x: auto; }
pre code { background: none; padding: 0; }
blockquote { margin: 1em 0; padding: 0 1em; color: var(--muted); border-left: 4px solid var(--border); }
table { border-collapse: collapse; display: block; overflow-x: auto; margin: 1em 0; }
th, td { border: 1px solid var(--border); padding: 0.4em 0.8em; }
th { background: var(--code-bg); }
hr { border: 0; border-top: 1px solid var(--border); margin: 2em 0; }
li > input[type="checkbox"] { margin-right: 0.4em; }
`.trim();

/** Convert Markdown (GitHub Flavored) to an HTML fragment. */
export function convertMarkdownToHtml(markdown: string): string {
  return marked.parse(markdown, {
    gfm: true,
    breaks: false,
    async: false,
  }) as string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Title from the first level-1 heading, or "Document". */
export function extractTitle(markdown: string): string {
  const match = markdown.match(/^#[ \t]+(.+?)[ \t#]*$/m);
  const title = match?.[1]
    ?.replace(/[*_`~[\]]/g, "")
    .replace(/\(([^)]*)\)/g, "")
    .trim();
  return title || "Document";
}

/** Filesystem-friendly slug for a download filename. */
export function slugifyFilename(title: string): string {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || "document";
}

/** Wrap an HTML fragment in a standalone, styled HTML document. */
export function wrapHtmlDocument(
  body: string,
  title: string,
  theme?: "light" | "dark"
): string {
  const themeAttr = theme ? ` data-theme="${theme}"` : "";
  return `<!doctype html>
<html lang="en"${themeAttr}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<style>
${MARKDOWN_HTML_STYLES}
</style>
</head>
<body>
${body.trim()}
</body>
</html>
`;
}
