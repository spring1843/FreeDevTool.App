import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { formatYAML } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code } from "lucide-react";
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
import { DEFAULT_YAML } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function YAMLFormatter() {
  const tool = getToolByPath("/tools/yaml-formatter");
  const [input, setInput] = useState(DEFAULT_YAML);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const formatCode = useCallback(async () => {
    try {
      const { formatted, error: formatError } = await formatYAML(input);
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
    setInput(DEFAULT_YAML);
    setOutput("");
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const hasModifiedData = input !== DEFAULT_YAML && input.trim() !== "";
  const isAtDefault = input === DEFAULT_YAML;

  useEffect(() => {
    formatCode();
  }, [formatCode]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              YAML Formatter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format and beautify YAML configuration files
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
            onClick={formatCode}
            icon={<Code className="w-4 h-4 mr-2" />}
            tooltip="Format and beautify YAML code"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Format YAML
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
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your YAML here..."
              data-testid="yaml-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="yaml"
              theme={theme}
              lang="yaml"
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
              placeholder="Formatted YAML will appear here..."
              data-testid="yaml-output"
              className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              minHeight="400px"
              rows={20}
              lang="yaml"
              fileExtension="yaml"
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
