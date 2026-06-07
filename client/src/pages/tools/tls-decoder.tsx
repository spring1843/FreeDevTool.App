import "reflect-metadata";
import {
  X509Certificate,
  KeyUsagesExtension,
  ExtendedKeyUsageExtension,
  BasicConstraintsExtension,
  SubjectKeyIdentifierExtension,
  AuthorityKeyIdentifierExtension,
  AuthorityInfoAccessExtension,
  SubjectAlternativeNameExtension,
  CertificatePolicyExtension,
  type Extension,
} from "@peculiar/x509";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { useTheme } from "@/providers/theme-provider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle } from "lucide-react";
import {
  ToolButton,
  ResetButton,
  ClearButton,
  ToolButtonGroup,
  ActionButtonGroup,
  DataButtonGroup,
} from "@/components/ui/tool-button";
import { useState, useEffect, useCallback } from "react";

import { SecurityBanner } from "@/components/ui/security-banner";
import { DEFAULT_TLS_DECODER } from "@/data/defaults";
import { getToolByPath } from "@/data/tools";
import { ToolExplanations } from "@/components/tool-explanations";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";
import { Switch } from "@/components/ui/switch";
import { Label as SwitchLabel } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExtensionDetail {
  name: string;
  oid: string;
  critical: boolean;
  lines: string[];
}

interface CertificateInfo {
  subject: string;
  issuer: string;
  serialNumber: string;
  validFrom: string;
  validTo: string;
  signatureAlgorithm: string;
  publicKeyAlgorithm: string;
  version: string;
  extensionDetails: ExtensionDetail[];
  subjectAltNames: string[];
  fingerprintSHA1: string;
  fingerprintSHA256: string;
  isValid: boolean;
  daysUntilExpiry: number;
}

const KEY_USAGE_FLAGS: Array<[number, string]> = [
  [1, "Digital Signature"],
  [2, "Non Repudiation"],
  [4, "Key Encipherment"],
  [8, "Data Encipherment"],
  [16, "Key Agreement"],
  [32, "Certificate Sign"],
  [64, "CRL Sign"],
  [128, "Encipher Only"],
  [256, "Decipher Only"],
];

const EKU_NAMES: Record<string, string> = {
  "1.3.6.1.5.5.7.3.1": "TLS Web Server Authentication",
  "1.3.6.1.5.5.7.3.2": "TLS Web Client Authentication",
  "1.3.6.1.5.5.7.3.3": "Code Signing",
  "1.3.6.1.5.5.7.3.4": "Email Protection",
  "1.3.6.1.5.5.7.3.8": "Time Stamping",
  "1.3.6.1.5.5.7.3.9": "OCSP Signing",
};

const OID_NAMES: Record<string, string> = {
  "2.5.29.15": "Key Usage",
  "2.5.29.37": "Extended Key Usage",
  "2.5.29.19": "Basic Constraints",
  "2.5.29.14": "Subject Key Identifier",
  "2.5.29.35": "Authority Key Identifier",
  "1.3.6.1.5.5.7.1.1": "Authority Info Access",
  "2.5.29.17": "Subject Alternative Name",
  "2.5.29.32": "Certificate Policies",
  "2.5.29.31": "CRL Distribution Points",
  "1.3.6.1.4.1.11129.2.4.2": "Certificate Transparency (SCT)",
  "2.5.29.9": "Subject Directory Attributes",
  "2.5.29.18": "Issuer Alternative Name",
  "2.5.29.36": "Policy Constraints",
  "2.5.29.54": "Inhibit Any Policy",
  "1.3.6.1.5.5.7.1.3": "QC Statements",
  "1.3.6.1.5.5.7.1.11": "Subject Info Access",
};

function oidToExtensionName(oid: string): string {
  return OID_NAMES[oid] ?? oid;
}

