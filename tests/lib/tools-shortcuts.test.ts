import { describe, it, expect } from "vitest";
import { toolsData } from "../../client/src/data/tools";
import { shortcutKeyToCode } from "../../client/src/lib/shortcut-key-to-code";

// Minimal shapes to satisfy type checking without importing app types
interface ToolEntry {
  name: string;
  path: string;
  shortcut: string;
}
interface ToolsSection {
  tools: ToolEntry[];
}

// Helper to normalize shortcut strings to a canonical form for string-level dedup.
function normalizeShortcut(shortcut: string): string {
  return shortcut
    .split("+")
    .map(s => s.trim())
    .map(s => (s.toLowerCase() === "ctrl" ? "Ctrl" : s))
    .map(s => (s.toLowerCase() === "shift" ? "Shift" : s))
    .map(s => (s.toLowerCase() === "alt" ? "Alt" : s))
    .map((s, idx, arr) => (idx < arr.length - 1 ? s : s.toLowerCase()))
    .join("+");
}

describe("Tool shortcuts", () => {
  it("every tool has a non-empty shortcut", () => {
    const missing: Array<{ tool: string; path: string }> = [];

    Object.values(toolsData).forEach((section: ToolsSection) => {
      section.tools.forEach((tool: ToolEntry) => {
        if (!tool.shortcut?.trim()) {
          missing.push({ tool: tool.name, path: tool.path });
        }
      });
    });

    expect(
      missing,
      `Tools missing shortcuts: ${missing.map(m => `${m.tool} [${m.path}]`).join(", ")}`
    ).toHaveLength(0);
  });

  it("all shortcuts are string-level unique", () => {
    const shortcuts = new Map<string, string>(); // normalized -> tool path
    const duplicates: Array<{
      shortcut: string;
      tool: string;
      conflictWith: string;
    }> = [];

    Object.values(toolsData).forEach((section: ToolsSection) => {
      section.tools.forEach((tool: ToolEntry) => {
        const sc = tool.shortcut.trim();
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

  it("shortcuts map to unique physical keys within each modifier namespace", () => {
    const allTools = Object.values(toolsData).flatMap(
      (section: ToolsSection) => section.tools
    );

    // Two distinct namespaces — each is checked independently.
    // Cross-namespace collisions are impossible since event.altKey distinguishes them.
    const namespaces: Array<{ prefix: string; tools: ToolEntry[] }> = [
      {
        prefix: "Ctrl+Shift+Alt+",
        tools: allTools.filter(t => t.shortcut.startsWith("Ctrl+Shift+Alt+")),
      },
      {
        prefix: "Ctrl+Shift+",
        tools: allTools.filter(
          t =>
            t.shortcut.startsWith("Ctrl+Shift+") &&
            !t.shortcut.startsWith("Ctrl+Shift+Alt+")
        ),
      },
    ];

    const collisions: string[] = [];

    namespaces.forEach(({ prefix, tools }) => {
      const codeMap = new Map<string, string>(); // code -> tool description
      tools.forEach(t => {
        const key = t.shortcut.slice(prefix.length);
        const code = shortcutKeyToCode(key);
        if (!code) return; // unrecognised key — skip
        const desc = `${t.name} (${t.shortcut})`;
        if (codeMap.has(code)) {
          collisions.push(
            `[${prefix}] code=${code}: ${desc} collides with ${codeMap.get(code)}`
          );
        } else {
          codeMap.set(code, desc);
        }
      });
    });

    expect(
      collisions,
      `Physical-key collisions detected:\n${collisions.join("\n")}`
    ).toHaveLength(0);
  });
});
