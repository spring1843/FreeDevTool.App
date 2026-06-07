import "reflect-metadata";
import { describe, it, expect } from "vitest";
import { X509Certificate } from "@peculiar/x509";
import { GOOGLE_TLS_CERT_FOR_TESTING } from "../../client/src/data/defaults";

// Parse the Google cert once for all tests
const cert = new X509Certificate(GOOGLE_TLS_CERT_FOR_TESTING);

describe("TLS Decoder — Google *.google.com certificate", () => {
  it("should parse subject correctly", () => {
    expect(cert.subject).toBe("CN=*.google.com");
  });

  it("should parse issuer correctly", () => {
    expect(cert.issuer).toBe("C=US, O=Google Trust Services, CN=WR2");
  });

  it("should parse notBefore correctly", () => {
    expect(cert.notBefore.toISOString()).toBe("2026-05-18T18:35:21.000Z");
  });

  it("should parse notAfter correctly", () => {
    expect(cert.notAfter.toISOString()).toBe("2026-08-10T18:35:20.000Z");
  });

  it("should parse serial number correctly", () => {
    expect(cert.serialNumber).toBe("d52a596849a3ce9b1064169bc7ebdf4b");
  });

  it("should have RSA-SHA256 signature algorithm", () => {
    expect(cert.signatureAlgorithm.name).toBe("RSASSA-PKCS1-v1_5");
    expect(
      (cert.signatureAlgorithm as { hash?: { name?: string } }).hash?.name
    ).toBe("SHA-256");
  });

  it("should have EC P-256 public key", async () => {
    const key = await cert.publicKey.export();
    expect(key.algorithm.name).toBe("ECDSA");
    expect((key.algorithm as EcKeyAlgorithm).namedCurve).toBe("P-256");
  });

  it("should have 10 extensions", () => {
    expect(cert.extensions.length).toBe(10);
  });

  it("should have Subject Alternative Name extension with 65 names", () => {
    const san = cert.getExtension("2.5.29.17") as unknown as {
      names: { items: unknown[] };
    } | null;
    expect(san).not.toBeNull();
    expect(san!.names.items.length).toBe(65);
  });

  it("should have Key Usage marked as critical", () => {
    const ku = cert.getExtension("2.5.29.15");
    expect(ku).not.toBeNull();
    expect(ku!.critical).toBe(true);
  });

  it("should compute SHA-1 fingerprint correctly", async () => {
    const buf = await cert.getThumbprint("SHA-1");
    const hex = Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join(":")
      .toUpperCase();
    expect(hex).toBe(
      "56:F0:CA:31:F8:63:67:50:5F:27:3F:AE:B9:B6:AE:1E:26:77:21:4A"
    );
  });

  it("should compute SHA-256 fingerprint correctly", async () => {
    const buf = await cert.getThumbprint("SHA-256");
    const hex = Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join(":")
      .toUpperCase();
    expect(hex).toBe(
      "33:AC:FF:FD:20:5B:CA:23:B2:51:59:85:F8:5B:A6:A4:77:F1:30:2F:85:34:B3:10:29:F2:76:A5:E0:16:DF:E8"
    );
  });
});
