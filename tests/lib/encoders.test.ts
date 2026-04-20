import { describe, it, expect } from "vitest";
import {
  encodeBase64,
  decodeBase64,
  encodeURL,
  decodeURL,
  jsonToYaml,
  yamlToJson,
  decodeJWT,
  decodeTLSCertificate,
  encodeToCBOR,
  decodeCBORBytes,
  uint8ArrayToHex,
  hexToUint8Array,
  uint8ArrayToBase64,
  base64ToUint8Array,
} from "../../client/src/lib/encoders";

describe("Base64 Encoding/Decoding", () => {
  it("should encode simple text to base64", () => {
    const input = "Hello World";
    const result = encodeBase64(input);
    expect(result).toBe("SGVsbG8gV29ybGQ=");
  });

  it("should decode valid base64 to text", () => {
    const input = "SGVsbG8gV29ybGQ=";
    const result = decodeBase64(input);
    expect(result).toBe("Hello World");
  });

  it("should handle UTF-8 characters in base64 encoding", () => {
    const input = "Hello 世界 🌍";
    const encoded = encodeBase64(input);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(input);
  });

  it("should throw error for Failed to decode Base64", () => {
    const invalidBase64 = "Invalid@Base64!";
    expect(() => decodeBase64(invalidBase64)).toThrow(
      "Failed to decode Base64"
    );
  });

  it("should handle empty string encoding/decoding", () => {
    const empty = "";
    const encoded = encodeBase64(empty);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(empty);
  });
});

describe("URL Encoding/Decoding", () => {
  it("should encode special characters in URL", () => {
    const input = "hello world & more!";
    const result = encodeURL(input);
    expect(result).toBe("hello%20world%20%26%20more!");
  });

  it("should decode URL encoded string", () => {
    const input = "hello%20world%20%26%20more!";
    const result = decodeURL(input);
    expect(result).toBe("hello world & more!");
  });

  it("should handle already encoded URLs", () => {
    const input = "test%20data";
    const decoded = decodeURL(input);
    expect(decoded).toBe("test data");
  });

  it("should throw error for Failed to decode URL", () => {
    const invalidURL = "test%GG";
    expect(() => decodeURL(invalidURL)).toThrow("Failed to decode URL");
  });

  it("should handle empty string", () => {
    expect(encodeURL("")).toBe("");
    expect(decodeURL("")).toBe("");
  });
});

describe("JSON to YAML Conversion", () => {
  it("should convert simple JSON to YAML", () => {
    const json = '{"name": "John", "age": 30}';
    const result = jsonToYaml(json);
    expect(result.error).toBeUndefined();
    expect(result.result).toContain("name: John");
    expect(result.result).toContain("age: 30");
  });

  it("should convert nested JSON to YAML", () => {
    const json =
      '{"user": {"name": "John", "details": {"age": 30, "city": "NYC"}}}';
    const result = jsonToYaml(json);
    expect(result.error).toBeUndefined();
    expect(result.result).toContain("user:");
    expect(result.result).toContain("name: John");
    expect(result.result).toContain("details:");
  });

  it("should handle invalid JSON gracefully", () => {
    const invalidJson = '{"name": "John", "age":}';
    const result = jsonToYaml(invalidJson);
    expect(result.error).toBeDefined();
    expect(result.error).toContain("JSON to YAML conversion error");
    expect(result.result).toBe(invalidJson);
  });

  it("should handle arrays in JSON", () => {
    const json = '{"items": ["apple", "banana", "cherry"]}';
    const result = jsonToYaml(json);
    expect(result.error).toBeUndefined();
    expect(result.result).toContain("items:");
    expect(result.result).toContain("- apple");
  });
});

describe("YAML to JSON Conversion", () => {
  it("should convert simple YAML to JSON", () => {
    const yaml = "name: John\nage: 30";
    const result = yamlToJson(yaml);
    expect(result.error).toBeUndefined();
    const parsed = JSON.parse(result.result);
    expect(parsed.name).toBe("John");
    expect(parsed.age).toBe(30);
  });

  it("should handle invalid YAML gracefully", () => {
    const invalidYaml = "name: John\n  age: 30\n invalid: [{";
    const result = yamlToJson(invalidYaml);
    expect(result.error).toBeDefined();
    expect(result.error).toContain("YAML to JSON conversion error");
    expect(result.result).toBe(invalidYaml);
  });

  it("should handle nested YAML structures", () => {
    const yaml = "user:\n  name: John\n  details:\n    age: 30\n    city: NYC";
    const result = yamlToJson(yaml);
    expect(result.error).toBeUndefined();
    const parsed = JSON.parse(result.result);
    expect(parsed.user.name).toBe("John");
    expect(parsed.user.details.age).toBe(30);
  });
});

