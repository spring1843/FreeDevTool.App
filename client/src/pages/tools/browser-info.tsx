import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Globe, HardDrive, Cpu, RefreshCw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import {
  ToolButton,
  ToolButtonGroup,
  ActionButtonGroup,
} from "@/components/ui/tool-button";

interface BrowserInfo {
  // Navigator properties
  userAgent: string;
  platform: string;
  language: string;
  languages: string[];
  cookieEnabled: boolean;
  onLine: boolean;
  hardwareConcurrency: number;
  maxTouchPoints: number;
  vendor: string;
  vendorSub: string;
  productSub: string;
  appName: string;
  appVersion: string;
  appCodeName: string;

  // Screen properties
  screenWidth: number;
  screenHeight: number;
  screenColorDepth: number;
  screenPixelDepth: number;
  availableWidth: number;
  availableHeight: number;
  devicePixelRatio: number;

  // Window properties
  windowWidth: number;
  windowHeight: number;
  scrollX: number;
  scrollY: number;

  // Location properties
  href: string;
  hostname: string;
  pathname: string;
  search: string;
  hash: string;
  protocol: string;
  port: string;

  // Time and timezone
  timezone: string;
  timezoneOffset: number;
  currentTime: string;

  // System preferences
  systemTheme: string;
  reducedMotion: boolean;
  highContrast: boolean;

  // Browser features
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  webGL: boolean;
  webGL2: boolean;
  canvas: boolean;
  webRTC: boolean;
  webAudio: boolean;
  webWorkers: boolean;
  serviceWorkers: boolean;
  geolocation: boolean;
  notifications: boolean;
  deviceMotion: boolean;
  deviceOrientation: boolean;
  gamepad: boolean;

  // Media capabilities
  mediaDevices: boolean;
  mediaRecorder: boolean;
  speechRecognition: boolean;
  speechSynthesis: boolean;

  // Memory (if available)
  jsHeapSizeLimit?: number;
  totalJSHeapSize?: number;
  usedJSHeapSize?: number;

  // Connection (if available)
  connectionType?: string;
  connectionEffectiveType?: string;
  connectionDownlink?: number;
  connectionRtt?: number;

  // Device memory (if available)
  deviceMemory?: number;
}

