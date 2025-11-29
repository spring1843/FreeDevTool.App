import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { formatCSS, formatLESS, formatSCSS } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Minimize2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_CSS, DEFAULT_SCSS, DEFAULT_LESS } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

type FormatType = "css" | "scss" | "less";

export default function CSSFormatter() {
  const tool = getToolByPath("/tools/css-formatter");
  const [location] = useLocation();
  const { theme } = useTheme();

  // Determine initial format based on route - only on mount
  const getInitialFormat = (): FormatType => {
    if (location.includes("/tools/scss-formatter")) return "scss";
    if (location.includes("/tools/less-formatter")) return "less";
    return "css";
  };

  const [format, setFormat] = useState<FormatType>(() => getInitialFormat());
  const [input, setInput] = useState(() => {
    const initialFormat = getInitialFormat();
    switch (initialFormat) {
      case "scss":
        return DEFAULT_SCSS;
      case "less":
        return DEFAULT_LESS;
      default:
        return DEFAULT_CSS;
    }
  });
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatCode = useCallback(
    async (minify = false) => {
      try {
        let formatter = formatCSS;

        switch (format) {
          case "scss":
            formatter = formatSCSS;
            break;
          case "less":
            formatter = formatLESS;
            break;
          default:
            formatter = formatCSS;
        }

        const { formatted, error: formatError } = await formatter(
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
    [input, format]
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    if (output) {
      setOutput("");
    }
  };

  const handleFormatChange = (newFormat: FormatType) => {
    setFormat(newFormat);
    setOutput("");
    setError(null);

    // Change default input based on format
    switch (newFormat) {
      case "scss":
        setInput(DEFAULT_SCSS);
        break;
      case "less":
        setInput(DEFAULT_LESS);
        break;
      default:
        setInput(DEFAULT_CSS);
    }
  };

  const handleReset = () => {
    switch (format) {
      case "scss":
        setInput(DEFAULT_SCSS);
        break;
      case "less":
        setInput(DEFAULT_LESS);
        break;
      default:
        setInput(DEFAULT_CSS);
    }
    setOutput("");
    setError(null);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const getDefaultForFormat = () => {
    switch (format) {
      case "scss":
        return DEFAULT_SCSS;
      case "less":
        return DEFAULT_LESS;
      default:
        return DEFAULT_CSS;
    }
  };

  const hasModifiedData =
    input !== getDefaultForFormat() && input.trim() !== "";
  const isAtDefault = input === getDefaultForFormat();

  useEffect(() => {
    formatCode(false); // Beautify by default
  }, [formatCode]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              CSS/LESS/SCSS Formatter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Format, beautify, or minify CSS, LESS, and SCSS stylesheets using
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

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Format:
          </label>
          <Select value={format} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="scss">SCSS</SelectItem>
              <SelectItem value="less">LESS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={() => formatCode(false)}
            icon={<Code className="w-4 h-4 mr-2" />}
            tooltip="Format and beautify CSS code"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Beautify Code
          </ToolButton>
          <ToolButton
            variant="custom"
            onClick={() => formatCode(true)}
            icon={<Minimize2 className="w-4 h-4 mr-2" />}
            tooltip="Minify CSS to reduce file size"
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
            <CardTitle>Input CSS/LESS/SCSS</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
              placeholder="Paste your CSS here..."
              data-testid="css-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="css"
              theme={theme}
              lang="css"
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
              placeholder="Formatted CSS will appear here..."
              data-testid="css-output"
              className="min-h-[400px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
              minHeight="400px"
              rows={20}
              lang="css"
              fileExtension="css"
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
