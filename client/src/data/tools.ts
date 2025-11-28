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
            title: "Syntax Examples",
            items: [
              { label: "Headings", text: "#, ##" },
              { label: "Emphasis", text: "**bold**, *italic*" },
              { label: "Lists", text: "- bullets, 1. ordered" },
              { label: "Links & Code", text: "[Link](url), `code`" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Prettier formatting for Markdown",
                "Consistent lists, headings, and code blocks",
                "Supports large docs",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Polish README and docs",
                "Normalize content before publishing",
                "Improve readability for reviews",
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
          sections: [
            {
              title: "Features",
              items: [
                "Prettier formatting for TS/JS",
                "Consistent code style across files",
                "Improves diff readability",
                "Beautify and minify actions",
              ],
            },
            {
              title: "TypeScript Formatting Details",
              items: [
                "Type annotation formatting",
                "Interface and type definition styling",
                "Generic type parameter alignment",
                "Enum and namespace formatting",
                "Decorator and metadata styling",
              ],
            },
            {
              title: "Benefits",
              items: [
                "Preserves type information",
                "Maintains type safety",
                "Professional formatting standards",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Prepare code for review",
                "Normalize style before commit",
                "Reduce noise in pull requests",
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
          sections: [
            {
              title: "Features",
              items: [
                "Encode and decode Base64",
                "Works with text and binary data",
                "Input validation and error messages",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Embed assets in HTML/CSS",
                "Convert small files to text form",
                "Decode API responses",
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
            type: "info",
            title: "Security Notice",
            items: [
              "MD5 is not cryptographically secure for passwords",
              "Use for data integrity, not password storage",
              "Consider SHA-256 or bcrypt for security purposes",
              "Implementation uses SHA-256 truncated to 32 chars to simulate MD5 length",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Fast hash generation for integrity checking",
                "Fixed 32-character hexadecimal output",
                "Deterministic: same input → same hash",
                "Copy result to clipboard",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Verify file integrity",
                "Compare outputs across systems",
                "Generate quick fingerprints",
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
          sections: [
            {
              title: "Features",
              items: [
                "Adaptive hashing function for passwords",
                "Built-in salt generation",
                "Configurable work factor (rounds)",
                "Resistant to rainbow table attacks",
                "Generate hashes and verify against plaintext",
              ],
            },
            {
              title: "Security Notes",
              items: [
                "Use 10+ rounds for production",
                "Higher rounds increase security but slow hashing",
                "Each hash includes a unique salt",
                "Same password produces different hashes",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Prototype auth logic",
                "Validate password hashing",
                "Compare implementations",
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
        shortcut: "Ctrl+Shift!",
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
          sections: [
            {
              title: "Features",
              items: [
                "Side-by-side comparison",
                "Highlights insertions and deletions",
                "Line-by-line view",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Review changes between versions",
                "Compare generated output",
                "Spot regressions",
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
          sections: [
            {
              title: "Features",
              items: [
                "Live matching and highlighting",
                "Supports JS regex syntax",
                "Shows groups and matches",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Design and verify regex patterns",
                "Debug complex captures",
                "Validate input formats",
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
          sections: [
            {
              title: "Features",
              items: [
                "Alphabetical, numerical, by length, reverse, and random sorts",
                "Ascending/descending order",
                "Case-sensitive toggle",
                "Trim lines before processing",
                "Remove duplicate lines",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Normalize lists before committing",
                "Create ordered indexes",
                "Deduplicate data pasted from spreadsheets",
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
          sections: [
            {
              title: "Features",
              items: [
                "Counts characters, words, lines, and paragraphs",
                "Reading time estimation",
                "Monospace editor for clarity",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Meet content length requirements",
                "Estimate reading time",
                "Analyze text density",
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
            type: "info",
            title: "Format Notes",
            items: [
              { label: "CODE 128", text: "Most versatile; supports all ASCII" },
              {
                label: "EAN-13 / EAN-8",
                text: "Require exactly 13 or 8 digits",
              },
              { label: "UPC-A", text: "Requires exactly 12 digits" },
              { label: "ITF-14", text: "Requires exactly 14 digits" },
              { label: "CODE 39", text: "A–Z, 0–9 and symbols . - $ / + %" },
              { label: "MSI", text: "Numeric characters only" },
              { label: "Pharmacode", text: "Integer in [3, 131070]" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Generate CODE128, CODE39, EAN-13/8, UPC-A, ITF-14, MSI, Pharmacode",
                "Input validation per format with helpful messages",
                "Adjust bar width (1–4px) and height (50–200px)",
                "Toggle human-readable text below the barcode",
                "Download as PNG",
              ],
            },
            {
              title: "Common Use Cases",
              items: [
                "Retail labels (EAN-13/UPC)",
                "Shipping and logistics (CODE 128)",
                "Industrial applications (CODE 39)",
                "Packaging and cases (ITF-14)",
              ],
            },
            {
              title: "Tips",
              items: [
                "Use CODE 128 for maximum compatibility",
                "Ensure required digit lengths for EAN/UPC/ITF",
                "Test with your barcode scanner",
                "Consider printing size and resolution",
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
            title: "About Lorem Ipsum",
            items: [
              "Industry standard placeholder text since the 1500s",
              "Based on a work by Cicero (45 BC)",
              "Scrambled Latin that's readable but meaningless",
              "Perfect for focusing on design without content distraction",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Generate paragraphs, sentences, or words",
                "Option to start with 'Lorem ipsum'",
                "Word/sentence/paragraph counts shown",
                "Copy to clipboard",
                "Monospace preview editor with fixed height",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Fill mockups with realistic text",
                "Test layout density and typography",
                "Prototype content flows quickly",
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
          sections: [
            {
              title: "Features",
              items: [
                "Adjust length and character sets",
                "Generate multiple variants",
                "Copy with one click",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Create credentials securely",
                "Avoid weak patterns",
                "Prototype auth flows",
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
          sections: [
            {
              title: "Features",
              items: [
                "Generate UUIDs (e.g., v4)",
                "Bulk creation",
                "Copy and reuse easily",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Create identifiers for test data",
                "Name resources uniquely",
                "Seed databases",
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
          sections: [
            {
              title: "Features",
              items: [
                "Find and replace with regex",
                "Case sensitivity toggle",
                "Global or scoped replacement",
              ],
            },
            {
              title: "Use cases",
              items: [
                "Refactor text blocks",
                "Fix formatting patterns",
                "Clean imported content",
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
          notice: {
            type: "info",
            title: "Keyboard",
            items: [
              { label: "Enter", text: "Start" },
              { label: "Space/Esc", text: "Stop" },
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Multi-tone metronome: configure multiple notes and intervals",
                "Enable/disable tones individually",
                "Interval slider (0.1–10s) with quick presets",
                "Visual play feedback per tone",
                "Shareable URL with current tone schedules",
                "Test tones before starting",
              ],
            },
            {
              title: "Examples",
              items: [
                "Basic Beat (C5 + G4)",
                "Complex Rhythm (A4, E4, A5)",
                "C Major progression (C4, E4, G4, C5)",
              ],
            },
            {
              title: "Pro Tip",
              items: [
                "Use intervals like 0.5s, 1.5s, and 3s to create polyrhythms that repeat every 6s",
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
            type: "info",
            title: "Privacy",
            items: [
              "Runs entirely in your browser; no audio is uploaded",
              "Browser will ask for microphone permission",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Select microphone device",
                "Record audio as WebM/Opus",
                "Live waveform visualization",
                "Play back recording",
                "Download recording",
                "Status and device count indicators",
              ],
            },
            {
              title: "Errors",
              items: [
                "NotAllowedError: permission denied",
                "NotFoundError: no microphone detected",
                "NotReadableError: device in use",
                "OverconstrainedError: selected device unavailable",
                "SecurityError: access blocked",
              ],
            },
            {
              title: "How to Use",
              items: [
                "Request permission, select device",
                "Start recording and speak",
                "Stop recording, play back, or download",
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
            type: "info",
            title: "Usage Notes",
            items: [
              "Ensure the page has focus",
              "Press keys to see real-time feedback",
              "Some special keys may be restricted by browser security",
            ],
          },
          sections: [
            {
              title: "Features",
              items: [
                "Real-time pressed-keys display",
                "Key press history (last 50)",
                "Categorization: letters, numbers, arrows, modifiers, specials, functions",
                "Per-category statistics and percentages",
                "Clear history and start/stop testing controls",
              ],
            },
            {
              title: "Key Categories",
              items: [
                "Letters (A–Z)",
                "Numbers (0–9)",
                "Arrow keys",
                "Modifiers (Ctrl, Alt, Shift, Meta)",
                "Specials (Space, Enter, Tab, Backspace, Delete, Escape)",
                "Function keys (F1–F12)",
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
      },
    ],
  },
};

// Utility function to get all tools in a flat array
export function getAllTools(): Tool[] {
  return Object.values(toolsData).flatMap(category => category.tools);
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