export default function BrowserInfo() {
  const tool = getToolByPath("/tools/browser-info");
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const { toast } = useToast();

  const getBrowserInfo = (): BrowserInfo => {
    const nav = navigator as Navigator & {
      connection?: {
        type?: string;
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
      };
      mozConnection?: {
        type?: string;
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
      };
      webkitConnection?: {
        type?: string;
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
      };
      deviceMemory?: number;
    };
    const { screen } = window;
    const { location } = window;
    const performance = window.performance as Performance & {
      memory?: {
        jsHeapSizeLimit?: number;
        totalJSHeapSize?: number;
        usedJSHeapSize?: number;
      };
    };
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection;

    // Test WebGL support
    const canvas = document.createElement("canvas");
    const webGL = !!canvas.getContext("webgl");
    const webGL2 = !!canvas.getContext("webgl2");

    // Test various browser features
    const testFeature = (feature: unknown) => typeof feature !== "undefined";

    return {
      // Navigator properties
      userAgent: nav.userAgent || "Unknown",
      platform: nav.platform || "Unknown",
      language: nav.language || "Unknown",
      languages: Array.from(nav.languages || []),
      cookieEnabled: nav.cookieEnabled || false,
      onLine: nav.onLine || false,
      hardwareConcurrency: nav.hardwareConcurrency || 0,
      maxTouchPoints: nav.maxTouchPoints || 0,
      vendor: nav.vendor || "",
      vendorSub: nav.vendorSub || "",
      productSub: nav.productSub || "",
      appName: nav.appName || "",
      appVersion: nav.appVersion || "",
      appCodeName: nav.appCodeName || "",

      // Screen properties
      screenWidth: screen.width || 0,
      screenHeight: screen.height || 0,
      screenColorDepth: screen.colorDepth || 0,
      screenPixelDepth: screen.pixelDepth || 0,
      availableWidth: screen.availWidth || 0,
      availableHeight: screen.availHeight || 0,
      devicePixelRatio: window.devicePixelRatio || 1,

      // Window properties
      windowWidth: window.innerWidth || 0,
      windowHeight: window.innerHeight || 0,
      scrollX: window.scrollX || 0,
      scrollY: window.scrollY || 0,

      // Location properties
      href: location.href || "",
      hostname: location.hostname || "",
      pathname: location.pathname || "",
      search: location.search || "",
      hash: location.hash || "",
      protocol: location.protocol || "",
      port: location.port || "",

      // Time and timezone
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
      timezoneOffset: new Date().getTimezoneOffset(),
      currentTime: new Date().toISOString(),

      // System preferences
      systemTheme:
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: light)").matches
            ? "light"
            : "no-preference",
      reducedMotion:
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      highContrast:
        window.matchMedia &&
        window.matchMedia("(prefers-contrast: high)").matches,

      // Browser features
      localStorage: testFeature(window.localStorage),
      sessionStorage: testFeature(window.sessionStorage),
      indexedDB: testFeature(window.indexedDB),
      webGL,
      webGL2,
      canvas: testFeature(document.createElement("canvas").getContext),
      webRTC: testFeature(window.RTCPeerConnection),
      webAudio: testFeature(
        window.AudioContext ||
          (window as typeof window & { webkitAudioContext?: unknown })
            .webkitAudioContext
      ),
      webWorkers: testFeature(window.Worker),
      serviceWorkers: testFeature(nav.serviceWorker),
      geolocation: testFeature(nav.geolocation),
      notifications: testFeature(window.Notification),
      deviceMotion: testFeature(window.DeviceMotionEvent),
      deviceOrientation: testFeature(window.DeviceOrientationEvent),
      gamepad: testFeature(nav.getGamepads),

      // Media capabilities
      mediaDevices: testFeature(nav.mediaDevices),
      mediaRecorder: testFeature(window.MediaRecorder),
      speechRecognition: testFeature(
        (
          window as typeof window & {
            SpeechRecognition?: unknown;
            webkitSpeechRecognition?: unknown;
          }
        ).SpeechRecognition ||
          (
            window as typeof window & {
              SpeechRecognition?: unknown;
              webkitSpeechRecognition?: unknown;
            }
          ).webkitSpeechRecognition
      ),
      speechSynthesis: testFeature(window.speechSynthesis),

      // Memory (if available)
      jsHeapSizeLimit: performance?.memory?.jsHeapSizeLimit,
      totalJSHeapSize: performance?.memory?.totalJSHeapSize,
      usedJSHeapSize: performance?.memory?.usedJSHeapSize,

      // Connection (if available)
      connectionType: connection?.type,
      connectionEffectiveType: connection?.effectiveType,
      connectionDownlink: connection?.downlink,
      connectionRtt: connection?.rtt,

      // Device memory (if available)
      deviceMemory: nav.deviceMemory,
    };
  };

  const refreshInfo = () => {
    const newInfo = getBrowserInfo();
    setBrowserInfo(newInfo);
    setLastUpdated(new Date());
    setRefreshCount(prev => prev + 1);
    toast({
      title: "Browser information refreshed",
      description: "All browser data has been updated successfully",
    });
  };

  useEffect(() => {
    // Load browser info immediately when component mounts
    const info = getBrowserInfo();
    setBrowserInfo(info);
    setLastUpdated(new Date());
    setRefreshCount(1);
  }, []); // Only run once on mount

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Browser information copied successfully",
      });
    } catch (error) {
      console.error("Clipboard copy failed:", error);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const copyAllInfo = () => {
    if (!browserInfo) return;

    const infoText = Object.entries(browserInfo)
      .map(
        ([key, value]) =>
          `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
      )
      .join("\n");

    copyToClipboard(infoText).catch(error => {
      console.error("Failed to copy browser info:", error);
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  if (!browserInfo) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500 dark:text-slate-400">
            Loading browser information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
          Browser Information
          {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
          <span className="text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded font-medium">
            EXPERIMENTAL
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive browser and system information available to JavaScript
        </p>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Browser Data
            </div>
            <ToolButtonGroup>
              <ActionButtonGroup>
                <ToolButton
                  variant="custom"
                  onClick={refreshInfo}
                  tooltip="Refresh browser information"
                  icon={<RefreshCw className="w-4 h-4 mr-2" />}
                  size="sm"
                >
                  Refresh
                </ToolButton>
                <ToolButton
                  variant="custom"
                  onClick={copyAllInfo}
                  tooltip="Copy all browser information to clipboard"
                  icon={<Copy className="w-4 h-4 mr-2" />}
                  size="sm"
                >
                  Copy All
                </ToolButton>
              </ActionButtonGroup>
            </ToolButtonGroup>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Last updated: {lastUpdated.toLocaleString()} • Refreshed{" "}
            {refreshCount} times
          </p>
        </CardContent>
      </Card>

      {/* Browser Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Basic Browser Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Browser Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">User Agent:</span>
                <span className="font-mono text-xs break-all">
                  {browserInfo.userAgent}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">App Name:</span>
                <span>{browserInfo.appName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">App Version:</span>
                <span className="font-mono text-xs">
                  {browserInfo.appVersion}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Platform:</span>
                <span>{browserInfo.platform}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Vendor:</span>
                <span>{browserInfo.vendor}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Language:</span>
                <span>{browserInfo.language}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Languages:</span>
                <span className="text-xs">
                  {browserInfo.languages.join(", ")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Online:</span>
                <span
                  className={
                    browserInfo.onLine ? "text-green-600" : "text-red-600"
                  }
                >
                  {browserInfo.onLine ? "Yes" : "No"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Cookies Enabled:</span>
                <span
                  className={
                    browserInfo.cookieEnabled
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {browserInfo.cookieEnabled ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Screen & Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Screen & Display
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Screen Resolution:</span>
                <span>
                  {browserInfo.screenWidth} × {browserInfo.screenHeight}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Available Size:</span>
                <span>
                  {browserInfo.availableWidth} × {browserInfo.availableHeight}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Window Size:</span>
                <span>
                  {browserInfo.windowWidth} × {browserInfo.windowHeight}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Color Depth:</span>
                <span>{browserInfo.screenColorDepth} bits</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Pixel Depth:</span>
                <span>{browserInfo.screenPixelDepth} bits</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Device Pixel Ratio:</span>
                <span>{browserInfo.devicePixelRatio}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Scroll Position:</span>
                <span>
                  {browserInfo.scrollX}, {browserInfo.scrollY}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Hardware */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="w-5 h-5 mr-2" />
              Hardware & Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">CPU Cores:</span>
                <span>{browserInfo.hardwareConcurrency}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Max Touch Points:</span>
                <span>{browserInfo.maxTouchPoints}</span>
              </div>
              {browserInfo.deviceMemory ? (
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Device Memory:</span>
                  <span>{browserInfo.deviceMemory} GB</span>
                </div>
              ) : null}
              {browserInfo.jsHeapSizeLimit ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">JS Heap Limit:</span>
                    <span>{formatBytes(browserInfo.jsHeapSizeLimit)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">JS Heap Used:</span>
                    <span>{formatBytes(browserInfo.usedJSHeapSize || 0)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">JS Heap Total:</span>
                    <span>{formatBytes(browserInfo.totalJSHeapSize || 0)}</span>
                  </div>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Location & Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Location & Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Hostname:</span>
                <span className="font-mono break-all">
                  {browserInfo.hostname}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Protocol:</span>
                <span>{browserInfo.protocol}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Port:</span>
                <span>{browserInfo.port || "Default"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Pathname:</span>
                <span className="font-mono text-xs break-all">
                  {browserInfo.pathname}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Timezone:</span>
                <span>{browserInfo.timezone}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">UTC Offset:</span>
                <span>{browserInfo.timezoneOffset} minutes</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Current Time:</span>
                <span className="font-mono text-xs">
                  {new Date(browserInfo.currentTime).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">System Theme:</span>
                <span
                  className={`font-medium ${
                    browserInfo.systemTheme === "dark"
                      ? "text-purple-600"
                      : browserInfo.systemTheme === "light"
                        ? "text-yellow-600"
                        : "text-gray-600"
                  }`}
                >
                  {browserInfo.systemTheme === "dark"
                    ? "Dark"
                    : browserInfo.systemTheme === "light"
                      ? "Light"
                      : "No Preference"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">Reduced Motion:</span>
                <span
                  className={
                    browserInfo.reducedMotion
                      ? "text-blue-600"
                      : "text-gray-600"
                  }
                >
                  {browserInfo.reducedMotion ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-medium">High Contrast:</span>
                <span
                  className={
                    browserInfo.highContrast ? "text-blue-600" : "text-gray-600"
                  }
                >
                  {browserInfo.highContrast ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center my-8" />

      {/* Browser Features */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HardDrive className="w-5 h-5 mr-2" />
            Browser Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
            {[
              { name: "Local Storage", value: browserInfo.localStorage },
              { name: "Session Storage", value: browserInfo.sessionStorage },
              { name: "IndexedDB", value: browserInfo.indexedDB },
              { name: "WebGL", value: browserInfo.webGL },
              { name: "WebGL 2", value: browserInfo.webGL2 },
              { name: "Canvas", value: browserInfo.canvas },
              { name: "WebRTC", value: browserInfo.webRTC },
              { name: "Web Audio", value: browserInfo.webAudio },
              { name: "Web Workers", value: browserInfo.webWorkers },
              { name: "Service Workers", value: browserInfo.serviceWorkers },
              { name: "Geolocation", value: browserInfo.geolocation },
              { name: "Notifications", value: browserInfo.notifications },
              { name: "Device Motion", value: browserInfo.deviceMotion },
              {
                name: "Device Orientation",
                value: browserInfo.deviceOrientation,
              },
              { name: "Gamepad API", value: browserInfo.gamepad },
              { name: "Media Devices", value: browserInfo.mediaDevices },
              { name: "Media Recorder", value: browserInfo.mediaRecorder },
              {
                name: "Speech Recognition",
                value: browserInfo.speechRecognition,
              },
              { name: "Speech Synthesis", value: browserInfo.speechSynthesis },
            ].map(feature => (
              <div
                key={feature.name}
                className={`p-2 rounded border ${
                  feature.value
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{feature.name}</span>
                  <span
                    className={
                      feature.value ? "text-green-600" : "text-red-600"
                    }
                  >
                    {feature.value ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
