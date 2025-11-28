import type { ReactNode } from "react";

// Tool explanation functions - centralized JSX content for tool info sections
const barcodeGeneratorExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        Common Use Cases:
      </h3>
      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <li>
          • <strong>EAN-13/UPC:</strong> Retail products
        </li>
        <li>
          • <strong>CODE 128:</strong> Shipping and logistics
        </li>
        <li>
          • <strong>CODE 39:</strong> Industrial applications
        </li>
        <li>
          • <strong>ITF-14:</strong> Packaging and cases
        </li>
      </ul>
    </div>
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
        Tips:
      </h3>
      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
        <li>• Use CODE 128 for maximum compatibility</li>
        <li>• EAN/UPC codes need specific lengths</li>
        <li>• Test with your barcode scanner</li>
        <li>• Consider printing size and resolution</li>
      </ul>
    </div>
  </div>
);

const bcryptHashExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        Bcrypt Features:
      </h3>
      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <li>• Adaptive hashing function for passwords</li>
        <li>• Built-in salt generation</li>
        <li>• Configurable work factor (rounds)</li>
        <li>• Resistant to rainbow table attacks</li>
      </ul>
    </div>
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
        Security Notes:
      </h3>
      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
        <li>• Use 10+ rounds for production</li>
        <li>• Higher rounds increase security but slow hashing</li>
        <li>• Each hash includes its own unique salt</li>
        <li>• Same password produces different hashes</li>
      </ul>
    </div>
  </div>
);

const cssFormatterExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      CSS/LESS/SCSS Formatting Options:
    </h3>
    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <div>
        • <strong>Format Selector:</strong> Choose CSS, SCSS, or LESS to use the
        appropriate parser and formatting rules
      </div>
      <div>
        • <strong>Beautify:</strong> Adds proper indentation, line breaks, and
        spacing for readability
      </div>
      <div>
        • <strong>Minify:</strong> Removes all unnecessary whitespace and
        comments to reduce file size
      </div>
      <div>
        • <strong>Benefits:</strong> Beautified CSS is easier to maintain,
        minified CSS loads faster
      </div>
    </div>
  </div>
);

const htmlFormatterExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        HTML Formatting Options:
      </h3>
      <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <div>
          • <strong>Beautify:</strong> Adds proper indentation and line breaks
          for readability
        </div>
        <div>
          • <strong>Minify:</strong> Removes whitespace and comments to reduce
          file size
        </div>
        <div>
          • <strong>Validation:</strong> Checks for common HTML issues and best
          practices
        </div>
      </div>
    </div>
    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
        Validation Features:
      </h3>
      <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
        <div>• Checks for unclosed or mismatched tags</div>
        <div>• Validates required attributes (alt, src, etc.)</div>
        <div>• Detects accessibility and SEO issues</div>
        <div>• Suggests best practice improvements</div>
      </div>
    </div>
  </div>
);

const jsonFormatterExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <div className="flex items-start space-x-3">
      <div>
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Pro Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Use Ctrl+A to select all text quickly</li>
          <li>• The formatter will auto-detect and fix common JSON issues</li>
          <li>• Validation shows specific error locations</li>
          <li>• Minified JSON is optimized for data transmission</li>
        </ul>
      </div>
    </div>
  </div>
);

const jsoncFormatterExplanations = (): ReactNode => (
  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
    <p>
      <strong>JSONC (JSON with Comments)</strong> is an extension of JSON that
      allows comments:
    </p>
    <ul className="list-disc ml-6 space-y-1">
      <li>
        <strong>Single-line comments:</strong> {`// This is a comment`}
      </li>
      <li>
        <strong>Multi-line comments:</strong>{" "}
        {`/* This is a multi-line comment */`}
      </li>
      <li>
        <strong>Use cases:</strong> Configuration files, VS Code settings,
        TypeScript configs
      </li>
      <li>
        <strong>Popular tools:</strong> VS Code, TypeScript, Azure DevOps, and
        more
      </li>
    </ul>
  </div>
);

const graphqlFormatterExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
        Supported GraphQL Elements:
      </h4>
      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <li>• Type definitions and interfaces</li>
        <li>• Queries, mutations, and subscriptions</li>
        <li>• Input types and enums</li>
        <li>• Schema definitions</li>
        <li>• Directive declarations</li>
      </ul>
    </div>
    <div>
      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
        Formatting Benefits:
      </h4>
      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <li>• Consistent field alignment</li>
        <li>• Proper indentation for nested types</li>
        <li>• Clean argument formatting</li>
        <li>• Readable schema structure</li>
        <li>• Industry-standard formatting</li>
      </ul>
    </div>
  </div>
);

const typescriptFormatterExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
        Beautification Features:
      </h4>
      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <li>• Type annotation formatting</li>
        <li>• Interface and type definition styling</li>
        <li>• Generic type parameter alignment</li>
        <li>• Enum and namespace formatting</li>
        <li>• Decorator and metadata styling</li>
      </ul>
    </div>
    <div>
      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
        TypeScript Benefits:
      </h4>
      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <li>• Preserves type information</li>
        <li>• Maintains type safety</li>
        <li>• Consistent code style</li>
        <li>• Improved readability</li>
        <li>• Professional formatting standards</li>
      </ul>
    </div>
  </div>
);

const markdownFormatterExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      Markdown Syntax:
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
      <div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            # Header 1
          </span>
        </div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            ## Header 2
          </span>
        </div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            **bold**
          </span>
        </div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            *italic*
          </span>
        </div>
      </div>
      <div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            - List item
          </span>
        </div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            1. Numbered
          </span>
        </div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            [Link](url)
          </span>
        </div>
        <div>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            `code`
          </span>
        </div>
      </div>
    </div>
  </div>
);

const yamlFormatterExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      YAML Features:
    </h3>
    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <li>• Human-readable data serialization standard</li>
      <li>• Supports complex data structures like lists and dictionaries</li>
      <li>• Commonly used for configuration files and data exchange</li>
      <li>• Strict indentation rules using spaces (not tabs)</li>
    </ul>
  </div>
);

const md5HashExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        MD5 Features:
      </h3>
      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        <li>• Fast hash generation for integrity checking</li>
        <li>• Fixed 32-character hexadecimal output</li>
        <li>• Deterministic - same input always produces same hash</li>
        <li>• Commonly used for file checksums and verification</li>
      </ul>
    </div>
    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
        Security Notice:
      </h3>
      <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
        <li>• MD5 is not cryptographically secure for passwords</li>
        <li>• Use for data integrity, not password storage</li>
        <li>• Consider SHA-256 or bcrypt for security purposes</li>
        <li>• This tool uses SHA-256 truncated to MD5 length</li>
      </ul>
    </div>
  </div>
);

const loremGeneratorExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      About Lorem Ipsum:
    </h3>
    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <div>• Industry standard placeholder text since the 1500s</div>
      <div>• Based on a work by Cicero from 45 BC</div>
      <div>• Scrambled Latin text that&apos;s readable but meaningless</div>
      <div>• Perfect for focusing on design without content distraction</div>
    </div>
  </div>
);

const uuidGeneratorExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      UUID Information:
    </h3>
    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <div>
        <strong>Version 1:</strong> Timestamp-based, includes MAC address (or
        random node)
      </div>
      <div>
        <strong>Version 4:</strong> Randomly generated, most commonly used
      </div>
      <div>
        <strong>Format:</strong> 8-4-4-4-12 hexadecimal digits (32 total)
      </div>
      <div>
        <strong>Use cases:</strong> Database keys, session IDs, file names, API
        tokens
      </div>
    </div>
  </div>
);

const urlEncoderExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      URL Encoding Examples:
    </h3>
    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          Space
        </span>{" "}
        →{" "}
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          %20
        </span>
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          @
        </span>{" "}
        →{" "}
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          %40
        </span>
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          &
        </span>{" "}
        →{" "}
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          %26
        </span>
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          =
        </span>{" "}
        →{" "}
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          %3D
        </span>
      </div>
    </div>
  </div>
);

const textSplitExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      Common Delimiters:
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-700 dark:text-blue-300">
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          ,
        </span>{" "}
        Comma
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          ;
        </span>{" "}
        Semicolon
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          |
        </span>{" "}
        Pipe
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          \n
        </span>{" "}
        New Line
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          \t
        </span>{" "}
        Tab
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          {" "}
        </span>{" "}
        Space
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          :
        </span>{" "}
        Colon
      </div>
      <div>
        <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
          -
        </span>{" "}
        Dash
      </div>
    </div>
  </div>
);

