// Global tools data with keyboard shortcuts
export interface Tool {
  name: string;
  path: string;
  shortcut: string;
  description: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  experimental?: boolean;
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
        description: "Convert between timestamps, dates, and formats",
        seo: {
          title: "Date Converter - Convert Between Date Formats | FreeDevTool.App",
          description: "Convert dates between 20+ practical formats including ISO 8601, Unix timestamps, RFC 2822, and human-readable formats. Auto-detects input format for easy conversion.",
          keywords: "date converter, timestamp converter, ISO 8601, Unix timestamp, date format converter, RFC 2822"
        }
      },
      {
        name: "JSON ↔ YAML",
        path: "/tools/json-yaml-converter",
        shortcut: "Ctrl+Shift+Y",
        description: "Convert between JSON and YAML formats",
        seo: {
          title: "JSON to YAML Converter - Bidirectional Conversion | FreeDevTool.App",
          description: "Convert between JSON and YAML formats instantly. Bidirectional converter with syntax validation and error highlighting for configuration files.",
          keywords: "JSON to YAML, YAML to JSON, config converter, JSON YAML converter"
        }
      },
      {
        name: "Timezone Converter",
        path: "/tools/timezone-converter",
        shortcut: "Ctrl+Shift+2",
        description: "Convert time across multiple timezones with precision",
        seo: {
          title: "Timezone Converter - Convert Times Across Timezones | FreeDevTool.App",
          description: "Convert times between different timezones instantly. Support for all major timezones with automatic DST handling.",
          keywords: "timezone converter, time zone conversion, UTC converter, world time converter"
        }
      },
      {
        name: "Unit Converter",
        path: "/tools/unit-converter",
        shortcut: "Ctrl+Shift+U",
        description:
          "Convert between units of weight, distance, area, volume, pressure",
        seo: {
          title: "Unit Converter - Convert Units of Measurement | FreeDevTool.App",
          description: "Convert between units of length, weight, temperature, volume, and more. Fast and accurate unit conversion tool.",
          keywords: "unit converter, measurement converter, length converter, weight converter, temperature converter"
        }
      },
      {
        name: "URL to JSON",
        path: "/tools/url-to-json",
        shortcut: "Ctrl+Shift+3",
        description:
          "Convert URLs to JSON with parameter parsing and TLD lookup",
        seo: {
          title: "URL to JSON - Parse URL Query Parameters | FreeDevTool.App",
          description: "Parse URL query parameters into JSON format. Extract and visualize URL components.",
          keywords: "URL parser, query string parser, URL to JSON, parse URL"
        }
      },
      {
        name: "CSV to JSON",
        path: "/tools/csv-to-json",
        shortcut: "Ctrl+Shift+4",
        description: "Convert CSV data to JSON format with delimiter selection",
        seo: {
          title: "CSV to JSON Converter - Convert CSV to JSON | FreeDevTool.App",
          description: "Convert CSV data to JSON format instantly. Parse and transform tabular data for APIs and applications.",
          keywords: "CSV to JSON, CSV converter, CSV parser, convert CSV"
        }
      },
      {
        name: "Number Base Converter",
        path: "/tools/number-base-converter",
        shortcut: "Ctrl+Shift+5",
        description: "Convert numbers between different bases (2-64)",
        seo: {
          title: "Number Base Converter - Convert Between Number Systems | FreeDevTool.App",
          description: "Convert numbers between binary, decimal, octal, and hexadecimal formats. Perfect for programmers.",
          keywords: "number base converter, binary converter, hex converter, decimal to binary"
        }
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
        description: "Format and beautify JSON with validation",
        seo: {
          title: "JSON Formatter - Format and Validate JSON | FreeDevTool.App",
          description: "Format, validate, and beautify JSON with syntax highlighting. Industry-standard Prettier formatting with error detection.",
          keywords: "JSON formatter, JSON validator, JSON beautifier, prettify JSON"
        }
      },
      {
        name: "JSONC Formatter",
        path: "/tools/jsonc-formatter",
        shortcut: "Ctrl+Shift+C",
        description: "Format JSON with Comments files",
        seo: {
          title: "JSONC Formatter - Format JSON with Comments | FreeDevTool.App",
          description: "Format and validate JSONC (JSON with Comments) files. Perfect for VS Code configuration files and other commented JSON.",
          keywords: "JSONC formatter, JSON with comments, VS Code config formatter"
        }
      },
      {
        name: "HTML Beautifier",
        path: "/tools/html-formatter",
        shortcut: "Ctrl+Shift+H",
        description:
          "Beautify HTML with proper indentation and validate for errors",
        seo: {
          title: "HTML Formatter - Format and Beautify HTML | FreeDevTool.App",
          description: "Format and beautify HTML code with proper indentation. Industry-standard Prettier formatting for clean, readable markup.",
          keywords: "HTML formatter, HTML beautifier, prettify HTML, HTML code formatter"
        }
      },
      {
        name: "YAML Formatter",
        path: "/tools/yaml-formatter",
        shortcut: "Ctrl+Shift+6",
        description: "Format and beautify YAML configuration files",
        seo: {
          title: "YAML Formatter - Format and Validate YAML | FreeDevTool.App",
          description: "Format and validate YAML files with syntax checking. Perfect for configuration files and data serialization.",
          keywords: "YAML formatter, YAML validator, YAML beautifier, config formatter"
        }
      },
      {
        name: "Markdown Formatter",
        path: "/tools/markdown-formatter",
        shortcut: "Ctrl+Shift+K",
        description: "Format Markdown with live preview",
        seo: {
          title: "Markdown Formatter - Format Markdown Files | FreeDevTool.App",
          description: "Format and beautify Markdown files with consistent styling. Industry-standard Prettier formatting for documentation.",
          keywords: "Markdown formatter, MD formatter, Markdown beautifier, prettify markdown"
        }
      },
      {
        name: "CSS/LESS/SCSS Formatter",
        path: "/tools/css-formatter",
        shortcut: "Ctrl+Shift+7",
        description: "Format CSS, LESS, and SCSS stylesheets with Prettier",
        seo: {
          title: "CSS Formatter - Format and Beautify CSS | FreeDevTool.App",
          description: "Format and beautify CSS code with proper indentation. Industry-standard Prettier formatting for stylesheets.",
          keywords: "CSS formatter, CSS beautifier, prettify CSS, CSS code formatter"
        }
      },
      {
        name: "JavaScript/TypeScript Formatter",
        path: "/tools/typescript-formatter",
        shortcut: "Ctrl+Shift+8",
        description: "Format JavaScript and TypeScript code with Prettier",
        seo: {
          title: "TypeScript Formatter - Format TypeScript Code | FreeDevTool.App",
          description: "Format TypeScript and JavaScript code with Prettier. Industry-standard formatting for clean, consistent code.",
          keywords: "TypeScript formatter, JavaScript formatter, TS formatter, Prettier"
        }
      },

      {
        name: "GraphQL Formatter",
        path: "/tools/graphql-formatter",
        shortcut: "Ctrl+Shift+9",
        description: "Format GraphQL schemas and queries",
        seo: {
          title: "GraphQL Formatter - Format GraphQL Schemas | FreeDevTool.App",
          description: "Format and beautify GraphQL schemas and queries. Industry-standard Prettier formatting for GraphQL.",
          keywords: "GraphQL formatter, GraphQL beautifier, GraphQL schema formatter"
        }
      },
      {
        name: "Time Formatter",
        path: "/tools/time-formatter",
        shortcut: "Ctrl+Shift+T",
        description: "Format time to all existing time standards",
        seo: {
          title: "Time Formatter - Format Time Values | FreeDevTool.App",
          description: "Format time values in different formats. Convert between 12-hour and 24-hour time formats.",
          keywords: "time formatter, 12 hour to 24 hour, time format converter"
        }
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
        description: "Encode and decode Base64 data",
        seo: {
          title: "Base64 Encoder/Decoder - Encode and Decode Base64 | FreeDevTool.App",
          description: "Encode and decode Base64 strings instantly. Bidirectional converter with file support and validation.",
          keywords: "Base64 encoder, Base64 decoder, encode Base64, decode Base64"
        }
      },
      {
        name: "URL Encoder",
        path: "/tools/url-encoder",
        shortcut: "Ctrl+Shift+~",
        description: "URL encode and decode strings",
        seo: {
          title: "URL Encoder/Decoder - Encode and Decode URLs | FreeDevTool.App",
          description: "Encode and decode URL strings and query parameters. Perfect for web development and API testing.",
          keywords: "URL encoder, URL decoder, percent encoding, URI encoder"
        }
      },
      {
        name: "JWT Decoder",
        path: "/tools/jwt-decoder",
        shortcut: "Ctrl+Shift+A",
        description: "Decode and inspect JWT tokens",
        seo: {
          title: "JWT Decoder - Decode JSON Web Tokens | FreeDevTool.App",
          description: "Decode and inspect JWT (JSON Web Token) headers and payloads. View claims and token structure without verification.",
          keywords: "JWT decoder, JSON Web Token decoder, JWT inspector, token decoder"
        }
      },
      {
        name: "TLS Certificate Decoder",
        path: "/tools/tls-decoder",
        shortcut: "Ctrl+Shift+G",
        description: "Decode TLS certificates",
        seo: {
          title: "TLS Certificate Decoder - Decode SSL Certificates | FreeDevTool.App",
          description: "Decode and inspect TLS/SSL certificates. View certificate details, validity, and issuer information.",
          keywords: "TLS decoder, SSL certificate decoder, X.509 decoder, certificate inspector"
        }
      },
      {
        name: "MD5 Hash",
        path: "/tools/md5-hash",
        shortcut: "Ctrl+Shift+R",
        description: "Generate MD5 hashes",
        seo: {
          title: "MD5 Hash Generator - Generate MD5 Hashes | FreeDevTool.App",
          description: "Generate MD5 hashes from text strings. Quick and secure hash generation for verification.",
          keywords: "MD5 hash generator, MD5 calculator, hash generator, checksum"
        }
      },
      {
        name: "BCrypt Hash",
        path: "/tools/bcrypt-hash",
        shortcut: "Ctrl+Shift+F",
        description: "Generate and verify BCrypt hashes",
        seo: {
          title: "BCrypt Hash Generator - Generate Secure Password Hashes | FreeDevTool.App",
          description: "Generate and verify BCrypt password hashes. Secure password hashing with configurable rounds.",
          keywords: "BCrypt hash, password hash generator, secure hash, BCrypt generator"
        }
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
        description: "Compare text differences side by side",
        seo: {
          title: "Text Diff - Compare Two Texts | FreeDevTool.App",
          description: "Compare two text files and highlight differences. Side-by-side diff viewer with line-by-line comparison.",
          keywords: "text diff, text compare, diff tool, compare text files"
        }
      },
      {
        name: "Regex Tester",
        path: "/tools/regex-tester",
        shortcut: "Ctrl+Shift+E",
        description: "Test regular expressions with live matches",
        seo: {
          title: "Regex Tester - Test Regular Expressions | FreeDevTool.App",
          description: "Test and debug regular expressions with live highlighting. Supports JavaScript regex with match details.",
          keywords: "regex tester, regular expression tester, regex debugger, pattern matcher"
        }
      },
      {
        name: "Text Sorter",
        path: "/tools/text-sort",
        shortcut: "Ctrl+Shift+O",
        description: "Sort lines of text alphabetically or numerically",
        seo: {
          title: "Text Sort - Sort Lines of Text | FreeDevTool.App",
          description: "Sort lines of text alphabetically or numerically. Multiple sorting options including reverse and case-insensitive.",
          keywords: "text sorter, sort lines, alphabetical sort, line sorter"
        }
      },
      {
        name: "Word Counter",
        path: "/tools/text-counter",
        shortcut: "Ctrl+Shift+W",
        description: "Count words, characters, and lines in text",
        seo: {
          title: "Text Counter - Count Characters, Words, and Lines | FreeDevTool.App",
          description: "Count characters, words, lines, and paragraphs in text. Real-time statistics with reading time estimation.",
          keywords: "character counter, word counter, text statistics, line counter"
        }
      },
      {
        name: "QR Generator",
        path: "/tools/qr-generator",
        shortcut: "Ctrl+Shift+Q",
        description: "Generate QR codes for text and URLs",
        seo: {
          title: "QR Code Generator - Create QR Codes | FreeDevTool.App",
          description: "Generate QR codes for URLs, text, and data. Customizable size and error correction levels.",
          keywords: "QR code generator, QR generator, create QR code, barcode generator"
        }
      },
      {
        name: "Barcode Generator",
        path: "/tools/barcode-generator",
        shortcut: "Ctrl+Shift+I",
        description: "Generate various barcode formats",
        seo: {
          title: "Barcode Generator - Create Barcodes | FreeDevTool.App",
          description: "Generate barcodes in multiple formats including Code128, EAN, and UPC. Download as PNG or SVG.",
          keywords: "barcode generator, create barcode, Code128, EAN generator"
        }
      },
      {
        name: "Lorem Generator",
        path: "/tools/lorem-generator",
        shortcut: "Ctrl+Shift+L",
        description: "Generate Lorem Ipsum placeholder text",
        seo: {
          title: "Lorem Ipsum Generator - Generate Placeholder Text | FreeDevTool.App",
          description: "Generate Lorem Ipsum placeholder text for design mockups. Customize paragraphs, words, and sentences.",
          keywords: "lorem ipsum generator, placeholder text, dummy text, lorem generator"
        }
      },
      {
        name: "Unicode Characters",
        path: "/tools/unicode-characters",
        shortcut: "Ctrl+Shift+N",
        description: "Browse and copy Unicode characters from various scripts",
        seo: {
          title: "Unicode Characters - Browse Unicode Symbols | FreeDevTool.App",
          description: "Browse and copy Unicode characters and symbols. Search thousands of special characters and emojis.",
          keywords: "unicode characters, special characters, unicode symbols, character map"
        }
      },
      {
        name: "Password Generator",
        path: "/tools/password-generator",
        shortcut: "Ctrl+Shift+P",
        description: "Generate secure passwords with custom criteria",
        seo: {
          title: "Password Generator - Generate Secure Passwords | FreeDevTool.App",
          description: "Generate strong, random passwords with custom length and character sets. Create secure passwords instantly.",
          keywords: "password generator, random password, secure password, password creator"
        }
      },
      {
        name: "UUID Generator",
        path: "/tools/uuid-generator",
        shortcut: "Ctrl+Shift+@",
        description: "Generate UUIDs (v1, v4) for unique identifiers",
        seo: {
          title: "UUID Generator - Generate Unique Identifiers | FreeDevTool.App",
          description: "Generate UUID/GUID (Universally Unique Identifiers) in multiple versions. Bulk generation supported.",
          keywords: "UUID generator, GUID generator, unique ID generator, UUID v4"
        }
      },
      {
        name: "Search & Replace",
        path: "/tools/search-replace",
        shortcut: "Ctrl+Shift+Z",
        description: "Find and replace text with regex support",
        seo: {
          title: "Search and Replace - Find and Replace Text | FreeDevTool.App",
          description: "Search and replace text with support for regex patterns. Case-sensitive and global replacement options.",
          keywords: "find replace, search replace, text replace, regex replace"
        }
      },
      {
        name: "Text Split",
        path: "/tools/text-split",
        shortcut: "Ctrl+Shift+X",
        description: "Split text by delimiters or patterns",
        seo: {
          title: "Text Split - Split Text by Delimiter | FreeDevTool.App",
          description: "Split text into parts using custom delimiters. Perfect for processing CSV, lists, and structured data.",
          keywords: "text splitter, string split, delimiter split, text separator"
        }
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
        description: "View time across multiple cities and timezones",
        seo: {
          title: "World Clock - View Time in Multiple Timezones | FreeDevTool.App",
          description: "View current time in multiple timezones simultaneously. Track time across different cities and regions.",
          keywords: "world clock, timezone clock, international time, multiple timezones"
        }
      },
      {
        name: "Timer",
        path: "/tools/timer",
        shortcut: "Ctrl+Shift+V",
        description: "Countdown timer with audio alerts",
        seo: {
          title: "Timer - Countdown Timer Tool | FreeDevTool.App",
          description: "Set countdown timers with custom durations. Visual and audio alerts when time expires.",
          keywords: "countdown timer, timer tool, online timer, time tracker"
        }
      },
      {
        name: "Stopwatch",
        path: "/tools/stopwatch",
        shortcut: "Ctrl+Shift+=",
        description: "Precision stopwatch with lap times",
        seo: {
          title: "Stopwatch - Online Stopwatch Tool | FreeDevTool.App",
          description: "Precision stopwatch with lap timing. Track elapsed time and record multiple laps.",
          keywords: "stopwatch, lap timer, time tracker, elapsed time"
        }
      },
      {
        name: "Countdown",
        path: "/tools/countdown",
        shortcut: "Ctrl+Shift+-",
        description: "Count down to a specific date and time",
        seo: {
          title: "Countdown - Event Countdown Timer | FreeDevTool.App",
          description: "Count down to important dates and events. Track days, hours, minutes, and seconds until your event.",
          keywords: "countdown, event countdown, days until, time until"
        }
      },
      {
        name: "Date/Time Difference",
        path: "/tools/datetime-diff",
        shortcut: "Ctrl+Shift+[",
        description: "Calculate differences between dates and times",
        seo: {
          title: "DateTime Difference Calculator - Calculate Time Between Dates | FreeDevTool.App",
          description: "Calculate the difference between two dates and times. Get results in days, hours, minutes, and seconds.",
          keywords: "date difference calculator, time difference, days between dates, date calculator"
        }
      },
      {
        name: "Metronome",
        path: "/tools/metronome",
        shortcut: "Ctrl+Shift+]",
        description: "Multi-tone metronome with custom timing intervals",
        seo: {
          title: "Metronome - Online Metronome Tool | FreeDevTool.App",
          description: "Free online metronome with adjustable tempo. Perfect for musicians and music practice.",
          keywords: "metronome, online metronome, BPM metronome, music metronome"
        }
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
        description: "Calculate compound interest and investment growth",
        seo: {
          title: "Compound Interest Calculator - Calculate Investment Returns | FreeDevTool.App",
          description: "Calculate compound interest and investment growth over time. Visualize returns with interactive charts.",
          keywords: "compound interest calculator, investment calculator, interest calculator, savings calculator"
        }
      },
      {
        name: "Debt Repayment",
        path: "/tools/debt-repayment",
        shortcut: "Ctrl+Shift+'",
        description: "Plan debt payoff strategies and calculate payments",
        seo: {
          title: "Debt Repayment Calculator - Plan Your Debt Payoff | FreeDevTool.App",
          description: "Calculate debt repayment schedules and total interest. Plan your path to becoming debt-free.",
          keywords: "debt calculator, loan calculator, debt repayment, payoff calculator"
        }
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
        description: "Generate beautiful color palettes and schemes",
        seo: {
          title: "Color Palette Generator - Generate Color Schemes | FreeDevTool.App",
          description: "Generate beautiful color palettes for design projects. Create harmonious color schemes with hex codes.",
          keywords: "color palette generator, color scheme generator, color picker, palette creator"
        }
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
        description: "Test your camera and record video clips",
        experimental: true,
        seo: {
          title: "Webcam Test - Test Your Camera | FreeDevTool.App",
          description: "Test your webcam and camera devices. Check video quality and device functionality in your browser.",
          keywords: "webcam test, camera test, test camera, video test"
        }
      },
      {
        name: "Microphone Test",
        path: "/tools/microphone-test",
        shortcut: "Ctrl+Shift+/",
        description:
          "Test microphone with audio level monitoring and recording",
        seo: {
          title: "Microphone Test - Test Your Microphone | FreeDevTool.App",
          description: "Test your microphone and audio devices. Record audio clips and check microphone functionality.",
          keywords: "microphone test, mic test, audio test, test microphone"
        }
      },
      {
        name: "Keyboard Test",
        path: "/tools/keyboard-test",
        shortcut: "Ctrl+Shift+`",
        description: "Test keyboard keys and see which buttons are pressed",
        seo: {
          title: "Keyboard Test - Test Keyboard Keys | FreeDevTool.App",
          description: "Test keyboard keys and detect key presses. Visual feedback for each key pressed.",
          keywords: "keyboard test, key test, keyboard tester, test keys"
        }
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
        description: "Display comprehensive browser and system information",
        seo: {
          title: "Browser Information - Detect Browser and Device Info | FreeDevTool.App",
          description: "View detailed browser, device, and screen information. Check user agent, viewport size, and capabilities.",
          keywords: "browser info, user agent, device info, screen size detector"
        }
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
    description: tool.description,
  }));
}
