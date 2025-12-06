interface ShortcutBadgeProps {
  shortcut: string;
  className?: string;
}

export function ShortcutBadge({
  shortcut,
  className = "",
}: ShortcutBadgeProps) {
  return (
    <span
      className={`hidden md:inline-block px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded ${className}`}
      title={`Keyboard shortcut: ${shortcut}`}
    >
      {shortcut}
    </span>
  );
}
