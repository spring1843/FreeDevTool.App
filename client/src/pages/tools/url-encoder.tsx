import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { Link, Unlink, RotateCcw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_URL_ENCODER } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { renderToolExplanations } from "@/components/tool-explanations";

export default function URLEncoder() {
  const [plainText, setPlainText] = useState(DEFAULT_URL_ENCODER);
  const [encodedText, setEncodedText] = useState("");
  const { theme } = useTheme();
  const { toast } = useToast();

  const encodeURL = useCallback(() => {
    try {
      const encoded = encodeURIComponent(plainText);
      setEncodedText(encoded);
    } catch (error: unknown) {
      console.error("Encoding error:", error);
      setEncodedText("Error: Invalid input for URL encoding");
    }
  }, [plainText]);

  const handleEncodeClick = () => {
    try {
      const encoded = encodeURIComponent(plainText);
      setEncodedText(encoded);
      toast({
        title: "URL encoded successfully",
        description: "Plain text has been converted to URL-safe format",
      });
    } catch (error: unknown) {
      console.error("Encoding error:", error);
      setEncodedText("Error: Invalid input for URL encoding");
      toast({
        title: "Encoding failed",
        description: "Could not encode the URL",
        variant: "destructive",
      });
    }
  };

  const decodeURL = () => {
    try {
      const decoded = decodeURIComponent(encodedText);
      setPlainText(decoded);
      toast({
        title: "URL decoded successfully",
        description: "Encoded text has been converted back to plain text",
      });
    } catch (error: unknown) {
      setPlainText(
        `Error: Invalid input for URL decoding: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      toast({
        title: "Decoding failed",
        description:
          error instanceof Error ? error.message : "Could not decode the URL",
        variant: "destructive",
      });
    }
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
    setPlainText(DEFAULT_URL_ENCODER);
    setEncodedText("");
  };

  useEffect(() => {
    encodeURL();
  }, [encodeURL]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              URL Encoder/Decoder
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              URL encode and decode strings for safe URL transmission
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <Button
          onClick={handleEncodeClick}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link className="w-4 h-4 mr-2" />
          Encode URL
        </Button>
        <Button
          onClick={decodeURL}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Unlink className="w-4 h-4 mr-2" />
          Decode URL
        </Button>
        <Button onClick={handleReset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 dark:text-blue-400">
              Plain Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="input"
              value={plainText}
              onChange={e => handlePlainTextChange(e.target.value)}
              placeholder="Enter text to URL encode..."
              data-testid="plain-text-input"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              autoFocus={true}
              minHeight="400px"
              fileExtension="txt"
              theme={theme}
              lineWrapping={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">
              URL Encoded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TextArea
              id="output"
              value={encodedText}
              onChange={e => handleEncodedTextChange(e.target.value)}
              placeholder="URL encoded text will appear here..."
              data-testid="encoded-text-output"
              className="min-h-[400px] font-mono text-sm"
              rows={20}
              minHeight="400px"
              theme={theme}
              lineWrapping={true}
            />
          </CardContent>
        </Card>
      </div>

      {renderToolExplanations(
        getToolByPath("/tools/url-encoder")?.explanations
      )}
    </div>
  );
}
