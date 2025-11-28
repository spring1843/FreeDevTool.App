import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { formatJSON } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Lightbulb } from "lucide-react";

import { SecurityBanner } from "@/components/ui/security-banner";
import { useState, useEffect, useCallback } from "react";
import { ToolButton, ResetButton } from "@/components/ui/tool-button";

import { DEFAULT_JSON } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function JsonFormatter() {
  const tool = getToolByPath("/tools/json-formatter");
  const [input, setInput] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const formatCode = useCallback(async () => {
    try {
      const { formatted, error: formatError } = await formatJSON(input);
      setOutput(formatted);
      setError(formatError || null);
    } catch (error) {
      setError(
        `Formatting error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }, [input]);

  const minifyCode = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch {
      setError("Invalid JSON: Unable to parse");
    }
  };

  const validateCode = () => {
    try {
      JSON.parse(input);
      setError(null);
      return true;
    } catch {
      setError("Invalid JSON: Unable to parse");
      return false;
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    // Clear output when input changes
    if (output) {
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_JSON);
    setOutput("");
    setError(null);
  };

  // Execute formatting with default value on component mount
  useEffect(() => {
    formatCode();
  }, [input, formatCode]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              JSON Formatter
              {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format, validate, and minify JSON with syntax highlighting for
              enhanced security
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

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-3">
        <ToolButton
          variant="custom"
          onClick={formatCode}
          icon={<Code className="w-4 h-4 mr-2" />}
          tooltip="Format and beautify JSON code"
        >
          Format
        </ToolButton>
        <ToolButton
          variant="custom"
          onClick={minifyCode}
          tooltip="Minify JSON to single line"
        >
          Minify
        </ToolButton>
        <ToolButton
          variant="custom"
          onClick={validateCode}
          icon={<Lightbulb className="w-4 h-4 mr-2" />}
          tooltip="Validate JSON syntax"
        >
          Validate
        </ToolButton>
        <ResetButton
          onClick={handleReset}
          tooltip="Reset to default JSON example"
        />
      </div>

      {/* Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your JSON here..."
              data-testid="json-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              fileExtension="json"
              theme={theme}
              lang="json"
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Output</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={output}
              readOnly={true}
              placeholder="Formatted JSON will appear here..."
              data-testid="json-output"
              rows={20}
              lang="json"
              fileExtension="json"
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
