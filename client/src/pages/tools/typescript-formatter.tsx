import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { formatTypeScript } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Minimize2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_TYPESCRIPT } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function TypeScriptFormatter() {
  const tool = getToolByPath("/tools/typescript-formatter");
  const [input, setInput] = useState(DEFAULT_TYPESCRIPT);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const formatCode = useCallback(
    async (minify = false) => {
      try {
        const { formatted, error: formatError } = await formatTypeScript(
          input,
          minify
        );
        setOutput(formatted);
        setError(formatError || null);
      } catch (error) {
        setError(
          `Formatting error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    },
    [input]
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    if (output) {
      setOutput("");
    }
  };

  const handleReset = () => {
    setInput(DEFAULT_TYPESCRIPT);
    setOutput("");
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const hasModifiedData =
    (input !== DEFAULT_TYPESCRIPT && input.trim() !== "") ||
    output.trim() !== "";
  const isAtDefault = input === DEFAULT_TYPESCRIPT && output === "";

  useEffect(() => {
    document.title = "TypeScript Formatter - FreeDevTool.App";
    formatCode(false); // Beautify by default
  }, [formatCode]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              JavaScript/TypeScript Formatter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format, beautify, or minify JavaScript and TypeScript code using
              Prettier
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

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={() => formatCode(false)}
            icon={<Code className="w-4 h-4 mr-2" />}
            tooltip="Format and beautify JavaScript/TypeScript code"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Beautify Code
          </ToolButton>
          <ToolButton
            variant="custom"
            onClick={() => formatCode(true)}
            icon={<Minimize2 className="w-4 h-4 mr-2" />}
            tooltip="Minify code to reduce file size"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Minify Code
          </ToolButton>
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default example"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear all inputs"
            hasModifiedData={hasModifiedData}
            disabled={input.trim() === "" && output.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input JavaScript/TypeScript</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your JavaScript or TypeScript code here..."
              data-testid="typescript-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="ts"
              theme={theme}
              lang="typescript"
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
              placeholder="Formatted JavaScript/TypeScript will appear here..."
              data-testid="typescript-output"
              className="min-h-[400px] font-mono text-sm"
              minHeight="400px"
              rows={20}
              theme={theme}
              lang="typescript"
              fileExtension="ts"
            />
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
