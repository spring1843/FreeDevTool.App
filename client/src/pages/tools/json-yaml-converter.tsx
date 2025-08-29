import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { convertJSONToYAML, convertYAMLToJSON } from "@/lib/formatters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_JSON, DEFAULT_YAML } from "@/data/defaults";

export default function JSONYAMLConverter() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [yamlOutput, setYamlOutput] = useState("");
  const [yamlInput, setYamlInput] = useState(DEFAULT_YAML);
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const convertToYAML = useCallback(() => {
    const { converted, error: convertError } = convertJSONToYAML(jsonInput);
    setYamlOutput(converted);
    setError(convertError || null);
  }, [jsonInput]);

  const convertToJSON = useCallback(() => {
    const { converted, error: convertError } = convertYAMLToJSON(yamlInput);
    setJsonOutput(converted);
    setError(convertError || null);
  }, [yamlInput]);

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value);
    if (yamlOutput) {
      setYamlOutput("");
    }
  };

  const handleYamlInputChange = (value: string) => {
    setYamlInput(value);
    if (jsonOutput) {
      setJsonOutput("");
    }
  };

  const handleReset = () => {
    setJsonInput(DEFAULT_JSON);
    setYamlOutput("");
    setYamlInput(DEFAULT_YAML);
    setJsonOutput("");
    setError(null);
  };

  useEffect(() => {
    convertToYAML();
    convertToJSON();
  }, [convertToYAML, convertToJSON]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              JSON ↔ YAML Converter
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

      <div className="mb-6 flex flex-wrap gap-3">
        <Button
          onClick={convertToYAML}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          JSON to YAML
        </Button>
        <Button
          onClick={convertToJSON}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          YAML to JSON
        </Button>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">
                JSON Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextArea
                value={jsonInput}
                onChange={e => handleJsonInputChange(e.target.value)}
                placeholder="Paste your JSON here..."
                data-testid="json-input"
                className="min-h-[300px] font-mono text-sm"
                rows={15}
                autoFocus={true}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-400">
                YAML Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextArea
                value={yamlOutput}
                readOnly={true}
                placeholder="YAML output will appear here..."
                data-testid="yaml-output"
                className="min-h-[300px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
                rows={15}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">
                YAML Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextArea
                value={yamlInput}
                onChange={e => handleYamlInputChange(e.target.value)}
                placeholder="Paste your YAML here..."
                data-testid="yaml-input"
                className="min-h-[300px] font-mono text-sm"
                rows={15}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600 dark:text-orange-400">
                JSON Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TextArea
                value={jsonOutput}
                readOnly={true}
                placeholder="JSON output will appear here..."
                data-testid="json-output"
                className="min-h-[300px] font-mono text-sm bg-slate-50 dark:bg-slate-900"
                rows={15}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
