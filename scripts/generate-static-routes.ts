/* eslint-disable no-console */
import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { getAllTools, getToolByPath } from "../client/src/data/tools.js";
import { renderExplanationsHtml } from "./render-explanations.js";
import { renderToolDirectoryHtml } from "./render-tool-directory.js";
import { HOMEPAGE_TITLE, getToolPageTitle } from "../shared/page-title.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build tool metadata from centralized tools data
function buildToolsMetadata(): Record<
  string,
  { title: string; description: string; keywords: string }
> {
  const metadata: Record<
    string,
    { title: string; description: string; keywords: string }
  > = {
    // Homepage metadata
    "/": {
      title: HOMEPAGE_TITLE,
      description:
        "Open source offline developer tools designed for privacy. Free utilities including converters, formatters, encoders, text tools, and hardware testing - built to work without network requests.",
      keywords:
        "offline developer tools, privacy-focused dev utilities, open source coding tools, no network requests, local processing developer tools, privacy-first utilities",
    },
  };

  // Add all tools from centralized data
  const allTools = getAllTools();
  allTools.forEach(tool => {
    metadata[tool.path] = {
      title: getToolPageTitle(tool),
      description: tool.metadata.description,
      keywords: tool.metadata.keywords.join(", "),
    };
  });

  return metadata;
}

const toolsMetadata = buildToolsMetadata();

// Critical CSS for SSR content - prevents flash of unstyled content
function getCriticalCss(): string {
  return `
#ssr-tool-directory,#ssr-explanations{max-width:72rem;margin:2rem auto;padding:0 1rem}
.ssr-directory-header{margin-bottom:1.5rem}
.ssr-directory-title{font-size:1.5rem;font-weight:700;color:#1e293b;margin-bottom:0.25rem}
.dark .ssr-directory-title{color:#f8fafc}
.ssr-directory-subtitle{font-size:0.875rem;color:#64748b}
.dark .ssr-directory-subtitle{color:#94a3b8}
.ssr-category{margin-bottom:2rem}
.ssr-category-header{display:flex;align-items:center;margin-bottom:1rem}
.ssr-category-dot{width:0.75rem;height:0.75rem;border-radius:9999px;margin-right:0.75rem}
.ssr-category-title{font-size:1.5rem;font-weight:700;color:#1e293b}
.dark .ssr-category-title{color:#f8fafc}
.ssr-category-count{margin-left:0.5rem;font-size:0.875rem;color:#64748b}
.dark .ssr-category-count{color:#94a3b8}
.ssr-tools-grid{display:grid;grid-template-columns:1fr;gap:1rem}
@media(min-width:768px){.ssr-tools-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1024px){.ssr-tools-grid{grid-template-columns:repeat(3,1fr)}}
.ssr-tool-card{display:block;padding:1rem;border:1px solid #e2e8f0;border-radius:0.5rem;background:#fff;text-decoration:none;border-left:4px solid transparent}
.dark .ssr-tool-card{background:#1e293b;border-color:#334155}
.ssr-tool-name{font-size:1.125rem;font-weight:600;color:#1e293b;margin-bottom:0.5rem}
.dark .ssr-tool-name{color:#f8fafc}
.ssr-tool-desc{font-size:0.875rem;color:#64748b;margin-bottom:0.75rem;line-height:1.5}
.dark .ssr-tool-desc{color:#94a3b8}
.ssr-tool-shortcut{display:inline-block;font-size:0.75rem;font-family:ui-monospace,monospace;background:#f1f5f9;padding:0.25rem 0.5rem;border-radius:0.25rem;color:#475569}
.dark .ssr-tool-shortcut{background:#334155;color:#cbd5e1}
.exp-grid{display:grid;grid-template-columns:1fr;gap:1rem}
@media(min-width:768px){.exp-grid{grid-template-columns:repeat(2,1fr)}}
.exp-block{padding:1rem;border-width:1px;border-radius:0.5rem;margin-bottom:0.75rem}
.exp-block h3,.exp-block h4{font-weight:600;margin-bottom:0.5rem}
.exp-block ul{font-size:0.875rem;list-style-type:disc;list-style-position:inside}
.exp-block li+li{margin-top:0.25rem}
.exp-blue{background:#eff6ff;border-color:#93c5fd}
.exp-blue h3,.exp-blue h4{color:#1e3a8a}
.exp-blue ul,.exp-blue li,.exp-blue span{color:#1e40af}
.dark .exp-blue{background:rgba(30,58,138,0.2);border-color:#1e3a8a}
.dark .exp-blue h3,.dark .exp-blue h4{color:#93c5fd}
.dark .exp-blue ul,.dark .exp-blue li,.dark .exp-blue span{color:#bfdbfe}
.exp-purple{background:#faf5ff;border-color:#c084fc}
.exp-purple h3,.exp-purple h4{color:#581c87}
.exp-purple ul,.exp-purple li,.exp-purple span{color:#6b21a8}
.dark .exp-purple{background:rgba(88,28,135,0.2);border-color:#581c87}
.dark .exp-purple h3,.dark .exp-purple h4{color:#c084fc}
.dark .exp-purple ul,.dark .exp-purple li,.dark .exp-purple span{color:#d8b4fe}
.exp-emerald{background:#ecfdf5;border-color:#6ee7b7}
.exp-emerald h3,.exp-emerald h4{color:#064e3b}
.exp-emerald ul,.exp-emerald li{color:#065f46}
.dark .exp-emerald{background:rgba(6,78,59,0.2);border-color:#064e3b}
.dark .exp-emerald h3,.dark .exp-emerald h4{color:#6ee7b7}
.dark .exp-emerald ul,.dark .exp-emerald li{color:#a7f3d0}
.exp-amber{background:#fffbeb;border-color:#fcd34d}
.exp-amber h3,.exp-amber h4{color:#78350f}
.exp-amber ul,.exp-amber li{color:#92400e}
.dark .exp-amber{background:rgba(120,53,15,0.2);border-color:#78350f}
.dark .exp-amber h3,.dark .exp-amber h4{color:#fcd34d}
.dark .exp-amber ul,.dark .exp-amber li{color:#fde68a}
`.trim().replace(/\n/g, '');
}

