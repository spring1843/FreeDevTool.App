import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.resolve(PROJECT_ROOT, "dist/public");
const CLIENT_DIR = path.resolve(PROJECT_ROOT, "client");

// Get all tool paths from the data file
const toolPaths = JSON.parse(
  fs.readFileSync(
    path.resolve(PROJECT_ROOT, "client/src/data/tools-paths.json"),
    "utf-8"
  )
);

async function generateStaticPages() {
  console.log("🚀 Starting static page generation...");

  // Read the built index.html as template
  const templatePath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error("Build output not found. Run `vite build` first.");
  }

  const template = fs.readFileSync(templatePath, "utf-8");

  // Get all tool paths
  const allPaths = ["/", ...toolPaths];

  console.log(`📄 Generating ${allPaths.length} static pages...`);

  for (const toolPath of allPaths) {
    // Skip root path since it's already built
    if (toolPath === "/") continue;

    // Create directory structure
    const outputDir = path.join(DIST_DIR, toolPath);
    const outputFile = path.join(outputDir, "index.html");

    // Create directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Update asset paths to work from subdirectory
    let html = template;

    // Count directory depth to adjust asset paths
    const depth = toolPath.split("/").length - 1;
    const prefix = "../".repeat(depth);

    // Update all asset references
    html = html.replace(/href="\/assets\//g, `href="${prefix}assets/`);
    html = html.replace(/src="\/assets\//g, `src="${prefix}assets/`);
    html = html.replace(/src="\/src\//g, `src="${prefix}src/`);

    // Update any other absolute paths to relative
    html = html.replace(
      /="\/([^"]*\.(js|css|png|ico|xml|txt))"/g,
      `="${prefix}$1"`
    );

    // Update page title to include tool name
    const toolName = toolPath
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());
    html = html.replace(
      /<title>([^<]*)<\/title>/,
      `<title>${toolName} - FreeDevTool.App - Free, Secure, Open Source, and Offline Developer Tools</title>`
    );

    // Write the HTML file
    fs.writeFileSync(outputFile, html);
    console.log(`✅ Generated: ${toolPath}/index.html`);
  }

  console.log(`🎉 Successfully generated ${allPaths.length - 1} static pages!`);
  console.log("📁 Output structure:");
  console.log("   dist/public/index.html (root)");
  console.log("   dist/public/tools/[tool-name]/index.html (each tool)");
  console.log("   dist/public/assets/ (shared resources)");
}

// Run the generator
generateStaticPages().catch(error => {
  console.error("❌ Static page generation failed:", error);
  process.exit(1);
});
