import type { ToolExplanation, ToolExplanationSection } from "../client/src/components/tool-explanations";

interface RenderOptions {
  collapsedBlocks?: number;
}

const sectionColors = [
  {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    title: "text-emerald-800 dark:text-emerald-200",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    title: "text-amber-800 dark:text-amber-200",
    text: "text-amber-700 dark:text-amber-300",
  },
  {
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-800",
    title: "text-cyan-800 dark:text-cyan-200",
    text: "text-cyan-700 dark:text-cyan-300",
  },
  {
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    title: "text-rose-800 dark:text-rose-200",
    text: "text-rose-700 dark:text-rose-300",
  },
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderNoticeHtml(notice: ToolExplanation["notice"]): string {
  if (!notice) return "";

  const itemsHtml = notice.items
    .map((item) => {
      if (typeof item === "string") {
        return `<li>${escapeHtml(item)}</li>`;
      }
      const label = item.label ? `<strong>${escapeHtml(item.label)}</strong> ` : "";
      return `<li>${label}${escapeHtml(item.text)}</li>`;
    })
    .join("");

  return `<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">${escapeHtml(notice.title)}</h3>
    <ul class="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">${itemsHtml}</ul>
  </div>`;
}

function renderShortcutsHtml(shortcuts: ToolExplanation["shortcuts"]): string {
  if (!shortcuts || shortcuts.length === 0) return "";

  const shortcutsHtml = shortcuts
    .map(
      (shortcut) =>
        `<div class="flex items-center gap-2">
          <kbd class="px-2 py-1 bg-purple-100 dark:bg-purple-800/50 border border-purple-300 dark:border-purple-700 rounded text-xs font-mono text-purple-800 dark:text-purple-200">${escapeHtml(shortcut.key)}</kbd>
          <span class="text-purple-700 dark:text-purple-300">${escapeHtml(shortcut.action)}</span>
        </div>`
    )
    .join("");

  return `<div class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
    <h3 class="font-semibold text-purple-800 dark:text-purple-200 mb-3">Keyboard Shortcuts</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">${shortcutsHtml}</div>
  </div>`;
}

function renderExamplesHtml(examples: ToolExplanation["examples"]): string {
  if (!examples || examples.length === 0) return "";

  return examples
    .map(
      (example) =>
        `<div><span class="font-mono bg-white dark:bg-gray-800 px-1 rounded">${escapeHtml(example.from)}</span> → <span class="font-mono bg-white dark:bg-gray-800 px-1 rounded">${escapeHtml(example.to)}</span></div>`
    )
    .join("");
}

function renderExamplesNoticeHtml(
  title: string,
  examples: ToolExplanation["examples"]
): string {
  return `<div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
    <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">${escapeHtml(title)}</h3>
    <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">${renderExamplesHtml(examples)}</div>
  </div>`;
}

function renderSectionHtml(section: ToolExplanationSection, index: number): string {
  const colors = sectionColors[index % sectionColors.length];

  const itemsHtml = section.items
    .map((item) => {
      if (typeof item === "string") {
        return `<li>${escapeHtml(item)}</li>`;
      }
      const label = item.label ? `<strong>${escapeHtml(item.label)}</strong> ` : "";
      return `<li>${label}${escapeHtml(item.text)}</li>`;
    })
    .join("");

  const titleHtml = section.title
    ? `<h4 class="font-semibold ${colors.title} mb-2">${escapeHtml(section.title)}</h4>`
    : "";

  return `<div class="p-4 ${colors.bg} border ${colors.border} rounded-lg">
    ${titleHtml}
    <ul class="space-y-1 ${colors.text} text-sm list-disc list-inside">${itemsHtml}</ul>
  </div>`;
}

export function renderExplanationsHtml(
  explanations: ToolExplanation | undefined,
  toolPath: string
): string {
  if (!explanations) return "";

  const { notice, shortcuts, examples, sections } = explanations;

  const blocks: string[] = [];

  if (notice && notice.type === "examples" && examples) {
    blocks.push(renderExamplesNoticeHtml(notice.title, examples));
  } else if (notice) {
    blocks.push(renderNoticeHtml(notice));
  }

  if (shortcuts && shortcuts.length > 0) {
    blocks.push(renderShortcutsHtml(shortcuts));
  }

  if (sections) {
    sections.forEach((section, i) => {
      blocks.push(renderSectionHtml(section, i));
    });
  }

  if (blocks.length === 0) return "";

  const blocksHtml = blocks
    .map((block, i) => {
      const colSpanClass = i === 0 && !shortcuts ? "md:col-span-2" : "";
      return `<div class="${colSpanClass}">${block}</div>`;
    })
    .join("");

  return `<div id="ssr-explanations" data-tool-path="${escapeHtml(toolPath)}" class="mt-8 space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${blocksHtml}</div>
  </div>`;
}