describe("JWT Decoding", () => {
  it("should decode valid JWT token", () => {
    // Sample JWT token for testing (header.payload.signature)
    const validJWT =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const result = decodeJWT(validJWT);

    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.header.alg).toBe("HS256");
    expect(result.header.typ).toBe("JWT");
    expect(result.payload.sub).toBe("1234567890");
    expect(result.payload.name).toBe("John Doe");
    expect(result.signature).toBe(
      "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );
  });

  it("should handle invalid JWT format", () => {
    const invalidJWT = "invalid.jwt";
    const result = decodeJWT(invalidJWT);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Invalid JWT format");
    expect(result.header).toEqual({});
    expect(result.payload).toEqual({});
    expect(result.signature).toBe("");
  });

  it("should handle malformed JWT parts", () => {
    const malformedJWT = "invalid.base64.part";
    const result = decodeJWT(malformedJWT);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain("JWT decode error");
  });

  it("should handle empty JWT", () => {
    const result = decodeJWT("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Invalid JWT format");
  });
});

describe("TLS Certificate Decoding", () => {
  it("should detect invalid certificate format", () => {
    const invalidCert = "This is not a certificate";
    const result = decodeTLSCertificate(invalidCert);

    expect(result.isValid).toBe(false);
    expect(result.error).toBe(
      "Invalid certificate format. Please provide a PEM encoded certificate."
    );
    expect(result.subject).toBe("");
    expect(result.issuer).toBe("");
  });

  it("should return mock data for valid certificate format", () => {
    const validCertFormat = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAOC1j2CAh/9QMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
-----END CERTIFICATE-----`;

    const result = decodeTLSCertificate(validCertFormat);

    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.subject).toBe("CN=example.com, O=Example Corp, C=US");
    expect(result.issuer).toBe("CN=Example CA, O=Example CA Corp, C=US");
    expect(result.serialNumber).toBe("1234567890ABCDEF");
    expect(result.algorithm).toBe("SHA256withRSA");
  });

  it("should handle empty certificate input", () => {
    const result = decodeTLSCertificate("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe(
      "Invalid certificate format. Please provide a PEM encoded certificate."
    );
  });
});

describe("CBOR Encoding/Decoding", () => {
  it("should encode JSON and round-trip back to the same value", () => {
    const json = '{"name":"CBOR","active":true,"count":42}';
    const bytes = encodeToCBOR(json);
    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(bytes.length).toBeGreaterThan(0);
    const decoded = decodeCBORBytes(bytes);
    const parsedDecoded = JSON.parse(decoded);
    const parsedOriginal = JSON.parse(json);
    expect(parsedDecoded).toEqual(parsedOriginal);
  });

  it("should produce output smaller than or similar in size to JSON for typical objects", () => {
    const json =
      '{"name":"Alice","role":"admin","active":true,"score":9999,"tags":["a","b","c"]}';
    const bytes = encodeToCBOR(json);
    expect(bytes.length).toBeLessThan(json.length);
  });

  it("should encode and decode arrays", () => {
    const json = '[1,2,3,"hello",true,null]';
    const bytes = encodeToCBOR(json);
    const decoded = decodeCBORBytes(bytes);
    expect(JSON.parse(decoded)).toEqual(JSON.parse(json));
  });

  it("should throw on invalid JSON input to encode", () => {
    expect(() => encodeToCBOR("{not valid json}")).toThrow(
      "Failed to encode CBOR"
    );
  });

  it("should throw on garbage bytes to decode", () => {
    const garbage = new Uint8Array([0xff, 0xff, 0xff]);
    expect(() => decodeCBORBytes(garbage)).toThrow("Failed to decode CBOR");
  });
});

describe("uint8ArrayToHex / hexToUint8Array", () => {
  it("should convert bytes to space-separated hex", () => {
    const bytes = new Uint8Array([0xa1, 0x62, 0x6f, 0x6b, 0xf5]);
    expect(uint8ArrayToHex(bytes)).toBe("a1 62 6f 6b f5");
  });

  it("should round-trip hex back to original bytes", () => {
    const bytes = new Uint8Array([0x00, 0x7f, 0x80, 0xff]);
    const hex = uint8ArrayToHex(bytes);
    const back = hexToUint8Array(hex);
    expect(Array.from(back)).toEqual([0x00, 0x7f, 0x80, 0xff]);
  });

  it("should tolerate extra whitespace in hex input", () => {
    const result = hexToUint8Array("  a1  62  ");
    expect(Array.from(result)).toEqual([0xa1, 0x62]);
  });

  it("should throw on odd-length hex string", () => {
    expect(() => hexToUint8Array("abc")).toThrow(
      "Invalid hex string: odd number of characters"
    );
  });

  it("should throw on invalid hex characters", () => {
    expect(() => hexToUint8Array("zz")).toThrow("Invalid hex character");
  });
});

describe("uint8ArrayToBase64 / base64ToUint8Array", () => {
  it("should round-trip bytes through base64", () => {
    const bytes = new Uint8Array([0xa1, 0x62, 0x6f, 0x6b, 0xf5]);
    const b64 = uint8ArrayToBase64(bytes);
    const back = base64ToUint8Array(b64);
    expect(Array.from(back)).toEqual(Array.from(bytes));
  });

  it("should throw on invalid base64 input", () => {
    expect(() => base64ToUint8Array("!!!not-base64!!!")).toThrow(
      "Invalid Base64 string"
    );
  });
});
