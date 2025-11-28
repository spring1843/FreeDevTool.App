import { type ReactNode } from "react";

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
            <span className="text-purple-700 dark:text-purple-300">{shortcut.action}</span>
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

function getGridCols(length: number): string {
  if (length === 1) return "";
  if (length === 2) return "md:grid-cols-2";
  return "md:grid-cols-2 lg:grid-cols-3";
}

function renderSections(sections: ToolExplanation["sections"]): ReactNode {
  if (!sections || sections.length === 0) return null;

  const gridCols = getGridCols(sections.length);

  return (
    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
      <div className={`grid grid-cols-1 ${gridCols} gap-6 text-sm`}>
        {sections.map((section, i) => (
          <div key={i}>
            {section.title ? (
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">{section.title}</h4>
            ) : null}
            <ul className="space-y-1 text-emerald-700 dark:text-emerald-300 list-disc list-inside">
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
        ))}
      </div>
    </div>
  );
}

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

export function renderToolExplanations(
  explanations: ToolExplanation | undefined
): ReactNode {
  if (!explanations) return null;

  const { notice, shortcuts, examples, sections } = explanations;

  return (
    <div className="mt-8 space-y-4">
      {renderNoticeOrExamples(notice, examples)}
      {shortcuts ? renderShortcuts(shortcuts) : null}
      {sections ? renderSections(sections) : null}
    </div>
  );
}
