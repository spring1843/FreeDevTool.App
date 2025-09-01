import { ViteReactSSG } from "vite-react-ssg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { getAllToolPaths } from "./data/tools";
import "./index.css";

// Import all tool components
import Home from "@/pages/home";
import DateConverter from "@/pages/tools/date-converter";
import JsonYamlConverter from "@/pages/tools/json-yaml-converter";
import TimezoneConverter from "@/pages/tools/timezone-converter";
import UnitConverter from "@/pages/tools/unit-converter";
import JsonFormatter from "@/pages/tools/json-formatter";
import JSONCFormatter from "@/pages/tools/jsonc-formatter";
import HtmlFormatter from "@/pages/tools/html-formatter";
import YamlFormatter from "@/pages/tools/yaml-formatter";
import MarkdownFormatter from "@/pages/tools/markdown-formatter";
import CssFormatter from "@/pages/tools/css-formatter";
import TypeScriptFormatter from "@/pages/tools/typescript-formatter";
import GraphQLFormatter from "@/pages/tools/graphql-formatter";
import TimeFormatter from "@/pages/tools/time-formatter";
import Base64Encoder from "@/pages/tools/base64-encoder";
import UrlEncoder from "@/pages/tools/url-encoder";
import JwtDecoder from "@/pages/tools/jwt-decoder";
import TlsDecoder from "@/pages/tools/tls-decoder";
import TextDiff from "@/pages/tools/text-diff";
import RegexTester from "@/pages/tools/regex-tester";
import TextSort from "@/pages/tools/text-sort";
import TextCounter from "@/pages/tools/text-counter";
import TextSplit from "@/pages/tools/text-split";
import SearchReplace from "@/pages/tools/search-replace";
import WorldClock from "@/pages/tools/world-clock";
import Timer from "@/pages/tools/timer";
import Stopwatch from "@/pages/tools/stopwatch";
import Countdown from "@/pages/tools/countdown";
import CompoundInterest from "@/pages/tools/compound-interest";
import DebtRepayment from "@/pages/tools/debt-repayment";
import ColorPaletteGenerator from "@/pages/tools/color-palette-generator";
import CameraTest from "@/pages/tools/webcam-test";
import MicrophoneTest from "@/pages/tools/microphone-test";
import KeyboardTest from "@/pages/tools/keyboard-test";
import QRGenerator from "@/pages/tools/qr-generator";
import BarcodeGenerator from "@/pages/tools/barcode-generator";
import LoremGenerator from "@/pages/tools/lorem-generator";
import UnicodeCharacters from "@/pages/tools/unicode-characters";
import MD5Hash from "@/pages/tools/md5-hash";
import BCryptHash from "@/pages/tools/bcrypt-hash";
import PasswordGenerator from "@/pages/tools/password-generator";
import UUIDGenerator from "@/pages/tools/uuid-generator";
import DateTimeDiff from "@/pages/tools/datetime-diff";
import Metronome from "@/pages/tools/metronome";
import BrowserInfo from "@/pages/tools/browser-info";
import URLToJSON from "@/pages/tools/url-to-json";
import CSVToJSON from "@/pages/tools/csv-to-json";
import NumberBaseConverter from "@/pages/tools/number-base-converter";

