import { SecurityBanner } from "@/components/ui/security-banner";
import { ShortcutBadge } from "@/components/ui/shortcut-badge";

interface ToolHeaderProps {
  title: string;
  description: string;
  experimental?: boolean;
  showSecurityBanner?: boolean;
  shortcut?: string;
}

export function ToolHeader({
  title,
  description,
  experimental = false,
  showSecurityBanner = false,
  shortcut,
}: ToolHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-3">
            {title}
            {shortcut ? <ShortcutBadge shortcut={shortcut} /> : null}
            {experimental ? (
              <span className="text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded font-medium">
                EXPERIMENTAL
              </span>
            ) : null}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        {showSecurityBanner ? <SecurityBanner variant="compact" /> : null}
      </div>
    </div>
  );
}
