import { describe, it, expect } from "vitest";
import { extractDomainParts } from "@/data/domain-tlds";

describe("extractDomainParts", () => {
  it("handles single-part TLD with no subdomain (www.io)", () => {
    const { tld, domain, subdomain } = extractDomainParts("www.io");
    expect(tld).toBe("io");
    expect(domain).toBe("www");
    expect(subdomain).toBe("");
  });

  it("handles single-part TLD with no subdomain (foobar.aws)", () => {
    const { tld, domain, subdomain } = extractDomainParts("foobar.aws");
    expect(tld).toBe("aws");
    expect(domain).toBe("foobar");
    expect(subdomain).toBe("");
  });

  it("handles typical single-part TLD with subdomains (a.b.example.com)", () => {
    const { tld, domain, subdomain } = extractDomainParts("a.b.example.com");
    expect(tld).toBe("com");
    expect(domain).toBe("example");
    expect(subdomain).toBe("a.b");
  });

  it("handles common multi-part TLD (co.uk)", () => {
    const { tld, domain, subdomain } = extractDomainParts(
      "shop.a.example.co.uk"
    );
    expect(tld).toBe("co.uk");
    expect(domain).toBe("example");
    expect(subdomain).toBe("shop.a");
  });

  it("is case-insensitive for hostnames", () => {
    const { tld, domain, subdomain } = extractDomainParts("API.GitHub.Co.Uk");
    expect(tld).toBe("co.uk");
    expect(domain).toBe("github");
    expect(subdomain).toBe("api");
  });

  it("identifies unknown TLD with isTldKnown flag", () => {
    const { tld, domain, subdomain, isTldKnown } = extractDomainParts(
      "example.unknown-tld"
    );
    expect(tld).toBe("unknown-tld");
    expect(domain).toBe("example");
    expect(subdomain).toBe("");
    expect(isTldKnown).toBe(false);
  });

  it("returns input hostname as domain when there is only one label", () => {
    const { tld, domain, subdomain } = extractDomainParts("localhost");
    expect(tld).toBe("");
    expect(domain).toBe("localhost");
    expect(subdomain).toBe("");
  });
});