// Create routes configuration for react-router-dom
const routes = [
  {
    path: "/",
    element: <Home />,
    entry: "src/pages/home.tsx",
  },
  // Conversions
  {
    path: "/tools/date-converter",
    element: <DateConverter />,
    entry: "src/pages/tools/date-converter.tsx",
  },
  {
    path: "/tools/json-yaml-converter",
    element: <JsonYamlConverter />,
    entry: "src/pages/tools/json-yaml-converter.tsx",
  },
  {
    path: "/tools/timezone-converter",
    element: <TimezoneConverter />,
    entry: "src/pages/tools/timezone-converter.tsx",
  },
  {
    path: "/tools/unit-converter",
    element: <UnitConverter />,
    entry: "src/pages/tools/unit-converter.tsx",
  },
  {
    path: "/tools/url-to-json",
    element: <URLToJSON />,
    entry: "src/pages/tools/url-to-json.tsx",
  },
  {
    path: "/tools/csv-to-json",
    element: <CSVToJSON />,
    entry: "src/pages/tools/csv-to-json.tsx",
  },
  {
    path: "/tools/number-base-converter",
    element: <NumberBaseConverter />,
    entry: "src/pages/tools/number-base-converter.tsx",
  },
  // Formatters
  {
    path: "/tools/json-formatter",
    element: <JsonFormatter />,
    entry: "src/pages/tools/json-formatter.tsx",
  },
  {
    path: "/tools/jsonc-formatter",
    element: <JSONCFormatter />,
    entry: "src/pages/tools/jsonc-formatter.tsx",
  },
  {
    path: "/tools/html-formatter",
    element: <HtmlFormatter />,
    entry: "src/pages/tools/html-formatter.tsx",
  },
  {
    path: "/tools/yaml-formatter",
    element: <YamlFormatter />,
    entry: "src/pages/tools/yaml-formatter.tsx",
  },
  {
    path: "/tools/markdown-formatter",
    element: <MarkdownFormatter />,
    entry: "src/pages/tools/markdown-formatter.tsx",
  },
  {
    path: "/tools/css-formatter",
    element: <CssFormatter />,
    entry: "src/pages/tools/css-formatter.tsx",
  },
  {
    path: "/tools/less-formatter",
    element: <CssFormatter />,
    entry: "src/pages/tools/css-formatter.tsx",
  },
  {
    path: "/tools/scss-formatter",
    element: <CssFormatter />,
    entry: "src/pages/tools/css-formatter.tsx",
  },
  {
    path: "/tools/typescript-formatter",
    element: <TypeScriptFormatter />,
    entry: "src/pages/tools/typescript-formatter.tsx",
  },
  {
    path: "/tools/graphql-formatter",
    element: <GraphQLFormatter />,
    entry: "src/pages/tools/graphql-formatter.tsx",
  },
  {
    path: "/tools/time-formatter",
    element: <TimeFormatter />,
    entry: "src/pages/tools/time-formatter.tsx",
  },
  // Encoders
  {
    path: "/tools/base64",
    element: <Base64Encoder />,
    entry: "src/pages/tools/base64-encoder.tsx",
  },
  {
    path: "/tools/url-encoder",
    element: <UrlEncoder />,
    entry: "src/pages/tools/url-encoder.tsx",
  },
  {
    path: "/tools/jwt-decoder",
    element: <JwtDecoder />,
    entry: "src/pages/tools/jwt-decoder.tsx",
  },
  {
    path: "/tools/tls-decoder",
    element: <TlsDecoder />,
    entry: "src/pages/tools/tls-decoder.tsx",
  },
  {
    path: "/tools/md5-hash",
    element: <MD5Hash />,
    entry: "src/pages/tools/md5-hash.tsx",
  },
  {
    path: "/tools/bcrypt-hash",
    element: <BCryptHash />,
    entry: "src/pages/tools/bcrypt-hash.tsx",
  },
  // Text Tools
  {
    path: "/tools/text-diff",
    element: <TextDiff />,
    entry: "src/pages/tools/text-diff.tsx",
  },
  {
    path: "/tools/regex-tester",
    element: <RegexTester />,
    entry: "src/pages/tools/regex-tester.tsx",
  },
  {
    path: "/tools/text-sort",
    element: <TextSort />,
    entry: "src/pages/tools/text-sort.tsx",
  },
  {
    path: "/tools/text-counter",
    element: <TextCounter />,
    entry: "src/pages/tools/text-counter.tsx",
  },
  {
    path: "/tools/text-split",
    element: <TextSplit />,
    entry: "src/pages/tools/text-split.tsx",
  },
  {
    path: "/tools/search-replace",
    element: <SearchReplace />,
    entry: "src/pages/tools/search-replace.tsx",
  },
  {
    path: "/tools/qr-generator",
    element: <QRGenerator />,
    entry: "src/pages/tools/qr-generator.tsx",
  },
  {
    path: "/tools/barcode-generator",
    element: <BarcodeGenerator />,
    entry: "src/pages/tools/barcode-generator.tsx",
  },
  {
    path: "/tools/lorem-generator",
    element: <LoremGenerator />,
    entry: "src/pages/tools/lorem-generator.tsx",
  },
  {
    path: "/tools/unicode-characters",
    element: <UnicodeCharacters />,
    entry: "src/pages/tools/unicode-characters.tsx",
  },
  {
    path: "/tools/password-generator",
    element: <PasswordGenerator />,
    entry: "src/pages/tools/password-generator.tsx",
  },
  {
    path: "/tools/uuid-generator",
    element: <UUIDGenerator />,
    entry: "src/pages/tools/uuid-generator.tsx",
  },
  // Time Tools
  {
    path: "/tools/world-clock",
    element: <WorldClock />,
    entry: "src/pages/tools/world-clock.tsx",
  },
  {
    path: "/tools/timer",
    element: <Timer />,
    entry: "src/pages/tools/timer.tsx",
  },
  {
    path: "/tools/stopwatch",
    element: <Stopwatch />,
    entry: "src/pages/tools/stopwatch.tsx",
  },
  {
    path: "/tools/countdown",
    element: <Countdown />,
    entry: "src/pages/tools/countdown.tsx",
  },
  {
    path: "/tools/datetime-diff",
    element: <DateTimeDiff />,
    entry: "src/pages/tools/datetime-diff.tsx",
  },
  {
    path: "/tools/metronome",
    element: <Metronome />,
    entry: "src/pages/tools/metronome.tsx",
  },
  // Financial Tools
  {
    path: "/tools/compound-interest",
    element: <CompoundInterest />,
    entry: "src/pages/tools/compound-interest.tsx",
  },
  {
    path: "/tools/debt-repayment",
    element: <DebtRepayment />,
    entry: "src/pages/tools/debt-repayment.tsx",
  },
  // Color Tools
  {
    path: "/tools/color-palette-generator",
    element: <ColorPaletteGenerator />,
    entry: "src/pages/tools/color-palette-generator.tsx",
  },
  // Hardware Tools
  {
    path: "/tools/webcam-test",
    element: <CameraTest />,
    entry: "src/pages/tools/webcam-test.tsx",
  },
  {
    path: "/tools/microphone-test",
    element: <MicrophoneTest />,
    entry: "src/pages/tools/microphone-test.tsx",
  },
  {
    path: "/tools/keyboard-test",
    element: <KeyboardTest />,
    entry: "src/pages/tools/keyboard-test.tsx",
  },
  // Browser Tools
  {
    path: "/tools/browser-info",
    element: <BrowserInfo />,
    entry: "src/pages/tools/browser-info.tsx",
  },
];

// Create SSG entry point
export const createRoot = ViteReactSSG(
  { routes },
  ({ router, routes, isClient, initialState }) => {
    // Custom setup for the application
    console.log(`SSG Mode: ${isClient ? 'Client' : 'Server'}`);
  }
);