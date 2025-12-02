import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { encodeBase64, decodeBase64 } from "@/lib/encoders";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Unlock, ArrowRightLeft } from "lucide-react";
import { SecurityBanner } from "@/components/ui/security-banner";
import { useState, useEffect, useCallback } from "react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { DEFAULT_BASE64 } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

// Pre-compute the default encoded value for comparison
const DEFAULT_BASE64_ENCODED = encodeBase64(DEFAULT_BASE64);

export default function Base64Encoder() {
  const tool = getToolByPath("/tools/base64");
  const [plainText, setPlainText] = useState(DEFAULT_BASE64);
  const [encodedText, setEncodedText] = useState(DEFAULT_BASE64_ENCODED);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const encode = useCallback(() => {
    try {
      const result = encodeBase64(plainText);
      setEncodedText(result);
      setError(null);
    } catch {
      setError("Encoding failed");
    }
  }, [plainText]);

  const decode = () => {
    try {
      const result = decodeBase64(encodedText);
      setPlainText(result);
      setError(null);
    } catch {
      setError("Decoding failed");
    }
  };

  const swapContent = () => {
    const temp = plainText;
    setPlainText(encodedText);
    setEncodedText(temp);
    setError(null);
  };

  const handlePlainTextChange = (value: string) => {
    setPlainText(value);
    if (encodedText) {
      setEncodedText("");
    }
  };

  const handleEncodedTextChange = (value: string) => {
    setEncodedText(value);
  };

  const handleReset = () => {
    setPlainText(DEFAULT_BASE64);
    setEncodedText("");
    setError(null);
  };

  const handleClear = () => {
    setPlainText("");
    setEncodedText("");
    setError(null);
  };

  const hasModifiedData =
    (plainText !== DEFAULT_BASE64 && plainText.trim() !== "") ||
    (encodedText !== DEFAULT_BASE64_ENCODED && encodedText.trim() !== "");
  const isAtDefault =
    plainText === DEFAULT_BASE64 &&
    (encodedText === "" || encodedText === DEFAULT_BASE64_ENCODED);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
          Base64 Encoder/Decoder
          {tool?.shortcut ? <ShortcutBadge shortcut={tool.shortcut} /> : null}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Encode and decode text using Base64 encoding
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
            tooltip="Encode plain text to Base64"
          >
            Encode
          </ToolButton>
          <ToolButton
            variant="custom"
            onClick={decode}
            icon={<Unlock className="w-4 h-4 mr-2" />}
            tooltip="Decode Base64 to plain text"
          >
            Decode
          </ToolButton>
          <ToolButton
            variant="custom"
            onClick={swapContent}
            icon={<ArrowRightLeft className="w-4 h-4 mr-2" />}
            tooltip="Swap content between input and output"
          >
            Swap
          </ToolButton>
        </ActionButtonGroup>
        <DataButtonGroup>
          <ResetButton
            onClick={handleReset}
            tooltip="Reset to default text example"
            hasModifiedData={hasModifiedData}
            disabled={isAtDefault}
          />
          <ClearButton
            onClick={handleClear}
            tooltip="Clear all inputs"
            hasModifiedData={hasModifiedData}
            disabled={plainText.trim() === "" && encodedText.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      {/* Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plain Text</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={plainText}
              onChange={e => handlePlainTextChange(e.target.value)}
              placeholder="Enter text to encode..."
              data-testid="base64-plain-text"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              lang="plaintext"
              fileExtension="txt"
              theme={theme}
              data-default-input="true"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Base64 Encoded</CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={encodedText}
              onChange={e => handleEncodedTextChange(e.target.value)}
              placeholder="Enter Base64 encoded text to decode..."
              data-testid="base64-encoded-text"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              minHeight="400px"
              lang="plaintext"
              fileExtension="txt"
              lineWrapping={true}
              theme={theme}
            />
          </CardContent>
        </Card>
      </div>
      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
