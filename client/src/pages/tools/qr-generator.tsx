import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  QrCode,
  Smartphone,
  Globe,
  Mail,
  Phone,
  Wifi,
  CreditCard,
} from "lucide-react";
import {
  ResetButton,
  ClearButton,
  ToolButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { useToast } from "@/hooks/use-toast";

import QRCodeLib from "qrcode-generator";
import { DEFAULT_QR_GENERATOR } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { SecurityBanner } from "@/components/ui/security-banner";

// Standalone QR Code generation using qrcode-generator library
const generateQRCode = (
  text: string,
  size = 200
): { url: string; svgData: string } => {
  try {
    const qr = QRCodeLib(0, "M"); // Type 0 (auto), Error correction level M
    qr.addData(text);
    qr.make();

    // Create SVG
    const cellSize = Math.floor(size / qr.getModuleCount());
    const margin = cellSize * 2;
    const svgSize = qr.getModuleCount() * cellSize + margin * 2;

    let svg = `<svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="${svgSize}" height="${svgSize}" fill="white"/>`;

    for (let row = 0; row < qr.getModuleCount(); row++) {
      for (let col = 0; col < qr.getModuleCount(); col++) {
        if (qr.isDark(row, col)) {
          const x = col * cellSize + margin;
          const y = row * cellSize + margin;
          svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
        }
      }
    }
    svg += "</svg>";

    // Convert SVG to data URL for display
    const url = `data:image/svg+xml;base64,${btoa(svg)}`;
    return { url, svgData: svg };
  } catch {
    console.error("QR Code generation failed");
    return { url: "", svgData: "" };
  }
};

type QRType = "text" | "url" | "email" | "phone" | "sms" | "wifi" | "vcard";

interface QRPreset {
  type: QRType;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  format: (input: string) => string;
}

const qrPresets: QRPreset[] = [
  {
    type: "text",
    name: "Plain Text",
    icon: <QrCode className="w-4 h-4" />,
    placeholder: "Enter any text...",
    format: (input: string) => input,
  },
  {
    type: "url",
    name: "Website URL",
    icon: <Globe className="w-4 h-4" />,
    placeholder: "https://example.com",
    format: (input: string) =>
      input.startsWith("http") ? input : `https://${input}`,
  },
  {
    type: "email",
    name: "Email Address",
    icon: <Mail className="w-4 h-4" />,
    placeholder: "user@example.com",
    format: (input: string) => `mailto:${input}`,
  },
  {
    type: "phone",
    name: "Phone Number",
    icon: <Phone className="w-4 h-4" />,
    placeholder: "+1234567890",
    format: (input: string) => `tel:${input}`,
  },
  {
    type: "sms",
    name: "SMS Message",
    icon: <Smartphone className="w-4 h-4" />,
    placeholder: "+1234567890:Hello!",
    format: (input: string) => {
      const [phone, ...messageParts] = input.split(":");
      const message = messageParts.join(":");
      return `sms:${phone}${message ? `?body=${encodeURIComponent(message)}` : ""}`;
    },
  },
  {
    type: "wifi",
    name: "WiFi Network",
    icon: <Wifi className="w-4 h-4" />,
    placeholder: "NetworkName:password:WPA",
    format: (input: string) => {
      const [ssid, password, security = "WPA"] = input.split(":");
      return `WIFI:T:${security};S:${ssid};P:${password};;`;
    },
  },
  {
    type: "vcard",
    name: "Contact Card",
    icon: <CreditCard className="w-4 h-4" />,
    placeholder: "John Doe:+1234567890:john@example.com",
    format: (input: string) => {
      const [name, phone, email] = input.split(":");
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\n${phone ? `TEL:${phone}\n` : ""}${email ? `EMAIL:${email}\n` : ""}END:VCARD`;
    },
  },
];

export default function QRGenerator() {
  const tool = getToolByPath("/tools/qr-generator");
  const [inputText, setInputText] = useState(DEFAULT_QR_GENERATOR);
  const [qrType, setQrType] = useState<QRType>("url");
  const [qrSize, setQrSize] = useState(300);
  const [qrUrl, setQrUrl] = useState("");
  const [svgData, setSvgData] = useState("");
  const [error, setError] = useState("");

  const { toast } = useToast();
  // Theme no longer needed after switching to native textarea

  const currentPreset = qrPresets.find(p => p.type === qrType) || qrPresets[0];

  // Generate QR code
  const generateQR = useCallback(() => {
    if (!inputText.trim()) {
      setError("Please enter some text to generate a QR code");
      setQrUrl("");
      return;
    }

    try {
      const formattedText = currentPreset.format(inputText.trim());
      const result = generateQRCode(formattedText, qrSize);
      setQrUrl(result.url);
      setSvgData(result.svgData);
      setError("");

      toast({
        title: "QR Code Generated",
        description: `Generated ${currentPreset.name} QR code successfully.`,
      });
    } catch {
      setError("Failed to generate QR code. Please check your input.");
      setQrUrl("");
      setSvgData("");
    }
  }, [inputText, currentPreset, qrSize, toast]);

  // Auto-generate on input change
  useEffect(() => {
    if (inputText.trim()) {
      const timer = setTimeout(generateQR, 500);
      return () => clearTimeout(timer);
    }
    setQrUrl("");
    setSvgData("");
    setError("");
  }, [inputText, qrType, qrSize, generateQR]);

  // Download QR code
  const downloadQR = () => {
    if (!svgData) return;

    try {
      // Create SVG blob directly from the SVG string
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-code-${Date.now()}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: "Your QR code is being downloaded as SVG.",
      });
    } catch {
      toast({
        title: "Download Failed",
        description: "Failed to download QR code.",
        variant: "destructive",
      });
    }
  };

  // Copy QR code URL
  const copyQRUrl = () => {
    if (!qrUrl) return;

    navigator.clipboard
      .writeText(qrUrl)
      .then(() => {
        toast({
          title: "URL Copied",
          description: "QR code image URL copied to clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Failed to copy URL to clipboard.",
          variant: "destructive",
        });
      });
  };

  // Quick preset buttons
  const applyPreset = (preset: string) => {
    setInputText(preset);
  };

  const handleReset = () => {
    setInputText(DEFAULT_QR_GENERATOR);
    setQrType("url");
    setQrSize(300);
    setQrUrl("");
    setSvgData("");
    setError("");
  };

  const handleClear = () => {
    setInputText("");
    setQrUrl("");
    setSvgData("");
    setError("");
  };

  const hasModifiedData =
    inputText !== DEFAULT_QR_GENERATOR && inputText.trim() !== "";
  const isAtDefault =
    inputText === DEFAULT_QR_GENERATOR && qrType === "url" && qrSize === 300;

  const getQuickPresets = () => {
    const presets = {
      text: ["Hello World!", "DevTools Suite", "Generated with QR Tool"],
      url: [
        "https://freedevtool.app",
        "https://github.com",
        "https://google.com",
      ],
      email: ["contact@example.com", "support@company.com", "hello@domain.com"],
      phone: ["+1-555-0123", "+44-20-7946-0958", "+81-3-1234-5678"],
      sms: [
        "+1234567890:Hello!",
        "+1234567890:Meeting at 3pm",
        "+1234567890:Thanks!",
      ],
      wifi: [
        "HomeNetwork:password123:WPA",
        "OfficeWiFi:secure2024:WPA2",
        "GuestNet::nopass",
      ],
      vcard: [
        "John Smith:+1234567890:john@company.com",
        "Jane Doe:+0987654321:jane@email.com",
        "Bob Wilson::bob@domain.com",
      ],
    };

    return presets[qrType] || [];
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              QR Code Generator
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Generate QR codes for text, URLs, contact info, WiFi credentials,
              and more
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={generateQR}
            disabled={!inputText.trim()}
            tooltip="Generate QR Code from input"
          >
            Generate QR Code
          </ToolButton>
          {qrUrl ? (
            <>
              <ToolButton
                variant="download"
                onClick={downloadQR}
                tooltip="Download QR code as SVG"
              >
                Download
              </ToolButton>
              <ToolButton
                variant="copy"
                onClick={copyQRUrl}
                tooltip="Copy QR code URL to clipboard"
              >
                Copy
              </ToolButton>
            </>
          ) : null}
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
            disabled={inputText.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                QR Code Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="qr-type">QR Code Type</Label>
                <Select
                  value={qrType}
                  onValueChange={(value: QRType) => setQrType(value)}
                >
                  <SelectTrigger data-testid="qr-type-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qrPresets.map(preset => (
                      <SelectItem key={preset.type} value={preset.type}>
                        <div className="flex items-center gap-2">
                          {preset.icon}
                          {preset.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qr-size">QR Code Size</Label>
                <Select
                  value={qrSize.toString()}
                  onValueChange={value => setQrSize(parseInt(value))}
                >
                  <SelectTrigger data-testid="qr-size-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150">150x150 px</SelectItem>
                    <SelectItem value="200">200x200 px</SelectItem>
                    <SelectItem value="300">300x300 px</SelectItem>
                    <SelectItem value="400">400x400 px</SelectItem>
                    <SelectItem value="500">500x500 px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qr-text-input">
                  {currentPreset.name} Content
                </Label>
                {/* Use a native textarea for simpler e2e interaction (Playwright .fill & .toHaveValue) */}
                <textarea
                  id="qr-text-input"
                  placeholder={currentPreset.placeholder}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  rows={4}
                  data-testid="qr-input"
                  autoFocus={true}
                  data-default-input="true"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {error ? (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              ) : null}

            </CardContent>
          </Card>

          {/* Quick Presets */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {getQuickPresets().map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="justify-start text-left h-auto p-2"
                    data-testid={`preset-${index}`}
                  >
                    <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 w-full">
                      {preset}
                    </code>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Code Display */}
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 aspect-square">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  className="max-w-full max-h-full"
                  data-testid="qr-code-image"
                />
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No QR Code Generated</p>
                  <p className="text-sm">
                    Enter text above to generate a QR code
                  </p>
                </div>
              )}
            </div>

            {qrUrl ? (
              <div className="mt-4 text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Size: {qrSize}x{qrSize} pixels
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 break-all">
                  Content: {currentPreset.format(inputText)}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}
