import type {
  ToolExplanation,
  ToolExplanationSection,
} from "../client/src/components/tool-explanations";

const sectionColorClasses = [
  "exp-emerald",
  "exp-amber",
  "exp-cyan",
  "exp-rose",
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
    .map(item => {
      if (typeof item === "string") {
        return `<li>${escapeHtml(item)}</li>`;
      }
      const label = item.label
        ? `<strong>${escapeHtml(item.label)}</strong> `
        : "";
      return `<li>${label}${escapeHtml(item.text)}</li>`;
    })
    .join("");

  return `<div class="exp-block exp-blue">
    <h3>${escapeHtml(notice.title)}</h3>
    <ul>${itemsHtml}</ul>
  </div>`;
}

function renderShortcutsHtml(shortcuts: ToolExplanation["shortcuts"]): string {
  if (!shortcuts || shortcuts.length === 0) return "";

  const shortcutsHtml = shortcuts
    .map(
      shortcut =>
        `<div class="flex items-center gap-2">
          <kbd>${escapeHtml(shortcut.key)}</kbd>
          <span>${escapeHtml(shortcut.action)}</span>
        </div>`
    )
    .join("");

  return `<div class="exp-block exp-purple">
    <h3>Keyboard Shortcuts</h3>
    <div class="exp-shortcuts-grid">${shortcutsHtml}</div>
  </div>`;
}

function renderExamplesHtml(examples: ToolExplanation["examples"]): string {
  if (!examples || examples.length === 0) return "";

  return examples
    .map(
      example =>
        `<div><code>${escapeHtml(example.from)}</code> → <code>${escapeHtml(example.to)}</code></div>`
    )
    .join("");
}

function renderExamplesNoticeHtml(
  title: string,
  examples: ToolExplanation["examples"]
): string {
  return `<div class="exp-block exp-blue">
    <h3>${escapeHtml(title)}</h3>
    <div class="exp-examples">${renderExamplesHtml(examples)}</div>
  </div>`;
}

function renderSectionHtml(
  section: ToolExplanationSection,
  index: number
): string {
  const colorClass = sectionColorClasses[index % sectionColorClasses.length];

  const itemsHtml = section.items
    .map(item => {
      if (typeof item === "string") {
        return `<li>${escapeHtml(item)}</li>`;
      }
      const label = item.label
        ? `<strong>${escapeHtml(item.label)}</strong> `
        : "";
      return `<li>${label}${escapeHtml(item.text)}</li>`;
    })
    .join("");

  const titleHtml = section.title
    ? `<h4>${escapeHtml(section.title)}</h4>`
    : "";

  return `<div class="exp-block ${colorClass}">
    ${titleHtml}
    <ul>${itemsHtml}</ul>
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

  const mobileLimit = 1;
  const desktopLimit = 3;
  const totalBlocks = blocks.length;

  const blocksHtml = blocks
    .map((block, i) => {
      const colSpanClass = i === 0 && !shortcuts ? "md:col-span-2" : "";
      const revealMobile = i >= mobileLimit ? "exp-reveal-mobile" : "";
      const revealDesktop = i >= desktopLimit ? "exp-reveal-desktop" : "";
      return `<div class="${colSpanClass} ${revealMobile} ${revealDesktop}" data-block-index="${i}">${block}</div>`;
    })
    .join("");

  const mobileHiddenCount = Math.max(0, totalBlocks - mobileLimit);
  const desktopHiddenCount = Math.max(0, totalBlocks - desktopLimit);

  const showMoreButton =
    totalBlocks > mobileLimit
      ? `<button id="ssr-show-more" data-mobile-count="${mobileHiddenCount}" data-desktop-count="${desktopHiddenCount}">
        <span class="ssr-show-more-text"></span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>`
      : "";

  const dynamicStyles = `<style>
    #ssr-show-more .ssr-show-more-text::before { content: "Show ${mobileHiddenCount} more explanation${mobileHiddenCount !== 1 ? "s" : ""}"; }
    @media (min-width: 768px) {
      #ssr-show-more .ssr-show-more-text::before { content: "Show ${desktopHiddenCount} more explanation${desktopHiddenCount !== 1 ? "s" : ""}"; }
      ${desktopHiddenCount === 0 ? "#ssr-show-more { display: none; }" : ""}
    }
  </style>`;

  return `<div id="ssr-explanations" data-tool-path="${escapeHtml(toolPath)}" data-total-blocks="${totalBlocks}" class="mt-8 space-y-4">
    ${dynamicStyles}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${blocksHtml}</div>
    ${showMoreButton}
  </div>`;
}
