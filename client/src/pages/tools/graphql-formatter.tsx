import { useShareTool } from "@/hooks/use-share-tool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { formatGraphQL } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_GRAPHQL } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function GraphQLFormatter() {
  const { handleShare } = useShareTool();
  const tool = getToolByPath("/tools/graphql-formatter");
  const [input, setInput] = useState(DEFAULT_GRAPHQL);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [autoFormat, setAutoFormat] = useState(true);
  const { theme } = useTheme();

  const formatCode = useCallback(async () => {
    try {
      const { formatted, error: formatError } = await formatGraphQL(input);
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
    setInput(DEFAULT_GRAPHQL);
    setOutput("");
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const hasModifiedData = input !== DEFAULT_GRAPHQL && input.trim() !== "";
  const isAtDefault = input === DEFAULT_GRAPHQL;

  useEffect(() => {
    document.title = "GraphQL Formatter - FreeDevTool.App";
    if (autoFormat) {
      formatCode();
    }
  }, [autoFormat, formatCode]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              GraphQL Formatter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format and beautify GraphQL schemas, queries, and mutations using
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
            onClick={formatCode}
            icon={<Code className="w-4 h-4 mr-2" />}
            tooltip="Format and beautify GraphQL code"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Format GraphQL
          </ToolButton>
          <ToolButton
            variant="share"
            onClick={handleShare}
            tooltip="Copy link to this tool"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="graphql-auto-format"
                    checked={autoFormat}
                    onCheckedChange={setAutoFormat}
                    data-testid="auto-process-switch"
                  />
                  <Label
                    htmlFor="graphql-auto-format"
                    className="cursor-pointer"
                  >
                    Auto Format
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically format the input when it changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
            <CardTitle>Input GraphQL</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your GraphQL schema, query, or mutation here..."
              data-testid="graphql-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="graphql"
              theme={theme}
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
              placeholder="Formatted GraphQL will appear here..."
              data-testid="graphql-output"
              className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              minHeight="400px"
              rows={20}
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
