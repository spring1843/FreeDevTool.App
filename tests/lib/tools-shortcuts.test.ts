import { describe, it, expect } from "vitest";
import { toolsData } from "../../client/src/data/tools";

// Minimal shapes to satisfy type checking without importing app types
interface ToolEntry {
  name: string;
  path: string;
  shortcut?: string;
}
interface ToolsSection {
  tools: ToolEntry[];
}

// Mirrors the shortcutKeyToCode function in Layout.tsx.
// Only base (unshifted) key representations are included — shifted-symbol aliases
// (e.g. "!" for Digit1, "@" for Digit2, "~" for Backquote) are intentionally omitted
// so that no two shortcut strings can map to the same physical key.
function shortcutKeyToCode(key: string): string {
  if (key.length === 1) {
    const upper = key.toUpperCase();
    if (upper >= "A" && upper <= "Z") return `Key${upper}`;
    if (key >= "0" && key <= "9") return `Digit${key}`;
  }
  const map: Record<string, string> = {
    "`": "Backquote",
    "-": "Minus",
    "=": "Equal",
    "[": "BracketLeft",
    "]": "BracketRight",
    "\\": "Backslash",
    ";": "Semicolon",
    "'": "Quote",
    ",": "Comma",
    ".": "Period",
    "/": "Slash",
  };
  return map[key] ?? "";
}

// Helper to normalize shortcut strings to a canonical form for string-level dedup.
function normalizeShortcut(shortcut: string): string {
  return shortcut
    .split("+")
    .map(s => s.trim())
    .map(s => (s.toLowerCase() === "ctrl" ? "Ctrl" : s))
    .map(s => (s.toLowerCase() === "shift" ? "Shift" : s))
    .map((s, idx, arr) => (idx < arr.length - 1 ? s : s.toLowerCase()))
    .join("+");
}

describe("Tool shortcuts", () => {
  it("Ctrl+Shift+* shortcuts are string-level unique", () => {
    const shortcuts = new Map<string, string>(); // normalized -> tool path
    const duplicates: Array<{
      shortcut: string;
      tool: string;
      conflictWith: string;
    }> = [];

    Object.values(toolsData).forEach((section: ToolsSection) => {
      section.tools.forEach((tool: ToolEntry) => {
        const sc = tool.shortcut?.trim();
        if (!sc) return; // shortcuts are optional; tools without one are skipped
        const normalized = normalizeShortcut(sc);
        if (shortcuts.has(normalized)) {
          duplicates.push({
            shortcut: sc,
            tool: `${tool.name} (${tool.path})`,
            conflictWith: shortcuts.get(normalized) as string,
          });
        } else {
          shortcuts.set(normalized, `${tool.name} (${tool.path})`);
        }
      });
    });

    expect(
      duplicates,
      `Duplicate shortcut strings detected:\n${duplicates
        .map(
          d =>
            `- ${d.shortcut} used by ${d.tool} conflicts with ${d.conflictWith}`
        )
        .join("\n")}`
    ).toHaveLength(0);
  });

  it("Ctrl+Shift+* shortcuts map to unique physical keys (no shadowing)", () => {
    const allTools = Object.values(toolsData).flatMap(
      (section: ToolsSection) => section.tools
    );
    const ctrlShiftTools = allTools.filter(t =>
      t.shortcut?.startsWith("Ctrl+Shift+")
    );

    const codeMap = new Map<string, string>(); // code -> tool name
    const collisions: Array<{
      code: string;
      tool: string;
      shadowedBy: string;
    }> = [];

    ctrlShiftTools.forEach(t => {
      const key = t.shortcut!.slice("Ctrl+Shift+".length);
      const code = shortcutKeyToCode(key);
      if (!code) return; // unrecognised key — skip
      if (codeMap.has(code)) {
        collisions.push({
          code,
          tool: `${t.name} (${t.shortcut})`,
          shadowedBy: codeMap.get(code) as string,
        });
      } else {
        codeMap.set(code, `${t.name} (${t.shortcut})`);
      }
    });

    expect(
      collisions,
      `Physical-key collisions detected (two shortcuts map to the same key code):\n${collisions
        .map(c => `- code=${c.code}: ${c.tool} shadowed by ${c.shadowedBy}`)
        .join("\n")}`
    ).toHaveLength(0);
  });
});
