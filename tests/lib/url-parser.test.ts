import { describe, it, expect } from "vitest";
import { parseURL, KNOWN_PROTOCOLS_REGEX } from "@/lib/url-parser";

describe("KNOWN_PROTOCOLS_REGEX", () => {
  it("matches HTTP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("http://example.com")).toBe(true);
  });

  it("matches HTTPS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("https://example.com")).toBe(true);
  });

  it("matches FTP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("ftp://ftp.example.com")).toBe(true);
  });

  it("matches FILE protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("file:///path/to/file")).toBe(true);
  });

  it("matches MAILTO protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("mailto:user@example.com")).toBe(true);
  });

  it("matches TEL protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("tel:+1-555-123-4567")).toBe(true);
  });

  it("matches IRC protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("irc://irc.freenode.net")).toBe(true);
  });

  it("matches IRCS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("ircs://irc.freenode.net")).toBe(true);
  });

  it("matches SSH protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("ssh://user@server.com")).toBe(true);
  });

  it("matches SFTP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("sftp://user@server.com")).toBe(true);
  });

  it("matches LDAP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("ldap://ldap.example.com")).toBe(true);
  });

  it("matches LDAPS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("ldaps://ldap.example.com")).toBe(true);
  });

  it("matches WS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("ws://socket.example.com")).toBe(true);
  });

  it("matches WSS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("wss://socket.example.com")).toBe(true);
  });

  it("matches GIT protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("git://github.com/repo")).toBe(true);
  });

  it("matches SVN protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("svn://svn.example.com")).toBe(true);
  });

  it("matches MAGNET protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("magnet:?xt=urn:sha1:abc")).toBe(true);
  });

  it("matches DATA protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("data:text/html,Hello")).toBe(true);
  });

  it("matches NEWS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("news://news.example.com")).toBe(true);
  });

  it("matches NNTP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("nntp://news.example.com")).toBe(true);
  });

  it("matches RTSP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("rtsp://stream.example.com")).toBe(true);
  });

  it("matches SIP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("sip:user@sip.example.com")).toBe(true);
  });

  it("matches SIPS protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("sips:user@sip.example.com")).toBe(true);
  });

  it("matches XMPP protocol", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("xmpp:user@jabber.org")).toBe(true);
  });

  it("is case insensitive", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("HTTPS://example.com")).toBe(true);
    expect(KNOWN_PROTOCOLS_REGEX.test("FTP://example.com")).toBe(true);
    expect(KNOWN_PROTOCOLS_REGEX.test("Mailto:user@example.com")).toBe(true);
  });

  it("does not match unknown protocols", () => {
    expect(KNOWN_PROTOCOLS_REGEX.test("example.com")).toBe(false);
    expect(KNOWN_PROTOCOLS_REGEX.test("www.example.com")).toBe(false);
    expect(KNOWN_PROTOCOLS_REGEX.test("custom://example.com")).toBe(false);
  });
});

