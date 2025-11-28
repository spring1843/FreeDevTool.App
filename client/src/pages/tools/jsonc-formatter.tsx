import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { formatJSONC } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { SecurityBanner } from "@/components/ui/security-banner";

import { DEFAULT_JSONC } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function JSONCFormatter() {
  const tool = getToolByPath("/tools/jsonc-formatter");
  const [input, setInput] = useState(DEFAULT_JSONC);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const formatCode = useCallback(async () => {
    try {
      const { formatted, error: formatError } = await formatJSONC(input);
      setOutput(formatted);
      setError(formatError || null);
    } catch (error) {
      setError(
        `Formatting error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }, [input]);

  const handleInputChange = (value: string) => {
    setInput(value);
    if (output) {
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_JSONC);
    setOutput("");
    setError(null);
  };

  useEffect(() => {
    document.title = "JSONC Formatter - FreeDevTool.App";
    formatCode();
  }, [formatCode]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              JSONC Formatter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format JSON with Comments (JSONC) files while preserving comments
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      {error ? (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Input JSONC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextArea
              id="input"
              data-testid="jsonc-input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your JSONC code here..."
              className="font-mono text-sm min-h-[400px] resize-y"
              lang="javascript"
              autoFocus={true}
              minHeight="400px"
              fileExtension="jsonc"
              theme={theme}
              data-default-input="true"
            />
            <div className="flex gap-2 flex-wrap">
              <Button onClick={formatCode} className="flex-1 sm:flex-none">
                Format JSONC
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Formatted Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              data-testid="jsonc-output"
              value={output}
              readOnly
              placeholder="Formatted JSONC will appear here..."
              className="font-mono text-sm min-h-[400px] resize-y"
              minHeight="400px"
              theme={theme}
              lang="javascript"
              fileExtension="jsonc"
            />
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              <p>
                JSONC (JSON with Comments) allows single-line (//) and
                multi-line (/* */) comments in JSON files.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