function formatSigAlgorithm(alg: Algorithm): string {
  const hash =
    "hash" in alg
      ? (alg as { hash?: { name?: string } }).hash?.name
      : undefined;
  const hashShort = hash ? hash.replace("SHA-", "SHA") : "";
  switch (alg.name) {
    case "RSASSA-PKCS1-v1_5":
      return hash ? `${hashShort}withRSA` : "RSA";
    case "RSA-PSS":
      return hash ? `${hashShort}withRSAandMGF1` : "RSA-PSS";
    case "ECDSA":
      return hash ? `${hashShort}withECDSA` : "ECDSA";
    case "Ed25519":
      return "Ed25519";
    case "Ed448":
      return "Ed448";
    default:
      return alg.name;
  }
}

function formatPubKeyAlgorithm(alg: Algorithm): string {
  switch (alg.name) {
    case "RSASSA-PKCS1-v1_5":
    case "RSA-PSS":
    case "RSA-OAEP": {
      const { modulusLength } = alg as RsaKeyAlgorithm;
      return modulusLength ? `RSA (${modulusLength} bits)` : "RSA";
    }
    case "ECDSA":
    case "ECDH": {
      const { namedCurve } = alg as EcKeyAlgorithm;
      return namedCurve ? `EC (${namedCurve})` : "EC";
    }
    case "Ed25519":
      return "Ed25519";
    case "Ed448":
      return "Ed448";
    default:
      return alg.name;
  }
}

function bufToHexColons(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join(":")
    .toUpperCase();
}

function formatExtensionDetail(ext: Extension): ExtensionDetail {
  const name = oidToExtensionName(ext.type);
  const critical = ext.critical ?? false;
  const lines: string[] = [];

  if (ext instanceof KeyUsagesExtension) {
    KEY_USAGE_FLAGS.forEach(([flag, label]) => {
      if (ext.usages & flag) lines.push(label);
    });
  } else if (ext instanceof ExtendedKeyUsageExtension) {
    ext.usages.forEach(oid =>
      lines.push(EKU_NAMES[String(oid)] ?? String(oid))
    );
  } else if (ext instanceof BasicConstraintsExtension) {
    lines.push(`CA: ${ext.ca ? "TRUE" : "FALSE"}`);
    if (ext.pathLength !== undefined) {
      lines.push(`Path Length: ${ext.pathLength}`);
    }
  } else if (ext instanceof SubjectKeyIdentifierExtension) {
    // keyId is a hex string — add colons for readability
    lines.push(
      (ext.keyId.match(/.{1,2}/g) ?? [ext.keyId]).join(":").toUpperCase()
    );
  } else if (ext instanceof AuthorityKeyIdentifierExtension) {
    if (ext.keyId) {
      lines.push(
        (ext.keyId.match(/.{1,2}/g) ?? [ext.keyId]).join(":").toUpperCase()
      );
    }
  } else if (ext instanceof AuthorityInfoAccessExtension) {
    ext.ocsp.forEach(g => lines.push(`OCSP: ${g.value}`));
    ext.caIssuers.forEach(g => lines.push(`CA Issuers: ${g.value}`));
  } else if (ext instanceof SubjectAlternativeNameExtension) {
    const { items } = ext.names;
    items
      .slice(0, 5)
      .forEach(n => lines.push(`${n.type.toUpperCase()}: ${n.value}`));
    if (items.length > 5)
      lines.push(`... and ${items.length - 5} more (see below)`);
  } else if (ext instanceof CertificatePolicyExtension) {
    ext.policies.forEach(oid => lines.push(oid));
  }

  return { name, oid: ext.type, critical, lines };
}

