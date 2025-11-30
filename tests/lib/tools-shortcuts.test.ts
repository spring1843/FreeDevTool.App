import { describe, it, expect } from "vitest";
import { toolsData } from "../../client/src/data/tools";

// Minimal shapes to satisfy type checking without importing app types
interface ToolEntry {
  name: string;
  path: string;
  shortcut: string;
}
interface ToolsSection {
  tools: ToolEntry[];
}

// Helper to normalize shortcuts to a canonical form
function normalizeShortcut(shortcut: string): string {
  return shortcut
    .split("+")
    .map(s => s.trim())
    .map(s => (s.toLowerCase() === "ctrl" ? "Ctrl" : s))
    .map(s => (s.toLowerCase() === "shift" ? "Shift" : s))
    .map((s, idx, arr) => (idx < arr.length - 1 ? s : s.toLowerCase())) // last key lowercased for comparison
    .join("+");
}

describe("Tool shortcuts", () => {
  it("every tool has a unique, non-empty shortcut", () => {
    const shortcuts = new Map<string, string>(); // normalized -> tool path
    const duplicates: Array<{
      shortcut: string;
      tool: string;
      conflictWith: string;
    }> = [];
    const missing: Array<{ tool: string; path: string }> = [];

    Object.values(toolsData).forEach((section: ToolsSection) => {
      section.tools.forEach((tool: ToolEntry) => {
        const sc = tool.shortcut?.trim();
        if (!sc) {
          missing.push({ tool: tool.name, path: tool.path });
          return;
        }
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

    // Assert no missing shortcuts
    expect(
      missing,
      `Tools missing shortcuts: ${missing.map(m => `${m.tool} [${m.path}]`).join(", ")}`
    ).toHaveLength(0);

    // Format is flexible by design (numbers and symbols allowed), so we don't validate specific characters.

    // Assert no duplicates
    expect(
      duplicates,
      `Duplicate shortcuts detected:\n${duplicates
        .map(
          d =>
            `- ${d.shortcut} used by ${d.tool} conflicts with ${d.conflictWith}`
        )
        .join("\n")}`
    ).toHaveLength(0);
  });
});