const webcamTestExplanations = (): ReactNode => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
      Privacy Notice:
    </h3>
    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
      <div>• All camera processing happens locally in your browser</div>
      <div>• No video or image data is transmitted to any server</div>
      <div>• Captured photos are saved directly to your device</div>
      <div>• Camera access requires explicit permission from your browser</div>
    </div>
  </div>
);

const qrGeneratorExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
    <div>
      <h4 className="font-semibold mb-2">Supported QR Types:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>
          • <strong>Plain Text:</strong> Any text content
        </li>
        <li>
          • <strong>Website URL:</strong> Links to web pages
        </li>
        <li>
          • <strong>Email:</strong> Email addresses with mailto links
        </li>
        <li>
          • <strong>Phone Number:</strong> Clickable phone numbers
        </li>
        <li>
          • <strong>SMS Message:</strong> Pre-filled text messages
        </li>
        <li>
          • <strong>WiFi Network:</strong> Network credentials for easy
          connection
        </li>
        <li>
          • <strong>Contact Card:</strong> vCard format contact information
        </li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Usage Tips:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• QR codes auto-generate as you type</li>
        <li>• Larger sizes work better for complex content</li>
        <li>• Test QR codes with different apps and devices</li>
        <li>• WiFi format: NetworkName:Password:Security</li>
        <li>• SMS format: PhoneNumber:Message</li>
        <li>• Contact format: Name:Phone:Email</li>
      </ul>
    </div>
  </div>
);

const keyboardTestExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
    <div>
      <h4 className="font-semibold mb-2">Testing Your Keyboard:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Make sure this browser tab has focus</li>
        <li>• Press any key to see it light up</li>
        <li>• Hold multiple keys to test combinations</li>
        <li>• Check if all keys register properly</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Key Categories:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>
          • <span className="inline-block w-3 h-3 bg-blue-500 mr-2" />
          Letters (A-Z)
        </li>
        <li>
          • <span className="inline-block w-3 h-3 bg-green-500 mr-2" />
          Numbers (0-9)
        </li>
        <li>
          • <span className="inline-block w-3 h-3 bg-purple-500 mr-2" />
          Arrow keys
        </li>
        <li>
          • <span className="inline-block w-3 h-3 bg-orange-500 mr-2" />
          Modifiers (Ctrl, Alt, etc.)
        </li>
      </ul>
    </div>
  </div>
);

const microphoneTestExplanations = (): ReactNode => (
  <div className="text-sm">
    <h4 className="font-semibold mb-2">Testing Your Microphone:</h4>
    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
      <li>• Click &quot;Request Microphone Permission&quot; to allow access</li>
      <li>
        • Select your microphone from the dropdown (if multiple available)
      </li>
      <li>• Click &quot;Start Recording&quot; to begin recording</li>
      <li>• Watch the waveform visualizer respond to your voice</li>
      <li>• Speak into your microphone</li>
      <li>• Click &quot;Stop Recording&quot; when finished</li>
      <li>• Play back your recording to verify quality</li>
      <li>• Download the recording if needed</li>
    </ul>
  </div>
);

const unicodeCharactersExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
    <div>
      <h4 className="font-semibold mb-2">Usage Instructions:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Click any character to copy it to clipboard</li>
        <li>• Paste the character anywhere you need it</li>
        <li>• Use HTML entities in web development</li>
        <li>• Unicode names help identify characters</li>
        <li>• Some characters may not display on all devices</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Character Formats:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>
          • <strong>Unicode:</strong> U+0041 (standard notation)
        </li>
        <li>
          • <strong>HTML Decimal:</strong> &amp;#65; (for web)
        </li>
        <li>
          • <strong>HTML Hex:</strong> &amp;#x41; (for web)
        </li>
        <li>
          • <strong>CSS:</strong> content: &quot;\0041&quot; (in CSS)
        </li>
        <li>
          • <strong>JavaScript:</strong> String.fromCodePoint(0x41)
        </li>
      </ul>
    </div>
  </div>
);

const timezoneConverterExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
    <div>
      <h4 className="font-semibold mb-2">Features:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Second-level time precision</li>
        <li>• 100+ supported timezones worldwide</li>
        <li>• Automatic daylight saving time handling</li>
        <li>• Multiple target timezone conversion</li>
        <li>• Real-time offset calculation</li>
        <li>• Copy converted times to clipboard</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Usage Tips:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Use 24-hour format for precise conversion</li>
        <li>• Add/remove target timezones as needed</li>
        <li>• Click &quot;Now&quot; to use current date/time</li>
        <li>• Copy button includes both date and time</li>
        <li>• UTC offsets adjust for DST automatically</li>
        <li>• Perfect for scheduling global meetings</li>
      </ul>
    </div>
  </div>
);

const timeFormatterExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
    <div>
      <h4 className="font-semibold mb-2">Standard Formats:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• 24-hour and 12-hour formats</li>
        <li>• ISO 8601 and RFC 3339 standards</li>
        <li>• Unix timestamps (seconds/milliseconds)</li>
        <li>• UTC and local time representations</li>
        <li>• Timezone-aware formatting</li>
        <li>• Microsecond precision support</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Special Formats:</h4>
      <ul className="space-y-1 text-slate-600 dark:text-slate-400">
        <li>• French Revolutionary decimal time</li>
        <li>• Swatch Internet Time (.beats)</li>
        <li>• Julian Day Numbers (astronomical)</li>
        <li>• Modified Julian Day (MJD)</li>
        <li>• Excel serial date format</li>
        <li>• Custom timezone offsets</li>
      </ul>
    </div>
  </div>
);

const timerExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
    <div className="flex items-center gap-2">
      <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
        Enter
      </kbd>
      <span>Add new timer</span>
    </div>
    <div className="flex items-center gap-2">
      <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
        Space
      </kbd>
      <span>Start/Pause first timer</span>
    </div>
    <div className="flex items-center gap-2">
      <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
        Escape
      </kbd>
      <span>Stop all timers</span>
    </div>
  </div>
);

const datetimeDiffExplanations = (): ReactNode => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>
      <h4 className="font-semibold mb-3 text-purple-700 dark:text-purple-300">
        Project Planning
      </h4>
      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Calculate project durations</li>
        <li>• Track milestone deadlines</li>
        <li>• Plan resource allocation</li>
        <li>• Estimate delivery timelines</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">
        Personal Milestones
      </h4>
      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Age calculations</li>
        <li>• Anniversary countdowns</li>
        <li>• Travel duration planning</li>
        <li>• Event time remaining</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">
        Business Applications
      </h4>
      <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
        <li>• Contract durations</li>
        <li>• Service level agreements</li>
        <li>• Billing periods</li>
        <li>• Warranty calculations</li>
      </ul>
    </div>
  </div>
);

