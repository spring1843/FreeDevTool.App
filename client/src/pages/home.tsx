import React, { useState } from "react";
import { Link } from "wouter";
import {
  Keyboard,
  ExternalLink,
  Play,
  Square,
  SkipForward,
  SkipBack,
  Pause,
  ChevronDown,
  ChevronRight,
  Github,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/hooks/use-search";
import { useDemo } from "@/hooks/use-demo-hook";

export default function Home() {
  const { filteredToolsData } = useSearch();
  const [showAllShortcuts, setShowAllShortcuts] = useState(false);
  const {
    isDemoRunning,
    isDemoPaused,
    currentDemoTool,
    demoProgress,
    demoSpeed,
    startDemo,
    stopDemo,
    pauseDemo,
    resumeDemo,
    skipToNext,
    skipToPrevious,
    totalTools,
  } = useDemo();

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Compact Header - Single Row Layout */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Left Side - Title and Features */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              FreeDevTool.App
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Open Source • Offline Developer Tools
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
              Open Source
            </span>
            <span className="inline-flex items-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
              Free
            </span>
            <span className="inline-flex items-center bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-400">
              Offline
            </span>
          </div>
        </div>

        {/* Right Side - Demo Controls */}
        <div className="flex-shrink-0">
          {/* Demo Mode Active */}
          {isDemoRunning ? (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-blue-600 text-xs">
                    Demo Active
                  </Badge>
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    {currentDemoTool}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={skipToPrevious}
                    className="h-7 px-2"
                    data-testid="demo-previous"
                  >
                    <SkipBack className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={isDemoPaused ? resumeDemo : pauseDemo}
                    className="h-7 px-2"
                    data-testid="demo-pause-resume"
                  >
                    {isDemoPaused ? (
                      <Play className="w-3 h-3" />
                    ) : (
                      <Pause className="w-3 h-3" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={skipToNext}
                    className="h-7 px-2"
                    data-testid="demo-next"
                  >
                    <SkipForward className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={stopDemo}
                    className="h-7 px-2"
                    data-testid="demo-stop"
                  >
                    <Square className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${demoProgress}%` }}
                />
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 text-center">
                {Math.round(demoProgress)}% • {demoSpeed.replace("-", " ")}{" "}
                speed
              </div>
            </div>
          ) : (
            /* Demo Button */
            <Button
              onClick={startDemo}
              size="default"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              data-testid="start-demo-button"
            >
              <Play className="w-4 h-4 mr-2" />
              Demo Tour ({totalTools} tools)
            </Button>
          )}
        </div>
      </div>

      {/* Technical Design Principles */}
      <div
        id="security"
        className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 my-8"
      >
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-green-700 dark:text-green-400 mb-2">
              Your Data Never Leaves Your Device
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              No back-end desgin. All processing happens entirely in your
              browser. Your data is never sent to any server.
            </p>
          </div>
          <div className="text-center">
            <div className="font-medium text-blue-700 dark:text-blue-400 mb-2">
              No Cookies, No Tracking, No Ads
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              No cookies, tracking pixels, or ads. Only browser local storage
              for your preferences. No external dependencies.
            </p>
          </div>
          <div className="text-center">
            <div className="font-medium text-purple-700 dark:text-purple-400 mb-2">
              Free & Open Source
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Designed for ultimate privacy and security. Inspect the code
              yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="https://github.com/spring1843/FreeDevTool.App"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white rounded-md hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-xs font-medium"
              >
                <Github className="w-3.5 h-3.5" />
                Open Source
              </a>
              <a
                href="https://github.com/spring1843/FreeDevTool.App/blob/main/SECURITY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-xs font-medium"
              >
                <Shield className="w-3.5 h-3.5" />
                Safety and Security
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="space-y-8">
        {Object.entries(filteredToolsData).map(([section, data]) => (
          <div key={section}>
            <div className="flex items-center mb-4">
              <div className={`w-3 h-3 rounded-full ${data.color} mr-3`} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {section}
              </h2>
              <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                ({data.tools.length} tool{data.tools.length !== 1 ? "s" : ""})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.tools.map(tool => (
                <Link key={tool.path} href={tool.path}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group border-l-4 border-l-transparent hover:border-l-slate-400">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tool.name}
                          </span>
                          {tool.experimental ? (
                            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded font-medium">
                              EXPERIMENTAL
                            </span>
                          ) : null}
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {tool.metadata.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono">
                          {tool.shortcut}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-16">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle
                className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                onClick={() => setShowAllShortcuts(!showAllShortcuts)}
              >
                <div className="flex items-center">
                  <Keyboard className="w-5 h-5 mr-2" />
                  Keyboard Shortcuts
                </div>
                {showAllShortcuts ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Use keyboard shortcuts to quickly navigate and control the app.
              </p>

              {/* Always visible - Essential shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Navigation:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Ctrl+M
                      </code>{" "}
                      - Open/Close Menu
                    </li>
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Ctrl+S
                      </code>{" "}
                      - Focus Search
                    </li>
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Escape
                      </code>{" "}
                      - Close Menu
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Theme & UI:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Ctrl+D
                      </code>{" "}
                      - Toggle Theme
                    </li>
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        ↑/↓
                      </code>{" "}
                      - Search Navigation
                    </li>
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Enter
                      </code>{" "}
                      - Select Tool
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Popular Tools:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Ctrl+J
                      </code>{" "}
                      - JSON Formatter
                    </li>
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Ctrl+B
                      </code>{" "}
                      - Base64 Encoder
                    </li>
                    <li>
                      <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                        Ctrl+Q
                      </code>{" "}
                      - QR Generator
                    </li>
                  </ul>
                </div>
              </div>

              {/* Expandable section with all shortcuts */}
              {showAllShortcuts ? (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Converters:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+J
                          </code>{" "}
                          - JSON ↔ YAML
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+B
                          </code>{" "}
                          - Base64 Encoder
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+U
                          </code>{" "}
                          - URL Encoder
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+H
                          </code>{" "}
                          - HTML Encoder
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Text Tools:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+W
                          </code>{" "}
                          - Word Counter
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+E
                          </code>{" "}
                          - Regex Tester
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+T
                          </code>{" "}
                          - Text Diff
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+F
                          </code>{" "}
                          - Text Formatter
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Generators:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+Q
                          </code>{" "}
                          - QR Generator
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+P
                          </code>{" "}
                          - Password Generator
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+G
                          </code>{" "}
                          - GUID Generator
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+C
                          </code>{" "}
                          - Color Palette
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">
                        Hardware Tests:
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+Shift+V
                          </code>{" "}
                          - Camera Test
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+Shift+M
                          </code>{" "}
                          - Microphone Test
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+Shift+K
                          </code>{" "}
                          - Keyboard Test
                        </li>
                        <li>
                          <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">
                            Ctrl+Shift+S
                          </code>{" "}
                          - Speaker Test
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="text-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllShortcuts(!showAllShortcuts)}
                  className="text-primary hover:text-primary/80"
                >
                  {showAllShortcuts ? "Show Less" : "Show All Shortcuts"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="font-medium">
            FreeDevTool.App - Open Source Developer Tools with Browser-Based
            Computation
          </p>
          <p className="mt-1">
            Built with a design philosophy focused on browser-based computation
            and minimal network requirements
          </p>
        </div>
      </div>
    </div>
  );
}
