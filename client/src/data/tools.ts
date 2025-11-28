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

export type { ToolExplanation };

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
          notices: [
            {
              title: "Features:",
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
              title: "Usage Tips:",
              items: [
                "Use 24-hour format for precise conversion",
                "Add/remove target timezones as needed",
                'Click "Now" to use current date/time',
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
          notices: [
            {
              title: "Supported Formats:",
              items: [
                "Simple key=value pairs",
                "Nested objects using dot notation",
                "Arrays using bracket notation",
                "URL-encoded special characters",
              ],
            },
            {
              title: "Features:",
              items: [
                "Automatic type detection (numbers, booleans)",
                "Deep nesting support",
                "Array index handling",
                "Special character decoding",
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
          notices: [
            {
              title: "Common Bases:",
              items: [
                { label: "Binary (2):", text: "Computer memory, flags" },
                { label: "Octal (8):", text: "Unix permissions" },
                { label: "Decimal (10):", text: "Human-readable numbers" },
                {
                  label: "Hexadecimal (16):",
                  text: "Colors, memory addresses",
                },
              ],
            },
            {
              title: "Usage Tips:",
              items: [
                "Use 0x prefix for hex in code",
                "Binary useful for bit manipulation",
                "Octal for Unix file permissions",
                "Base 64 for encoding binary data",
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
          notices: [
            {
              title: "Pro Tips",
              items: [
                "Use Ctrl+A to select all text quickly",
                "The formatter will auto-detect and fix common JSON issues",
                "Validation shows specific error locations",
                "Minified JSON is optimized for data transmission",
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
          notices: [
            {
              title: "JSONC (JSON with Comments)",
              items: [
                {
                  label: "Single-line comments:",
                  text: "// This is a comment",
                },
                {
                  label: "Multi-line comments:",
                  text: "/* This is a multi-line comment */",
                },
                {
                  label: "Use cases:",
                  text: "Configuration files, VS Code settings, TypeScript configs",
                },
                {
                  label: "Popular tools:",
                  text: "VS Code, TypeScript, Azure DevOps, and more",
                },
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
          notices: [
            {
              title: "Features:",
              items: [
                "Automatic indentation and formatting",
                "Syntax highlighting with live preview",
                "Handles inline styles and scripts",
                "Supports custom indent size",
              ],
            },
            {
              title: "Best Practices:",
              items: [
                "Use 2 or 4 spaces for standard formatting",
                "Keep nesting levels manageable",
                "Validate HTML before deployment",
                "Format regularly for maintainability",
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
          notices: [
            {
              title: "YAML Features:",
              items: [
                "Human-readable data serialization",
                "Supports complex data structures",
                "Common in DevOps and configuration",
                "Indentation-based syntax",
              ],
            },
            {
              title: "Formatting Tips:",
              items: [
                "Use consistent indentation (2 spaces recommended)",
                "Validate syntax before deployment",
                "Keep nesting levels reasonable",
                "Use quotes for special characters",
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
          notices: [
            {
              title: "Markdown Features:",
              items: [
                "Headers, lists, and emphasis",
                "Code blocks with syntax highlighting",
                "Links and images",
                "Tables and blockquotes",
              ],
            },
            {
              title: "Formatting Tips:",
              items: [
                "Use blank lines between sections",
                "Consistent heading hierarchy",
                "Preview before publishing",
                "Use reference-style links for readability",
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
          notices: [
            {
              title: "CSS Features:",
              items: [
                "Automatic property ordering",
                "Consistent indentation",
                "Selector formatting",
                "Media query organization",
              ],
            },
            {
              title: "Best Practices:",
              items: [
                "Group related properties",
                "Use shorthand when appropriate",
                "Maintain consistent naming",
                "Comment complex sections",
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
          notices: [
            {
              title: "TypeScript Features:",
              items: [
                "Type annotation formatting",
                "Interface and type alignment",
                "Import organization",
                "Consistent spacing",
              ],
            },
            {
              title: "Formatting Tips:",
              items: [
                "Use explicit return types",
                "Consistent type positioning",
                "Organize imports by type",
                "Format before committing",
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
          notices: [
            {
              title: "GraphQL Features:",
              items: [
                "Query and mutation formatting",
                "Schema definition styling",
                "Argument alignment",
                "Directive formatting",
              ],
            },
            {
              title: "Best Practices:",
              items: [
                "Consistent field indentation",
                "Logical field ordering",
                "Clear variable naming",
                "Comment complex queries",
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
          notices: [
            {
              title: "Standard Formats:",
              items: [
                { label: "ISO 8601:", text: "2024-01-15T10:30:00Z" },
                { label: "RFC 2822:", text: "Mon, 15 Jan 2024 10:30:00 +0000" },
                { label: "Unix:", text: "1705315800 (seconds since 1970)" },
                { label: "Human:", text: "January 15, 2024 at 10:30 AM" },
              ],
            },
            {
              title: "Usage Tips:",
              items: [
                "ISO 8601 is best for APIs and databases",
                "Unix timestamps are timezone-independent",
                "Use locale formats for user interfaces",
                "Always consider timezone handling",
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
      },
      {
        name: "URL Encoder",
        path: "/tools/url-encoder",
        shortcut: "Ctrl+Shift+E",
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
          examples: [
            { from: "Space", to: "%20" },
            { from: "@", to: "%40" },
            { from: "&", to: "%26" },
            { from: "=", to: "%3D" },
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
          notices: [
            {
              title: "MD5 Information:",
              items: [
                "MD5 produces a 128-bit (16-byte) hash value",
                "Commonly used for file integrity verification",
                "Not recommended for security-sensitive applications",
                "Use SHA-256 or bcrypt for password hashing",
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
          notices: [
            {
              title: "Bcrypt Features:",
              items: [
                "Adaptive cost factor for future-proofing",
                "Built-in salt generation",
                "Resistant to rainbow table attacks",
                "Industry standard for password storage",
              ],
            },
            {
              title: "Cost Factor Guide:",
              items: [
                { label: "8-10:", text: "Fast, suitable for development" },
                { label: "12:", text: "Recommended for production" },
                { label: "14+:", text: "High security, slower performance" },
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
          notices: [
            {
              title: "Supported QR Types:",
              items: [
                { label: "Plain Text:", text: "Any text content" },
                { label: "Website URL:", text: "Links to web pages" },
                { label: "Email:", text: "Email addresses with mailto links" },
                { label: "Phone Number:", text: "Clickable phone numbers" },
                { label: "SMS Message:", text: "Pre-filled text messages" },
                {
                  label: "WiFi Network:",
                  text: "Network credentials for easy connection",
                },
                {
                  label: "Contact Card:",
                  text: "vCard format contact information",
                },
              ],
            },
            {
              title: "Customization Options:",
              items: [
                "Adjustable size and error correction",
                "Multiple color options",
                "Download as PNG image",
                "Copy to clipboard",
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
          notices: [
            {
              title: "Common Use Cases:",
              items: [
                { label: "EAN-13/UPC:", text: "Retail products" },
                { label: "CODE 128:", text: "Shipping and logistics" },
                { label: "CODE 39:", text: "Industrial applications" },
                { label: "ITF-14:", text: "Packaging and cases" },
              ],
            },
            {
              title: "Tips:",
              items: [
                "Use CODE 128 for maximum compatibility",
                "EAN/UPC codes need specific lengths",
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
          notices: [
            {
              title: "About Lorem Ipsum:",
              items: [
                "Industry standard placeholder text since the 1500s",
                "Based on a work by Cicero from 45 BC",
                "Scrambled Latin text that's readable but meaningless",
                "Perfect for focusing on design without content distraction",
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
          notices: [
            {
              title: "Unicode Information:",
              items: [
                "Unicode supports over 140,000 characters",
                "Includes emojis, symbols, and scripts worldwide",
                "UTF-8 is the most common encoding",
                "Code points range from U+0000 to U+10FFFF",
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
          notices: [
            {
              title: "UUID Information:",
              items: [
                { label: "Version 1:", text: "Timestamp-based, includes MAC address (or random node)" },
                { label: "Version 4:", text: "Randomly generated, most commonly used" },
                { label: "Format:", text: "8-4-4-4-12 hexadecimal digits (32 total)" },
                { label: "Use cases:", text: "Database keys, session IDs, file names, API tokens" },
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
          notices: [
            {
              title: "Common Delimiters:",
              items: [
                { label: "Comma (,):", text: "CSV files, lists" },
                { label: "Semicolon (;):", text: "European CSV, SQL" },
                { label: "Tab:", text: "TSV files, spreadsheets" },
                { label: "Pipe (|):", text: "Database exports, logs" },
                { label: "Newline:", text: "Line-by-line processing" },
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
          shortcuts: [
            { key: "Enter", action: "Add new timer" },
            { key: "Space", action: "Start/Pause first timer" },
            { key: "Escape", action: "Stop all timers" },
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
          notices: [
            {
              title: "Project Planning",
              items: [
                "Calculate project durations",
                "Track milestone intervals",
                "Estimate delivery dates",
                "Plan sprint cycles",
              ],
            },
            {
              title: "Personal Events",
              items: [
                "Count days until vacation",
                "Track age in various units",
                "Calculate anniversary dates",
                "Plan event timelines",
              ],
            },
            {
              title: "Business Uses",
              items: [
                "Calculate contract periods",
                "Track subscription lengths",
                "Measure SLA compliance",
                "Plan budget cycles",
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
            { key: "Space", action: "Start/Stop first metronome" },
            { key: "Escape", action: "Stop all metronomes" },
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
          notices: [
            {
              title: "Privacy Notice:",
              items: [
                "All camera processing happens locally in your browser",
                "No video or image data is transmitted to any server",
                "Captured photos are saved directly to your device",
                "Camera access requires explicit permission from your browser",
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
          notices: [
            {
              title: "Privacy Notice:",
              items: [
                "All audio processing happens locally in your browser",
                "No audio data is transmitted to any server",
                "Microphone access requires explicit permission",
                "Close this tab to stop microphone access",
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
          notices: [
            {
              title: "Keyboard Testing:",
              items: [
                "Press any key to test detection",
                "Modifier keys are tracked separately",
                "Dead keys and special keys are supported",
                "Browser security may block some key combinations",
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

// Cached tool lookup map - calculated once and reused
const TOOL_PATH_MAP = new Map(getAllTools().map(tool => [tool.path, tool]));

// Utility function to get a tool by its path
export function getToolByPath(path: string): Tool | undefined {
  return TOOL_PATH_MAP.get(path);
}
