import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { convertJSONToYAML, convertYAMLToJSON } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { useState, useCallback } from "react";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_JSON } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

export default function JSONYAMLConverter() {
  const tool = getToolByPath("/tools/json-yaml-converter");
  const [jsonText, setJsonText] = useState(DEFAULT_JSON);
  const [yamlText, setYamlText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const convertToYAML = useCallback(() => {
    const { converted, error: convertError } = convertJSONToYAML(jsonText);
    setYamlText(converted);
    setError(convertError || null);
  }, [jsonText]);

  const convertToJSON = useCallback(() => {
    const { converted, error: convertError } = convertYAMLToJSON(yamlText);
    setJsonText(converted);
    setError(convertError || null);
  }, [yamlText]);

  const handleJsonChange = (value: string) => {
    setJsonText(value);
    setError(null);
  };

  const handleYamlChange = (value: string) => {
    setYamlText(value);
    setError(null);
  };

  const handleReset = () => {
    setJsonText(DEFAULT_JSON);
    setYamlText("");
    setError(null);
  };

  const handleClear = () => {
    setJsonText("");
    setYamlText("");
    setError(null);
  };

  const hasModifiedData =
    (jsonText !== DEFAULT_JSON && jsonText.trim() !== "") ||
    yamlText.trim() !== "";
  const isAtDefault = jsonText === DEFAULT_JSON && yamlText === "";

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              JSON ↔ YAML Converter
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Convert between JSON and YAML formats with validation
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
            onClick={convertToYAML}
            icon={<ArrowRight className="w-4 h-4 mr-2" />}
            tooltip="Convert JSON to YAML"
          >
            JSON → YAML
          </ToolButton>
          <ToolButton
            variant="custom"
            onClick={convertToJSON}
            icon={<ArrowLeft className="w-4 h-4 mr-2" />}
            tooltip="Convert YAML to JSON"
          >
            YAML → JSON
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
            disabled={jsonText.trim() === "" && yamlText.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">
              JSON
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="json-input"
              value={jsonText}
              onChange={e => handleJsonChange(e.target.value)}
              placeholder="Paste your JSON here..."
              data-testid="json-input"
              className="min-h-[400px] font-mono text-sm"
              data-default-input="true"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              lang="json"
              fileExtension="json"
              theme={theme}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600 dark:text-purple-400">
              YAML
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="yaml-input"
              value={yamlText}
              onChange={e => handleYamlChange(e.target.value)}
              placeholder="Paste your YAML here..."
              data-testid="yaml-output"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              minHeight="400px"
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