describe("parseURL", () => {
  describe("empty input handling", () => {
    it("returns empty components for empty string", () => {
      const result = parseURL("");
      expect(result.success).toBe(true);
      expect(result.components).toEqual({});
    });

    it("returns empty components for whitespace only", () => {
      const result = parseURL("   ");
      expect(result.success).toBe(true);
      expect(result.components).toEqual({});
    });
  });

  describe("protocol handling", () => {
    it("adds https:// when protocol is missing", () => {
      const result = parseURL("example.com");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("https");
    });

    it("preserves http protocol", () => {
      const result = parseURL("http://example.com");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("http");
    });

    it("preserves https protocol", () => {
      const result = parseURL("https://example.com");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("https");
    });

    it("preserves ftp protocol", () => {
      const result = parseURL("ftp://ftp.example.com");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ftp");
    });

    it("preserves irc protocol", () => {
      const result = parseURL("irc://irc.freenode.net/channel");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("irc");
    });

    it("preserves wss protocol", () => {
      const result = parseURL("wss://socket.example.com/ws");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("wss");
    });

    it("preserves ssh protocol", () => {
      const result = parseURL("ssh://user@server.example.com");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ssh");
    });
  });

  describe("hostname parsing", () => {
    it("extracts simple hostname", () => {
      const result = parseURL("https://example.com");
      expect(result.components.hostname).toBe("example.com");
    });

    it("extracts hostname with subdomain", () => {
      const result = parseURL("https://www.example.com");
      expect(result.components.hostname).toBe("www.example.com");
    });

    it("extracts hostname with multiple subdomains", () => {
      const result = parseURL("https://api.v1.example.com");
      expect(result.components.hostname).toBe("api.v1.example.com");
    });

    it("handles IP address as hostname", () => {
      const result = parseURL("http://192.168.1.1");
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe("192.168.1.1");
    });

    it("handles localhost", () => {
      const result = parseURL("http://localhost");
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe("localhost");
    });

    it("handles localhost with port", () => {
      const result = parseURL("http://localhost:3000");
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe("localhost");
      expect(result.components.port).toBe("3000");
    });
  });

  describe("port parsing", () => {
    it("extracts custom port", () => {
      const result = parseURL("https://example.com:8080");
      expect(result.components.port).toBe("8080");
    });

    it("does not include default https port (443)", () => {
      const result = parseURL("https://example.com:443");
      expect(result.components.port).toBeUndefined();
    });

    it("does not include default http port (80)", () => {
      const result = parseURL("http://example.com:80");
      expect(result.components.port).toBeUndefined();
    });

    it("includes non-default port", () => {
      const result = parseURL("http://example.com:3000");
      expect(result.components.port).toBe("3000");
    });
  });

  describe("pathname parsing", () => {
    it("extracts simple pathname", () => {
      const result = parseURL("https://example.com/path");
      expect(result.components.pathname).toBe("/path");
    });

    it("extracts nested pathname", () => {
      const result = parseURL("https://example.com/api/v1/users");
      expect(result.components.pathname).toBe("/api/v1/users");
    });

    it("handles root pathname", () => {
      const result = parseURL("https://example.com/");
      expect(result.components.pathname).toBe("/");
    });

    it("handles pathname without trailing slash", () => {
      const result = parseURL("https://example.com");
      expect(result.components.pathname).toBe("/");
    });

    it("extracts pathname with file extension", () => {
      const result = parseURL("https://example.com/docs/readme.md");
      expect(result.components.pathname).toBe("/docs/readme.md");
    });
  });

  describe("query parameter parsing", () => {
    it("extracts single query parameter", () => {
      const result = parseURL("https://example.com?foo=bar");
      expect(result.components.queryParams).toEqual({ foo: "bar" });
    });

    it("extracts multiple query parameters", () => {
      const result = parseURL("https://example.com?foo=bar&baz=qux");
      expect(result.components.queryParams).toEqual({ foo: "bar", baz: "qux" });
    });

    it("handles URL-encoded query parameters", () => {
      const result = parseURL("https://example.com?name=John%20Doe");
      expect(result.components.queryParams).toEqual({ name: "John Doe" });
    });

    it("handles empty query parameter values", () => {
      const result = parseURL("https://example.com?empty=");
      expect(result.components.queryParams).toEqual({ empty: "" });
    });

    it("does not include queryParams when none present", () => {
      const result = parseURL("https://example.com/path");
      expect(result.components.queryParams).toBeUndefined();
    });

    it("extracts search string", () => {
      const result = parseURL("https://example.com?foo=bar");
      expect(result.components.search).toBe("?foo=bar");
    });
  });

  describe("hash/fragment parsing", () => {
    it("extracts hash fragment", () => {
      const result = parseURL("https://example.com#section");
      expect(result.components.hash).toBe("#section");
    });

    it("extracts hash with query parameters", () => {
      const result = parseURL("https://example.com?foo=bar#section");
      expect(result.components.hash).toBe("#section");
    });

    it("does not include hash when none present", () => {
      const result = parseURL("https://example.com/path");
      expect(result.components.hash).toBeUndefined();
    });
  });

  describe("TLD extraction", () => {
    it("extracts common single-part TLD (.com)", () => {
      const result = parseURL("https://example.com");
      expect(result.components.tld).toBe("com");
      expect(result.components.isTldKnown).toBe(true);
    });

    it("extracts common single-part TLD (.org)", () => {
      const result = parseURL("https://example.org");
      expect(result.components.tld).toBe("org");
      expect(result.components.isTldKnown).toBe(true);
    });

    it("extracts common single-part TLD (.io)", () => {
      const result = parseURL("https://example.io");
      expect(result.components.tld).toBe("io");
      expect(result.components.isTldKnown).toBe(true);
    });

    it("extracts multi-part TLD (.co.uk)", () => {
      const result = parseURL("https://example.co.uk");
      expect(result.components.tld).toBe("co.uk");
      expect(result.components.isTldKnown).toBe(true);
    });

    it("identifies unknown TLD", () => {
      const result = parseURL("https://example.invalidtld123");
      expect(result.components.tld).toBe("invalidtld123");
      expect(result.components.isTldKnown).toBe(false);
    });
  });

  describe("domain extraction", () => {
    it("extracts domain from simple URL", () => {
      const result = parseURL("https://example.com");
      expect(result.components.domain).toBe("example");
    });

    it("extracts domain from URL with subdomain", () => {
      const result = parseURL("https://www.example.com");
      expect(result.components.domain).toBe("example");
    });

    it("extracts domain from multi-part TLD URL", () => {
      const result = parseURL("https://example.co.uk");
      expect(result.components.domain).toBe("example");
    });
  });

  describe("subdomain extraction", () => {
    it("extracts single subdomain", () => {
      const result = parseURL("https://www.example.com");
      expect(result.components.subdomain).toBe("www");
    });

    it("extracts multiple subdomains", () => {
      const result = parseURL("https://api.v1.example.com");
      expect(result.components.subdomain).toBe("api.v1");
    });

    it("handles no subdomain", () => {
      const result = parseURL("https://example.com");
      expect(result.components.subdomain).toBeUndefined();
    });
  });

  describe("origin parsing", () => {
    it("extracts origin for http URL", () => {
      const result = parseURL("http://example.com/path");
      expect(result.components.origin).toBe("http://example.com");
    });

    it("extracts origin with port", () => {
      const result = parseURL("https://example.com:8080/path");
      expect(result.components.origin).toBe("https://example.com:8080");
    });
  });

  describe("FTP URLs", () => {
    it("parses FTP URL correctly", () => {
      const result = parseURL("ftp://ftp.example.com/pub/files");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ftp");
      expect(result.components.hostname).toBe("ftp.example.com");
      expect(result.components.pathname).toBe("/pub/files");
      expect(result.components.subdomain).toBe("ftp");
      expect(result.components.domain).toBe("example");
      expect(result.components.tld).toBe("com");
    });

    it("parses FTP URL with username", () => {
      const result = parseURL("ftp://anonymous@ftp.example.com/pub");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ftp");
    });
  });

  describe("WebSocket URLs", () => {
    it("parses WS URL correctly", () => {
      const result = parseURL("ws://socket.example.com/ws");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ws");
      expect(result.components.hostname).toBe("socket.example.com");
      expect(result.components.pathname).toBe("/ws");
    });

    it("parses WSS URL correctly", () => {
      const result = parseURL("wss://socket.example.com:443/ws");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("wss");
      expect(result.components.hostname).toBe("socket.example.com");
    });
  });

  describe("SSH URLs", () => {
    it("parses SSH URL correctly", () => {
      const result = parseURL("ssh://user@server.example.com:22/path");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ssh");
      expect(result.components.hostname).toBe("server.example.com");
      expect(result.components.port).toBe("22");
    });

    it("parses SFTP URL correctly", () => {
      const result = parseURL("sftp://user@server.example.com/path/to/file");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("sftp");
    });
  });

  describe("IRC URLs", () => {
    it("parses IRC URL correctly", () => {
      const result = parseURL("irc://irc.freenode.net/channel");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("irc");
      expect(result.components.hostname).toBe("irc.freenode.net");
    });

    it("parses IRCS URL correctly", () => {
      const result = parseURL("ircs://irc.freenode.net:6697/channel");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ircs");
      expect(result.components.port).toBe("6697");
    });
  });

  describe("LDAP URLs", () => {
    it("parses LDAP URL correctly", () => {
      const result = parseURL("ldap://ldap.example.com/dc=example,dc=com");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ldap");
      expect(result.components.hostname).toBe("ldap.example.com");
    });

    it("parses LDAPS URL correctly", () => {
      const result = parseURL("ldaps://ldap.example.com:636");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("ldaps");
      expect(result.components.port).toBe("636");
    });
  });

  describe("GIT URLs", () => {
    it("parses GIT URL correctly", () => {
      const result = parseURL("git://github.com/user/repo.git");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("git");
      expect(result.components.hostname).toBe("github.com");
      expect(result.components.pathname).toBe("/user/repo.git");
    });
  });

  describe("SVN URLs", () => {
    it("parses SVN URL correctly", () => {
      const result = parseURL("svn://svn.example.com/repo/trunk");
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("svn");
      expect(result.components.hostname).toBe("svn.example.com");
    });
  });

  describe("error handling", () => {
    it("returns error for invalid URL", () => {
      const result = parseURL("://invalid");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid URL format");
    });

    it("returns error for malformed URL", () => {
      const result = parseURL("http://");
      expect(result.success).toBe(false);
      expect(result.error).toBe("Invalid URL format");
    });
  });

  describe("edge cases", () => {
    it("handles URL with all components", () => {
      const result = parseURL(
        "https://user:pass@api.v1.example.com:8080/path/to/resource?foo=bar&baz=qux#section"
      );
      expect(result.success).toBe(true);
      expect(result.components.protocol).toBe("https");
      expect(result.components.hostname).toBe("api.v1.example.com");
      expect(result.components.port).toBe("8080");
      expect(result.components.pathname).toBe("/path/to/resource");
      expect(result.components.queryParams).toEqual({ foo: "bar", baz: "qux" });
      expect(result.components.hash).toBe("#section");
      expect(result.components.subdomain).toBe("api.v1");
      expect(result.components.domain).toBe("example");
      expect(result.components.tld).toBe("com");
    });

    it("handles international domain names", () => {
      const result = parseURL("https://例え.jp");
      expect(result.success).toBe(true);
    });

    it("handles punycode domains", () => {
      const result = parseURL("https://xn--n3h.com");
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe("xn--n3h.com");
    });

    it("trims whitespace from input", () => {
      const result = parseURL("  https://example.com  ");
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe("example.com");
    });

    it("handles very long URLs", () => {
      const longPath = "/a".repeat(500);
      const result = parseURL(`https://example.com${longPath}`);
      expect(result.success).toBe(true);
      expect(result.components.pathname).toBe(longPath);
    });

    it("handles AWS S3 style URLs", () => {
      const result = parseURL(
        "https://my-bucket.s3.us-west-2.amazonaws.com/my-file.txt"
      );
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe(
        "my-bucket.s3.us-west-2.amazonaws.com"
      );
    });

    it("handles GitHub Pages URLs", () => {
      const result = parseURL("https://username.github.io/repo");
      expect(result.success).toBe(true);
      expect(result.components.hostname).toBe("username.github.io");
    });
  });
});
