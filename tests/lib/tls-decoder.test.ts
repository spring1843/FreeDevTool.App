import "reflect-metadata";
import { describe, it, expect } from "vitest";
import { X509Certificate } from "@peculiar/x509";

// Google *.google.com certificate (issued May 2026, expires Aug 2026)
const GOOGLE_CERT_PEM = `-----BEGIN CERTIFICATE-----
MIIIdTCCB12gAwIBAgIRANUqWWhJo86bEGQWm8fr30swDQYJKoZIhvcNAQELBQAw
OzELMAkGA1UEBhMCVVMxHjAcBgNVBAoTFUdvb2dsZSBUcnVzdCBTZXJ2aWNlczEM
MAoGA1UEAxMDV1IyMB4XDTI2MDUxODE4MzUyMVoXDTI2MDgxMDE4MzUyMFowFzEV
MBMGA1UEAwwMKi5nb29nbGUuY29tMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE
rGwQHDlGZHg4bCpvaBQKF07hm4v6puRsRi7O6JQH78GTcBkGAHRZSLqvlH8K+wDB
OiTKlDh3sWlmEJDUJDdoKKOCBmEwggZdMA4GA1UdDwEB/wQEAwIHgDATBgNVHSUE
DDAKBggrBgEFBQcDATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBQu7DS5PpeDw37l
0PSrVtQlmWd9azAfBgNVHSMEGDAWgBTeGx7teRXUPjckwyG77DQ5bUKyMDBYBggr
BgEFBQcBAQRMMEowIQYIKwYBBQUHMAGGFWh0dHA6Ly9vLnBraS5nb29nL3dyMjAl
BggrBgEFBQcwAoYZaHR0cDovL2kucGtpLmdvb2cvd3IyLmNydDCCBDgGA1UdEQSC
BC8wggQrggwqLmdvb2dsZS5jb22CFiouYXBwZW5naW5lLmdvb2dsZS5jb22CCSou
YmRuLmRldoIVKi5vcmlnaW4tdGVzdC5iZG4uZGV2ghIqLmNsb3VkLmdvb2dsZS5j
b22CGCouY3Jvd2Rzb3VyY2UuZ29vZ2xlLmNvbYIYKi5kYXRhY29tcHV0ZS5nb29n
bGUuY29tggsqLmdvb2dsZS5jYYILKi5nb29nbGUuY2yCDiouZ29vZ2xlLmNvLmlu
gg4qLmdvb2dsZS5jby5qcIIOKi5nb29nbGUuY28udWuCDyouZ29vZ2xlLmNvbS5h
coIPKi5nb29nbGUuY29tLmF1gg8qLmdvb2dsZS5jb20uYnKCDyouZ29vZ2xlLmNv
bS5jb4IPKi5nb29nbGUuY29tLm14gg8qLmdvb2dsZS5jb20udHKCDyouZ29vZ2xl
LmNvbS52boILKi5nb29nbGUuZGWCCyouZ29vZ2xlLmVzggsqLmdvb2dsZS5mcoIL
Ki5nb29nbGUuaHWCCyouZ29vZ2xlLml0ggsqLmdvb2dsZS5ubIILKi5nb29nbGUu
cGyCCyouZ29vZ2xlLnB0ghkqLmdlbWluaS5jbG91ZC5nb29nbGUuY29tgg0qLmdz
dGF0aWMuY29tghQqLm1ldHJpYy5nc3RhdGljLmNvbYIKKi5ndnQxLmNvbYIRKi5n
Y3BjZG4uZ3Z0MS5jb22CCiouZ3Z0Mi5jb22CDiouZ2NwLmd2dDIuY29tghAqLnVy
bC5nb29nbGUuY29tghYqLnlvdXR1YmUtbm9jb29raWUuY29tggsqLnl0aW1nLmNv
bYIKYWkuYW5kcm9pZIILYW5kcm9pZC5jb22CDSouYW5kcm9pZC5jb22CEyouZmxh
c2guYW5kcm9pZC5jb22CBGcuY2+CBiouZy5jb4IGZ29vLmdsggp3d3cuZ29vLmds
ghRnb29nbGUtYW5hbHl0aWNzLmNvbYIWKi5nb29nbGUtYW5hbHl0aWNzLmNvbYIK
Z29vZ2xlLmNvbYISZ29vZ2xlY29tbWVyY2UuY29tghQqLmdvb2dsZWNvbW1lcmNl
LmNvbYIKdXJjaGluLmNvbYIMKi51cmNoaW4uY29tggh5b3V0dS5iZYILeW91dHVi
ZS5jb22CDSoueW91dHViZS5jb22CEW11c2ljLnlvdXR1YmUuY29tghMqLm11c2lj
LnlvdXR1YmUuY29tghR5b3V0dWJlZWR1Y2F0aW9uLmNvbYIWKi55b3V0dWJlZWR1
Y2F0aW9uLmNvbYIPeW91dHViZWtpZHMuY29tghEqLnlvdXR1YmVraWRzLmNvbYIF
eXQuYmWCByoueXQuYmWCGmFuZHJvaWQuY2xpZW50cy5nb29nbGUuY29tghUqLmFp
c3R1ZGlvLmdvb2dsZS5jb20wEwYDVR0gBAwwCjAIBgZngQwBAgEwNgYDVR0fBC8w
LTAroCmgJ4YlaHR0cDovL2MucGtpLmdvb2cvd3IyL0dTeVQxTjRQQnJnLmNybDCC
AQMGCisGAQQB1nkCBAIEgfQEgfEA7wB2AMs49xWJfIShRF9bwd37yW7ymlnNRwpp
BYWwyxTDFFjnAAABnjyV+/0AAAQDAEcwRQIgCgvqLruYdmtREQIJopZQVZEAux/E
dciE9ThPK5WLOIwCIQDJjNYSb4sTv+LnXVHnirnD6kTT5FY8gLI6mKR0WI/m1AB1
ANgJVTuUT3r/yBYZb5RPhauw+Pxeh1UmDxXRLnK7RUsUAAABnjyV+8EAAAQDAEYw
RAIgQvDSSJRos+D8Lk6bpjH2ZlYxD/N6Gv2TqkFZhUlFKeQCIBq55PPw4e5N89gL
gzFC2kp1X+YvFsURPsLrz1LqOAymMA0GCSqGSIb3DQEBCwUAA4IBAQBtZusj1ojC
xhZxk5KpZ92eZuTkDVJgJGtDq8gPRehf50mZiu2gDK1JgXIzKRey3tHmgNrCmTon
5QJAL9yDyrOGs2GoQsfMkenH0+/hTsLB+n03ni9+9jghfPvE9CZbFimniiqGznhn
W5mNOZGy2AnXz79ZfHr4J8AuPh4HVvPc6q/2coyl7Vlxp2XDo6j1eoZARVSske22
WvE34U4Yunq+SE0E0a8aKTV7Q7YHeu8/NAsFmG7V6QSSqAyFyxqeEzuz8ylBPxS/
cejBk+29tGlfqqrR1JEKdcFLF7EuRyvRWAuQMQBHRA9boa3/lz1f+jEkkUbfqEMr
DAnxLthdKKJk
-----END CERTIFICATE-----`;

// Parse once for all tests
const cert = new X509Certificate(GOOGLE_CERT_PEM);

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