// Extract asset references from the root index.html
function extractAssetReferences(distPath: string): {
  jsFile: string;
  cssFile: string;
} {
  const rootIndexPath = path.join(distPath, "index.html");
  const rootHtml = fs.readFileSync(rootIndexPath, "utf-8");

  // Extract JS file
  const jsMatch = rootHtml.match(
    /<script[^>]+src="([^"]+index[^"]+\.js)"[^>]*>/
  );
  const jsFile = jsMatch ? jsMatch[1] : "/assets/index.js";

  // Extract CSS file
  const cssMatch = rootHtml.match(
    /<link[^>]+href="([^"]+index[^"]+\.css)"[^>]*>/
  );
  const cssFile = cssMatch ? cssMatch[1] : "/assets/index.css";

  return { jsFile, cssFile };
}

// Generate index.html for each route
function generateRouteHTML(
  route: string,
  distPath: string,
  assets: { jsFile: string; cssFile: string }
) {
  const metadata = toolsMetadata[route] || toolsMetadata["/"];

  let ssrContent = "";
  if (route === "/") {
    ssrContent = renderToolDirectoryHtml();
  } else if (route.startsWith("/tools/")) {
    const tool = getToolByPath(route);
    if (tool?.explanations) {
      ssrContent = renderExplanationsHtml(tool.explanations, route);
    }
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' ws: wss:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';" />
    <script>(function(){var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.classList.add(t)})()</script>
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://freedevtool.app${route}" />
    <meta name="robots" content="index, follow" />
    <meta name="referrer" content="no-referrer" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/android-chrome-192x192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png" />
    <style id="critical-ssr">${getCriticalCss()}</style>
    <script type="module" crossorigin src="${assets.jsFile}"></script>
    <link rel="stylesheet" crossorigin href="${assets.cssFile}">
  </head>
  <body>
    <div id="root"></div>${ssrContent ? `\n    ${ssrContent}` : ""}
  </body>
</html>`;

  // Create directory structure
  const routePath = route === "/" ? "" : route;
  const fullPath = path.join(distPath, routePath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  // Write index.html
  fs.writeFileSync(path.join(fullPath, "index.html"), html);
  console.log(`✓ Generated: ${route}`);
}

// Main execution
const distPath = path.join(__dirname, "..", "dist", "public");

console.log("Generating static routes with SEO metadata...\n");

// Extract asset references from root index.html
const assets = extractAssetReferences(distPath);
console.log(`Found assets: JS=${assets.jsFile}, CSS=${assets.cssFile}\n`);

// Generate HTML for each route
Object.keys(toolsMetadata).forEach(route => {
  generateRouteHTML(route, distPath, assets);
});

console.log("\n✅ Static route generation complete!");
console.log(
  `\nGenerated ${Object.keys(toolsMetadata).length} routes in: ${distPath}`
);

// --- Generate sitemap.xml alongside static routes ---
function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function generateSitemap(dist: string) {
  const baseUrl = (
    process.env.SITE_BASE_URL || "https://freedevtool.app"
  ).replace(/\/+$/, "");
  // Use build time as lastmod for all routes, since all routes are statically generated at build time.
  const now = new Date().toISOString();
  const routes = Object.keys(toolsMetadata);

  const entries = routes.map(route => {
    const loc = `${baseUrl}${route === "/" ? "/" : route}`;
    const isHome = route === "/";
    const changefreq = isHome ? "weekly" : "monthly";
    const priority = isHome ? "1.0" : "0.7";
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  const outFile = path.join(dist, "sitemap.xml");
  fs.writeFileSync(outFile, xml, "utf-8");
  console.log(
    `\n✓ Generated sitemap.xml with ${routes.length} URLs at: ${outFile}`
  );
}

generateSitemap(distPath);
function writeVersionJson(dist: string) {
  let version = "unknown";
  try {
    version = execSync("git rev-parse --short HEAD", {
      encoding: "utf-8",
    }).trim();
  } catch {
    // keep version as unknown if git not available
  }
  const builtAt = new Date().toISOString();
  const payload = { version, builtAt };
  const outFile = path.join(dist, "version.json");
  fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
  console.log(`\n✓ Generated version.json (${version}) at: ${outFile}`);
}

writeVersionJson(distPath);