export default function TLSDecoder() {
  const tool = getToolByPath("/tools/tls-decoder");
  const [certificate, setCertificate] = useState(DEFAULT_TLS_DECODER);
  // Incrementing key to force CodeMirror remount on reset/clear preventing residual merged content
  const [editorEpoch, setEditorEpoch] = useState(0);
  const [certificateInfo, setCertificateInfo] =
    useState<CertificateInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoProcess, setAutoProcess] = useState(true);
  const { theme } = useTheme();

  const decodeCertificate = useCallback(async () => {
    try {
      setError(null);

      const trimmed = certificate.trim();
      if (!trimmed) {
        throw new Error("No certificate data found");
      }

      const cert = new X509Certificate(trimmed);
      const now = new Date();

      // Serial number formatted as XX:XX:XX:...
      const serialNumber = (
        cert.serialNumber.match(/.{1,2}/g) ?? [cert.serialNumber]
      )
        .join(":")
        .toUpperCase();

      // X509Certificate doesn't expose the version directly. v3 certificates have
      // extensions; if none are present, the exact version isn't distinguishable here.
      const version = cert.extensions.length > 0 ? "v3" : "v1/v2 (unknown)";
      // Algorithms
      const signatureAlgorithm = formatSigAlgorithm(cert.signatureAlgorithm);
      const cryptoKey = await cert.publicKey.export();
      const publicKeyAlgorithm = formatPubKeyAlgorithm(cryptoKey.algorithm);

      // Fingerprints
      const fingerprintSHA1 = bufToHexColons(await cert.getThumbprint("SHA-1"));
      const fingerprintSHA256 = bufToHexColons(
        await cert.getThumbprint("SHA-256")
      );

      // Extension details
      const extensionDetails = cert.extensions.map(e =>
        formatExtensionDetail(e)
      );

      // Subject Alternative Names (full list for dedicated section)
      const sanExt = cert.extensions.find(
        e => e instanceof SubjectAlternativeNameExtension
      ) as SubjectAlternativeNameExtension | undefined;

      const subjectAltNames = sanExt
        ? sanExt.names.items.map(n => `${n.type}: ${n.value}`)
        : [];

      // Validity
      const isValid = cert.notBefore <= now && now <= cert.notAfter;
      const msPerDay = 1000 * 60 * 60 * 24;
      const daysUntilExpiry = Math.max(
        0,
        Math.floor((cert.notAfter.getTime() - now.getTime()) / msPerDay)
      );

      setCertificateInfo({
        subject: cert.subject,
        issuer: cert.issuer,
        serialNumber,
        validFrom: cert.notBefore.toISOString(),
        validTo: cert.notAfter.toISOString(),
        signatureAlgorithm,
        publicKeyAlgorithm,
        version,
        extensionDetails,
        subjectAltNames,
        fingerprintSHA1,
        fingerprintSHA256,
        isValid,
        daysUntilExpiry,
      });
    } catch (err) {
      setError(
        `Certificate parsing failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      setCertificateInfo(null);
    }
  }, [certificate]);

  const handleCertificateChange = (value: string) => {
    setCertificate(value);
    if (certificateInfo) {
      setCertificateInfo(null);
    }
  };

  const handleReset = () => {
    // Reset explicitly to the original default example (no residual decoded modifications)
    setCertificate(DEFAULT_TLS_DECODER);
    setCertificateInfo(null);
    setError(null);
    setEditorEpoch(e => e + 1);
  };

  const handleClear = () => {
    setCertificate("");
    setCertificateInfo(null);
    setError(null);
    setEditorEpoch(e => e + 1);
  };

  const hasModifiedData =
    certificate.trim() !== DEFAULT_TLS_DECODER.trim() &&
    certificate.trim() !== "";
  const isAtDefault = certificate === DEFAULT_TLS_DECODER;

  useEffect(() => {
    if (autoProcess) {
      decodeCertificate();
    }
  }, [autoProcess, decodeCertificate]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const getValidityStatus = () => {
    if (!certificateInfo) return null;

    if (!certificateInfo.isValid) {
      return {
        color: "text-red-600",
        icon: <XCircle className="w-4 h-4" />,
        text: "Invalid",
      };
    }

    if (certificateInfo.daysUntilExpiry < 30) {
      return {
        color: "text-yellow-600",
        icon: <XCircle className="w-4 h-4" />,
        text: "Expires Soon",
      };
    }

    return {
      color: "text-green-600",
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Valid",
    };
  };

  const validityStatus = getValidityStatus();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
              TLS Certificate Decoder
              {tool?.shortcut ? (
                <ShortcutBadge shortcut={tool.shortcut} />
              ) : null}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Decode and analyze X.509 TLS/SSL certificates
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      <ToolButtonGroup className="mb-6">
        <ActionButtonGroup>
          <ToolButton
            variant="custom"
            onClick={decodeCertificate}
            icon={<Shield className="w-4 h-4 mr-2" />}
            tooltip="Decode TLS certificate"
          >
            Decode Certificate
          </ToolButton>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="tls-auto-process"
                    checked={autoProcess}
                    onCheckedChange={setAutoProcess}
                    data-testid="auto-process-switch"
                  />
                  <SwitchLabel
                    htmlFor="tls-auto-process"
                    className="cursor-pointer"
                  >
                    Auto Process
                  </SwitchLabel>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Automatically process the input when it changes</p>
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
            tooltip="Clear certificate input"
            hasModifiedData={hasModifiedData}
            disabled={certificate.trim() === ""}
          />
        </DataButtonGroup>
      </ToolButtonGroup>

      {error ? (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      ) : null}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Certificate Input
            {validityStatus ? (
              <div
                className={`flex items-center ${validityStatus.color} text-sm`}
              >
                {validityStatus.icon}
                <span className="ml-1">{validityStatus.text}</span>
              </div>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TextArea
            key={editorEpoch}
            id="input"
            value={certificate}
            onChange={e => handleCertificateChange(e.target.value)}
            placeholder="Paste your X.509 certificate here (PEM format)..."
            data-testid="certificate-input"
            className="min-h-[200px] font-mono text-sm"
            rows={10}
            autoFocus={true}
            minHeight="200px"
            lang="plaintext"
            fileExtension="txt"
            theme={theme}
            data-default-input="true"
          />
        </CardContent>
      </Card>

      {certificateInfo ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Subject</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {certificateInfo.subject}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Issuer</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {certificateInfo.issuer}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Serial Number</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {certificateInfo.serialNumber}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Version</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {certificateInfo.version}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">
                Validity & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Valid From</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  {formatDate(certificateInfo.validFrom)}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Valid To</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  {formatDate(certificateInfo.validTo)}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Days Until Expiry</Label>
                <Badge
                  variant={
                    certificateInfo.daysUntilExpiry < 30
                      ? "destructive"
                      : "outline"
                  }
                >
                  {certificateInfo.daysUntilExpiry} days
                </Badge>
              </div>
              <div>
                <Label className="font-semibold">Signature Algorithm</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {certificateInfo.signatureAlgorithm}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Public Key Algorithm</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm">
                  {certificateInfo.publicKeyAlgorithm}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-purple-600 dark:text-purple-400">
                Extensions & Fingerprints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-semibold">Extensions</Label>
                <div className="mt-2 space-y-2">
                  {certificateInfo.extensionDetails.map((ext, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded p-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{ext.name}</span>
                        {ext.critical ? (
                          <Badge
                            variant="destructive"
                            className="text-xs px-1.5 py-0"
                          >
                            critical
                          </Badge>
                        ) : null}
                      </div>
                      {ext.lines.length > 0 ? (
                        <div className="mt-1 pl-3 space-y-0.5 border-l-2 border-gray-200 dark:border-gray-700">
                          {ext.lines.map((line, i) => (
                            <div
                              key={i}
                              className="text-xs text-gray-600 dark:text-gray-400 font-mono"
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold">SHA-1 Fingerprint</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm break-all">
                  {certificateInfo.fingerprintSHA1}
                </div>
              </div>
              <div>
                <Label className="font-semibold">SHA-256 Fingerprint</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded font-mono text-sm break-all">
                  {certificateInfo.fingerprintSHA256}
                </div>
              </div>
            </CardContent>
          </Card>

          {certificateInfo.subjectAltNames.length > 0 ? (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-orange-600 dark:text-orange-400">
                  Subject Alternative Names
                  <Badge variant="outline" className="ml-2 text-xs">
                    {certificateInfo.subjectAltNames.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {certificateInfo.subjectAltNames.map((san, index) => (
                      <div
                        key={index}
                        className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded font-mono text-xs"
                      >
                        {san}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      ) : null}
      <ToolExplanations explanations={tool?.explanations} />
    </div>
  );
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className || ""}`}
    >
      {children}
    </div>
  );
}
