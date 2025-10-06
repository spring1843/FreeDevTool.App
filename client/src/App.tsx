import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/theme-provider";
import { DemoProvider } from "@/providers/demo-provider";
import { Layout } from "@/components/layout/Layout";

// Eager load home page for fast initial load
import Home from "@/pages/home";

// Lazy load all tool pages
const DateConverter = lazy(() => import("@/pages/tools/date-converter"));
const JsonYamlConverter = lazy(() => import("@/pages/tools/json-yaml-converter"));
const TimezoneConverter = lazy(() => import("@/pages/tools/timezone-converter"));
const UnitConverter = lazy(() => import("@/pages/tools/unit-converter"));
const JsonFormatter = lazy(() => import("@/pages/tools/json-formatter"));
const JSONCFormatter = lazy(() => import("@/pages/tools/jsonc-formatter"));
const HtmlFormatter = lazy(() => import("@/pages/tools/html-formatter"));
const YamlFormatter = lazy(() => import("@/pages/tools/yaml-formatter"));
const MarkdownFormatter = lazy(() => import("@/pages/tools/markdown-formatter"));
const CssFormatter = lazy(() => import("@/pages/tools/css-formatter"));
const TypeScriptFormatter = lazy(() => import("@/pages/tools/typescript-formatter"));
const GraphQLFormatter = lazy(() => import("@/pages/tools/graphql-formatter"));
const TimeFormatter = lazy(() => import("@/pages/tools/time-formatter"));
const Base64Encoder = lazy(() => import("@/pages/tools/base64-encoder"));
const UrlEncoder = lazy(() => import("@/pages/tools/url-encoder"));
const JwtDecoder = lazy(() => import("@/pages/tools/jwt-decoder"));
const TlsDecoder = lazy(() => import("@/pages/tools/tls-decoder"));
const TextDiff = lazy(() => import("@/pages/tools/text-diff"));
const RegexTester = lazy(() => import("@/pages/tools/regex-tester"));
const TextSort = lazy(() => import("@/pages/tools/text-sort"));
const TextCounter = lazy(() => import("@/pages/tools/text-counter"));
const TextSplit = lazy(() => import("@/pages/tools/text-split"));
const SearchReplace = lazy(() => import("@/pages/tools/search-replace"));
const WorldClock = lazy(() => import("@/pages/tools/world-clock"));
const Timer = lazy(() => import("@/pages/tools/timer"));
const Stopwatch = lazy(() => import("@/pages/tools/stopwatch"));
const Countdown = lazy(() => import("@/pages/tools/countdown"));
const CompoundInterest = lazy(() => import("@/pages/tools/compound-interest"));
const DebtRepayment = lazy(() => import("@/pages/tools/debt-repayment"));
const ColorPaletteGenerator = lazy(() => import("@/pages/tools/color-palette-generator"));
const CameraTest = lazy(() => import("@/pages/tools/webcam-test"));
const MicrophoneTest = lazy(() => import("@/pages/tools/microphone-test"));
const KeyboardTest = lazy(() => import("@/pages/tools/keyboard-test"));
const QRGenerator = lazy(() => import("@/pages/tools/qr-generator"));
const BarcodeGenerator = lazy(() => import("@/pages/tools/barcode-generator"));
const LoremGenerator = lazy(() => import("@/pages/tools/lorem-generator"));
const UnicodeCharacters = lazy(() => import("@/pages/tools/unicode-characters"));
const MD5Hash = lazy(() => import("@/pages/tools/md5-hash"));
const BCryptHash = lazy(() => import("@/pages/tools/bcrypt-hash"));
const PasswordGenerator = lazy(() => import("@/pages/tools/password-generator"));
const UUIDGenerator = lazy(() => import("@/pages/tools/uuid-generator"));
const DateTimeDiff = lazy(() => import("@/pages/tools/datetime-diff"));
const Metronome = lazy(() => import("@/pages/tools/metronome"));
const BrowserInfo = lazy(() => import("@/pages/tools/browser-info"));
const URLToJSON = lazy(() => import("@/pages/tools/url-to-json"));
const CSVToJSON = lazy(() => import("@/pages/tools/csv-to-json"));
const NumberBaseConverter = lazy(() => import("@/pages/tools/number-base-converter"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Switch>
        {/* Home */}
        <Route path="/" component={Home} />

        {/* Conversions */}
        <Route path="/tools/date-converter" component={DateConverter} />
        <Route
          path="/tools/json-yaml-converter"
          component={JsonYamlConverter}
        />
        <Route path="/tools/timezone-converter" component={TimezoneConverter} />
        <Route path="/tools/unit-converter" component={UnitConverter} />
        <Route path="/tools/url-to-json" component={URLToJSON} />
        <Route path="/tools/csv-to-json" component={CSVToJSON} />
        <Route
          path="/tools/number-base-converter"
          component={NumberBaseConverter}
        />

        {/* Formatters */}
        <Route path="/tools/json-formatter" component={JsonFormatter} />
        <Route path="/tools/jsonc-formatter" component={JSONCFormatter} />
        <Route path="/tools/html-formatter" component={HtmlFormatter} />
        <Route path="/tools/yaml-formatter" component={YamlFormatter} />
        <Route path="/tools/markdown-formatter" component={MarkdownFormatter} />
        <Route path="/tools/css-formatter" component={CssFormatter} />
        <Route path="/tools/less-formatter" component={CssFormatter} />
        <Route path="/tools/scss-formatter" component={CssFormatter} />

        <Route
          path="/tools/typescript-formatter"
          component={TypeScriptFormatter}
        />
        <Route path="/tools/graphql-formatter" component={GraphQLFormatter} />
        <Route path="/tools/time-formatter" component={TimeFormatter} />

        {/* Encoders */}
        <Route path="/tools/base64" component={Base64Encoder} />
        <Route path="/tools/url-encoder" component={UrlEncoder} />
        <Route path="/tools/jwt-decoder" component={JwtDecoder} />
        <Route path="/tools/tls-decoder" component={TlsDecoder} />
        <Route path="/tools/md5-hash" component={MD5Hash} />
        <Route path="/tools/bcrypt-hash" component={BCryptHash} />

        {/* Text Tools */}
        <Route path="/tools/text-diff" component={TextDiff} />
        <Route path="/tools/regex-tester" component={RegexTester} />
        <Route path="/tools/text-sort" component={TextSort} />
        <Route path="/tools/text-counter" component={TextCounter} />
        <Route path="/tools/text-split" component={TextSplit} />
        <Route path="/tools/search-replace" component={SearchReplace} />
        <Route path="/tools/qr-generator" component={QRGenerator} />
        <Route path="/tools/barcode-generator" component={BarcodeGenerator} />
        <Route path="/tools/lorem-generator" component={LoremGenerator} />
        <Route path="/tools/unicode-characters" component={UnicodeCharacters} />
        <Route path="/tools/password-generator" component={PasswordGenerator} />
        <Route path="/tools/uuid-generator" component={UUIDGenerator} />

        {/* Time Tools */}
        <Route path="/tools/world-clock" component={WorldClock} />
        <Route path="/tools/timer" component={Timer} />
        <Route path="/tools/stopwatch" component={Stopwatch} />
        <Route path="/tools/countdown" component={Countdown} />
        <Route path="/tools/datetime-diff" component={DateTimeDiff} />
        <Route path="/tools/metronome" component={Metronome} />

        {/* Financial Tools */}
        <Route path="/tools/compound-interest" component={CompoundInterest} />
        <Route path="/tools/debt-repayment" component={DebtRepayment} />

        {/* Color Tools */}
        <Route
          path="/tools/color-palette-generator"
          component={ColorPaletteGenerator}
        />

        {/* Hardware Tools */}
        <Route path="/tools/webcam-test" component={CameraTest} />
        <Route path="/tools/microphone-test" component={MicrophoneTest} />
        <Route path="/tools/keyboard-test" component={KeyboardTest} />

        {/* Browser Tools */}
        <Route path="/tools/browser-info" component={BrowserInfo} />

        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DemoProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </DemoProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
