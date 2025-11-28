import type { ReactNode } from "react";

export const barcodeGeneratorExplanations = (): ReactNode => (
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

export const bcryptHashExplanations = (): ReactNode => (
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

export const cssFormatterExplanations = (): ReactNode => (
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

export const htmlFormatterExplanations = (): ReactNode => (
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

export const jsonFormatterExplanations = (): ReactNode => (
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

export const jsoncFormatterExplanations = (): ReactNode => (
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

export const graphqlFormatterExplanations = (): ReactNode => (
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

export const typescriptFormatterExplanations = (): ReactNode => (
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

export const markdownFormatterExplanations = (): ReactNode => (
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

export const yamlFormatterExplanations = (): ReactNode => (
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

export const md5HashExplanations = (): ReactNode => (
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

export const loremGeneratorExplanations = (): ReactNode => (
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

export const uuidGeneratorExplanations = (): ReactNode => (
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

export const urlEncoderExplanations = (): ReactNode => (
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

export const textSplitExplanations = (): ReactNode => (
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

export const webcamTestExplanations = (): ReactNode => (
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

export const qrGeneratorExplanations = (): ReactNode => (
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

export const keyboardTestExplanations = (): ReactNode => (
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

export const microphoneTestExplanations = (): ReactNode => (
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

export const unicodeCharactersExplanations = (): ReactNode => (
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

export const timezoneConverterExplanations = (): ReactNode => (
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

export const timeFormatterExplanations = (): ReactNode => (
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

export const timerExplanations = (): ReactNode => (
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

export const datetimeDiffExplanations = (): ReactNode => (
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

export const numberBaseConverterExplanations = (): ReactNode => (
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

export const urlToJsonExplanations = (): ReactNode => (
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

export const metronomeExplanations = (): ReactNode => (
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
