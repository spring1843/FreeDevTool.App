import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tool metadata for SEO
const toolsMetadata: Record<
  string,
  { title: string; description: string; keywords: string }
> = {
  "/": {
    title:
      "FreeDevTool.App - Free, Secure, Open Source, and Offline Developer Tools",
    description:
      "Open source offline developer tools designed for privacy. Free utilities including converters, formatters, encoders, text tools, and hardware testing - built to work without network requests.",
    keywords:
      "offline developer tools, privacy-focused dev utilities, open source coding tools, no network requests, local processing developer tools, privacy-first utilities",
  },
  "/tools/date-converter": {
    title: "Date Converter - Convert Between Date Formats | FreeDevTool.App",
    description:
      "Convert dates between 20+ practical formats including ISO 8601, Unix timestamps, RFC 2822, and human-readable formats. Auto-detects input format for easy conversion.",
    keywords:
      "date converter, timestamp converter, ISO 8601, Unix timestamp, date format converter, RFC 2822",
  },
  "/tools/json-yaml-converter": {
    title:
      "JSON to YAML Converter - Bidirectional Conversion | FreeDevTool.App",
    description:
      "Convert between JSON and YAML formats instantly. Bidirectional converter with syntax validation and error highlighting for configuration files.",
    keywords:
      "JSON to YAML, YAML to JSON, config converter, JSON YAML converter",
  },
  "/tools/timezone-converter": {
    title:
      "Timezone Converter - Convert Times Across Timezones | FreeDevTool.App",
    description:
      "Convert times between different timezones instantly. Support for all major timezones with automatic DST handling.",
    keywords:
      "timezone converter, time zone conversion, UTC converter, world time converter",
  },
  "/tools/unit-converter": {
    title: "Unit Converter - Convert Units of Measurement | FreeDevTool.App",
    description:
      "Convert between units of length, weight, temperature, volume, and more. Fast and accurate unit conversion tool.",
    keywords:
      "unit converter, measurement converter, length converter, weight converter, temperature converter",
  },
  "/tools/json-formatter": {
    title: "JSON Formatter - Format and Validate JSON | FreeDevTool.App",
    description:
      "Format, validate, and beautify JSON with syntax highlighting. Industry-standard Prettier formatting with error detection.",
    keywords: "JSON formatter, JSON validator, JSON beautifier, prettify JSON",
  },
  "/tools/jsonc-formatter": {
    title: "JSONC Formatter - Format JSON with Comments | FreeDevTool.App",
    description:
      "Format and validate JSONC (JSON with Comments) files. Perfect for VS Code configuration files and other commented JSON.",
    keywords: "JSONC formatter, JSON with comments, VS Code config formatter",
  },
  "/tools/html-formatter": {
    title: "HTML Formatter - Format and Beautify HTML | FreeDevTool.App",
    description:
      "Format and beautify HTML code with proper indentation. Industry-standard Prettier formatting for clean, readable markup.",
    keywords:
      "HTML formatter, HTML beautifier, prettify HTML, HTML code formatter",
  },
  "/tools/yaml-formatter": {
    title: "YAML Formatter - Format and Validate YAML | FreeDevTool.App",
    description:
      "Format and validate YAML files with syntax checking. Perfect for configuration files and data serialization.",
    keywords:
      "YAML formatter, YAML validator, YAML beautifier, config formatter",
  },
  "/tools/markdown-formatter": {
    title: "Markdown Formatter - Format Markdown Files | FreeDevTool.App",
    description:
      "Format and beautify Markdown files with consistent styling. Industry-standard Prettier formatting for documentation.",
    keywords:
      "Markdown formatter, MD formatter, Markdown beautifier, prettify markdown",
  },
  "/tools/css-formatter": {
    title: "CSS Formatter - Format and Beautify CSS | FreeDevTool.App",
    description:
      "Format and beautify CSS code with proper indentation. Industry-standard Prettier formatting for stylesheets.",
    keywords: "CSS formatter, CSS beautifier, prettify CSS, CSS code formatter",
  },
  "/tools/typescript-formatter": {
    title: "TypeScript Formatter - Format TypeScript Code | FreeDevTool.App",
    description:
      "Format TypeScript and JavaScript code with Prettier. Industry-standard formatting for clean, consistent code.",
    keywords:
      "TypeScript formatter, JavaScript formatter, TS formatter, Prettier",
  },
  "/tools/graphql-formatter": {
    title: "GraphQL Formatter - Format GraphQL Schemas | FreeDevTool.App",
    description:
      "Format and beautify GraphQL schemas and queries. Industry-standard Prettier formatting for GraphQL.",
    keywords: "GraphQL formatter, GraphQL beautifier, GraphQL schema formatter",
  },
  "/tools/time-formatter": {
    title: "Time Formatter - Format Time Values | FreeDevTool.App",
    description:
      "Format time values in different formats. Convert between 12-hour and 24-hour time formats.",
    keywords: "time formatter, 12 hour to 24 hour, time format converter",
  },
  "/tools/base64-encoder": {
    title:
      "Base64 Encoder/Decoder - Encode and Decode Base64 | FreeDevTool.App",
    description:
      "Encode and decode Base64 strings instantly. Bidirectional converter with file support and validation.",
    keywords: "Base64 encoder, Base64 decoder, encode Base64, decode Base64",
  },
  "/tools/url-encoder": {
    title: "URL Encoder/Decoder - Encode and Decode URLs | FreeDevTool.App",
    description:
      "Encode and decode URL strings and query parameters. Perfect for web development and API testing.",
    keywords: "URL encoder, URL decoder, percent encoding, URI encoder",
  },
  "/tools/jwt-decoder": {
    title: "JWT Decoder - Decode JSON Web Tokens | FreeDevTool.App",
    description:
      "Decode and inspect JWT (JSON Web Token) headers and payloads. View claims and token structure without verification.",
    keywords:
      "JWT decoder, JSON Web Token decoder, JWT inspector, token decoder",
  },
  "/tools/tls-decoder": {
    title:
      "TLS Certificate Decoder - Decode SSL Certificates | FreeDevTool.App",
    description:
      "Decode and inspect TLS/SSL certificates. View certificate details, validity, and issuer information.",
    keywords:
      "TLS decoder, SSL certificate decoder, X.509 decoder, certificate inspector",
  },
  "/tools/text-diff": {
    title: "Text Diff - Compare Two Texts | FreeDevTool.App",
    description:
      "Compare two text files and highlight differences. Side-by-side diff viewer with line-by-line comparison.",
    keywords: "text diff, text compare, diff tool, compare text files",
  },
  "/tools/regex-tester": {
    title: "Regex Tester - Test Regular Expressions | FreeDevTool.App",
    description:
      "Test and debug regular expressions with live highlighting. Supports JavaScript regex with match details.",
    keywords:
      "regex tester, regular expression tester, regex debugger, pattern matcher",
  },
  "/tools/text-sort": {
    title: "Text Sort - Sort Lines of Text | FreeDevTool.App",
    description:
      "Sort lines of text alphabetically or numerically. Multiple sorting options including reverse and case-insensitive.",
    keywords: "text sorter, sort lines, alphabetical sort, line sorter",
  },
  "/tools/text-counter": {
    title:
      "Text Counter - Count Characters, Words, and Lines | FreeDevTool.App",
    description:
      "Count characters, words, lines, and paragraphs in text. Real-time statistics with reading time estimation.",
    keywords: "character counter, word counter, text statistics, line counter",
  },
  "/tools/text-split": {
    title: "Text Split - Split Text by Delimiter | FreeDevTool.App",
    description:
      "Split text into parts using custom delimiters. Perfect for processing CSV, lists, and structured data.",
    keywords: "text splitter, string split, delimiter split, text separator",
  },
  "/tools/search-replace": {
    title: "Search and Replace - Find and Replace Text | FreeDevTool.App",
    description:
      "Search and replace text with support for regex patterns. Case-sensitive and global replacement options.",
    keywords: "find replace, search replace, text replace, regex replace",
  },
  "/tools/world-clock": {
    title: "World Clock - View Time in Multiple Timezones | FreeDevTool.App",
    description:
      "View current time in multiple timezones simultaneously. Track time across different cities and regions.",
    keywords:
      "world clock, timezone clock, international time, multiple timezones",
  },
  "/tools/timer": {
    title: "Timer - Countdown Timer Tool | FreeDevTool.App",
    description:
      "Set countdown timers with custom durations. Visual and audio alerts when time expires.",
    keywords: "countdown timer, timer tool, online timer, time tracker",
  },
  "/tools/stopwatch": {
    title: "Stopwatch - Online Stopwatch Tool | FreeDevTool.App",
    description:
      "Precision stopwatch with lap timing. Track elapsed time and record multiple laps.",
    keywords: "stopwatch, lap timer, time tracker, elapsed time",
  },
  "/tools/countdown": {
    title: "Countdown - Event Countdown Timer | FreeDevTool.App",
    description:
      "Count down to important dates and events. Track days, hours, minutes, and seconds until your event.",
    keywords: "countdown, event countdown, days until, time until",
  },
  "/tools/compound-interest": {
    title:
      "Compound Interest Calculator - Calculate Investment Returns | FreeDevTool.App",
    description:
      "Calculate compound interest and investment growth over time. Visualize returns with interactive charts.",
    keywords:
      "compound interest calculator, investment calculator, interest calculator, savings calculator",
  },
  "/tools/debt-repayment": {
    title:
      "Debt Repayment Calculator - Plan Your Debt Payoff | FreeDevTool.App",
    description:
      "Calculate debt repayment schedules and total interest. Plan your path to becoming debt-free.",
    keywords:
      "debt calculator, loan calculator, debt repayment, payoff calculator",
  },
  "/tools/color-palette-generator": {
    title: "Color Palette Generator - Generate Color Schemes | FreeDevTool.App",
    description:
      "Generate beautiful color palettes for design projects. Create harmonious color schemes with hex codes.",
    keywords:
      "color palette generator, color scheme generator, color picker, palette creator",
  },
  "/tools/webcam-test": {
    title: "Webcam Test - Test Your Camera | FreeDevTool.App",
    description:
      "Test your webcam and camera devices. Check video quality and device functionality in your browser.",
    keywords: "webcam test, camera test, test camera, video test",
  },
  "/tools/microphone-test": {
    title: "Microphone Test - Test Your Microphone | FreeDevTool.App",
    description:
      "Test your microphone and audio devices. Record audio clips and check microphone functionality.",
    keywords: "microphone test, mic test, audio test, test microphone",
  },
  "/tools/keyboard-test": {
    title: "Keyboard Test - Test Keyboard Keys | FreeDevTool.App",
    description:
      "Test keyboard keys and detect key presses. Visual feedback for each key pressed.",
    keywords: "keyboard test, key test, keyboard tester, test keys",
  },
  "/tools/qr-generator": {
    title: "QR Code Generator - Create QR Codes | FreeDevTool.App",
    description:
      "Generate QR codes for URLs, text, and data. Customizable size and error correction levels.",
    keywords:
      "QR code generator, QR generator, create QR code, barcode generator",
  },
  "/tools/barcode-generator": {
    title: "Barcode Generator - Create Barcodes | FreeDevTool.App",
    description:
      "Generate barcodes in multiple formats including Code128, EAN, and UPC. Download as PNG or SVG.",
    keywords: "barcode generator, create barcode, Code128, EAN generator",
  },
  "/tools/lorem-generator": {
    title:
      "Lorem Ipsum Generator - Generate Placeholder Text | FreeDevTool.App",
    description:
      "Generate Lorem Ipsum placeholder text for design mockups. Customize paragraphs, words, and sentences.",
    keywords:
      "lorem ipsum generator, placeholder text, dummy text, lorem generator",
  },
  "/tools/unicode-characters": {
    title: "Unicode Characters - Browse Unicode Symbols | FreeDevTool.App",
    description:
      "Browse and copy Unicode characters and symbols. Search thousands of special characters and emojis.",
    keywords:
      "unicode characters, special characters, unicode symbols, character map",
  },
  "/tools/md5-hash": {
    title: "MD5 Hash Generator - Generate MD5 Hashes | FreeDevTool.App",
    description:
      "Generate MD5 hashes from text strings. Quick and secure hash generation for verification.",
    keywords: "MD5 hash generator, MD5 calculator, hash generator, checksum",
  },
  "/tools/bcrypt-hash": {
    title:
      "BCrypt Hash Generator - Generate Secure Password Hashes | FreeDevTool.App",
    description:
      "Generate and verify BCrypt password hashes. Secure password hashing with configurable rounds.",
    keywords:
      "BCrypt hash, password hash generator, secure hash, BCrypt generator",
  },
  "/tools/password-generator": {
    title: "Password Generator - Generate Secure Passwords | FreeDevTool.App",
    description:
      "Generate strong, random passwords with custom length and character sets. Create secure passwords instantly.",
    keywords:
      "password generator, random password, secure password, password creator",
  },
  "/tools/uuid-generator": {
    title: "UUID Generator - Generate Unique Identifiers | FreeDevTool.App",
    description:
      "Generate UUID/GUID (Universally Unique Identifiers) in multiple versions. Bulk generation supported.",
    keywords: "UUID generator, GUID generator, unique ID generator, UUID v4",
  },
  "/tools/datetime-diff": {
    title:
      "DateTime Difference Calculator - Calculate Time Between Dates | FreeDevTool.App",
    description:
      "Calculate the difference between two dates and times. Get results in days, hours, minutes, and seconds.",
    keywords:
      "date difference calculator, time difference, days between dates, date calculator",
  },
  "/tools/metronome": {
    title: "Metronome - Online Metronome Tool | FreeDevTool.App",
    description:
      "Free online metronome with adjustable tempo. Perfect for musicians and music practice.",
    keywords: "metronome, online metronome, BPM metronome, music metronome",
  },
  "/tools/browser-info": {
    title:
      "Browser Information - Detect Browser and Device Info | FreeDevTool.App",
    description:
      "View detailed browser, device, and screen information. Check user agent, viewport size, and capabilities.",
    keywords: "browser info, user agent, device info, screen size detector",
  },
  "/tools/url-to-json": {
    title: "URL to JSON - Parse URL Query Parameters | FreeDevTool.App",
    description:
      "Parse URL query parameters into JSON format. Extract and visualize URL components.",
    keywords: "URL parser, query string parser, URL to JSON, parse URL",
  },
  "/tools/csv-to-json": {
    title: "CSV to JSON Converter - Convert CSV to JSON | FreeDevTool.App",
    description:
      "Convert CSV data to JSON format instantly. Parse and transform tabular data for APIs and applications.",
    keywords: "CSV to JSON, CSV converter, CSV parser, convert CSV",
  },
  "/tools/number-base-converter": {
    title:
      "Number Base Converter - Convert Between Number Systems | FreeDevTool.App",
    description:
      "Convert numbers between binary, decimal, octal, and hexadecimal formats. Perfect for programmers.",
    keywords:
      "number base converter, binary converter, hex converter, decimal to binary",
  },
};

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
