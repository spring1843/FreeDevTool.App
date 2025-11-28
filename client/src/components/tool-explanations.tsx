import { type ReactNode, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface ToolExplanationItem {
  label?: string;
  text: string;
}

export interface ToolExplanationSection {
  title: string;
  items: Array<string | ToolExplanationItem>;
}

export interface ToolExplanation {
  notice?: {
    type: "tips" | "privacy" | "info" | "examples";
    title: string;
    items: Array<string | ToolExplanationItem>;
  };

  shortcuts?: Array<{
    key: string;
    action: string;
  }>;

  examples?: Array<{
    from: string;
    to: string;
  }>;

  sections?: ToolExplanationSection[];
}

function renderNotice(notice: ToolExplanation["notice"]): ReactNode {
  if (!notice) return null;

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        {notice.title}
      </h3>
      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
        {notice.items.map((item, i) => (
          <li key={i}>
            {typeof item === "string" ? (
              item
            ) : (
              <>
                {item.label ? <strong>{item.label}</strong> : null} {item.text}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderShortcuts(shortcuts: ToolExplanation["shortcuts"]): ReactNode {
  if (!shortcuts || shortcuts.length === 0) return null;

  return (
    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
      <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
        Keyboard Shortcuts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        {shortcuts.map((shortcut, i) => (
          <div key={i} className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-purple-100 dark:bg-purple-800/50 border border-purple-300 dark:border-purple-700 rounded text-xs font-mono text-purple-800 dark:text-purple-200">
              {shortcut.key}
            </kbd>
            <span className="text-purple-700 dark:text-purple-300">
              {shortcut.action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderExamples(examples: ToolExplanation["examples"]): ReactNode {
  if (!examples || examples.length === 0) return null;

  return (
    <div className="text-sm space-y-1">
      {examples.map((example, i) => (
        <div key={i}>
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            {example.from}
          </span>{" "}
          →{" "}
          <span className="font-mono bg-white dark:bg-gray-800 px-1 rounded">
            {example.to}
          </span>
        </div>
      ))}
    </div>
  );
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

function renderExamplesNotice(
  title: string,
  examples: ToolExplanation["examples"]
): ReactNode {
  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        {title}
      </h3>
      <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
        {renderExamples(examples)}
      </div>
    </div>
  );
}

function renderNoticeOrExamples(
  notice: ToolExplanation["notice"],
  examples: ToolExplanation["examples"]
): ReactNode {
  if (notice && notice.type === "examples" && examples) {
    return renderExamplesNotice(notice.title, examples);
  }
  if (notice) {
    return renderNotice(notice);
  }
  return null;
}

function checkSsrExists(): boolean {
  if (typeof window === "undefined") return false;
  const ssrElement = document.getElementById("ssr-explanations");
  if (!ssrElement) return false;
  return ssrElement.getAttribute("data-tool-path") === window.location.pathname;
}

function hydrateSsrExplanations(): void {
  const ssrElement = document.getElementById("ssr-explanations");
  const showMoreBtn = document.getElementById("ssr-show-more");

  if (!ssrElement || !showMoreBtn) return;

  showMoreBtn.addEventListener("click", () => {
    const revealBlocks = ssrElement.querySelectorAll(
      ".exp-reveal-mobile, .exp-reveal-desktop"
    );
    revealBlocks.forEach(block => {
      block.classList.remove("exp-reveal-mobile", "exp-reveal-desktop");
    });
    showMoreBtn.style.display = "none";
  });
}

export function ToolExplanations({
  explanations,
}: {
  explanations?: ToolExplanation;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ssrExists, setSsrExists] = useState(checkSsrExists);

  useEffect(() => {
    const ssrElement = document.getElementById("ssr-explanations");
    if (ssrElement) {
      const ssrPath = ssrElement.getAttribute("data-tool-path");
      if (ssrPath === window.location.pathname) {
        hydrateSsrExplanations();
      } else {
        ssrElement.remove();
        setSsrExists(false);
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!explanations) return null;

  if (ssrExists) return null;

  const { notice, shortcuts, examples, sections } = explanations;

  const blocks: ReactNode[] = [];

  const noticeBlock = renderNoticeOrExamples(notice, examples);
  if (noticeBlock) blocks.push(noticeBlock);

  const shortcutsBlock = shortcuts ? renderShortcuts(shortcuts) : null;
  if (shortcutsBlock) blocks.push(shortcutsBlock);

  if (sections) {
    sections.forEach((section, i) => {
      const colors = sectionColors[i % sectionColors.length];
      blocks.push(
        <div
          key={`section-${i}`}
          className={`p-4 ${colors.bg} border ${colors.border} rounded-lg`}
        >
          {section.title ? (
            <h4 className={`font-semibold ${colors.title} mb-2`}>
              {section.title}
            </h4>
          ) : null}
          <ul
            className={`space-y-1 ${colors.text} text-sm list-disc list-inside`}
          >
            {section.items.map((item, j) => (
              <li key={j}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    {item.label ? <strong>{item.label}</strong> : null}{" "}
                    {item.text}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    });
  }

  const limit = isMobile ? 1 : 3;
  const hasMore = blocks.length > limit;
  const visibleBlocks = expanded ? blocks : blocks.slice(0, limit);
  const hiddenCount = blocks.length - limit;

  return (
    <div className="mt-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleBlocks.map((block, i) => (
          <div key={i} className={i === 0 && !shortcuts ? "md:col-span-2" : ""}>
            {block}
          </div>
        ))}
      </div>

      {hasMore && !expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-full py-2 px-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <span>
            Show {hiddenCount} more explanation{hiddenCount > 1 ? "s" : ""}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      ) : null}
    </div>
  );
}
