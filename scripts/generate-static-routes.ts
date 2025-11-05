import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAllTools } from "../client/src/data/tools.js";

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
      title:
        "FreeDevTool.App - Free, Secure, Open Source, and Offline Developer Tools",
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
      title: tool.metadata.title + " | FreeDevTool.App",
      description: tool.metadata.description,
      keywords: tool.metadata.keywords.join(", "),
    };
  });

  return metadata;
}

const toolsMetadata = buildToolsMetadata();

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

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1"
    />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' ws: wss:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';"
    />
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords}" />

    <!-- Open Graph tags for professional sharing -->
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://freedevtool.app${route}" />

    <!-- Security and Privacy focused meta tags -->
    <meta name="robots" content="index, follow" />
    <meta name="referrer" content="no-referrer" />

    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/android-chrome-192x192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png" />
    
    <script type="module" crossorigin src="${assets.jsFile}"></script>
    <link rel="stylesheet" crossorigin href="${assets.cssFile}">
  </head>
  <body>
    <div id="root"></div>
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
