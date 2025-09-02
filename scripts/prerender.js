import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tools data - extracted manually to avoid import issues
const toolsData = {
  Conversions: [
    { name: "Date Converter", path: "/tools/date-converter" },
    { name: "JSON ↔ YAML", path: "/tools/json-yaml-converter" },
    { name: "Timezone Converter", path: "/tools/timezone-converter" },
    { name: "Unit Converter", path: "/tools/unit-converter" },
    { name: "URL to JSON", path: "/tools/url-to-json" },
    { name: "CSV to JSON", path: "/tools/csv-to-json" },
    { name: "Number Base Converter", path: "/tools/number-base-converter" },
  ],
  Formatters: [
    { name: "JSON Formatter", path: "/tools/json-formatter" },
    { name: "JSONC Formatter", path: "/tools/jsonc-formatter" },
    { name: "HTML Formatter", path: "/tools/html-formatter" },
    { name: "CSS Formatter", path: "/tools/css-formatter" },
    { name: "TypeScript Formatter", path: "/tools/typescript-formatter" },
    { name: "YAML Formatter", path: "/tools/yaml-formatter" },
    { name: "Markdown Formatter", path: "/tools/markdown-formatter" },
    { name: "GraphQL Formatter", path: "/tools/graphql-formatter" },
  ],
  Encoders: [
    { name: "Base64 Encoder/Decoder", path: "/tools/base64-encoder" },
    { name: "URL Encoder/Decoder", path: "/tools/url-encoder" },
    { name: "JWT Decoder", path: "/tools/jwt-decoder" },
    { name: "TLS Certificate Decoder", path: "/tools/tls-decoder" },
  ],
  "Text Tools": [
    { name: "Regex Tester", path: "/tools/regex-tester" },
    { name: "Text Diff", path: "/tools/text-diff" },
    { name: "Text Sort", path: "/tools/text-sort" },
    { name: "Text Counter", path: "/tools/text-counter" },
    { name: "Text Split", path: "/tools/text-split" },
    { name: "Search & Replace", path: "/tools/search-replace" },
    { name: "Lorem Ipsum Generator", path: "/tools/lorem-generator" },
  ],
  "Time Tools": [
    { name: "Timer", path: "/tools/timer" },
    { name: "Metronome", path: "/tools/metronome" },
    { name: "Time Formatter", path: "/tools/time-formatter" },
    { name: "Datetime Difference", path: "/tools/datetime-diff" },
    { name: "Countdown", path: "/tools/countdown" },
    { name: "Time Tools", path: "/tools/time-tools" },
    { name: "Timezone Selector", path: "/tools/timezone-selector" },
  ],
  Generators: [
    { name: "QR Code Generator", path: "/tools/qr-generator" },
    { name: "Barcode Generator", path: "/tools/barcode-generator" },
    { name: "MD5 Hash", path: "/tools/md5-hash" },
    { name: "bcrypt Hash", path: "/tools/bcrypt-hash" },
    { name: "UUID Generator", path: "/tools/uuid-generator" },
    { name: "Color Palette Generator", path: "/tools/color-palette-generator" },
    { name: "Password Generator", path: "/tools/password-generator" },
  ],
  "Finance Tools": [
    { name: "Compound Interest Calculator", path: "/tools/compound-interest" },
    { name: "Debt Repayment Calculator", path: "/tools/debt-repayment" },
  ],
  "Hardware Tests": [
    { name: "Microphone Test", path: "/tools/microphone-test" },
    { name: "Browser Info", path: "/tools/browser-info" },
    { name: "Unicode Characters", path: "/tools/unicode-characters" },
  ],
};

// Flatten all tools into a single array
const tools = Object.values(toolsData).flat();

console.log('🔨 Starting static site generation...');

const distDir = path.join(__dirname, '..', 'dist', 'public');
const templatePath = path.join(distDir, 'index.html');

// Read the template HTML
const template = fs.readFileSync(templatePath, 'utf-8');

// Create a basic sitemap for the tools
const createSitemap = () => {
  const baseUrl = 'https://freedevtool.app';
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>`;

  tools.forEach(tool => {
    sitemap += `
  <url>
    <loc>${baseUrl}${tool.path}</loc>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += '\n</urlset>';
  
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');
};

// Generate individual tool pages
const generateToolPages = () => {
  let generatedPages = 0;
  
  tools.forEach(tool => {
    // Create directory structure for the tool
    const toolDir = path.join(distDir, tool.path.substring(1)); // Remove leading slash
    if (!fs.existsSync(toolDir)) {
      fs.mkdirSync(toolDir, { recursive: true });
    }
    
    // Customize the HTML for this specific tool
    let toolHtml = template;
    
    // Update title for the tool
    const toolTitle = `${tool.name} - Free Developer Tools`;
    toolHtml = toolHtml.replace(/<title>[\s\S]*?<\/title>/g, `<title>${toolTitle}</title>`);
    
    // Update meta description for the tool
    const description = `${tool.name} - A free, offline developer tool. Part of our collection of 45+ privacy-focused developer utilities.`;
    toolHtml = toolHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/g,
      `<meta name="description" content="${description}" />`
    );
    
    // Write the tool-specific HTML file
    fs.writeFileSync(path.join(toolDir, 'index.html'), toolHtml);
    generatedPages++;
  });
  
  console.log(`✅ Generated ${generatedPages} tool pages`);
};

// Main execution
try {
  generateToolPages();
  createSitemap();
  console.log('🎉 Static site generation complete!');
  console.log(`📁 Output directory: ${distDir}`);
} catch (error) {
  console.error('❌ Static site generation failed:', error);
  process.exit(1);
}