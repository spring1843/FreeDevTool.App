import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import {
  encodeToCBOR,
  decodeCBORBytes,
  uint8ArrayToHex,
  hexToUint8Array,
  uint8ArrayToBase64,
  base64ToUint8Array,
} from "@/lib/encoders";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Unlock } from "lucide-react";
import { SecurityBanner } from "@/components/ui/security-banner";
import { useState } from "react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { Button } from "@/components/ui/button";
import { DEFAULT_CBOR_JSON } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

type OutputTab = "hex" | "base64";

// Pre-compute defaults so Reset works without re-encoding
const DEFAULT_BYTES = encodeToCBOR(DEFAULT_CBOR_JSON);
const DEFAULT_CBOR_HEX = uint8ArrayToHex(DEFAULT_BYTES);
const DEFAULT_CBOR_BASE64 = uint8ArrayToBase64(DEFAULT_BYTES);

export default function CborEncoder() {
  const tool = getToolByPath("/tools/cbor-encoder");
  const [jsonInput, setJsonInput] = useState(DEFAULT_CBOR_JSON);
  const [cborHex, setCborHex] = useState(DEFAULT_CBOR_HEX);
  const [cborBase64, setCborBase64] = useState(DEFAULT_CBOR_BASE64);
  const [cborByteLength, setCborByteLength] = useState(DEFAULT_BYTES.length);
  const [outputTab, setOutputTab] = useState<OutputTab>("hex");
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const currentOutput = outputTab === "hex" ? cborHex : cborBase64;

  const setCurrentOutput = (value: string) => {
    if (outputTab === "hex") {
      setCborHex(value);
    } else {
      setCborBase64(value);
    }
  };

  const encode = () => {
    try {
      const bytes = encodeToCBOR(jsonInput);
      setCborHex(uint8ArrayToHex(bytes));
      setCborBase64(uint8ArrayToBase64(bytes));
      setCborByteLength(bytes.length);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Encoding failed");
    }
  };

  const decode = () => {
    try {
      const bytes =
        outputTab === "hex"
          ? hexToUint8Array(cborHex)
          : base64ToUint8Array(cborBase64);
      const result = decodeCBORBytes(bytes);
      setJsonInput(result);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Decoding failed");
    }
  };

  const handleReset = () => {
    setJsonInput(DEFAULT_CBOR_JSON);
    setCborHex(DEFAULT_CBOR_HEX);
    setCborBase64(DEFAULT_CBOR_BASE64);
    setCborByteLength(DEFAULT_BYTES.length);
    setError(null);
  };

  const handleClear = () => {
    setJsonInput("");
    setCborHex("");
    setCborBase64("");
    setCborByteLength(0);
    setError(null);
  };

  const jsonBytes = new TextEncoder().encode(jsonInput).length;
  const cborBytes = cborByteLength;
  const savings =
    jsonBytes > 0 && cborBytes > 0
      ? Math.round((1 - cborBytes / jsonBytes) * 100)
      : 0;

  const isAtDefault =
    jsonInput === DEFAULT_CBOR_JSON &&
    cborHex === DEFAULT_CBOR_HEX &&
    cborBase64 === DEFAULT_CBOR_BASE64;
  const hasModifiedData =
    jsonInput !== DEFAULT_CBOR_JSON ||
    (cborHex !== DEFAULT_CBOR_HEX && cborHex.trim() !== "") ||
    (cborBase64 !== DEFAULT_CBOR_BASE64 && cborBase64.trim() !== "");
  const outputEmpty = cborHex.trim() === "" && cborBase64.trim() === "";

  let savingsLabel = "";
  if (savings > 0) savingsLabel = ` (${savings}% smaller)`;
  else if (savings < 0) savingsLabel = ` (${Math.abs(savings)}% larger)`;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
          CBOR Encoder/Decoder
          {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Encode JSON to CBOR binary format and decode CBOR back to JSON
          </p>
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
      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={encode}
            icon={<Lock className="w-4 h-4 mr-2" />}
            tooltip="Encode JSON to CBOR binary"
          >
            Encode
          </ToolButton>
          <ToolButton
            variant="custom"
            onClick={decode}
            icon={<Unlock className="w-4 h-4 mr-2" />}
            tooltip={`Decode CBOR ${outputTab} back to JSON`}
          >
            Decode
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
            disabled={jsonInput.trim() === "" && outputEmpty}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      {/* Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON Input</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="json-input"
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Enter JSON to encode..."
              data-testid="cbor-json-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              lang="json"
              fileExtension="json"
              theme={theme}
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CBOR Output</CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant={outputTab === "hex" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOutputTab("hex")}
                >
                  Hex
                </Button>
                <Button
                  variant={outputTab === "base64" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOutputTab("base64")}
                >
                  Base64
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TextArea
              id="cbor-output"
              value={currentOutput}
              onChange={e => setCurrentOutput(e.target.value)}
              placeholder={
                outputTab === "hex"
                  ? "CBOR hex bytes will appear here..."
                  : "CBOR Base64 will appear here..."
              }
              data-testid="cbor-output"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              minHeight="400px"
              lang="plaintext"
              fileExtension="txt"
              lineWrapping={true}
              theme={theme}
            />
            {cborBytes > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                JSON: {jsonBytes} B → CBOR: {cborBytes} B{savingsLabel}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
