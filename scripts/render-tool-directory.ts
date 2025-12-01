import { toolsData, type Tool } from "../client/src/data/tools.js";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderToolCard(tool: Tool): string {
  return `<a href="${escapeHtml(tool.path)}" class="ssr-tool-card">
      <div class="ssr-tool-name">${escapeHtml(tool.name)}</div>
      <p class="ssr-tool-desc">${escapeHtml(tool.metadata.description)}</p>
      <span class="ssr-tool-shortcut">${escapeHtml(tool.shortcut)}</span>
    </a>`;
}

function renderCategory(
  categoryName: string,
  data: { color: string; tools: Tool[] }
): string {
  const toolCards = data.tools.map(tool => renderToolCard(tool)).join("");

  return `<section class="ssr-category">
      <div class="ssr-category-header">
        <div class="ssr-category-dot" style="background-color: ${getCategoryColor(data.color)}"></div>
        <h2 class="ssr-category-title">${escapeHtml(categoryName)}</h2>
        <span class="ssr-category-count">(${data.tools.length} tool${data.tools.length !== 1 ? "s" : ""})</span>
      </div>
      <div class="ssr-tools-grid">${toolCards}</div>
    </section>`;
}

function getCategoryColor(colorClass: string): string {
  const colorMap: Record<string, string> = {
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#22c55e",
    "bg-yellow-500": "#eab308",
    "bg-red-500": "#ef4444",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
    "bg-indigo-500": "#6366f1",
    "bg-orange-500": "#f97316",
    "bg-teal-500": "#14b8a6",
    "bg-cyan-500": "#06b6d4",
    "bg-slate-500": "#64748b",
    "bg-emerald-500": "#10b981",
    "bg-amber-500": "#f59e0b",
  };

  for (const [key, value] of Object.entries(colorMap)) {
    if (colorClass.includes(key)) {
      return value;
    }
  }
  return "#64748b";
}

export function renderToolDirectoryHtml(): string {
  const categories = Object.entries(toolsData)
    .map(([name, data]) => renderCategory(name, data))
    .join("");

  const totalTools = Object.values(toolsData).reduce(
    (acc, cat) => acc + cat.tools.length,
    0
  );

  return `<nav id="ssr-tool-directory" aria-label="Developer Tools Directory">
    <div class="ssr-directory-header">
      <h2 class="ssr-directory-title">All Developer Tools</h2>
      <p class="ssr-directory-subtitle">${totalTools} free, offline tools for developers</p>
    </div>
    ${categories}
  </nav>`;
}
