interface ShortcutBadgeProps {
  shortcut: string;
  className?: string;
}

export function ShortcutBadge({ shortcut, className = "" }: ShortcutBadgeProps) {
  return (
    <span 
      className={`inline-flex items-center gap-0.5 ${className}`} 
      title={`Keyboard shortcut: ${shortcut}`}
    >
      {shortcut.split("+").map((key, index, arr) => (
        <span key={key}>
          <kbd className="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600 shadow-sm">
            {key}
          </kbd>
          {index < arr.length - 1 && (
            <span className="text-slate-400 dark:text-slate-500 mx-0.5">+</span>
          )}
        </span>
      ))}
    </span>
  );
}
