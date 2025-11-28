import { type ReactNode } from "react";

export interface ToolExplanationItem {
  label?: string;
  text: string;
}

export interface ToolExplanationNotice {
  type?: "tips" | "privacy" | "info" | "examples";
  title: string;
  items: Array<string | ToolExplanationItem>;
}

export interface ToolExplanation {
  notices?: ToolExplanationNotice[];

  shortcuts?: Array<{
    key: string;
    action: string;
  }>;

  examples?: Array<{
    from: string;
    to: string;
  }>;
}

function renderNotice(notice: ToolExplanationNotice, index: number): ReactNode {
  return (
    <div
      key={index}
      className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
    >
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

function renderNotices(notices: ToolExplanation["notices"]): ReactNode {
  if (!notices || notices.length === 0) return null;

  return (
    <div className="space-y-4">
      {notices.map((notice, i) => renderNotice(notice, i))}
    </div>
  );
}

function renderShortcuts(shortcuts: ToolExplanation["shortcuts"]): ReactNode {
  if (!shortcuts || shortcuts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      {shortcuts.map((shortcut, i) => (
        <div key={i} className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
            {shortcut.key}
          </kbd>
          <span>{shortcut.action}</span>
        </div>
      ))}
    </div>
  );
}

function renderExamples(examples: ToolExplanation["examples"]): ReactNode {
  if (!examples || examples.length === 0) return null;

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        Examples:
      </h3>
      <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
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
    </div>
  );
}

export function renderToolExplanations(
  explanations: ToolExplanation | undefined
): ReactNode {
  if (!explanations) return null;

  const { notices, shortcuts, examples } = explanations;

  return (
    <div className="space-y-4">
      {renderNotices(notices)}
      {shortcuts ? renderShortcuts(shortcuts) : null}
      {examples ? renderExamples(examples) : null}
    </div>
  );
}
