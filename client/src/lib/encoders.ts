import * as yaml from "js-yaml";
import { encode as cborXEncode, decode as cborXDecode } from "cbor-x";

export function encodeBase64(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch (error: unknown) {
    throw new Error(
      `Failed to encode Base64: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export function decodeBase64(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (error: unknown) {
    throw new Error(
      `Failed to decode Base64: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export function encodeURL(input: string): string {
  return encodeURIComponent(input);
}

export function decodeURL(input: string): string {
  try {
    return decodeURIComponent(input);
  } catch (error: unknown) {
    throw new Error(
      `Failed to decode URL: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export function jsonToYaml(input: string): { result: string; error?: string } {
  try {
    const parsed = JSON.parse(input);
    const yamlStr = yaml.dump(parsed, { indent: 2 });
    return { result: yamlStr };
  } catch (error) {
    return {
      result: input,
      error: `JSON to YAML conversion error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export function yamlToJson(input: string): { result: string; error?: string } {
  try {
    const parsed = yaml.load(input);
    const jsonStr = JSON.stringify(parsed, null, 2);
    return { result: jsonStr };
  } catch (error) {
    return {
      result: input,
      error: `YAML to JSON conversion error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

interface JWTHeader {
  alg?: string;
  typ?: string;
  [key: string]: unknown;
}

interface JWTPayload {
  sub?: string;
  iss?: string;
  aud?: string | string[];
  exp?: number;
  iat?: number;
  nbf?: number;
  [key: string]: unknown;
}

export function decodeJWT(token: string): {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
  isValid: boolean;
  error?: string;
} {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return {
        header: {},
        payload: {},
        signature: "",
        isValid: false,
        error: "Invalid JWT format",
      };
    }

    const [headerB64, payloadB64, signature] = parts;

    // Decode header and payload
    const header = JSON.parse(
      decodeBase64(headerB64.replace(/-/g, "+").replace(/_/g, "/"))
    );
    const payload = JSON.parse(
      decodeBase64(payloadB64.replace(/-/g, "+").replace(/_/g, "/"))
    );

    return {
      header,
      payload,
      signature,
      isValid: true,
    };
  } catch (error) {
    return {
      header: {},
      payload: {},
      signature: "",
      isValid: false,
      error: `JWT decode error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

export function decodeTLSCertificate(input: string): {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  serialNumber: string;
  algorithm: string;
  fingerprint: string;
  isValid: boolean;
  error?: string;
} {
  // This is a simplified mock implementation
  // In a real application, you would use a proper certificate parsing library
  try {
    if (
      !input.includes("BEGIN CERTIFICATE") ||
      !input.includes("END CERTIFICATE")
    ) {
      return {
        subject: "",
        issuer: "",
        validFrom: "",
        validTo: "",
        serialNumber: "",
        algorithm: "",
        fingerprint: "",
        isValid: false,
        error:
          "Invalid certificate format. Please provide a PEM encoded certificate.",
      };
    }

    // Mock certificate info for demonstration
    return {
      subject: "CN=example.com, O=Example Corp, C=US",
      issuer: "CN=Example CA, O=Example CA Corp, C=US",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      serialNumber: "1234567890ABCDEF",
      algorithm: "SHA256withRSA",
      fingerprint:
        "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD",
      isValid: true,
    };
  } catch (error) {
    return {
      subject: "",
      issuer: "",
      validFrom: "",
      validTo: "",
      serialNumber: "",
      algorithm: "",
      fingerprint: "",
      isValid: false,
      error: `Certificate parsing error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

// ── CBOR ──────────────────────────────────────────────────────────────────────

export function encodeToCBOR(jsonString: string): Uint8Array {
  try {
    const value = JSON.parse(jsonString);
    return new Uint8Array(cborXEncode(value));
  } catch (error: unknown) {
    throw new Error(
      `Failed to encode CBOR: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export function decodeCBORBytes(bytes: Uint8Array): string {
  try {
    const value = cborXDecode(bytes);
    return JSON.stringify(value, null, 2);
  } catch (error: unknown) {
    throw new Error(
      `Failed to decode CBOR: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join(" ");
}

export function hexToUint8Array(hex: string): Uint8Array {
  const clean = hex.replace(/\s+/g, "");
  if (clean.length % 2 !== 0) {
    throw new Error("Invalid hex string: odd number of characters");
  }
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const byte = parseInt(clean.substring(i * 2, i * 2 + 2), 16);
    if (isNaN(byte)) {
      throw new Error(`Invalid hex character at position ${i * 2}`);
    }
    bytes[i] = byte;
  }
  return bytes;
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
  const binary = Array.from(bytes)
    .map(b => String.fromCharCode(b))
    .join("");
  return btoa(binary);
}

export function base64ToUint8Array(base64: string): Uint8Array {
  try {
    const binary = atob(base64.trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch (error: unknown) {
    throw new Error(
      `Invalid Base64 string: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