const numberBaseConverterExplanations = (): ReactNode => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Supported Bases:</h4>
        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
          <li>
            • <strong>Binary (Base 2):</strong> 0, 1
          </li>
          <li>
            • <strong>Octal (Base 8):</strong> 0-7
          </li>
          <li>
            • <strong>Decimal (Base 10):</strong> 0-9
          </li>
          <li>
            • <strong>Hexadecimal (Base 16):</strong> 0-9, A-F
          </li>
          <li>
            • <strong>Base 32:</strong> 0-9, A-V
          </li>
          <li>
            • <strong>Base 36:</strong> 0-9, A-Z
          </li>
          <li>
            • <strong>Custom bases:</strong> 2-64
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Features:</h4>
        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
          <li>• Convert from any base to any other base</li>
          <li>• Multiple output bases simultaneously</li>
          <li>• Input validation for each base</li>
          <li>• Character set display for each base</li>
          <li>• URL sharing with current settings</li>
          <li>• Example data for quick testing</li>
          <li>• Copy individual results to clipboard</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
      <h4 className="font-semibold mb-2">Common Use Cases:</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <strong>Programming:</strong>
          <ul className="text-slate-600 dark:text-slate-400 mt-1">
            <li>• Binary operations</li>
            <li>• Hexadecimal colors</li>
            <li>• Memory addresses</li>
          </ul>
        </div>
        <div>
          <strong>Networking:</strong>
          <ul className="text-slate-600 dark:text-slate-400 mt-1">
            <li>• IP address conversion</li>
            <li>• Subnet calculations</li>
            <li>• Base64 encoding</li>
          </ul>
        </div>
        <div>
          <strong>Mathematics:</strong>
          <ul className="text-slate-600 dark:text-slate-400 mt-1">
            <li>• Number theory</li>
            <li>• Computer science</li>
            <li>• Algorithm design</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const urlToJsonExplanations = (): ReactNode => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Parsed Components:</h4>
        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
          <li>
            • <strong>Protocol:</strong> HTTP, HTTPS, FTP, etc.
          </li>
          <li>
            • <strong>Hostname:</strong> Full domain name
          </li>
          <li>
            • <strong>TLD:</strong> Top-level domain (.com, .org, etc.)
          </li>
          <li>
            • <strong>Domain:</strong> Main domain name
          </li>
          <li>
            • <strong>Subdomain:</strong> www, api, etc.
          </li>
          <li>
            • <strong>Port:</strong> Custom port numbers
          </li>
          <li>
            • <strong>Path:</strong> URL path segments
          </li>
          <li>
            • <strong>Query Parameters:</strong> Individual URL parameters
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Use Cases:</h4>
        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
          <li>• API development and testing</li>
          <li>• URL analysis and debugging</li>
          <li>• Web scraping and automation</li>
          <li>• SEO and analytics tools</li>
          <li>• Documentation and training</li>
          <li>• Link validation and parsing</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
      <h4 className="font-semibold mb-2">Example URLs to try:</h4>
      <div className="space-y-2 text-sm">
        <code className="block p-2 bg-slate-100 dark:bg-slate-800 rounded">
          https://api.github.com/repos/owner/repo?per_page=100&sort=updated#readme
        </code>
        <code className="block p-2 bg-slate-100 dark:bg-slate-800 rounded">
          https://shop.example.co.uk:8080/products/electronics?category=laptops&brand=apple&sort=price
        </code>
        <code className="block p-2 bg-slate-100 dark:bg-slate-800 rounded">
          ftp://files.example.com/downloads/software/installer.exe
        </code>
      </div>
    </div>
  </div>
);

const metronomeExplanations = (): ReactNode => (
  <div>
    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
      How to Use
    </h4>
    <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
      <div className="flex items-start space-x-2">
        <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
          1
        </span>
        <p>Click &quot;Test&quot; to preview each tone before starting</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
          2
        </span>
        <p>Configure notes and intervals using the controls below</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
          3
        </span>
        <p>Toggle tones on/off using the switches</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
          4
        </span>
        <p>Click &quot;Start Metronome&quot; - first tones play immediately</p>
      </div>
      <div className="flex items-start space-x-2">
        <span className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
          5
        </span>
        <p>Add multiple tones for complex rhythm patterns</p>
      </div>
    </div>
    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
      <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">
        Pro Tip:
      </p>
      <p className="text-sm text-green-600 dark:text-green-400">
        Use different interval combinations like 0.5s, 1.5s, and 3s to create
        polyrhythmic patterns that repeat every 6 seconds.
      </p>
    </div>
  </div>
);

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
  getExplanations?: () => ReactNode;
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
        getExplanations: timezoneConverterExplanations,
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
        getExplanations: urlToJsonExplanations,
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
        getExplanations: numberBaseConverterExplanations,
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
        getExplanations: jsonFormatterExplanations,
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
        getExplanations: jsoncFormatterExplanations,
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
        getExplanations: htmlFormatterExplanations,
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
        getExplanations: yamlFormatterExplanations,
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
        getExplanations: markdownFormatterExplanations,
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
        getExplanations: cssFormatterExplanations,
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
        getExplanations: typescriptFormatterExplanations,
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
        getExplanations: graphqlFormatterExplanations,
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
        getExplanations: timeFormatterExplanations,
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
        getExplanations: urlEncoderExplanations,
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
        getExplanations: md5HashExplanations,
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
        getExplanations: bcryptHashExplanations,
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
        getExplanations: qrGeneratorExplanations,
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
        getExplanations: barcodeGeneratorExplanations,
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
        getExplanations: loremGeneratorExplanations,
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
        getExplanations: unicodeCharactersExplanations,
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
        getExplanations: uuidGeneratorExplanations,
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
        getExplanations: textSplitExplanations,
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
        getExplanations: timerExplanations,
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
        getExplanations: datetimeDiffExplanations,
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
        getExplanations: metronomeExplanations,
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
        getExplanations: webcamTestExplanations,
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
        getExplanations: microphoneTestExplanations,
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
        getExplanations: keyboardTestExplanations,
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
