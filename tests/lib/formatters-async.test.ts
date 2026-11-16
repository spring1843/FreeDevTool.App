import { describe, it, expect } from "vitest";
import {
  formatJSON,
  formatCSS,
  formatYAML,
  formatMarkdown,
  formatLESS,
  formatTypeScript,
  formatSCSS,
  formatJSONC,
  formatGraphQL,
  formatSQL,
} from "../../client/src/lib/formatters";

describe("Async Formatter Functions", () => {
  describe("JSON Formatting", () => {
    it("should format valid JSON with Prettier", async () => {
      const input = '{"name":"John","age":30,"city":"NYC"}';
      const result = await formatJSON(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain('"name"');
      expect(result.formatted).toContain('"age"');
      expect(result.formatted).toContain('"city"');
    });

    it("should handle invalid JSON", async () => {
      const input = '{"name":"John","age":}';
      const result = await formatJSON(input);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("Invalid JSON");
    });
  });

  describe("CSS Formatting", () => {
    it("should format CSS with Prettier", async () => {
      const input = ".class{color:red;background:blue;}";
      const result = await formatCSS(input, false);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain(".class");
      expect(result.formatted).toContain("color");
    });

    it("should minify CSS", async () => {
      const input = ".class {\n  color: red;\n  background: blue;\n}";
      const result = await formatCSS(input, true);
      expect(result.error).toBeUndefined();
      expect(result.formatted.length).toBeLessThan(input.length);
    });
  });

  describe("YAML Formatting", () => {
    it("should format YAML with Prettier", async () => {
      const input = "name: John\nage: 30";
      const result = await formatYAML(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("name:");
      expect(result.formatted).toContain("age:");
    });
  });

  describe("Markdown Formatting", () => {
    it("should format Markdown with Prettier", async () => {
      const input = "# Header\nSome text";
      const result = await formatMarkdown(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("# Header");
    });
  });

  describe("LESS Formatting", () => {
    it("should format LESS with Prettier", async () => {
      const input = ".class{color:@primary-color;}";
      const result = await formatLESS(input, false);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain(".class");
    });

    it("should minify LESS", async () => {
      const input = ".class {\n  color: @primary-color;\n}";
      const result = await formatLESS(input, true);
      expect(result.error).toBeUndefined();
      expect(result.formatted.length).toBeLessThan(input.length);
    });
  });

  describe("TypeScript Formatting", () => {
    it("should format TypeScript with Prettier", async () => {
      const input = "interface User{name:string;age:number;}";
      const result = await formatTypeScript(input, false);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("interface User");
      expect(result.formatted).toContain("name:");
      expect(result.formatted).toContain("age:");
    });

    it("should minify TypeScript", async () => {
      const input = "interface User {\n  name: string;\n  age: number;\n}";
      const result = await formatTypeScript(input, true);
      expect(result.error).toBeUndefined();
      expect(result.formatted.length).toBeLessThan(input.length);
    });
  });

  describe("SCSS Formatting", () => {
    it("should format SCSS with Prettier", async () => {
      const input = ".class{$color:blue;&:hover{color:$color;}}";
      const result = await formatSCSS(input, false);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain(".class");
    });

    it("should minify SCSS", async () => {
      const input =
        ".class {\n  $color: blue;\n  &:hover {\n    color: $color;\n  }\n}";
      const result = await formatSCSS(input, true);
      expect(result.error).toBeUndefined();
      expect(result.formatted.length).toBeLessThan(input.length);
    });
  });

  describe("JSONC Formatting", () => {
    it("should format JSONC with preserved comments", async () => {
      const input = '{"name":"test",// Comment\n"age":30}';
      const result = await formatJSONC(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("// Comment");
      expect(result.formatted).toContain('"name"');
      expect(result.formatted).toContain('"age"');
    });

    it("should handle multi-line comments", async () => {
      const input = '{"test":/* Multi\nline */true}';
      const result = await formatJSONC(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("/* Multi");
      expect(result.formatted).toContain('"test"');
    });
  });

  describe("GraphQL Formatting", () => {
    it("should format GraphQL with Prettier", async () => {
      const input = "type User{name:String!age:Int}";
      const result = await formatGraphQL(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("type User");
      expect(result.formatted).toContain("name:");
      expect(result.formatted).toContain("age:");
    });

    it("should handle GraphQL queries", async () => {
      const input = "query GetUser{user(id:1){name age}}";
      const result = await formatGraphQL(input);
      expect(result.error).toBeUndefined();
      expect(result.formatted).toContain("query GetUser");
      expect(result.formatted).toContain("user(");
    });
  });

  describe("SQL Formatting", () => {
    it("should format SQL with default options", async () => {
      const result = await formatSQL("select id, name from users where id = 1");
      expect(result.error).toBeUndefined();
      expect(result.formatted).toBe(
        "SELECT\n  id,\n  name\nFROM\n  users\nWHERE\n  id = 1"
      );
    });

    it("should respect keyword case", async () => {
      const lower = await formatSQL("SELECT a FROM t", {
        keywordCase: "lower",
      });
      expect(lower.formatted).toContain("select");
      expect(lower.formatted).toContain("from");
      const preserve = await formatSQL("SeLeCt a FROM t", {
        keywordCase: "preserve",
      });
      expect(preserve.formatted).toContain("SeLeCt");
    });

    it("should respect indentation settings", async () => {
      const four = await formatSQL("select a from t", { tabWidth: 4 });
      expect(four.formatted).toContain("\n    a\n");
      const tabs = await formatSQL("select a from t", { useTabs: true });
      expect(tabs.formatted).toContain("\n\ta\n");
    });

    it("should support dialect-specific syntax", async () => {
      const pg = await formatSQL("select id::text from users", {
        language: "postgresql",
      });
      expect(pg.error).toBeUndefined();
      expect(pg.formatted).toContain("id::TEXT");

      const tsql = await formatSQL("select [first name] from [my table]", {
        language: "transactsql",
      });
      expect(tsql.error).toBeUndefined();
      expect(tsql.formatted).toContain("[first name]");
    });

    it("should place semicolon on new line when enabled", async () => {
      const result = await formatSQL("select a from t;", {
        newlineBeforeSemicolon: true,
      });
      expect(result.formatted.endsWith("\n;")).toBe(true);
    });

    it("should return an error for invalid SQL", async () => {
      const input = "select (a from t";
      const result = await formatSQL(input);
      expect(result.error).toContain("SQL formatting error");
      expect(result.formatted).toBe(input);
    });
  });
});
