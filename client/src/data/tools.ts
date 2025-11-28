import type { ToolExplanation } from "@/components/tool-explanations";

// Global tools data with keyboard shortcuts
export interface Tool {
  name: string;
  path: string;
  shortcut: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  experimental?: boolean;
  explanations?: ToolExplanation;
}

export interface ToolCategory {
  color: string;
  shortcut: string;
  tools: Tool[];
}

export interface ToolData {
  [key: string]: ToolCategory;
}

export const toolsData: ToolData = {
  Conversions: {
    color: "bg-blue-500 text-white dark:bg-blue-600",
    shortcut: "C",
    tools: [
      {
        name: "Date Converter",
        path: "/tools/date-converter",
        shortcut: "Ctrl+Shift+1",
        metadata: {
          title: "Date Converter - Convert Between Date Formats",
          description:
            "Convert dates between 20+ practical formats including ISO 8601, Unix timestamps, RFC 2822, and human-readable formats. Auto-detects input format for easy conversion.",
          keywords: [
            "date converter",
            "timestamp converter",
            "ISO 8601",
            "Unix timestamp",
            "date format converter",
            "RFC 2822",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Format Categories & Detection",
            items: [
              {
                label: "Auto-detection",
                text: "Paste Unix (seconds/milliseconds), ISO 8601, RFC strings, or human-readable dates – format is detected automatically",
              },
              {
                label: "Categories",
                text: "Timestamp, ISO Standards, RFC Standards, Regional, Database, Human Readable, Web/API",
              },
              {
                label: "Pre-epoch",
                text: "Negative Unix timestamps supported for dates before 1970",
              },
            ],
          },
          examples: [
            {
              from: "1699123456",
              to: "Parsed as Unix seconds → converted to all 20+ formats",
            },
            {
              from: "2024-01-15T14:30:45Z",
              to: "ISO 8601 detected (UTC) → grouped outputs by category",
            },
            {
              from: "Jan 15, 2024",
              to: "Human-readable date auto-detected → standardized outputs",
            },
          ],
          sections: [
            {
              title: "Supported Formats",
              items: [
                "Unix seconds & milliseconds",
                "ISO 8601 (full, date-only, time-only)",
                "RFC 2822 & RFC 3339",
                "Regional (US, EU, ISO numeric)",
                "Database (SQL datetime/date, synthetic MongoDB ObjectId timestamp)",
                "Human Readable (full, short, 12h, 24h)",
                "Web/API (HTTP Date, JSON, Cookie Expires)",
              ],
            },
            {
              title: "Features",
              items: [
                "Convert input into 20+ practical formats",
                "Automatic input parsing & validation",
                "Grouped outputs by category for quick scanning",
                "Copy any individual format value (toast feedback)",
                "Reset to example timestamp",
                "Use Current Time (Now) button",
                "Error feedback for invalid inputs (shows supported types)",
              ],
            },
            {
              title: "Edge Cases",
              items: [
                "Negative Unix timestamps",
                "Millisecond vs second length differentiation",
                "Human-readable month/day ambiguity handled by native Date parsing",
                "Synthetic ObjectId: only leading 8 hex chars are timestamp (rest static demo)",
              ],
            },
            {
              title: "Use Cases",
              items: [
                "Debug API payload timestamps",
                "Prepare database seed values",
                "Compare regional date display",
                "Generate multiple representations for docs/logs",
              ],
            },
          ],
        },
      },
      {
        name: "JSON ↔ YAML",
        path: "/tools/json-yaml-converter",
        shortcut: "Ctrl+Shift+Y",
        metadata: {
          title: "JSON to YAML Converter - Bidirectional Conversion",
          description:
            "Convert between JSON and YAML formats instantly. Bidirectional converter with syntax validation and error highlighting for configuration files.",
          keywords: [
            "JSON to YAML",
            "YAML to JSON",
            "config converter",
            "JSON YAML converter",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Bidirectional conversion between JSON and YAML",
                "Syntax validation and error reporting",
                "Preserves structure and keys",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Convert Kubernetes, Docker Compose, or CI configs",
                "Switch formats between teams or tools",
                "Validate configuration before deployment",
              ],
            },
          ],
        },
      },
      {
        name: "Timezone Converter",
        path: "/tools/timezone-converter",
        shortcut: "Ctrl+Shift+2",
        metadata: {
          title: "Timezone Converter - Convert Times Across Timezones",
          description:
            "Convert times between different timezones instantly. Support for all major timezones with automatic DST handling.",
          keywords: [
            "timezone converter",
            "time zone conversion",
            "UTC converter",
            "world time converter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "About Timezone Converter",
            items: [
              {
                label: "Features",
                text: "Second-level time precision; 100+ supported timezones; automatic DST handling; multiple target conversions; real-time offset; copy converted times",
              },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Second-level time precision",
                "100+ supported timezones worldwide",
                "Automatic daylight saving time handling",
                "Multiple target timezone conversion",
                "Real-time offset calculation",
                "Copy converted times to clipboard",
              ],
            },
            {
              title: "Usage Tips",
              items: [
                "Use 24-hour format for precise conversion",
                "Add/remove target timezones as needed",
                "Click 'Now' to use current date/time",
                "Copy button includes both date and time",
                "UTC offsets adjust for DST automatically",
                "Perfect for scheduling global meetings",
              ],
            },
          ],
        },
      },
      {
        name: "Unit Converter",
        path: "/tools/unit-converter",
        shortcut: "Ctrl+Shift+U",
        metadata: {
          title: "Unit Converter - Convert Units of Measurement",
          description:
            "Convert between units of length, weight, temperature, volume, and more. Fast and accurate unit conversion tool.",
          keywords: [
            "unit converter",
            "measurement converter",
            "length converter",
            "weight converter",
            "temperature converter",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Length, weight, temperature, volume, and more",
                "Accurate conversions with common units",
                "Friendly UI for quick comparisons",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Engineering and science tasks",
                "Cooking and DIY measurements",
                "Normalize data across unit systems",
              ],
            },
          ],
        },
      },
      {
        name: "URL to JSON",
        path: "/tools/url-to-json",
        shortcut: "Ctrl+Shift+3",
        metadata: {
          title: "URL to JSON - Parse URL Query Parameters",
          description:
            "Parse URL query parameters into JSON format. Extract and visualize URL components.",
          keywords: [
            "URL parser",
            "query string parser",
            "URL to JSON",
            "parse URL",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "About URL to JSON Converter",
            items: [
              {
                label: "Extracted Components",
                text: "Protocol, Hostname, TLD, Domain, Subdomain, Port, Path, Query Parameters",
              },
            ],
          },
          examples: [
            {
              from: "https://api.github.com/repos/owner/repo?per_page=100&sort=updated#readme",
              to: "Breaks into protocol=https, hostname=api.github.com, path=/repos/owner/repo, params={per_page:100, sort:updated}, hash=#readme",
            },
            {
              from: "https://shop.example.co.uk:8080/products/electronics?category=laptops&brand=apple&sort=price",
              to: "Parses multi-part TLD co.uk, port 8080, path segments, and query params",
            },
            {
              from: "ftp://files.example.com/downloads/software/installer.exe",
              to: "Shows protocol ftp, hostname files.example.com, and path",
            },
          ],
          sections: [
            {
              title: "Features",
              items: [
                "Parse full URL into protocol, host, path, hash, and query",
                "Convert query parameters to JSON",
                "Detect common and multi-part TLDs",
                "Copy JSON output with one click",
              ],
            },
            {
              title: "Use cases",
              items: [
                "API development and testing",
                "URL analysis and debugging",
                "Web scraping and automation",
                "SEO and analytics",
                "Documentation and training",
                "Link validation and parsing",
              ],
            },
          ],
        },
      },
      {
        name: "CSV to JSON",
        path: "/tools/csv-to-json",
        shortcut: "Ctrl+Shift+4",
        metadata: {
          title: "CSV to JSON Converter - Convert CSV to JSON",
          description:
            "Convert CSV data to JSON format instantly. Parse and transform tabular data for APIs and applications.",
          keywords: [
            "CSV to JSON",
            "CSV converter",
            "CSV parser",
            "convert CSV",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Parse comma- and tab-separated values",
                "Header row detection and field mapping",
                "Output pretty or compact JSON",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Prepare data for APIs",
                "Convert spreadsheets into JSON payloads",
                "Clean and transform CSV exports",
              ],
            },
          ],
        },
      },
      {
        name: "Number Base Converter",
        path: "/tools/number-base-converter",
        shortcut: "Ctrl+Shift+5",
        metadata: {
          title: "Number Base Converter - Convert Between Number Systems",
          description:
            "Convert numbers between binary, decimal, octal, and hexadecimal formats. Perfect for programmers.",
          keywords: [
            "number base converter",
            "binary converter",
            "hex converter",
            "decimal to binary",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "About Number Base Converter",
            items: [
              {
                label: "Supported Bases",
                text: "Binary (2), Octal (8), Decimal (10), Hex (16), Base32, Base36, and custom bases from 2–64",
              },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Convert from any base to any other base (2–64)",
                "Multiple output bases simultaneously",
                "Input validation for each base",
                "Character set display for each base",
                "URL sharing with current settings",
                "Example data for quick testing",
                "Copy individual results to clipboard",
              ],
            },
            {
              title: "Common Use Cases",
              items: [
                {
                  label: "Programming",
                  text: "Binary operations, hexadecimal colors, memory addresses",
                },
                {
                  label: "Networking",
                  text: "IP address conversion, subnet calculations, Base64 encoding",
                },
                {
                  label: "Mathematics",
                  text: "Number theory, computer science, algorithm design",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  Formatters: {
    color: "bg-green-500 text-white dark:bg-green-600",
    shortcut: "F",
    tools: [
      {
        name: "JSON Formatter",
        path: "/tools/json-formatter",
        shortcut: "Ctrl+Shift+J",
        metadata: {
          title: "JSON Formatter - Format and Validate JSON",
          description:
            "Format, validate, and beautify JSON with syntax highlighting. Industry-standard Prettier formatting with error detection.",
          keywords: [
            "JSON formatter",
            "JSON validator",
            "JSON beautifier",
            "prettify JSON",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "Pro Tips",
            items: [
              "Use Ctrl+A to select all text quickly",
              "The formatter will auto-detect and fix common JSON issues",
              "Validation shows specific error locations",
              "Minified JSON is optimized for data transmission",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Beautify JSON with consistent indentation",
                "Validate JSON syntax and show errors",
                "Minify to a single line",
                "Security banner reminds no data leaves the browser",
              ],
            },
            {
              title: "Actions",
              items: [
                { label: "Format", text: "Prettier-powered beautification" },
                { label: "Minify", text: "Compact single-line output" },
                {
                  label: "Validate",
                  text: "Quick syntax check via JSON.parse",
                },
                { label: "Reset", text: "Restore default example input" },
              ],
            },
            {
              title: "Use cases",
              items: [
                "Clean up API responses before sharing",
                "Verify config files quickly",
                "Generate compact payloads for transport",
              ],
            },
          ],
        },
      },
      {
        name: "JSONC Formatter",
        path: "/tools/jsonc-formatter",
        shortcut: "Ctrl+Shift+C",
        metadata: {
          title: "JSONC Formatter - Format JSON with Comments",
          description:
            "Format and validate JSONC (JSON with Comments) files. Perfect for VS Code configuration files and other commented JSON.",
          keywords: [
            "JSONC formatter",
            "JSON with comments",
            "VS Code config formatter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "About JSONC",
            items: [
              {
                label: "Comment types",
                text: "Supports single-line (//) and multi-line (/* */) comments",
              },
              {
                label: "Popular uses",
                text: "VS Code settings, TypeScript configs, Azure DevOps",
              },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Format JSON while preserving // and /* */ comments",
                "Helpful error messages on invalid structure",
                "Compact output area with copy-friendly monospace",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Beautify configuration files",
                "Share readable snippets with comments intact",
                "Validate commented JSON before committing",
              ],
            },
          ],
        },
      },
      {
        name: "HTML Beautifier",
        path: "/tools/html-formatter",
        shortcut: "Ctrl+Shift+H",
        metadata: {
          title: "HTML Formatter - Format and Beautify HTML",
          description:
            "Format and beautify HTML code with proper indentation. Industry-standard Prettier formatting for clean, readable markup.",
          keywords: [
            "HTML formatter",
            "HTML beautifier",
            "prettify HTML",
            "HTML code formatter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Validation Issues",
            items: [
              "Shows errors and warnings (unclosed tags, missing attributes, accessibility/SEO) with counts",
            ],
          },
          sections: [
            {
              title: "Formatting Options",
              items: [
                { label: "Beautify", text: "Adds indentation and line breaks" },
                { label: "Minify", text: "Removes whitespace and comments" },
                {
                  label: "Validation",
                  text: "Checks common HTML issues and best practices",
                },
              ],
            },
            {
              title: "Validation Features",
              items: [
                "Detects unclosed/mismatched tags",
                "Validates required attributes (e.g., alt, src)",
                "Highlights accessibility and SEO problems",
                "Suggests best-practice improvements",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Clean up templates",
                "Improve readability for code reviews",
                "Normalize markup before commit",
              ],
            },
          ],
        },
      },
      {
        name: "YAML Formatter",
        path: "/tools/yaml-formatter",
        shortcut: "Ctrl+Shift+6",
        metadata: {
          title: "YAML Formatter - Format and Validate YAML",
          description:
            "Format and validate YAML files with syntax checking. Perfect for configuration files and data serialization.",
          keywords: [
            "YAML formatter",
            "YAML validator",
            "YAML beautifier",
            "config formatter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "YAML Basics",
            items: [
              "Human-readable serialization; strict indentation with spaces (no tabs)",
              "Supports lists and dictionaries; widely used for configs",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Format YAML with consistent indentation",
                "Helpful errors on invalid structure",
                "Works for multi-document YAML",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Validate CI/CD or Kubernetes manifests",
                "Beautify config files",
                "Reduce indentation mistakes",
              ],
            },
          ],
        },
      },
      {
        name: "Markdown Formatter",
        path: "/tools/markdown-formatter",
        shortcut: "Ctrl+Shift+K",
        metadata: {
          title: "Markdown Formatter - Format Markdown Files",
          description:
            "Format and beautify Markdown files with consistent styling. Industry-standard Prettier formatting for documentation.",
          keywords: [
            "Markdown formatter",
            "MD formatter",
            "Markdown beautifier",
            "prettify markdown",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Quick Syntax Reference",
            items: [
              { label: "# Heading", text: "H1 (use ## for H2, ### for H3)" },
              { label: "**bold** / *italic*", text: "or __bold__ / _italic_" },
              { label: "[text](url)", text: "hyperlink" },
              { label: "![alt](image.png)", text: "image (! prefix)" },
              { label: "```language", text: "fenced code block with syntax highlighting" },
            ],
          },
          sections: [
            {
              title: "Markdown Origin Story",
              items: [
                "Created by John Gruber & Aaron Swartz in 2004 as 'email-style' writing",
                "Goal: Write prose that reads naturally AND converts to valid HTML",
                "Name is a wordplay on 'markup' (HTML) → 'markdown' (simpler)",
                "Now powers GitHub, Reddit, Stack Overflow, Notion, Discord, and most dev docs",
              ],
            },
            {
              title: "Flavor Differences",
              items: [
                {
                  label: "CommonMark:",
                  text: "Standardized spec (2014) to fix ambiguities in original",
                },
                {
                  label: "GitHub Flavored (GFM):",
                  text: "Adds tables, task lists [ ], strikethrough ~~text~~",
                },
                {
                  label: "MDX:",
                  text: "Markdown + JSX components for React docs",
                },
                {
                  label: "This formatter:",
                  text: "Uses Prettier with CommonMark + GFM support",
                },
              ],
            },
            {
              title: "Pro Tips",
              items: [
                "Two spaces at line end = <br> (soft break). Empty line = new paragraph",
                "Indent code blocks with 4 spaces OR use ``` fences (fences are cleaner)",
                "Reference-style links [text][id] keep paragraphs readable in source",
                "Escape special chars with backslash: \\* \\# \\[ to show literally",
                "Tables: | Col1 | Col2 | with |---| separator row (GFM only)",
              ],
            },
          ],
        },
      },
      {
        name: "CSS/LESS/SCSS Formatter",
        path: "/tools/css-formatter",
        shortcut: "Ctrl+Shift+7",
        metadata: {
          title: "CSS Formatter - Format and Beautify CSS",
          description:
            "Format and beautify CSS code with proper indentation. Industry-standard Prettier formatting for stylesheets.",
          keywords: [
            "CSS formatter",
            "CSS beautifier",
            "prettify CSS",
            "CSS code formatter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Format Selector",
            items: [
              "Choose CSS, SCSS, or LESS to use the appropriate parser and rules",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Format CSS, LESS, and SCSS",
                "Consistent indentation, spacing, and nested rules",
                "Beautify or minify output",
              ],
            },
            {
              title: "Options",
              items: [
                {
                  label: "Beautify",
                  text: "Readable indentation and line breaks",
                },
                { label: "Minify", text: "Strip whitespace and comments" },
                { label: "Reset", text: "Restore default example per format" },
              ],
            },
            {
              title: "Use cases",
              items: [
                "Beautify styles for maintainability",
                "Normalize code across teams",
                "Prepare clean diffs",
              ],
            },
          ],
        },
      },
      {
        name: "JavaScript/TypeScript Formatter",
        path: "/tools/typescript-formatter",
        shortcut: "Ctrl+Shift+8",
        metadata: {
          title: "TypeScript Formatter - Format TypeScript Code",
          description:
            "Format TypeScript and JavaScript code with Prettier. Industry-standard formatting for clean, consistent code.",
          keywords: [
            "TypeScript formatter",
            "JavaScript formatter",
            "TS formatter",
            "Prettier",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "Why Prettier Exists",
            items: [
              "Created by James Long in 2017 to end style debates—it's opinionated by design",
              "Parses your code into an AST, then reprints it from scratch—not just regex find/replace",
              "Used by React, Vue, Angular, Babel, Webpack, and most major JS projects",
              "Handles edge cases you'd never think of: long strings, nested ternaries, method chains",
            ],
          },
          sections: [
            {
              title: "Style Debates Prettier Ends",
              items: [
                "Tabs vs spaces: Prettier picks for you (spaces by default, configurable)",
                "Semicolons: Yes or no—both camps can configure their preference",
                "Trailing commas: Always, never, or ES5-compatible—your choice",
                "Single vs double quotes: Set once, never argue again",
                "Line length: 80 chars default, but 100 or 120 also common",
              ],
            },
            {
              title: "What Minify Actually Does",
              items: [
                "Removes all whitespace, newlines, and comments",
                "Shortens code without changing behavior",
                "Reduces file size by 30-60% typically",
                "Essential for production bundles (though bundlers usually handle this)",
                "Warning: Minified code is nearly impossible to debug",
              ],
            },
            {
              title: "Pro Tips",
              items: [
                "Paste minified code → Beautify to make it readable (great for debugging production issues)",
                "Format before committing to keep git diffs clean",
                "TypeScript-specific: Prettier preserves type annotations perfectly",
                "JSX/TSX: Handles React component formatting including props alignment",
              ],
            },
          ],
        },
      },

      {
        name: "GraphQL Formatter",
        path: "/tools/graphql-formatter",
        shortcut: "Ctrl+Shift+9",
        metadata: {
          title: "GraphQL Formatter - Format GraphQL Schemas",
          description:
            "Format and beautify GraphQL schemas and queries. Industry-standard Prettier formatting for GraphQL.",
          keywords: [
            "GraphQL formatter",
            "GraphQL beautifier",
            "GraphQL schema formatter",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Supported Elements",
              items: [
                "Type definitions and interfaces",
                "Queries, mutations, and subscriptions",
                "Input types and enums",
                "Schema definitions",
                "Directive declarations",
              ],
            },
            {
              title: "Formatting Benefits",
              items: [
                "Consistent field alignment",
                "Proper indentation for nested types",
                "Clean argument formatting",
                "Readable schema structure",
                "Industry-standard formatting",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Clean schema files for readability",
                "Prepare query docs",
                "Improve review experience",
              ],
            },
          ],
        },
      },
      {
        name: "Time Formatter",
        path: "/tools/time-formatter",
        shortcut: "Ctrl+Shift+T",
        metadata: {
          title: "Time Formatter - Format Time Values",
          description:
            "Format time values in different formats. Convert between 12-hour and 24-hour time formats.",
          keywords: [
            "time formatter",
            "12 hour to 24 hour",
            "time format converter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "About Time Formatter",
            items: [
              {
                label: "Tips",
                text: "Use the Now button to set current date/time; copy any formatted value with one click; select timezone to make outputs TZ-aware",
              },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Convert 12-hour ↔ 24-hour",
                "Normalize time strings",
                "Handle edge cases like midnight and noon",
                "Timezone-aware formatting",
                "Copy formatted values to clipboard",
              ],
            },
            {
              title: "Standard Formats",
              items: [
                "24-hour and 12-hour formats",
                "ISO 8601 and RFC 3339",
                "Unix timestamps (seconds and milliseconds)",
                "UTC and local time representations",
                "Microsecond precision support",
              ],
            },
            {
              title: "Special Formats",
              items: [
                "French Revolutionary decimal time",
                "Swatch Internet Time (.beats)",
                "Julian Day Number (JDN)",
                "Modified Julian Day (MJD)",
                "Excel serial date",
                "Time with explicit timezone offset (±HH:MM)",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Standardize times for logs",
                "Prepare UI display values",
                "Convert user input reliably",
              ],
            },
          ],
        },
      },
    ],
  },
  Encoders: {
    color: "bg-purple-500 text-white dark:bg-purple-600",
    shortcut: "E",
    tools: [
      {
        name: "Base64 Encoder",
        path: "/tools/base64",
        shortcut: "Ctrl+Shift+B",
        metadata: {
          title: "Base64 Encoder/Decoder - Encode and Decode Base64",
          description:
            "Encode and decode Base64 strings instantly. Bidirectional converter with file support and validation.",
          keywords: [
            "Base64 encoder",
            "Base64 decoder",
            "encode Base64",
            "decode Base64",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "How Base64 Works",
            items: [
              "Uses 64 characters (A-Z, a-z, 0-9, +, /) to represent binary data as text",
              "Every 3 bytes become 4 characters—that's why encoded data is ~33% larger",
              "The '=' padding at the end fills incomplete 3-byte groups",
              "NOT encryption—anyone can decode it instantly (it's just encoding)",
            ],
          },
          sections: [
            {
              title: "Common Uses",
              items: [
                "Data URIs: Embed small images directly in HTML/CSS without extra HTTP requests",
                "Email attachments: MIME uses Base64 to send binary files through text-only protocols",
                "API payloads: Safely transmit binary data in JSON (which only supports text)",
                "Basic Auth headers: 'Authorization: Basic dXNlcjpwYXNz' (that's 'user:pass' encoded)",
                "JWT tokens: The middle section of a JWT is Base64-encoded JSON",
              ],
            },
            {
              title: "Watch Out For",
              items: [
                "Base64 is NOT secure—don't use it to hide passwords or secrets",
                "URL-safe Base64 uses '-' and '_' instead of '+' and '/' (different variant)",
                "Large files become 33% bigger—don't Base64 encode megabyte-sized images",
                "Line breaks in Base64 can break decoding—remove them first",
              ],
            },
          ],
        },
      },
      {
        name: "URL Encoder",
        path: "/tools/url-encoder",
        shortcut: "Ctrl+Shift+~",
        metadata: {
          title: "URL Encoder/Decoder - Encode and Decode URLs",
          description:
            "Encode and decode URL strings and query parameters. Perfect for web development and API testing.",
          keywords: [
            "URL encoder",
            "URL decoder",
            "percent encoding",
            "URI encoder",
          ],
        },
        explanations: {
          notice: {
            type: "examples",
            title: "URL Encoding Examples",
            items: [
              { label: "Space", text: "%20" },
              { label: "@", text: "%40" },
              { label: "&", text: "%26" },
              { label: "=", text: "%3D" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Encode plain text to URL-safe format",
                "Decode URL-encoded strings back to plain text",
                "Real-time preview while typing",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Prepare query parameters for HTTP requests",
                "Sanitize user input for URLs",
                "Debug API payloads with encoded fields",
              ],
            },
          ],
        },
      },
      {
        name: "JWT Decoder",
        path: "/tools/jwt-decoder",
        shortcut: "Ctrl+Shift+A",
        metadata: {
          title: "JWT Decoder - Decode JSON Web Tokens",
          description:
            "Decode and inspect JWT (JSON Web Token) headers and payloads. View claims and token structure without verification.",
          keywords: [
            "JWT decoder",
            "JSON Web Token decoder",
            "JWT inspector",
            "token decoder",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Decode header and payload",
                "Pretty-print claims",
                "Works without signature verification",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Inspect tokens during development",
                "Debug auth flows",
                "Verify claim contents quickly",
              ],
            },
          ],
        },
      },
      {
        name: "TLS Certificate Decoder",
        path: "/tools/tls-decoder",
        shortcut: "Ctrl+Shift+G",
        metadata: {
          title: "TLS Certificate Decoder - Decode SSL Certificates",
          description:
            "Decode and inspect TLS/SSL certificates. View certificate details, validity, and issuer information.",
          keywords: [
            "TLS decoder",
            "SSL certificate decoder",
            "X.509 decoder",
            "certificate inspector",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Parse PEM certificates and show fields",
                "Inspect subject, issuer, validity",
                "Support for chains",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Debug TLS issues",
                "Check expiration dates",
                "Verify SANs and key usage",
              ],
            },
          ],
        },
      },
      {
        name: "MD5 Hash",
        path: "/tools/md5-hash",
        shortcut: "Ctrl+Shift+R",
        metadata: {
          title: "MD5 Hash Generator - Generate MD5 Hashes",
          description:
            "Generate MD5 hashes from text strings. Quick and secure hash generation for verification.",
          keywords: [
            "MD5 hash generator",
            "MD5 calculator",
            "hash generator",
            "checksum",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "MD5 is Broken for Security",
            items: [
              "1996: Theoretical collision attacks published",
              "2004: First practical collision found (two different files → same hash)",
              "2008: Researchers created fake SSL certificate using MD5 collision",
              "Today: A collision can be found in seconds on a laptop—NEVER use for passwords or signatures",
            ],
          },
          sections: [
            {
              title: "The Rise and Fall of MD5",
              items: [
                "Created by Ron Rivest in 1991 to replace MD4 (which was even weaker)",
                "MD5 = 'Message Digest Algorithm 5' — 128-bit hash (32 hex chars)",
                "Was the gold standard for checksums throughout the 1990s-2000s",
                "Still appears in older systems, ISO downloads, and legacy APIs",
              ],
            },
            {
              title: "When MD5 is Still Acceptable",
              items: [
                "File integrity checks where security isn't critical (detecting accidental corruption)",
                "Cache keys or deduplication (where collisions are annoying, not dangerous)",
                "Non-security checksums (comparing if two files are likely identical)",
                "Legacy system compatibility where you can't change the algorithm",
              ],
            },
            {
              title: "What to Use Instead",
              items: [
                {
                  label: "File integrity:",
                  text: "SHA-256 (used by Git, package managers, Bitcoin)",
                },
                {
                  label: "Passwords:",
                  text: "bcrypt, scrypt, or Argon2 (intentionally slow)",
                },
                {
                  label: "Digital signatures:",
                  text: "SHA-256 or SHA-3 (collision-resistant)",
                },
                {
                  label: "HMAC authentication:",
                  text: "HMAC-SHA256 (keyed hashing)",
                },
              ],
            },
          ],
        },
      },
      {
        name: "BCrypt Hash",
        path: "/tools/bcrypt-hash",
        shortcut: "Ctrl+Shift+F",
        metadata: {
          title: "BCrypt Hash Generator - Generate Secure Password Hashes",
          description:
            "Generate and verify BCrypt password hashes. Secure password hashing with configurable rounds.",
          keywords: [
            "BCrypt hash",
            "password hash generator",
            "secure hash",
            "BCrypt generator",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "Why BCrypt is Special",
            items: [
              "Created in 1999 specifically for passwords—MD5/SHA were designed for speed, bcrypt for slowness",
              "Intentionally slow: each round doubles the time, so 10→11 rounds = 2x slower to crack",
              "Built-in salt means identical passwords produce different hashes every time",
              "Future-proof: as hardware gets faster, just increase rounds (LinkedIn used 6 in 2012—now we use 10-12)",
            ],
          },
          sections: [
            {
              title: "Understanding Rounds (Cost Factor)",
              items: [
                {
                  label: "8 rounds:",
                  text: "~40ms — Too fast, only for development/testing",
                },
                {
                  label: "10 rounds:",
                  text: "~100ms — Minimum for production (default)",
                },
                {
                  label: "12 rounds:",
                  text: "~300ms — Good balance for most applications",
                },
                {
                  label: "14+ rounds:",
                  text: "~1s+ — High security, but may frustrate users on login",
                },
              ],
            },
            {
              title: "Real-World Security",
              items: [
                "LinkedIn breach (2012): Used unsalted SHA-1—117M passwords cracked in days",
                "Ashley Madison (2015): Used bcrypt—years later, only 4k of 36M passwords cracked",
                "Rule of thumb: Increase rounds by 1 every 18 months as hardware improves",
                "bcrypt truncates passwords at 72 bytes—longer passwords don't add security",
              ],
            },
            {
              title: "The $2b$ Format Explained",
              items: [
                "$2b$ = bcrypt version (2a, 2b, 2y exist—2b is current standard)",
                "Next 2 digits = cost factor (10 = 2¹⁰ = 1024 iterations)",
                "Next 22 chars = salt (128-bit, base64 encoded)",
                "Remaining 31 chars = actual hash (184-bit, base64 encoded)",
              ],
            },
          ],
        },
      },
    ],
  },
  "Text Tools": {
    color: "bg-orange-500 text-white dark:bg-orange-600",
    shortcut: "T",
    tools: [
      {
        name: "Text Diff",
        path: "/tools/text-diff",
        shortcut: "Ctrl+Shift+!",
        metadata: {
          title: "Text Diff - Compare Two Texts",
          description:
            "Compare two text files and highlight differences. Side-by-side diff viewer with line-by-line comparison.",
          keywords: [
            "text diff",
            "text compare",
            "diff tool",
            "compare text files",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Reading the Diff",
            items: [
              { label: "Green (+)", text: "Line added in the new version" },
              { label: "Red (−)", text: "Line removed from old version" },
              { label: "Yellow (~)", text: "Line modified between versions" },
              { label: "Gray", text: "Unchanged context lines" },
            ],
          },
          sections: [
            {
              title: "The Origin of Diff",
              items: [
                "Created by Douglas McIlroy at Bell Labs in 1974 for Unix",
                "Based on 'longest common subsequence' algorithm (Hunt-McIlroy)",
                "Became the foundation for all version control: RCS, CVS, SVN, Git",
                "Git uses an optimized variant that handles millions of lines efficiently",
              ],
            },
            {
              title: "Real-World Uses",
              items: [
                "Code review: Spot exactly what changed in a pull request",
                "Config auditing: Compare production vs staging environment files",
                "Contract review: Find what changed between document versions",
                "Debugging: Compare working output vs broken output to isolate bugs",
                "Migration testing: Verify API responses match after refactoring",
              ],
            },
            {
              title: "Pro Tips",
              items: [
                "Normalize whitespace first if formatting differences aren't meaningful",
                "Sort lines alphabetically before diffing unordered lists (like dependencies)",
                "For large files, focus on the colored lines—gray context is unchanged",
                "Copy just the changed lines to share specific modifications",
              ],
            },
          ],
        },
      },
      {
        name: "Regex Tester",
        path: "/tools/regex-tester",
        shortcut: "Ctrl+Shift+E",
        metadata: {
          title: "Regex Tester - Test Regular Expressions",
          description:
            "Test and debug regular expressions with live highlighting. Supports JavaScript regex with match details.",
          keywords: [
            "regex tester",
            "regular expression tester",
            "regex debugger",
            "pattern matcher",
          ],
        },
        explanations: {
          notice: {
            type: "examples",
            title: "Regex Quick Reference",
            items: [
              { label: ".", text: "Any character except newline" },
              { label: "\\d \\w \\s", text: "Digit, word char, whitespace" },
              { label: "* + ?", text: "0+, 1+, 0 or 1 occurrences" },
              { label: "[abc] [^abc]", text: "Character class / negated class" },
              { label: "( ) \\1", text: "Capture group / backreference" },
            ],
          },
          sections: [
            {
              title: "Copy-Paste Patterns",
              items: [
                "Email: ^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$",
                "URL: https?://[\\w.-]+(?:/[\\w./-]*)?",
                "Phone (US): \\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
                "Date (YYYY-MM-DD): \\d{4}-\\d{2}-\\d{2}",
                "IP Address: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}",
                "Hex Color: #[0-9A-Fa-f]{6}\\b",
              ],
            },
            {
              title: "Flags Explained",
              items: [
                {
                  label: "g (global):",
                  text: "Find ALL matches, not just the first one",
                },
                {
                  label: "i (case-insensitive):",
                  text: "'hello' matches 'Hello', 'HELLO', etc.",
                },
                {
                  label: "m (multiline):",
                  text: "^ and $ match start/end of each LINE, not just the string",
                },
              ],
            },
            {
              title: "Common Regex Mistakes",
              items: [
                "Forgetting to escape special chars: . * + ? must be \\. \\* \\+ \\?",
                "Greedy vs lazy: .* matches everything; .*? matches minimum",
                "^ and $ only work per-line with multiline flag enabled",
                "Character classes don't need escaping: [.] matches a literal dot",
                "Backreferences start at \\1, not \\0 (\\0 is the whole match)",
              ],
            },
            {
              title: "Regex Origin Story",
              items: [
                "Invented by Stephen Kleene in 1951 to describe 'regular languages'",
                "First implemented in text editors (ed, sed, grep) in the 1970s",
                "Name 'grep' = 'global regular expression print'",
                "Now built into every programming language, IDE, and text editor",
              ],
            },
          ],
        },
      },
      {
        name: "Text Sorter",
        path: "/tools/text-sort",
        shortcut: "Ctrl+Shift+O",
        metadata: {
          title: "Text Sort - Sort Lines of Text",
          description:
            "Sort lines of text alphabetically or randomly. Multiple sorting options including reverse and case-insensitive.",
          keywords: [
            "text sorter",
            "sort lines",
            "alphabetical sort",
            "line sorter",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Sort Modes Explained",
            items: [
              { label: "Alphabetical", text: "A-Z using locale-aware comparison (handles accents correctly)" },
              { label: "Numerical", text: "Treats lines as numbers (1, 2, 10 not 1, 10, 2)" },
              { label: "By Length", text: "Shortest to longest lines (great for finding outliers)" },
              { label: "Random", text: "Fisher-Yates shuffle for true randomness" },
            ],
          },
          sections: [
            {
              title: "Developer Use Cases",
              items: [
                "Sort package.json dependencies alphabetically (npm/yarn convention)",
                "Organize CSS properties in consistent order",
                "Sort .gitignore patterns for easier scanning",
                "Alphabetize import statements at top of files",
                "Randomize test data or seed lists for A/B testing",
              ],
            },
            {
              title: "Data Cleanup Workflows",
              items: [
                "Deduplicate email lists: Sort + Remove Duplicates + export clean list",
                "Find duplicates: Sort first, then duplicates are adjacent and obvious",
                "Merge lists: Paste both, sort, dedupe—instant merge without Excel",
                "Length sort reveals: Blank lines at top, unusually long entries at bottom",
              ],
            },
            {
              title: "Fun & Creative Uses",
              items: [
                "Randomize raffle winners or team assignments fairly",
                "Shuffle playlist or reading list for variety",
                "Create word scrambles: Sort letters of a word randomly",
                "Reverse a poem line by line for artistic effect",
                "Sort high scores numerically to find the winner",
              ],
            },
          ],
        },
      },
      {
        name: "Word Counter",
        path: "/tools/text-counter",
        shortcut: "Ctrl+Shift+W",
        metadata: {
          title: "Text Counter - Count Characters, Words, and Lines",
          description:
            "Count characters, words, lines, and paragraphs in text. Real-time statistics with reading time estimation.",
          keywords: [
            "character counter",
            "word counter",
            "text statistics",
            "line counter",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "Character Limits You Should Know",
            items: [
              "Twitter/X: 280 chars (was 140 until 2017—doubled engagement)",
              "Meta description (SEO): 155-160 chars before Google truncates",
              "LinkedIn post: 3,000 chars, but only ~140 show before 'see more'",
              "SMS: 160 chars per segment (longer = multiple messages = higher cost)",
            ],
          },
          sections: [
            {
              title: "For Writers & Students",
              items: [
                "Essay word counts: 500 (short), 1000-1500 (standard), 2500+ (research paper)",
                "Blog posts: 1500-2500 words rank best in Google (Backlinko study)",
                "Average reading speed: 200-250 words/minute (used for time estimates)",
                "Academic tip: 'Characters no spaces' often required for abstracts",
              ],
            },
            {
              title: "For Developers & SEO",
              items: [
                "Title tags: 50-60 chars for full display in search results",
                "Alt text: Keep under 125 chars for screen reader compatibility",
                "Commit messages: 50 chars subject line, 72 chars body (Git convention)",
                "URL slugs: Shorter is better—under 60 chars ideal for sharing",
              ],
            },
            {
              title: "Fun Text Facts",
              items: [
                "Average English word: 4.5 characters",
                "Longest English word: 45 letters (pneumonoultramicroscopicsilicovolcanoconiosis)",
                "Hemingway's 6-word story: 'For sale: baby shoes, never worn.' = 33 chars",
                "This tool counts UTF-8 bytes—emojis are 4 bytes each! 😀",
              ],
            },
          ],
        },
      },
      {
        name: "QR Generator",
        path: "/tools/qr-generator",
        shortcut: "Ctrl+Shift+Q",
        metadata: {
          title: "QR Code Generator - Create QR Codes",
          description:
            "Generate QR codes for URLs, text, and data. Customizable size and error correction levels.",
          keywords: [
            "QR code generator",
            "QR generator",
            "create QR code",
            "barcode generator",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "QR Code Types & Usage",
            items: [
              {
                label: "Supported Types",
                text: "Plain Text, Website URL, Email (mailto), Phone (tel), SMS (pre-filled), WiFi (WIFI:T;S;P), Contact Card (vCard)",
              },
              {
                label: "Auto-generate",
                text: "QR codes update as you type; use size selector for readability",
              },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Generate QR codes for text, URLs, email, phone, SMS, WiFi, and vCard",
                "Adjust output size (150–500px)",
                "Auto-generate on input change",
                "Download as SVG and copy data URL",
              ],
            },
            {
              title: "Usage Tips",
              items: [
                "Larger sizes work better for complex content",
                "WiFi format: NetworkName:Password:Security",
                "SMS format: PhoneNumber:Message",
                "Contact format: Name:Phone:Email",
                "Test codes with multiple apps/devices",
              ],
            },
          ],
        },
      },
      {
        name: "Barcode Generator",
        path: "/tools/barcode-generator",
        shortcut: "Ctrl+Shift+I",
        metadata: {
          title: "Barcode Generator - Create Barcodes",
          description:
            "Generate barcodes in multiple formats including Code128, EAN, and UPC. Download as PNG or SVG.",
          keywords: [
            "barcode generator",
            "create barcode",
            "Code128",
            "EAN generator",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "Did You Know?",
            items: [
              "The first product scanned was a pack of Wrigley's gum on June 26, 1974 at a Marsh supermarket in Ohio",
              "UPC barcodes encode a check digit—scanners reject codes with math errors",
              "Pharmacode barcodes are intentionally hard to decode without special equipment to prevent medication errors",
              "The 'quiet zone' (white space) around barcodes is critical—without it, scanners fail",
            ],
          },
          sections: [
            {
              title: "Which Format to Use",
              items: [
                {
                  label: "CODE 128:",
                  text: "Best default choice—encodes any ASCII character, used in shipping labels (FedEx, UPS)",
                },
                {
                  label: "EAN-13/UPC:",
                  text: "Required for retail products sold in stores—EAN in Europe/Asia, UPC in North America",
                },
                {
                  label: "CODE 39:",
                  text: "US military and automotive industry standard—no check digit required",
                },
                {
                  label: "ITF-14:",
                  text: "Printed directly on corrugated cardboard boxes—tolerates low print quality",
                },
              ],
            },
            {
              title: "Real-World Uses",
              items: [
                "Asset tracking: Label laptops, equipment, and inventory with CODE 128",
                "Event tickets: Generate unique CODE 128 barcodes for entry validation",
                "Library systems: Most libraries use CODE 39 for book tracking",
                "Warehouse shelving: ITF-14 on boxes, EAN-13 on individual products inside",
                "Membership cards: Encode member IDs for quick scanning at checkout",
              ],
            },
            {
              title: "Printing Tips",
              items: [
                "Minimum bar width of 2px for reliable scanning at 300 DPI",
                "Print at 100% scale—never stretch or compress barcodes",
                "Use matte paper to avoid glare that confuses scanners",
                "Test with your actual scanner before printing batches",
              ],
            },
          ],
        },
      },
      {
        name: "Lorem Generator",
        path: "/tools/lorem-generator",
        shortcut: "Ctrl+Shift+L",
        metadata: {
          title: "Lorem Ipsum Generator - Generate Placeholder Text",
          description:
            "Generate Lorem Ipsum placeholder text for design mockups. Customize paragraphs, words, and sentences.",
          keywords: [
            "lorem ipsum generator",
            "placeholder text",
            "dummy text",
            "lorem generator",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "The 500-Year-Old Text",
            items: [
              "First used in the 1500s by an unknown typesetter arranging type specimens",
              "Source: Cicero's 'de Finibus Bonorum et Malorum' (45 BC) — a treatise on ethics",
              "'Lorem ipsum dolor sit amet' is actually scrambled Latin, not real sentences",
              "Rediscovered in the 1960s when Letraset used it on dry-transfer sheets",
            ],
          },
          sections: [
            {
              title: "Why Designers Use Fake Text",
              items: [
                "Readable content distracts — reviewers focus on words instead of layout",
                "Real copy isn't always ready when designs need to be finalized",
                "Latin-like text mimics natural word length distribution (unlike 'asdf asdf')",
                "It's a signal: 'This is a placeholder, replace me before launch'",
              ],
            },
            {
              title: "Fun Alternatives People Use",
              items: [
                "Hipster Ipsum: 'Artisan kombucha helvetica sustainable...'",
                "Bacon Ipsum: 'Bacon ipsum dolor amet ribeye pork belly...'",
                "Cupcake Ipsum: 'Cupcake gummies candy canes lemon drops...'",
                "Zombie Ipsum: 'Zombie ipsum braaains reversus ab...'",
                "Corporate Ipsum: 'Synergize holistic bandwidth leveraging...'",
              ],
            },
            {
              title: "Real Translation (Sort Of)",
              items: [
                "'Lorem ipsum dolor sit amet' ≈ 'Pain itself is love' (garbled)",
                "The original Cicero text discusses the pursuit of pleasure and pain",
                "About 80% of Lorem Ipsum words are real Latin; the rest are scrambled",
                "There's even a hidden message in some versions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' appears 5× in original",
              ],
            },
          ],
        },
      },
      {
        name: "Unicode Characters",
        path: "/tools/unicode-characters",
        shortcut: "Ctrl+Shift+N",
        metadata: {
          title: "Unicode Characters - Browse Unicode Symbols",
          description:
            "Browse and copy Unicode characters and symbols. Search thousands of special characters and emojis.",
          keywords: [
            "unicode characters",
            "special characters",
            "unicode symbols",
            "character map",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Browse and search Unicode symbols",
                "Copy easily",
                "Categorized character sets",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Insert symbols in text",
                "Explore character support",
                "Design iconography",
              ],
            },
          ],
        },
      },
      {
        name: "Password Generator",
        path: "/tools/password-generator",
        shortcut: "Ctrl+Shift+P",
        metadata: {
          title: "Password Generator - Generate Secure Passwords",
          description:
            "Generate strong, random passwords with custom length and character sets. Create secure passwords instantly.",
          keywords: [
            "password generator",
            "random password",
            "secure password",
            "password creator",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "Password Cracking Reality",
            items: [
              "8 chars with just lowercase: cracked in 5 seconds with modern GPU",
              "8 chars with mixed case + numbers + symbols: ~8 hours",
              "12 chars with full character set: ~34,000 years",
              "16+ chars: Effectively uncrackable with current technology",
            ],
          },
          sections: [
            {
              title: "Why These Options Matter",
              items: [
                {
                  label: "Exclude similar (I, l, 1, O, 0):",
                  text: "Prevents confusion when typing passwords manually",
                },
                {
                  label: "Exclude ambiguous symbols:",
                  text: "Some systems reject { } [ ] or treat them specially",
                },
                {
                  label: "Multiple passwords:",
                  text: "Generate a batch for new user accounts or API keys",
                },
              ],
            },
            {
              title: "Most Common Passwords (Don't Use These!)",
              items: [
                "123456 — #1 for over a decade, used by 23 million accounts",
                "password — Still in top 5 every year",
                "qwerty — Keyboard patterns are instantly cracked",
                "Your birthday/name — Found in seconds via social media",
                "Company name + year — 'Acme2024' is the first guess attackers try",
              ],
            },
            {
              title: "Pro Security Tips",
              items: [
                "Use a password manager—one strong master password, unique passwords everywhere",
                "Enable 2FA even with strong passwords (passwords can be phished)",
                "16+ characters > complexity (length beats special characters)",
                "Passphrases work too: 'correct-horse-battery-staple' is strong and memorable",
              ],
            },
          ],
        },
      },
      {
        name: "UUID Generator",
        path: "/tools/uuid-generator",
        shortcut: "Ctrl+Shift+@",
        metadata: {
          title: "UUID Generator - Generate Unique Identifiers",
          description:
            "Generate UUID/GUID (Universally Unique Identifiers) in multiple versions. Bulk generation supported.",
          keywords: [
            "UUID generator",
            "GUID generator",
            "unique ID generator",
            "UUID v4",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "UUID Versions Explained",
            items: [
              { label: "v1 (Timestamp)", text: "Based on time + MAC address — sortable but reveals creation time" },
              { label: "v4 (Random)", text: "122 random bits — most popular, no information leakage" },
              { label: "v5 (Namespace)", text: "SHA-1 hash of namespace + name — deterministic, same input = same UUID" },
              { label: "v7 (New!)", text: "Timestamp + random — sortable like v1 but no MAC address exposure" },
            ],
          },
          sections: [
            {
              title: "The Math of Uniqueness",
              items: [
                "UUID v4 has 2¹²² possible values (5.3 × 10³⁶ combinations)",
                "To have 50% chance of collision: generate 2.7 quintillion UUIDs",
                "At 1 billion UUIDs/second, that takes 86 years of continuous generation",
                "In practice: you'll never see a collision in any real-world application",
              ],
            },
            {
              title: "Where UUIDs Are Used",
              items: [
                "Database primary keys (PostgreSQL has native UUID type)",
                "Distributed systems where nodes can't coordinate ID assignment",
                "File names that must be unique without a central registry",
                "Session tokens, API keys, and correlation IDs in logs",
                "Bluetooth device pairing, USB device identification",
              ],
            },
            {
              title: "Format Options Explained",
              items: [
                {
                  label: "Standard:",
                  text: "8-4-4-4-12 format with hyphens (RFC 4122 compliant)",
                },
                {
                  label: "No dashes:",
                  text: "32 hex chars — used in URLs, filenames, some databases",
                },
                {
                  label: "Brackets {uuid}:",
                  text: "Microsoft GUID format (Windows registry, .NET)",
                },
                {
                  label: "Uppercase:",
                  text: "Some legacy systems require uppercase hex",
                },
              ],
            },
          ],
        },
      },
      {
        name: "Search & Replace",
        path: "/tools/search-replace",
        shortcut: "Ctrl+Shift+Z",
        metadata: {
          title: "Search and Replace - Find and Replace Text",
          description:
            "Search and replace text with support for regex patterns. Case-sensitive and global replacement options.",
          keywords: [
            "find replace",
            "search replace",
            "text replace",
            "regex replace",
          ],
        },
        explanations: {
          notice: {
            type: "examples",
            title: "Regex Power Moves",
            items: [
              { label: "\\d+", text: "Match any number (123, 4567, etc.)" },
              { label: "(\\w+)@(\\w+)", text: "Capture groups → use $1, $2 in replace" },
              { label: "^|$", text: "Start/end of line (add prefix/suffix to every line)" },
              { label: "\\s+", text: "Any whitespace (spaces, tabs, newlines)" },
            ],
          },
          sections: [
            {
              title: "Common Transformations",
              items: [
                "snake_case → camelCase: Search '_([a-z])' → Replace with captured uppercase",
                "Remove HTML tags: Search '<[^>]+>' → Replace with empty string",
                "Format phone numbers: Search '(\\d{3})(\\d{3})(\\d{4})' → '($1) $2-$3'",
                "Trim trailing whitespace: Search '\\s+$' → Replace with nothing",
                "Double-space to single: Search '  +' → Replace with single space",
              ],
            },
            {
              title: "Bulk Editing Saves Hours",
              items: [
                "Rename variables across a codebase (with case sensitivity ON)",
                "Convert CSV columns: 'John,Doe' → 'Doe, John' using capture groups",
                "Add quotes around values: Search '(\\w+)' → Replace '\"$1\"'",
                "Fix date formats: '12/25/2024' → '2024-12-25' with regex groups",
                "Remove duplicate blank lines: Search '\\n\\n+' → Replace '\\n\\n'",
              ],
            },
            {
              title: "Options Explained",
              items: [
                {
                  label: "Regex mode:",
                  text: "Enables pattern matching (off = literal text search)",
                },
                {
                  label: "Case sensitive:",
                  text: "OFF: 'hello' matches 'Hello', 'HELLO'. ON: exact match only",
                },
                {
                  label: "Global:",
                  text: "ON: Replace ALL matches. OFF: Replace only the first match",
                },
              ],
            },
          ],
        },
      },
      {
        name: "Text Split",
        path: "/tools/text-split",
        shortcut: "Ctrl+Shift+X",
        metadata: {
          title: "Text Split - Split Text by Delimiter",
          description:
            "Split text into parts using custom delimiters. Perfect for processing CSV, lists, and structured data.",
          keywords: [
            "text splitter",
            "string split",
            "delimiter split",
            "text separator",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Common Delimiters",
            items: [
              {
                label: "Built-ins",
                text: ", (comma), ; (semicolon), | (pipe), space",
              },
              { label: "Special", text: "\\n (new line), \\t (tab)" },
              { label: "Other", text: ": (colon), - (dash)" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Split by any custom delimiter, including \\n and \\t",
                "Trim whitespace and remove empty parts toggles",
                "Live preview with part count and per-part length",
                "Copy individual parts or all results",
                "Export cleaned lists (newline-separated)",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Process CSV-like or list data",
                "Extract tokens for parsing",
                "Prepare arrays and inputs for code",
              ],
            },
          ],
        },
      },
    ],
  },
  "Time Tools": {
    color: "bg-teal-500 text-white dark:bg-teal-600",
    shortcut: "I",
    tools: [
      {
        name: "World Clock",
        path: "/tools/world-clock",
        shortcut: "Ctrl+Shift+0",
        metadata: {
          title: "World Clock - View Time in Multiple Timezones",
          description:
            "View current time in multiple timezones simultaneously. Track time across different cities and regions.",
          keywords: [
            "world clock",
            "timezone clock",
            "international time",
            "multiple timezones",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Live-updating clocks with second-precision",
                "Auto-detected local timezone display",
                "Custom clocks collection you can build",
                "Continental view organized by region",
                "UTC offset shown for each city",
              ],
            },
            {
              title: "Continental Coverage",
              items: [
                "Africa, Americas, Asia, Europe, Oceania",
                "Major cities sorted by timezone offset",
                "One-click add from any continental city",
              ],
            },
            {
              title: "Use Cases",
              items: [
                "Coordinate meetings across timezones",
                "Track business hours in different regions",
                "Plan international calls or travel",
                "Monitor team availability globally",
              ],
            },
          ],
        },
      },
      {
        name: "Timer",
        path: "/tools/timer",
        shortcut: "Ctrl+Shift+V",
        metadata: {
          title: "Timer - Countdown Timer Tool",
          description:
            "Set countdown timers with custom durations. Visual and audio alerts when time expires.",
          keywords: [
            "countdown timer",
            "timer tool",
            "online timer",
            "time tracker",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Keyboard Shortcuts",
            items: [
              { label: "Enter", text: "Add new timer" },
              { label: "Space", text: "Start/Pause first timer" },
              { label: "Escape", text: "Stop all timers" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Create multiple timers (default 5 minutes)",
                "Custom name and H:M:S duration",
                "Configurable alarm plays: 1, 2, 3, or until stopped",
                "Visual status badges (Running/Finished)",
                "Shareable URL with current timer settings",
                "Quick presets (Coffee Break, Meditation, Study Block, …)",
              ],
            },
            {
              title: "Behavior",
              items: [
                "Alarms play at 2s intervals; 'Until stopped' loops until silenced",
                "Reset returns to original duration",
                "No auto-start on load to respect sound policies",
              ],
            },
          ],
        },
      },
      {
        name: "Stopwatch",
        path: "/tools/stopwatch",
        shortcut: "Ctrl+Shift+=",
        metadata: {
          title: "Stopwatch - Online Stopwatch Tool",
          description:
            "Precision stopwatch with lap timing. Track elapsed time and record multiple laps.",
          keywords: ["stopwatch", "lap timer", "time tracker", "elapsed time"],
        },
        explanations: {
          shortcuts: [
            { key: "Enter", action: "Start or record lap" },
            { key: "Space", action: "Pause stopwatch" },
            { key: "Escape", action: "Reset to zero" },
          ],
          sections: [
            {
              title: "Productivity Techniques",
              items: [
                "Pomodoro: Work 25 min, break 5 min—use laps to track each cycle",
                "Time boxing: Set a goal, start timer, see how long tasks actually take",
                "Meeting audit: Track how much time you spend in meetings weekly",
                "Deep work tracking: Measure uninterrupted focus time (aim for 90+ min blocks)",
              ],
            },
            {
              title: "Lap Timer Use Cases",
              items: [
                "Running/cycling: Track each lap or mile split to monitor pace",
                "HIIT workouts: Record work intervals and rest periods",
                "Speedcubing: Time each Rubik's cube solve (world record: 3.13 seconds!)",
                "Cooking: Time multiple dishes—lap when each one goes in the oven",
                "Presentations: Practice with laps per slide to nail your timing",
              ],
            },
            {
              title: "Fun Timing Challenges",
              items: [
                "How fast can you type the alphabet? (Record: ~2 seconds)",
                "Hold your breath timer (average person: 30-60 seconds)",
                "Speed reading: Time yourself reading 1000 words (average: 4-5 minutes)",
                "Reaction time: Start, look away, stop when you think 10 seconds passed",
              ],
            },
          ],
        },
      },
      {
        name: "Countdown",
        path: "/tools/countdown",
        shortcut: "Ctrl+Shift+-",
        metadata: {
          title: "Countdown - Event Countdown Timer",
          description:
            "Count down to important dates and events. Track days, hours, minutes, and seconds until your event.",
          keywords: [
            "countdown",
            "event countdown",
            "days until",
            "time until",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Keyboard Shortcuts",
            items: [
              { label: "Enter", text: "Start countdown" },
              { label: "Space", text: "Pause/Resume countdown" },
              { label: "Escape", text: "Stop countdown" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Count down to any future date and time",
                "Timezone-aware target selection",
                "Visual breakdown: days, hours, minutes, seconds",
                "Sound notification when countdown reaches zero",
                "Auto-starts with New Year countdown by default",
              ],
            },
            {
              title: "Quick Presets",
              items: [
                "New Year and Christmas countdowns",
                "Weekend countdown",
                "Relative: 1 Hour, 24 Hours, 1 Week",
              ],
            },
            {
              title: "Use Cases",
              items: [
                "Track time until important events or deadlines",
                "Build anticipation for holidays and celebrations",
                "Set reminders for upcoming meetings",
                "Count down to product launches or releases",
              ],
            },
          ],
        },
      },
      {
        name: "Date/Time Difference",
        path: "/tools/datetime-diff",
        shortcut: "Ctrl+Shift+[",
        metadata: {
          title:
            "DateTime Difference Calculator - Calculate Time Between Dates",
          description:
            "Calculate the difference between two dates and times. Get results in days, hours, minutes, and seconds.",
          keywords: [
            "date difference calculator",
            "time difference",
            "days between dates",
            "date calculator",
          ],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Quick Presets",
            items: [
              {
                label: "Future",
                text: "5 min, 1 hour, 1 day, 1 week, 1 month, 1 year from now",
              },
              {
                label: "Historical",
                text: "Year 1 AD, 1000, Unix epoch (1970), Y2K, 2010 → now",
              },
              {
                label: "Far Future",
                text: "100/500/1000 years from now; to year 3000 or 10000",
              },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Precise difference between start and end date/time",
                "Readable summary (years, months, weeks, days, hours, minutes, seconds)",
                "Totals in multiple units (years, months, weeks, days, hours, minutes, seconds)",
                "Copy individual totals to clipboard",
                "Set 'Now' for start or end instantly",
                "Persistent inputs and quick presets",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Project planning and milestone tracking",
                "Personal milestones (age, anniversaries, travel)",
                "Business applications (contracts, SLAs, billing, warranties)",
              ],
            },
          ],
        },
      },
      {
        name: "Metronome",
        path: "/tools/metronome",
        shortcut: "Ctrl+Shift+]",
        metadata: {
          title: "Metronome - Online Metronome Tool",
          description:
            "Free online metronome with adjustable tempo. Perfect for musicians and music practice.",
          keywords: [
            "metronome",
            "online metronome",
            "BPM metronome",
            "music metronome",
          ],
        },
        explanations: {
          shortcuts: [
            { key: "Enter", action: "Start metronome" },
            { key: "Space", action: "Toggle start/stop" },
            { key: "Escape", action: "Stop metronome" },
          ],
          sections: [
            {
              title: "Tempo Guide (BPM)",
              items: [
                { label: "40-60 (Largo):", text: "Slow ballads, funeral marches, meditation music" },
                { label: "60-80 (Adagio):", text: "Slow songs, blues, worship music" },
                { label: "80-100 (Andante):", text: "Walking pace, easy listening, country" },
                { label: "100-120 (Moderato):", text: "Pop, rock, most mainstream music" },
                { label: "120-140 (Allegro):", text: "Dance, disco, upbeat pop, punk rock" },
                { label: "140-180 (Vivace):", text: "Fast metal, drum & bass, hardcore punk" },
              ],
            },
            {
              title: "Practice Tips",
              items: [
                "Start 20% slower than target tempo—speed builds on accuracy, not the reverse",
                "Increase by 5 BPM only after playing perfectly 3 times in a row",
                "Practice with the click on beats 2 and 4 (like a snare) for better groove feel",
                "Record yourself—you'll hear timing issues you can't feel while playing",
                "If you can't play it slow, you can't play it fast (muscle memory needs precision first)",
              ],
            },
            {
              title: "Beyond Basic Clicks",
              items: [
                "Add multiple tones at different intervals to create polyrhythms (3 against 4, etc.)",
                "Use the accent tone (higher pitch) on beat 1 to feel downbeats",
                "Try odd time signatures: set 7/8 by using 0.857s intervals at 60 BPM",
                "Share your metronome setup via URL for band practice consistency",
              ],
            },
            {
              title: "Metronome History",
              items: [
                "Invented by Johann Maelzel in 1815 (patented the mechanical design)",
                "Beethoven was first major composer to add metronome markings to scores",
                "A4 = 440 Hz became the standard pitch in 1939 (before that, it varied wildly)",
                "Digital metronomes replaced mechanical ones in the 1970s-80s",
              ],
            },
          ],
        },
      },
    ],
  },
  "Financial Tools": {
    color: "bg-emerald-500 text-white dark:bg-emerald-600",
    shortcut: "N",
    tools: [
      {
        name: "Compound Interest",
        path: "/tools/compound-interest",
        shortcut: "Ctrl+Shift+;",
        metadata: {
          title: "Compound Interest Calculator - Calculate Investment Returns",
          description:
            "Calculate compound interest and investment growth over time. Visualize returns with interactive charts.",
          keywords: [
            "compound interest calculator",
            "investment calculator",
            "interest calculator",
            "savings calculator",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Principal, rate, duration inputs",
                "Compound frequency",
                "Growth visualization",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Plan savings goals",
                "Compare investment scenarios",
                "Educate on compounding",
              ],
            },
          ],
        },
      },
      {
        name: "Debt Repayment",
        path: "/tools/debt-repayment",
        shortcut: "Ctrl+Shift+'",
        metadata: {
          title: "Debt Repayment Calculator - Plan Your Debt Payoff",
          description:
            "Calculate debt repayment schedules and total interest. Plan your path to becoming debt-free.",
          keywords: [
            "debt calculator",
            "loan calculator",
            "debt repayment",
            "payoff calculator",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Payment schedules",
                "Interest totals",
                "Adjust extra payments",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Plan debt payoff",
                "Compare strategies",
                "Understand interest impact",
              ],
            },
          ],
        },
      },
    ],
  },
  "Color Tools": {
    color: "bg-pink-500 text-white dark:bg-pink-600",
    shortcut: "O",
    tools: [
      {
        name: "Color Palette Generator",
        path: "/tools/color-palette-generator",
        shortcut: "Ctrl+Shift+,",
        metadata: {
          title: "Color Palette Generator - Generate Color Schemes",
          description:
            "Generate beautiful color palettes for design projects. Create harmonious color schemes with hex codes.",
          keywords: [
            "color palette generator",
            "color scheme generator",
            "color picker",
            "palette creator",
          ],
        },
        explanations: {
          sections: [
            {
              title: "Features",
              items: [
                "Generate harmonious palettes",
                "Copy hex codes",
                "Preview combinations",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Design UI themes",
                "Pick brand colors",
                "Explore color theory",
              ],
            },
          ],
        },
      },
    ],
  },
  Hardware: {
    color: "bg-slate-500 text-white dark:bg-slate-600",
    shortcut: "H",
    tools: [
      {
        name: "Camera Test",
        path: "/tools/webcam-test",
        shortcut: "Ctrl+Shift+.",
        experimental: true,
        metadata: {
          title: "Webcam Test - Test Your Camera",
          description:
            "Test your webcam and camera devices. Check video quality and device functionality in your browser.",
          keywords: ["webcam test", "camera test", "test camera", "video test"],
        },
        explanations: {
          notice: {
            type: "info",
            title: "Privacy & Permissions",
            items: [
              "All processing is local; no data is transmitted",
              "Browser permission is required to access the camera",
              "Captured photos are saved directly to your device",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Request camera permission",
                "Select camera device when labels are available",
                "Start/Stop camera preview",
                "Capture photo and download as PNG",
                "Show live resolution and active status",
              ],
            },
            {
              title: "Errors",
              items: [
                "Permission denied (NotAllowedError)",
                "No camera found (NotFoundError)",
                "Enumerate devices failures with helpful messages",
              ],
            },
          ],
        },
      },
      {
        name: "Microphone Test",
        path: "/tools/microphone-test",
        shortcut: "Ctrl+Shift+/",
        metadata: {
          title: "Microphone Test - Test Your Microphone",
          description:
            "Test your microphone and audio devices. Record audio clips and check microphone functionality.",
          keywords: [
            "microphone test",
            "mic test",
            "audio test",
            "test microphone",
          ],
        },
        explanations: {
          notice: {
            type: "privacy",
            title: "100% Local Processing",
            items: [
              "Audio never leaves your device — no server uploads, no cloud storage",
              "Recordings exist only in browser memory until you download or close the tab",
              "Perfect for testing before sensitive calls or recording confidential content",
            ],
          },
          sections: [
            {
              title: "When to Test Your Mic",
              items: [
                "Before job interviews or important video calls (Zoom, Teams, Meet)",
                "Setting up a new headset, USB mic, or audio interface",
                "Troubleshooting 'they can't hear me' issues in calls",
                "Checking if your mic works after OS updates or driver changes",
                "Comparing audio quality between different microphones",
              ],
            },
            {
              title: "What the Waveform Tells You",
              items: [
                "Flat line while talking = mic isn't picking up sound (wrong device selected?)",
                "Constantly maxed out = input gain too high, causing clipping/distortion",
                "Very small waves = mic too far away or gain too low",
                "Spiky noise when silent = background interference or bad cable",
                "Healthy waveform = peaks at 50-80% when speaking normally",
              ],
            },
            {
              title: "Common Fixes",
              items: [
                {
                  label: "No microphone found:",
                  text: "Check cable connections, try different USB port, restart browser",
                },
                {
                  label: "Permission denied:",
                  text: "Click lock icon in address bar → allow microphone access",
                },
                {
                  label: "Wrong mic active:",
                  text: "Use the device dropdown to select your preferred microphone",
                },
                {
                  label: "Audio too quiet:",
                  text: "Check system sound settings → input volume/gain slider",
                },
              ],
            },
            {
              title: "Pro Audio Tips",
              items: [
                "Speak 6-12 inches from mic (closer = more bass, 'proximity effect')",
                "USB mics are plug-and-play; XLR mics need an audio interface",
                "Pop filter or foam windscreen reduces plosives (p, b, t sounds)",
                "Record a test clip, play it back, and listen with headphones for true quality check",
              ],
            },
          ],
        },
      },
      {
        name: "Keyboard Test",
        path: "/tools/keyboard-test",
        shortcut: "Ctrl+Shift+`",
        metadata: {
          title: "Keyboard Test - Test Keyboard Keys",
          description:
            "Test keyboard keys and detect key presses. Visual feedback for each key pressed.",
          keywords: [
            "keyboard test",
            "key test",
            "keyboard tester",
            "test keys",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "What to Test For",
            items: [
              "Dead keys: Press every key — if nothing appears, the switch may be faulty",
              "Ghosting: Press 3+ keys simultaneously — cheap keyboards drop some inputs",
              "Chatter: Press once, see if it registers twice (common mechanical keyboard issue)",
              "Stuck keys: Release a key — it should immediately disappear from 'pressed' list",
            ],
          },
          sections: [
            {
              title: "Why Test Your Keyboard?",
              items: [
                "New keyboard QC: Verify all keys work before the return window closes",
                "Used/vintage keyboards: Check for worn switches before buying",
                "After spill cleanup: Confirm no keys are stuck or unresponsive",
                "Gaming prep: Ensure your WASD and ability keys have zero issues",
                "Mechanical keyboard mods: Test after swapping switches or keycaps",
              ],
            },
            {
              title: "N-Key Rollover (NKRO) Test",
              items: [
                "Press as many keys as you can simultaneously",
                "Cheap membrane keyboards: Usually 2-6 key limit (then 'ghosting')",
                "Gaming keyboards: Often 10+ keys or full NKRO",
                "Full NKRO means every key registers, no matter how many are pressed",
                "Critical for games requiring complex key combos (MMOs, fighting games)",
              ],
            },
            {
              title: "Browser Limitations",
              items: [
                "Some keys are captured by the OS: Print Screen, Win/Cmd key, some F-keys",
                "Browser shortcuts override testing: Ctrl+W, Ctrl+T, Ctrl+N won't register here",
                "Function keys (F1-F12) may trigger browser help or other features",
                "For complete testing, use a dedicated desktop app or test in incognito mode",
              ],
            },
          ],
        },
      },
    ],
  },
  Browser: {
    color: "bg-purple-500 text-white dark:bg-purple-600",
    shortcut: "B",
    tools: [
      {
        name: "Browser Info",
        path: "/tools/browser-info",
        shortcut: "Ctrl+Shift+\\",
        metadata: {
          title: "Browser Information - Detect Browser and Device Info",
          description:
            "View detailed browser, device, and screen information. Check user agent, viewport size, and capabilities.",
          keywords: [
            "browser info",
            "user agent",
            "device info",
            "screen size detector",
          ],
        },
        explanations: {
          notice: {
            type: "tips",
            title: "What Websites Can See About You",
            items: [
              "Your exact screen resolution, color depth, and pixel ratio—enough to identify your specific monitor",
              "CPU cores, device memory, and GPU model via WebGL—creates a hardware fingerprint",
              "Timezone, language preferences, and installed fonts—narrows down your location and setup",
              "All of this data combined can uniquely identify you even without cookies (browser fingerprinting)",
            ],
          },
          sections: [
            {
              title: "For Developers",
              items: [
                "Debug 'works on my machine' issues—copy exact browser/OS info for bug reports",
                "Test responsive breakpoints—see actual viewport vs screen size difference",
                "Check API support before using WebGL, WebRTC, or Service Workers in your app",
                "Verify devicePixelRatio for retina display optimizations",
                "Monitor JS heap memory usage during performance testing",
              ],
            },
            {
              title: "Privacy Insights",
              items: [
                "Canvas and WebGL fingerprinting can track you without cookies",
                "navigator.hardwareConcurrency reveals your CPU core count",
                "Connection API exposes your network speed and type (WiFi, 4G, etc.)",
                "Even your battery level was once exposed (now deprecated for privacy)",
                "Incognito mode doesn't hide most of this information",
              ],
            },
            {
              title: "Interesting Details Exposed",
              items: [
                "maxTouchPoints: 0 = desktop, 5+ = touchscreen device",
                "deviceMemory: Approximate RAM in GB (2, 4, 8, etc.)",
                "effectiveType: Your actual connection speed (slow-2g, 2g, 3g, 4g)",
                "reducedMotion: Whether you prefer less animation (accessibility)",
              ],
            },
          ],
        },
      },
    ],
  },
};

// Utility function to get all tools in a flat array
export function getAllTools(): Tool[] {
  return Object.values(toolsData).flatMap(category => category.tools);
}

// Utility function to get a tool by its path
export function getToolByPath(path: string): Tool | undefined {
  return getAllTools().find(tool => tool.path === path);
}

// Cached tool count - calculated once and reused
const TOOLS_COUNT = Object.values(toolsData).reduce(
  (count, category) => count + category.tools.length,
  0
);

// Utility function to get the total number of tools (efficient cached version)
export function getToolsCount(): number {
  return TOOLS_COUNT;
}

// Cached tool paths - calculated once and reused
const ALL_TOOL_PATHS = getAllTools().map(tool => tool.path);

// Utility function to get all tool paths (efficient cached version)
export function getAllToolPaths(): string[] {
  return ALL_TOOL_PATHS;
}

// Utility function to get tools for demo (same as getAllTools but explicit)
export function getDemoTools(): Array<{
  name: string;
  path: string;
  description: string;
}> {
  return getAllTools().map(tool => ({
    name: tool.name,
    path: tool.path,
    description: tool.metadata.description,
  }));
}
