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
            title: "Why Timezones Exist",
            items: [
              { label: "Before 1883:", text: "Every city set clocks by local solar noon—chaos for train schedules!" },
              { label: "The fix:", text: "Railroads created 4 US time zones. Within a year, 85% of cities adopted them" },
              { label: "UTC:", text: "Coordinated Universal Time replaced GMT in 1972 as the world's reference point" },
            ],
          },
          sections: [
            {
              title: "Weird Timezone Facts",
              items: [
                "China spans 5 geographical zones but uses ONE timezone (Beijing Time)—sunset at 10pm in the west!",
                "Nepal is UTC+5:45—the only country with a 45-minute offset",
                "Australia has 3 timezones, but 5 during daylight saving (some states opt out)",
                "Russia has 11 timezones—most of any country",
                "France has 12 timezones (if you count overseas territories)—more than Russia!",
                "Arizona doesn't observe DST, except the Navajo Nation, which contains the Hopi Reservation, which doesn't",
              ],
            },
            {
              title: "Daylight Saving Time Chaos",
              items: [
                { label: "Start/end dates:", text: "Vary by country—US, EU, and Australia all differ" },
                { label: "2023 example:", text: "US changed Mar 12, EU changed Mar 26—two weeks of extra confusion" },
                { label: "Equator countries:", text: "Don't use DST (sun rises/sets at same time year-round)" },
                { label: "The shift:", text: "Most countries shift 1 hour, but Lord Howe Island (Australia) shifts 30 minutes" },
                { label: "Abolishing DST:", text: "EU voted to end it in 2019—still hasn't happened" },
              ],
            },
            {
              title: "Global Meeting Sweet Spots",
              items: [
                { label: "US + Europe:", text: "2-5pm London = 9am-12pm New York = reasonable for both" },
                { label: "US + Asia:", text: "Brutal—someone's always in the middle of the night. Try 7am Pacific = 11pm Tokyo" },
                { label: "Europe + Asia:", text: "8am London = 4pm Singapore = 5pm Tokyo works well" },
                { label: "All three:", text: "Nearly impossible. Best bet: 6am Pacific = 2pm London = 10pm Tokyo (sorry, Tokyo)" },
              ],
            },
            {
              title: "For Developers",
              items: [
                "ALWAYS store times in UTC in your database—convert to local only for display",
                "Use IANA timezone names (America/New_York), not abbreviations (EST is ambiguous)",
                "Don't assume 24 hours in a day—DST creates 23 and 25-hour days",
                "Test your app on DST transition days (second Sunday of March, first Sunday of November in US)",
                "JavaScript Date objects are in local time by default—a common source of bugs",
              ],
            },
            {
              title: "Common Timezone Abbreviations",
              items: [
                { label: "UTC/GMT:", text: "The reference point (London in winter, but UK uses BST in summer)" },
                { label: "EST/EDT:", text: "Eastern Standard/Daylight Time (New York) — UTC-5 or UTC-4" },
                { label: "PST/PDT:", text: "Pacific Standard/Daylight Time (LA) — UTC-8 or UTC-7" },
                { label: "CET/CEST:", text: "Central European Time (Paris, Berlin) — UTC+1 or UTC+2" },
                { label: "JST:", text: "Japan Standard Time — UTC+9 (no DST, ever)" },
                { label: "IST:", text: "India Standard Time — UTC+5:30 (also means Irish Standard Time!)" },
              ],
            },
            {
              title: "Tools & Conventions",
              items: [
                "ISO 8601: The standard format—2024-03-15T14:30:00Z (Z = UTC, no offset)",
                "Unix timestamp: Seconds since Jan 1, 1970 UTC—timezone-agnostic",
                "Share times with timezone: '3pm ET' not just '3pm' to avoid confusion",
                "World clock apps: Add cities you work with frequently for quick reference",
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
            title: "URL Anatomy 101",
            items: [
              { label: "Full structure:", text: "protocol://subdomain.domain.tld:port/path?query=params#fragment" },
              { label: "Max length:", text: "2,083 chars (IE limit)—most browsers handle 64KB, but keep URLs under 2K for safety" },
              { label: "Encoding:", text: "Spaces become %20 or +, special chars get percent-encoded (é → %C3%A9)" },
            ],
          },
          sections: [
            {
              title: "URL Components Explained",
              items: [
                { label: "Protocol:", text: "http, https, ftp, mailto, tel—tells browser HOW to fetch the resource" },
                { label: "Subdomain:", text: "www, api, blog, mail—organizes services under one domain" },
                { label: "Domain:", text: "The registered name you pay for (google, amazon, github)" },
                { label: "TLD:", text: "Top-level domain (.com, .org, .io, .co.uk)—this tool handles multi-part TLDs!" },
                { label: "Port:", text: "Optional—defaults are 80 (http) and 443 (https)" },
                { label: "Path:", text: "/folder/page.html—the resource location on the server" },
                { label: "Query:", text: "?key=value&key2=value2—parameters passed to the server" },
                { label: "Fragment:", text: "#section—client-side only, jumps to page anchor (not sent to server!)" },
              ],
            },
            {
              title: "Query Parameter Secrets",
              items: [
                { label: "UTM params:", text: "utm_source, utm_medium, utm_campaign—tracking where traffic comes from" },
                { label: "Pagination:", text: "?page=2&limit=20—standard for API results" },
                { label: "Sorting:", text: "?sort=price&order=asc—common API pattern" },
                { label: "Filtering:", text: "?category=electronics&brand=apple—narrow down results" },
                { label: "Auth tokens:", text: "?token=abc123—sometimes in URL (not recommended for security!)" },
              ],
            },
            {
              title: "Developer Use Cases",
              items: [
                "Debug API calls: Paste a failing URL to see exactly what params are being sent",
                "Build query strings: Understand structure before constructing URLs programmatically",
                "Decode tracking links: See what UTM parameters are hiding in marketing URLs",
                "Parse OAuth callbacks: Extract code, state, and error params from redirect URLs",
                "Analyze affiliate links: See what tracking IDs are embedded",
              ],
            },
            {
              title: "Interesting URL Facts",
              items: [
                "First URL ever: http://info.cern.ch (still works! Try it)",
                "Longest TLD: .cancerresearch (16 chars) and .travelersinsurance (19 chars)",
                "Most expensive domain: Cars.com sold for $872 million (2014)",
                "Punycode: International domains like 中国.com become xn--fiqs8s.com",
                "Data URLs: data:text/html,<h1>Hello</h1> is a valid URL that renders HTML!",
              ],
            },
            {
              title: "URL Security Considerations",
              items: [
                "HTTPS everywhere: HTTP URLs expose all data including query params to network observers",
                "Don't put secrets in URLs: Query params appear in browser history, server logs, and referer headers",
                "Watch for open redirects: ?redirect=evil.com can be abused for phishing",
                "Validate thoroughly: Malformed URLs can crash parsers or enable injection attacks",
                "Shorten carefully: Shortened URLs hide the destination—preview before clicking unknown links",
              ],
            },
            {
              title: "Multi-Part TLDs This Tool Handles",
              items: [
                "Country-specific: .co.uk, .com.au, .co.jp, .com.br, .co.nz",
                "Government: .gov.uk, .gov.au, .gc.ca",
                "Academic: .ac.uk, .edu.au",
                "Why it matters: shop.example.co.uk → subdomain=shop, domain=example, TLD=co.uk (not uk!)",
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
          notice: {
            type: "info",
            title: "CSV: The Simplest Data Format",
            items: [
              { label: "Origin:", text: "CSV predates personal computers—used in 1972 on IBM mainframes!" },
              { label: "No standard:", text: "RFC 4180 exists but is just a guideline—Excel, Google Sheets, and databases all do it slightly differently" },
              { label: "Still dominant:", text: "In 2024, CSV remains the #1 data exchange format for non-developers" },
            ],
          },
          shortcuts: [
            { key: "Ctrl+Shift+4", action: "Open CSV to JSON tool" },
          ],
          sections: [
            {
              title: "Delimiter Options Explained",
              items: [
                { label: "Comma (,):", text: "Standard CSV—but breaks when data contains commas (addresses, numbers with thousand separators)" },
                { label: "Semicolon (;):", text: "European standard—countries using comma as decimal separator (1.234,56) use semicolon for CSV" },
                { label: "Tab (\\t):", text: "TSV format—safest choice, tabs rarely appear in data. Excel 'Export as Text' uses this" },
                { label: "Pipe (|):", text: "Database dumps and legacy systems—visible separator that almost never appears in data" },
              ],
            },
            {
              title: "CSV Gotchas This Tool Handles",
              items: [
                "Quoted fields: \"New York, NY\" stays together despite the comma inside",
                "Escaped quotes: \"She said \"\"Hello\"\"\" → She said \"Hello\"",
                "Empty fields: a,,c → three fields, middle one is empty string",
                "Trailing commas: Some exports add extra comma—we handle it gracefully",
                "Mixed line endings: Windows (CRLF), Mac (CR), Unix (LF)—all supported",
              ],
            },
            {
              title: "Why Convert CSV to JSON?",
              items: [
                { label: "APIs:", text: "REST APIs expect JSON—not a single major API accepts CSV directly" },
                { label: "JavaScript:", text: "JSON.parse() is native; CSV needs a library or custom parser" },
                { label: "Type safety:", text: "JSON preserves numbers, booleans, nulls—CSV treats everything as strings" },
                { label: "Nesting:", text: "JSON supports hierarchy; CSV is flat tables only" },
                { label: "Databases:", text: "MongoDB, Elasticsearch, Firebase—all JSON-native" },
              ],
            },
            {
              title: "Common CSV Sources",
              items: [
                "Excel/Google Sheets: File → Download → CSV",
                "Database exports: MySQL, PostgreSQL, SQLite all support CSV export",
                "Bank statements: Most banks offer CSV transaction downloads",
                "CRM exports: Salesforce, HubSpot, Mailchimp contact exports",
                "Analytics: Google Analytics, Mixpanel, Amplitude data exports",
                "Government data: Census, FDA, SEC—public data often in CSV",
              ],
            },
            {
              title: "JSON Output Formats",
              items: [
                { label: "Array of objects:", text: "[{name: 'Alice', age: 30}, ...] — most common, each row is an object" },
                { label: "Pretty printed:", text: "Indented with newlines—human readable, larger file size" },
                { label: "Minified:", text: "No whitespace—smaller file, harder to debug" },
              ],
            },
            {
              title: "Pro Tips",
              items: [
                "Clean headers first: Spaces become awkward keys—'First Name' → 'firstName' is better",
                "Check for BOM: Excel UTF-8 exports add invisible \\uFEFF at start—can break parsing",
                "Large files: For 100MB+ files, use streaming parsers (Papa Parse, csv-parse) instead",
                "Date formats: CSV dates are strings—you'll need to parse them after conversion",
                "Number precision: '0.1 + 0.2' in JSON is 0.30000000000000004—watch for financial data!",
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
            type: "info",
            title: "JSON Fun Facts",
            items: [
              { label: "Origin:", text: "Douglas Crockford discovered JSON in 2001—he says he 'didn't invent it, just found it'" },
              { label: "Name:", text: "JavaScript Object Notation, but used by every language now (Python, Go, Rust, Java...)" },
              { label: "File size:", text: "Minified JSON is ~30% smaller than formatted—matters for APIs serving millions of requests" },
            ],
          },
          sections: [
            {
              title: "Top JSON Mistakes (And How to Spot Them)",
              items: [
                { label: "Trailing comma:", text: "{\"a\": 1,} ← Remove that last comma! Valid in JS, invalid in JSON" },
                { label: "Single quotes:", text: "{'name': 'John'} ← Must use double quotes for keys AND strings" },
                { label: "Unquoted keys:", text: "{name: \"John\"} ← Every key needs double quotes" },
                { label: "Comments:", text: "// not allowed ← JSON has no comments (use JSONC formatter for that)" },
                { label: "Undefined:", text: "undefined isn't valid—use null instead" },
              ],
            },
            {
              title: "JSON vs Similar Formats",
              items: [
                { label: "JSON5:", text: "Allows comments, trailing commas, unquoted keys—human-friendly JSON" },
                { label: "JSONC:", text: "JSON with Comments—used by VS Code, TypeScript configs" },
                { label: "YAML:", text: "Indentation-based, more readable for configs, but whitespace-sensitive" },
                { label: "TOML:", text: "INI-like format, popular in Rust (Cargo.toml) and Python (pyproject.toml)" },
              ],
            },
            {
              title: "Real-World Debugging",
              items: [
                "API returns HTML instead of JSON? Check if you're hitting an error page or wrong endpoint",
                "\"Unexpected token < at position 0\" = Server returned HTML (probably a 404 or 500 page)",
                "Nested escape hell? {\"data\": \"{\\\"nested\\\": true}\"} = JSON stringified twice",
                "Unicode issues? Ensure UTF-8 encoding and escape special chars (\\u0000 format)",
                "Large files slow? Streaming parsers (like JSONStream) handle gigabyte files",
              ],
            },
            {
              title: "Size Matters: JSON Compression",
              items: [
                "Minify first: Removes whitespace (30% smaller, free)",
                "GZIP: Standard HTTP compression (70-90% smaller)",
                "Short keys: {\"n\": \"John\"} vs {\"firstName\": \"John\"} saves bytes at scale",
                "Arrays over objects: [{\"id\":1},{\"id\":2}] → [1,2] when context is clear",
                "Binary alternatives: Protocol Buffers, MessagePack for performance-critical apps",
              ],
            },
            {
              title: "Pro Developer Workflow",
              items: [
                "Pipe curl to jq: curl api.example.com | jq '.' for instant formatting",
                "VS Code: Ctrl+Shift+I formats JSON in place (with Prettier extension)",
                "Chrome DevTools: Network tab → Response → Pretty Print button",
                "Bookmark this tool: Paste sensitive API responses here—nothing leaves your browser",
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
            title: "HTML: The Web's Foundation",
            items: [
              { label: "Created:", text: "1991 by Tim Berners-Lee at CERN—originally just 18 tags!" },
              { label: "HTML5:", text: "Released 2014 after 15 years of development, added <video>, <canvas>, <article>" },
              { label: "Today:", text: "~115 standard elements, but most pages use fewer than 30" },
            ],
          },
          sections: [
            {
              title: "Common HTML Mistakes This Catches",
              items: [
                { label: "Unclosed tags:", text: "<div><p>Text</div> ← Missing </p> breaks layout unpredictably" },
                { label: "Missing alt:", text: "<img src='photo.jpg'> ← Screen readers can't describe this image" },
                { label: "Empty href:", text: "<a href=''>Click</a> ← Reloads page instead of doing nothing" },
                { label: "Inline styles:", text: "style='color:red' works but makes maintenance nightmare" },
                { label: "Deprecated tags:", text: "<center>, <font>, <marquee>—use CSS instead (it's 2024!)" },
              ],
            },
            {
              title: "Accessibility Must-Haves",
              items: [
                "alt on images: Describe what's IN the image, not 'image of...'",
                "label for inputs: <label for='email'>Email</label><input id='email'>",
                "Heading hierarchy: Don't skip levels (h1 → h3 without h2)",
                "Button vs link: <button> for actions, <a> for navigation",
                "lang attribute: <html lang='en'> helps screen readers pronounce correctly",
              ],
            },
            {
              title: "SEO HTML Essentials",
              items: [
                { label: "<title>:", text: "50-60 chars, unique per page, keyword near front" },
                { label: "<meta description>:", text: "150-160 chars, compelling summary for search results" },
                { label: "Semantic tags:", text: "<header>, <nav>, <main>, <article>, <footer>—helps Google understand structure" },
                { label: "Heading structure:", text: "One <h1> per page, logical hierarchy signals importance" },
                { label: "Image alt text:", text: "Helps Google Images understand and rank your images" },
              ],
            },
            {
              title: "HTML5 Semantic Elements",
              items: [
                { label: "<header>:", text: "Introductory content, typically contains logo and nav" },
                { label: "<nav>:", text: "Navigation links (main menu, breadcrumbs)" },
                { label: "<main>:", text: "Primary content—only ONE per page" },
                { label: "<article>:", text: "Self-contained content (blog post, news story, comment)" },
                { label: "<section>:", text: "Thematic grouping of content, usually with heading" },
                { label: "<aside>:", text: "Tangentially related content (sidebars, pull quotes)" },
                { label: "<footer>:", text: "Footer info—copyright, links, contact" },
              ],
            },
            {
              title: "Minification Benefits",
              items: [
                "Removes whitespace, comments, and unnecessary quotes",
                "Typical savings: 10-30% file size reduction",
                "Faster page loads = better SEO ranking (Core Web Vitals)",
                "Combined with GZIP: 70-90% total reduction",
                "Warning: Minified HTML is nearly unreadable—keep source files formatted!",
              ],
            },
            {
              title: "Modern HTML Best Practices",
              items: [
                "DOCTYPE: <!DOCTYPE html> is all you need (HTML5 simplified this)",
                "charset: <meta charset='UTF-8'> should be in first 1024 bytes",
                "viewport: <meta name='viewport' content='width=device-width, initial-scale=1'> for mobile",
                "Avoid div soup: Use semantic elements instead of <div class='header'>",
                "Self-closing tags: <br>, <img>, <input>—no need for <br /> anymore in HTML5",
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
            title: "YAML: Yet Another Markup Language (or is it?)",
            items: [
              { label: "Original name:", text: "'Yet Another Markup Language' (2001)" },
              { label: "Renamed:", text: "'YAML Ain't Markup Language' — a recursive acronym emphasizing data over documents" },
              { label: "Superset:", text: "All JSON is valid YAML (but not vice versa)" },
            ],
          },
          sections: [
            {
              title: "YAML's Infamous Gotchas",
              items: [
                { label: "Norway problem:", text: "NO (country code) becomes boolean false. Quote it: 'NO'" },
                { label: "Time trap:", text: "12:30 becomes 750 (minutes). Use quotes: '12:30'" },
                { label: "Version floats:", text: "3.10 becomes 3.1. Quote versions: '3.10'" },
                { label: "Octal surprise:", text: "0777 is parsed as octal (511 decimal) in YAML 1.1" },
                { label: "On/Off:", text: "on, off, yes, no all become booleans—quote them!" },
              ],
            },
            {
              title: "Where YAML Dominates",
              items: [
                { label: "Kubernetes:", text: "All manifests (pods, deployments, services) are YAML" },
                { label: "GitHub Actions:", text: ".github/workflows/*.yml for CI/CD pipelines" },
                { label: "Docker Compose:", text: "docker-compose.yml for multi-container apps" },
                { label: "Ansible:", text: "Playbooks and roles for infrastructure automation" },
                { label: "OpenAPI/Swagger:", text: "API specifications (though JSON works too)" },
                { label: "Home Assistant:", text: "Smart home automation config" },
              ],
            },
            {
              title: "YAML vs JSON vs TOML",
              items: [
                { label: "YAML:", text: "Most readable, but whitespace-sensitive. Great for configs humans edit" },
                { label: "JSON:", text: "More verbose, no comments, but zero ambiguity. Best for APIs/data exchange" },
                { label: "TOML:", text: "INI-style, explicit sections. Used by Rust (Cargo.toml), Python (pyproject.toml)" },
              ],
            },
            {
              title: "Syntax Quick Reference",
              items: [
                "key: value — basic key-value pair",
                "- item — list item (dash + space)",
                "nested:\\n  child: value — indentation creates hierarchy (2 spaces standard)",
                "| — literal block scalar (preserves newlines)",
                "> — folded block scalar (folds newlines to spaces)",
                "&anchor / *alias — reuse values (DRY principle)",
                "--- — document separator (multiple YAML docs in one file)",
              ],
            },
            {
              title: "Common Mistakes",
              items: [
                "Tabs instead of spaces: YAML only allows spaces for indentation",
                "Inconsistent indentation: Pick 2 spaces and stick with it everywhere",
                "Missing space after colon: 'key:value' fails, 'key: value' works",
                "Unquoted special chars: Colons, #, @, and & need quoting in strings",
                "Trailing whitespace: Some parsers are picky about spaces at line ends",
              ],
            },
            {
              title: "Pro Tips",
              items: [
                "Use yamllint for CI validation: catches issues before deployment",
                "VS Code extension 'YAML' by Red Hat adds autocomplete for K8s schemas",
                "Multi-line strings: Use | for code/scripts, > for long paragraphs",
                "Anchors for DRY: Define once with &name, reference with *name",
                "Convert to JSON to debug: Same data, but no ambiguity about parsing",
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
          notice: {
            type: "info",
            title: "GraphQL Origins",
            items: [
              { label: "Created:", text: "Facebook, 2012 (internal), open-sourced 2015" },
              { label: "Why:", text: "Mobile app needed to fetch exactly what it needed—no more, no less" },
              { label: "Name:", text: "Graph Query Language—models data as a graph of connected nodes" },
            ],
          },
          sections: [
            {
              title: "GraphQL vs REST: Key Differences",
              items: [
                { label: "Endpoints:", text: "REST has many (/users, /posts), GraphQL has ONE (/graphql)" },
                { label: "Over-fetching:", text: "REST returns everything; GraphQL returns exactly what you ask for" },
                { label: "Under-fetching:", text: "REST needs multiple calls; GraphQL gets related data in one query" },
                { label: "Versioning:", text: "REST uses /v1, /v2; GraphQL evolves schema without versions" },
                { label: "Caching:", text: "REST uses HTTP caching; GraphQL needs custom solutions (Apollo, Relay)" },
              ],
            },
            {
              title: "Query, Mutation, Subscription",
              items: [
                { label: "Query:", text: "Read data—like GET in REST. Can fetch nested related data in one call" },
                { label: "Mutation:", text: "Write data—like POST/PUT/DELETE. Returns updated data immediately" },
                { label: "Subscription:", text: "Real-time updates via WebSocket. Great for chat, notifications, live feeds" },
              ],
            },
            {
              title: "Schema Design Best Practices",
              items: [
                "Use descriptive type names: User, not U or UserType",
                "Nullable by default—add ! only when truly required (easier migrations)",
                "Use interfaces for shared fields (Node, Timestamped, Auditable)",
                "Prefer connections over arrays for pagination: users(first: 10, after: cursor)",
                "Add descriptions: \"\"\"User account with profile and settings\"\"\" for documentation",
              ],
            },
            {
              title: "Who Uses GraphQL?",
              items: [
                "GitHub API v4: Entire public API is GraphQL (REST is v3, legacy)",
                "Shopify: Powers their entire storefront and admin APIs",
                "Airbnb: Migrated from REST to reduce mobile data usage by 30%",
                "Twitter: Uses it for their web app data fetching",
                "Netflix, PayPal, Pinterest, Starbucks, The New York Times...",
              ],
            },
            {
              title: "Common Gotchas",
              items: [
                "N+1 problem: Use DataLoader to batch database queries",
                "Security: Limit query depth and complexity to prevent DoS",
                "No file uploads in spec: Use multipart form data or presigned URLs",
                "Error handling: Errors can be partial—check both data AND errors fields",
                "Introspection: Disable in production to hide your schema from attackers",
              ],
            },
            {
              title: "Tooling Ecosystem",
              items: [
                { label: "Apollo:", text: "Most popular client and server libraries" },
                { label: "Relay:", text: "Facebook's client, strict but powerful" },
                { label: "Hasura:", text: "Instant GraphQL API from PostgreSQL" },
                { label: "Prisma:", text: "Database toolkit that generates GraphQL resolvers" },
                { label: "GraphiQL/Playground:", text: "Interactive IDE for exploring APIs" },
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
          notice: {
            type: "info",
            title: "TLS vs SSL: What's the Difference?",
            items: [
              { label: "SSL:", text: "Secure Sockets Layer (1995)—deprecated, has known vulnerabilities" },
              { label: "TLS:", text: "Transport Layer Security (1999)—SSL's successor, what we actually use today" },
              { label: "HTTPS:", text: "HTTP + TLS = encrypted web traffic. The padlock means TLS is active" },
              { label: "Fun fact:", text: "Everyone says 'SSL certificate' but they mean TLS. SSL 3.0 was disabled in 2015" },
            ],
          },
          sections: [
            {
              title: "Certificate Fields Explained",
              items: [
                { label: "Subject (CN):", text: "Who the cert is issued TO—usually the domain name (example.com)" },
                { label: "Issuer:", text: "Who SIGNED the cert—the Certificate Authority (Let's Encrypt, DigiCert, etc.)" },
                { label: "SANs:", text: "Subject Alternative Names—additional domains covered (www, api, mail subdomains)" },
                { label: "Valid From/To:", text: "The cert's lifespan. Max is now 398 days (browsers enforce this)" },
                { label: "Serial Number:", text: "Unique ID from the CA—used for revocation tracking" },
              ],
            },
            {
              title: "Certificate Types",
              items: [
                { label: "DV (Domain):", text: "Proves you control the domain. Cheapest, fastest (Let's Encrypt = free!)" },
                { label: "OV (Organization):", text: "Verifies the company exists. Shows org name in cert details" },
                { label: "EV (Extended):", text: "Rigorous vetting process. Used to show green bar (browsers removed this)" },
                { label: "Wildcard:", text: "*.example.com covers all subdomains (but not sub-subdomains)" },
                { label: "Multi-domain:", text: "One cert for multiple unrelated domains via SANs" },
              ],
            },
            {
              title: "Common Certificate Errors",
              items: [
                "ERR_CERT_DATE_INVALID → Certificate expired or not yet valid (check server time!)",
                "ERR_CERT_COMMON_NAME_INVALID → Domain doesn't match CN or SANs",
                "ERR_CERT_AUTHORITY_INVALID → Self-signed or unknown CA (missing intermediate cert?)",
                "ERR_CERT_REVOKED → CA revoked this cert (compromised key, mis-issuance)",
                "NET_ERR_CERT_WEAK_KEY → RSA key too short (need 2048+ bits since 2013)",
              ],
            },
            {
              title: "The Certificate Chain",
              items: [
                "Your cert → Intermediate CA → Root CA (trust anchor in browser/OS)",
                "Servers must send the full chain (except root)—missing intermediates break mobile!",
                "Root CAs are pre-installed in browsers (about 150 trusted roots exist)",
                "Certificate Transparency: All certs are logged publicly (crt.sh lets you search them)",
              ],
            },
            {
              title: "Key Algorithms in 2024",
              items: [
                { label: "RSA 2048:", text: "Still common, minimum acceptable size, being phased out" },
                { label: "RSA 4096:", text: "More secure but slower handshakes—overkill for most sites" },
                { label: "ECDSA P-256:", text: "Smaller keys, faster than RSA, now the default choice" },
                { label: "Ed25519:", text: "Even faster, gaining support, not yet universal" },
              ],
            },
            {
              title: "Let's Encrypt Changed Everything",
              items: [
                "Launched 2015: Free, automated, open Certificate Authority",
                "Issues 400+ million active certificates (50%+ of the web)",
                "90-day certs encourage automation (certbot auto-renews)",
                "Killed the $100+/year certificate industry for basic DV certs",
                "Founded by EFF, Mozilla, and others to encrypt the entire web",
              ],
            },
            {
              title: "CLI Commands for Certificates",
              items: [
                "openssl s_client -connect example.com:443 → Fetch cert from live server",
                "openssl x509 -in cert.pem -text -noout → Decode local PEM file",
                "openssl verify -CAfile ca.pem cert.pem → Verify chain",
                "curl -vI https://example.com 2>&1 | grep -A6 'Server certificate' → Quick check",
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
            title: "QR Code Origins",
            items: [
              { label: "Invented:", text: "1994 by Denso Wave (Toyota subsidiary) to track car parts in manufacturing" },
              { label: "Name:", text: "'Quick Response'—designed to be scanned 10x faster than barcodes" },
              { label: "Patent:", text: "Denso Wave owns it but chose NOT to enforce it, enabling global adoption" },
            ],
          },
          sections: [
            {
              title: "QR Code Types This Tool Supports",
              items: [
                { label: "URL:", text: "Auto-opens website (most common use—menus, links, payments)" },
                { label: "WiFi:", text: "Scan to connect—perfect for guest networks, cafes, Airbnbs" },
                { label: "vCard:", text: "Scan to save contact—put on business cards, email signatures" },
                { label: "Email:", text: "Opens compose with pre-filled address (mailto: protocol)" },
                { label: "Phone:", text: "Tap to call (tel: protocol)" },
                { label: "SMS:", text: "Opens text message with pre-filled number and message" },
              ],
            },
            {
              title: "Error Correction Levels",
              items: [
                { label: "L (7%):", text: "Smallest QR, but easily damaged—use for perfect conditions" },
                { label: "M (15%):", text: "Default balance—handles minor scratches or dirt" },
                { label: "Q (25%):", text: "Good for printed materials that may get worn" },
                { label: "H (30%):", text: "Maximum recovery—allows logos in center (up to 30% can be obscured!)" },
              ],
            },
            {
              title: "Creative QR Code Uses",
              items: [
                "Restaurant menus: COVID made these universal—no more sticky laminated menus",
                "Gravestones: QR codes linking to memorial websites with photos and stories",
                "Business cards: vCard QR saves your contact info with one scan",
                "WiFi sharing: Print and frame near your router for guests",
                "Scavenger hunts: Each QR reveals the next clue location",
                "Art installations: QR codes as design elements linking to artist info",
              ],
            },
            {
              title: "Real-World QR Statistics",
              items: [
                "2022: 89 million US smartphone users scanned a QR code (up from 72M in 2019)",
                "China: QR payments processed $1.8 TRILLION in 2020 (WeChat Pay, Alipay)",
                "COVID impact: Restaurant QR menu usage jumped 750% in 2020",
                "Maximum capacity: 4,296 alphanumeric characters (or 7,089 digits)",
                "Smallest readable: About 1cm × 1cm for simple URLs (10 modules wide minimum)",
              ],
            },
            {
              title: "QR Code Best Practices",
              items: [
                "Test before printing: Scan with multiple phones and apps",
                "Quiet zone: Leave white border around QR (at least 4 modules wide)",
                "Contrast matters: Dark foreground on light background works best",
                "Size rule: 10× the scanning distance in mm (10cm away = 1cm QR minimum)",
                "Short URLs: Use URL shorteners for complex links—simpler QR = more reliable",
                "Track scans: Use UTM parameters or QR analytics services",
              ],
            },
            {
              title: "QR vs Other Codes",
              items: [
                { label: "Barcode:", text: "1D, holds ~20 chars, requires laser scanner" },
                { label: "QR Code:", text: "2D, holds ~4,000 chars, any camera works" },
                { label: "Data Matrix:", text: "2D, smaller than QR for same data, used in electronics/pharma" },
                { label: "Aztec Code:", text: "2D, no quiet zone needed, used in airline boarding passes" },
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
          notice: {
            type: "info",
            title: "Unicode: One Standard to Rule Them All",
            items: [
              { label: "Before Unicode:", text: "Chaos—ASCII (128 chars), Latin-1 (256), Shift-JIS (Japanese), Big5 (Chinese)... files were garbled between systems" },
              { label: "The fix:", text: "Unicode Consortium (1991) created one encoding for every character in every language" },
              { label: "Today:", text: "149,813 characters covering 161 scripts, from English to Emoji to Egyptian Hieroglyphs" },
            ],
          },
          sections: [
            {
              title: "Unicode by the Numbers",
              items: [
                "Total possible code points: 1,114,112 (0x000000 to 0x10FFFF)",
                "Currently assigned: ~149,000 (about 13% used)",
                "New additions yearly: ~700-1,000 characters per version",
                "Emoji alone: 3,782 (as of Unicode 15.1)",
                "CJK ideographs: 97,680+ (Chinese/Japanese/Korean characters)",
                "Private use area: 6,400 slots for custom characters",
              ],
            },
            {
              title: "Famous Unicode Characters",
              items: [
                { label: "U+0000:", text: "NULL—the very first code point (inherited from ASCII)" },
                { label: "U+FFFD:", text: "�—the 'replacement character' shown when decoding fails" },
                { label: "U+200B:", text: "Zero-width space—invisible but exists (copy this: '​' ← it's there!)" },
                { label: "U+1F4A9:", text: "💩—the pile of poo emoji, hotly debated before approval" },
                { label: "U+2603:", text: "☃—the snowman, used to test Unicode support" },
              ],
            },
            {
              title: "Useful Symbols for Developers",
              items: [
                "→ ← ↑ ↓ (arrows): Great for CLI tools and documentation",
                "✓ ✗ (check/cross): Status indicators without images",
                "• ◦ ‣ (bullets): List styling in plain text",
                "│ ├ └ ─ (box drawing): ASCII art tables and trees",
                "∞ ≈ ≠ ≤ ≥ (math): Technical documentation",
                "© ® ™ (legal): Trademark and copyright notices",
              ],
            },
            {
              title: "Unicode Security Gotchas",
              items: [
                { label: "Homoglyphs:", text: "раypal.com ← That 'a' is Cyrillic! Used in phishing attacks" },
                { label: "Invisible chars:", text: "U+200B (zero-width space) can hide in filenames and URLs" },
                { label: "Right-to-left:", text: "U+202E reverses text direction—filename 'photo[RLO]gnp.exe' appears as 'photoexe.png'" },
                { label: "Normalization:", text: "é can be 1 char or 2 (e + combining accent)—causes string comparison bugs" },
              ],
            },
            {
              title: "Emoji Evolution",
              items: [
                "1999: First emoji created by Shigetaka Kurita at NTT DoCoMo (Japan)",
                "2010: Unicode 6.0 officially added emoji—722 characters",
                "2015: Skin tone modifiers added (Fitzpatrick scale)",
                "2019: Emoji 12.0 added gender-neutral options",
                "Most used emoji: 😂 (Face with Tears of Joy)—15% of all emoji usage",
                "Newest additions: Shaking face, pink heart, moose, and more (Unicode 15.0)",
              ],
            },
            {
              title: "How to Type Unicode",
              items: [
                { label: "Windows:", text: "Alt + numpad code (Alt+0169 = ©) or Win+. for emoji picker" },
                { label: "Mac:", text: "Ctrl+Cmd+Space for emoji picker, or enable Unicode Hex Input keyboard" },
                { label: "Linux:", text: "Ctrl+Shift+U then hex code (Ctrl+Shift+U 00A9 = ©)" },
                { label: "HTML:", text: "&copy; or &#169; or &#x00A9; (all render as ©)" },
                { label: "JavaScript:", text: "'\\u00A9' or '\\u{1F600}' for emoji (ES6+ required for latter)" },
              ],
            },
            {
              title: "Fun Unicode Blocks to Explore",
              items: [
                "Dingbats (U+2700): ✂ ✈ ✉ ✎—classic symbols from Zapf Dingbats font",
                "Box Drawing (U+2500): Create ASCII art tables and UI borders",
                "Miscellaneous Symbols (U+2600): ☀ ☁ ☂ ☃ ⚡—weather and more",
                "Mathematical Operators (U+2200): ∀ ∃ ∈ ∑ ∏ √—for math docs",
                "Playing Cards (U+1F0A0): 🂡 🂱 🃁 🃑—full deck of cards!",
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
          shortcuts: [
            { key: "Enter", action: "Add new timer" },
            { key: "Space", action: "Start/Pause first timer" },
            { key: "Escape", action: "Stop all timers" },
          ],
          sections: [
            {
              title: "Productivity Timer Presets",
              items: [
                { label: "Pomodoro:", text: "25 min work + 5 min break (repeat 4x, then 15-30 min long break)" },
                { label: "52-17 Method:", text: "52 min focused work + 17 min break (studied as optimal by DeskTime)" },
                { label: "Time Boxing:", text: "Set fixed time for a task—when it rings, stop and evaluate" },
                { label: "Ultradian Rhythm:", text: "90 min work cycles matching your body's natural focus waves" },
              ],
            },
            {
              title: "Everyday Timer Uses",
              items: [
                "Cooking: Pasta (8-12 min), boiled eggs (6-12 min), rice (18-20 min)",
                "Laundry: Washer done reminder, dryer cycle, hand-wash soak time",
                "Parking meters: Set timer to avoid tickets (leave 5 min buffer!)",
                "Screen breaks: 20-20-20 rule—every 20 min, look 20 ft away for 20 sec",
                "Kids' screen time: Set agreed-upon limits with an audible 'time's up!'",
              ],
            },
            {
              title: "Multiple Timers Power",
              items: [
                "Thanksgiving dinner: Turkey, sides, and pie all with different timers",
                "Meeting agenda: Set 5-min timers for each topic to stay on track",
                "Workout intervals: Run concurrent timers for exercise/rest cycles",
                "Board games: Chess clock alternative—each player gets their own countdown",
              ],
            },
            {
              title: "Pro Tips",
              items: [
                "Name your timers—'Laundry' is easier to track than 'Timer 45:00'",
                "Use 'Until stopped' alarm for things you might not hear immediately",
                "Share timer URLs with teammates for synchronized countdowns",
                "Stack timers: Start a 5-min break timer right when your work timer ends",
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
            title: "Time Perspective",
            items: [
              { label: "1 million seconds:", text: "About 11.5 days" },
              { label: "1 billion seconds:", text: "About 31.7 years (you've probably lived through one!)" },
              { label: "Average lifespan:", text: "~2.5 billion seconds or ~28,000 days" },
            ],
          },
          sections: [
            {
              title: "Fun Calculations to Try",
              items: [
                "Your exact age: Enter your birthday → get your age in days, hours, even seconds",
                "Relationship milestone: How many days since you met your partner/best friend?",
                "Career duration: First day at work → today = your exact tenure",
                "10,000 hours: Malcolm Gladwell's mastery threshold—when did you/will you hit it?",
                "Moon landing: July 20, 1969 → now (over 20,000 days ago!)",
                "Your 10,000th day alive: A milestone most people don't know about (~age 27)",
              ],
            },
            {
              title: "Business & Legal Uses",
              items: [
                { label: "Invoice aging:", text: "Invoice date → today = days outstanding (Net 30, 60, 90)" },
                { label: "Contract terms:", text: "Start → end = exact contract duration for billing" },
                { label: "Warranty check:", text: "Purchase date → now = is it still under warranty?" },
                { label: "Employee tenure:", text: "Hire date → today for anniversary bonuses, vesting" },
                { label: "Statute of limitations:", text: "Event date → filing deadline calculations" },
              ],
            },
            {
              title: "Project Management",
              items: [
                "Sprint length: Confirm your sprints are exactly 2 weeks (14 days)",
                "Release countdown: Days until launch = remaining workdays at a glance",
                "SLA tracking: Incident start → resolution = SLA compliance check",
                "Vacation planning: Days between trips, or days until your next vacation",
                "Deadline reality: 'Due in 3 weeks' = only 15 weekdays of actual work!",
              ],
            },
            {
              title: "Historical Time Spans",
              items: [
                "Unix Epoch (Jan 1, 1970) → now: The basis of all computer timestamps",
                "Y2K (Jan 1, 2000) → now: A quarter century since the 'millennium bug'",
                "iPhone launch (Jun 29, 2007) → now: The smartphone era's exact age",
                "COVID-19 lockdowns (Mar 2020) → now: How long has it really been?",
                "Your favorite movie/album release → now: Feel old yet?",
              ],
            },
            {
              title: "Why Months Are Weird",
              items: [
                "Months have 28, 29, 30, or 31 days—so '1 month' is ambiguous",
                "February is shorter because Romans considered it unlucky",
                "July and August both have 31 days because emperors had egos",
                "This tool calculates month differences by actual calendar months, not 30-day periods",
                "For precise billing, use days or hours instead of months",
              ],
            },
            {
              title: "Time Unit Conversions",
              items: [
                "1 day = 24 hours = 1,440 minutes = 86,400 seconds",
                "1 week = 168 hours = 10,080 minutes",
                "1 year = 365.25 days (accounting for leap years) = 8,766 hours",
                "1 decade = 3,652.5 days ≈ 87,660 hours",
                "1 century = 36,525 days = 876,600 hours = 52.6 million minutes",
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
          notice: {
            type: "info",
            title: "The Math That Banks Don't Highlight",
            items: [
              { label: "Credit card trap:", text: "$5,000 at 22% APR with minimum payments = 22 years to pay off + $7,723 interest" },
              { label: "The $50 difference:", text: "Adding just $50/month to that card cuts payoff to 5 years, saves $5,500+" },
            ],
          },
          sections: [
            {
              title: "Debt Payoff Strategies",
              items: [
                { label: "Avalanche Method:", text: "Pay highest interest first—mathematically optimal, saves most money" },
                { label: "Snowball Method:", text: "Pay smallest balance first—quick wins build momentum (Dave Ramsey's favorite)" },
                { label: "Hybrid Approach:", text: "Start with one small win, then switch to avalanche for savings" },
                { label: "Balance Transfer:", text: "Move high-interest debt to 0% APR card (watch the 3-5% transfer fee)" },
              ],
            },
            {
              title: "Typical Interest Rates (US 2024)",
              items: [
                "Credit cards: 20-29% APR (some store cards hit 30%+)",
                "Personal loans: 8-15% APR (depends on credit score)",
                "Auto loans: 5-12% APR (new cars get better rates)",
                "Student loans: 5-8% federal, 4-14% private",
                "Mortgages: 6-8% (historically low was 2.65% in Jan 2021)",
              ],
            },
            {
              title: "Psychology of Debt Freedom",
              items: [
                "Automate payments: Remove willpower from the equation entirely",
                "Celebrate milestones: Paid off a card? Treat yourself (reasonably!)",
                "Visualize progress: Track your debt-free date—watching it shrink motivates",
                "Tell someone: Accountability partners increase success rate by 65%",
                "Avoid new debt: Cut up cards or freeze them in ice (literally)",
              ],
            },
            {
              title: "Extra Payment Hacks",
              items: [
                "Round up: $267 payment? Make it $300—barely noticeable, big impact",
                "Biweekly payments: Pay half every 2 weeks = 13 full payments/year instead of 12",
                "Tax refund attack: Average US refund ($3,167) can eliminate a whole debt",
                "Side hustle rule: 100% of extra income to debt until free (then 50% to savings)",
                "Expense audit: Cancel 3 subscriptions = $30-50/month extra toward debt",
              ],
            },
            {
              title: "Warning Signs You Need Help",
              items: [
                "Only making minimum payments across all debts",
                "Using credit cards to pay other credit cards",
                "Debt-to-income ratio above 43% (mortgage lenders' red line)",
                "Missing payments or getting collection calls",
                "Consider: Nonprofit credit counseling (free!), not debt settlement scams",
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
            title: "Privacy First",
            items: [
              { label: "100% local:", text: "Video never leaves your device—no uploads, no cloud, no servers" },
              { label: "Permission required:", text: "Browser asks once; revoke anytime in site settings" },
              { label: "Photos stay local:", text: "Captured images download directly to your device" },
            ],
          },
          shortcuts: [
            { key: "Ctrl+Shift+.", action: "Open Camera Test tool" },
          ],
          sections: [
            {
              title: "When to Test Your Camera",
              items: [
                "Before job interviews: Nothing worse than 'your camera isn't working' mid-interview",
                "New webcam setup: Verify it's detected and working before your first call",
                "Multiple cameras: Check which one is active (laptop vs external vs virtual)",
                "After OS updates: Windows/Mac updates sometimes reset camera permissions",
                "Lighting check: See how you actually look before going live",
              ],
            },
            {
              title: "Common Webcam Resolutions",
              items: [
                { label: "480p (SD):", text: "640×480 — Built-in laptop cameras from 2010s, barely acceptable" },
                { label: "720p (HD):", text: "1280×720 — Most common laptop webcam, fine for calls" },
                { label: "1080p (Full HD):", text: "1920×1080 — External webcams (Logitech C920/C922), looks professional" },
                { label: "4K:", text: "3840×2160 — High-end streaming cameras, often overkill for video calls" },
              ],
            },
            {
              title: "Why Your Camera Might Not Work",
              items: [
                "Another app is using it: Zoom, Teams, Chrome—only one app can access at a time",
                "Permission denied: Check browser settings → Privacy → Camera",
                "Wrong camera selected: Virtual cameras (OBS, Snap) can confuse selection",
                "Hardware switch: Some laptops have physical camera kill switches (check keyboard)",
                "Privacy shutter: Many webcams now have sliding covers—is yours open?",
                "Driver issues: Windows? Try Device Manager → Cameras → Update driver",
              ],
            },
            {
              title: "Virtual Cameras Explained",
              items: [
                { label: "OBS Virtual Camera:", text: "Stream your desktop, overlays, or scenes as a 'webcam'" },
                { label: "Snap Camera:", text: "Add filters and effects to any video call (RIP 2024)" },
                { label: "ManyCam:", text: "Multiple sources, picture-in-picture, screen sharing" },
                { label: "Camo:", text: "Use your iPhone as a high-quality webcam (Apple Continuity)" },
                { label: "DroidCam:", text: "Turn Android phone into wireless webcam" },
              ],
            },
            {
              title: "Pro Tips for Better Video",
              items: [
                "Light from the front: Window behind you = silhouette. Ring light or desk lamp facing you helps",
                "Eye level: Stack books under laptop so camera is at eye height, not nostril height",
                "Clean the lens: Laptop webcam lenses get surprisingly dusty/smudgy",
                "Background matters: Plain wall > messy room. Or use virtual backgrounds",
                "Wired > WiFi: For streaming, ethernet eliminates dropped frames",
              ],
            },
            {
              title: "Browser Compatibility",
              items: [
                "Chrome/Edge: Best support, all features work",
                "Firefox: Full support, may ask permission more often",
                "Safari: Works but sometimes quirky with device selection",
                "Brave: Works if shields allow camera access",
                "Incognito/Private: Will always re-ask for camera permission",
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
