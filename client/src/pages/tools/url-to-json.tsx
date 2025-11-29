import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { Label } from "@/components/ui/label";
import { Link, Hash, Globe } from "lucide-react";
import {
  ResetButton,
  ClearButton,
  ToolButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import {
  updateURL,
  copyShareableURL,
  getValidatedParam,
} from "@/lib/url-sharing";
import { useToast } from "@/hooks/use-toast";
import { parseURL, type URLComponents } from "@/lib/url-parser";

import { DEFAULT_URL_TO_JSON } from "@/data/defaults";
import { Input } from "@/components/ui/input";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { SecurityBanner } from "@/components/ui/security-banner";

export default function URLToJSON() {
  const tool = getToolByPath("/tools/url-to-json");
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL_TO_JSON);
  const [urlComponents, setUrlComponents] = useState<URLComponents>({});
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    // Load parameters from URL with validation
    const urlInput = getValidatedParam("url", DEFAULT_URL_TO_JSON, {
      type: "string",
      pattern: /^https?:\/\/[^\s<>"{}|\\^`[\]]*$/,
      maxLength: 2048, // Standard max URL length
    });
    setInputUrl(urlInput as string);
  }, []);

  useEffect(() => {
    handleParseURL();
    updateURL({ url: inputUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputUrl]);

  const handleParseURL = useCallback(() => {
    const result = parseURL(inputUrl);

    if (result.success) {
      setError("");
      setUrlComponents(result.components);
      setJsonOutput(
        Object.keys(result.components).length > 0
          ? JSON.stringify(result.components, null, 2)
          : ""
      );
    } else {
      setError(result.error || "Invalid URL format");
      setUrlComponents({});
      setJsonOutput("");
    }
  }, [inputUrl]);

  const shareConverter = async () => {
    const success = await copyShareableURL({ url: inputUrl });
    if (success) {
      toast({
        title: "URL to JSON converter shared!",
        description: "URL copied to clipboard with current input",
      });
    } else {
      toast({
        title: "Share failed",
        description: "Could not copy URL to clipboard",
        variant: "destructive",
      });
    }
  };

  const clearInput = () => {
    setInputUrl("");
    setUrlComponents({});
    setJsonOutput("");
    setError("");
  };

  const handleReset = () => {
    setInputUrl(DEFAULT_URL_TO_JSON);
    setUrlComponents({});
    setJsonOutput("");
    setError("");
  };

  const hasModifiedData =
    inputUrl !== DEFAULT_URL_TO_JSON && inputUrl.trim() !== "";
  const isAtDefault = inputUrl === DEFAULT_URL_TO_JSON;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              URL to JSON Converter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Break down URLs into their components including protocol,
              hostname, TLD, and query parameters
            </p>
          </div>
          <SecurityBanner variant="compact" className="shrink-0" />
        </div>
      </div>

      {error ? (
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      ) : null}

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="share"
            onClick={shareConverter}
            tooltip="Copy shareable URL to clipboard"
          />
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default URL"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={clearInput}
            tooltip="Clear URL input"
            hasModifiedData={hasModifiedData}
            disabled={inputUrl.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="w-5 h-5 mr-2" />
                URL Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="url-input">Enter URL</Label>
                <Input
                  id="url-input"
                  value={inputUrl}
                  onChange={e => setInputUrl(e.target.value)}
                  placeholder="https://example.com/path?param1=value1&param2=value2#section"
                  className="font-mono resize-none"
                  data-testid="url-input"
                  autoFocus={true}
                  data-default-input="true"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="w-5 h-5 mr-2" />
                JSON Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jsonOutput ? (
                <div className="space-y-4">
                  <TextArea
                    id="output"
                    value={jsonOutput}
                    readOnly={true}
                    className="font-mono text-sm min-h-[300px] resize-none"
                    minHeight="300px"
                    placeholder="JSON output will appear here..."
                    fileExtension="json"
                    theme={theme}
                  />

                  {/* URL Components Summary */}
                  <div className="grid grid-cols-1 gap-3">
                    {urlComponents.protocol ? (
                      <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          Protocol:
                        </span>
                        <span className="text-sm font-mono text-blue-900 dark:text-blue-100">
                          {urlComponents.protocol}
                        </span>
                      </div>
                    ) : null}

                    {urlComponents.hostname ? (
                      <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                        <span className="text-sm font-medium text-green-700 dark:text-green-400">
                          Hostname:
                        </span>
                        <span className="text-sm font-mono text-green-900 dark:text-green-100">
                          {urlComponents.hostname}
                        </span>
                      </div>
                    ) : null}

                    {urlComponents.tld ? (
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
                            TLD:
                          </span>
                          <span className="text-sm font-mono text-purple-900 dark:text-purple-100">
                            {urlComponents.tld}
                          </span>
                        </div>
                        {urlComponents.isTldKnown === false ? (
                          <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded border border-amber-300 dark:border-amber-700">
                            <p className="text-xs text-amber-700 dark:text-amber-300">
                              ⚠️ This TLD is not recognized in our database of
                              known TLDs. It may be invalid or a newly
                              registered TLD.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {urlComponents.queryParams &&
                    Object.keys(urlComponents.queryParams).length > 0 ? (
                      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800 overflow-hidden">
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-400 block mb-2">
                          Query Parameters (
                          {Object.keys(urlComponents.queryParams).length}):
                        </span>
                        <div className="space-y-1">
                          {Object.entries(urlComponents.queryParams).map(
                            ([key, value]) => (
                              <div key={key} className="flex flex-wrap gap-1">
                                <span className="text-sm font-mono text-orange-800 dark:text-orange-200 break-all">
                                  {key}:
                                </span>
                                <span className="text-sm font-mono text-orange-900 dark:text-orange-100 break-all">
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Enter a URL above to see its JSON breakdown</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
