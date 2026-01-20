import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";

import {
  type LucideIcon,
  Home,
  ChevronRight,
  ChevronDown,
  Repeat,
  Code,
  Shield,
  Type,
  Clock,
  DollarSign,
  Palette,
  Settings,
  Lock,

  // Conversions
  Calendar,
  Shuffle,
  Globe2,
  ArrowLeftRight,
  Link2,
  Table,
  Binary,

  // Formatters
  FileJson,
  Braces,

  // Encoders / Security
  KeyRound,
  Hash,
  FileLock,
  IndentIncrease,

  // Text tools
  FileText,
  CaseUpper,
  Replace,
  Baseline,
  ScanText,
  SquareCode,
  AlignCenter,
  ScanLine,

  // Time tools
  Timer,
  TimerReset,
  Hourglass,
  CalendarClock,
  KeyboardMusic,

  // Financial
  Percent,

  // Color
  Pipette,

  // System
  Camera,
  Mic,
  Keyboard,
  Globe,
} from "lucide-react";
import { toolsData } from "@/data/tools";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToolClick?: () => void;
  onExpandRequest?: (category: string) => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Conversions: Repeat,
  Formatters: Code,
  Encoders: Shield,
  "Text Tools": Type,
  "Time Tools": Clock,
  "Financial Tools": DollarSign,
  "Color Tools": Palette,
  System: Settings,
};

/**
 * Tool-level icons (temporary, sidebar-only)
 * Restores UX expected by client
 */
const TOOL_ICONS: Record<string, LucideIcon> = {
  // ===== Conversions (7) =====
  "Date Converter": Calendar,
  "JSON ↔ YAML": Shuffle,
  "Timezone Converter": Globe2,
  "Unit Converter": ArrowLeftRight,
  "URL to JSON": Link2,
  "CSV to JSON": Table,
  "Number Base Converter": Binary,

  // ===== Formatters =====
  "JSON Formatter": FileJson,
  "JSONC Formatter": Braces,
  "HTML Beautifier": Code,
  "YAML Formatter": FileText,
  "Markdown Formatter": IndentIncrease, // (unique icon used once only here)
  "CSS/LESS/SCSS Formatter": Palette,

  // ===== Encoders =====
  "Base64 Encoder": KeyRound,
  "Base64 Decoder": Shield,
  "JWT Decoder": Hash,
  "TLS Certificate Decoder": Lock,
  "MD5 Hash": FileLock, // if present, otherwise remove
  "BCrypt Hash": Shield, // if present, otherwise remove

  // ===== Text Tools =====
  "Text Diff": FileText,
  "Regex Tester": CaseUpper,
  "Text Sorter": AlignCenter,
  "Word Counter": Type,
  "QR Generator": ScanText,
  "Barcode Generator": ScanLine,
  "Lorem Generator": Baseline,
  "Unicode Characters": SquareCode,
  "Password Generator": KeyRound,
  "UUID Generator": Shuffle,
  "Search & Replace": Replace,
  "Text Split": ArrowLeftRight,

  // ===== Time Tools =====
  "World Clock": Globe2,
  Timer,
  Stopwatch: TimerReset,
  Countdown: Hourglass,
  "Date/Time Difference": CalendarClock,
  Metronome: KeyboardMusic,

  // ===== Financial Tools =====
  "Compound Interest": Percent,
  "Debt Repayment": DollarSign,

  // ===== Color Tools =====
  "Color Palette Generator": Pipette,

  // ===== System =====
  "Camera Test": Camera,
  "Microphone Test": Mic,
  "Keyboard Test": Keyboard,
  "Browser Info": Globe,
};

export function Sidebar({
  collapsed,
  onToolClick,
  onExpandRequest,
}: SidebarProps) {
  const [location] = useLocation();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Auto-open category based on route
  useEffect(() => {
    for (const [category, data] of Object.entries(toolsData)) {
      if (data.tools.some(tool => tool.path === location)) {
        setOpenCategory(category);
        break;
      }
    }
  }, [location]);

  return (
    <aside
      className={cn(
        "h-screen flex flex-col overflow-hidden transition-all duration-300 border-r",
        collapsed ? "w-16" : "w-72",
        "bg-gradient-to-b from-slate-50 to-white border-slate-200 text-slate-900",
        "dark:from-slate-900 dark:to-slate-950 dark:border-slate-800 dark:text-slate-100"
      )}
    >
      {/* LOGO */}
      <div
        className={cn(
          "border-b flex items-center",
          collapsed ? "justify-center py-4" : "px-4 py-4 gap-3",
          "border-slate-200 dark:border-slate-800"
        )}
      >
        <div className="h-11 w-11 flex-shrink-0 rounded-lg bg-blue-500 flex items-center justify-center">
          <img
            src="/assets/favicon-32x32.png"
            alt="FreeDevTool Logo"
            className="h-8 w-8 cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          />
        </div>

        {!collapsed && (
          <div>
            <div className="font-semibold leading-tight">FreeDevTool</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Secure Developer Tools
            </div>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-3 space-y-1">
        {/* HOME */}
        <Link href="/">
          <a
            onClick={() => {
              if (collapsed) onExpandRequest?.("Home");
              onToolClick?.();
            }}
            className={cn(
              "flex items-center rounded-lg transition",
              collapsed
                ? "h-11 w-11 mx-auto justify-center"
                : "gap-3 px-3 py-2 justify-start",
              location === "/"
                ? "bg-slate-800 text-white"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            )}
          >
            <Home className="h-5 w-5" />
            {!collapsed && "Home"}
          </a>
        </Link>

        {/* CATEGORIES */}
        {Object.entries(toolsData).map(([category, data]) => {
          const Icon = CATEGORY_ICONS[category];
          const isOpen = openCategory === category;

          return (
            <div key={category}>
              <button
                type="button"
                onClick={() => {
                  if (collapsed) {
                    onExpandRequest?.(category);
                    setOpenCategory(category);
                  } else {
                    setOpenCategory(isOpen ? null : category);
                  }
                }}
                className={cn(
                  "flex items-center rounded-lg transition",
                  collapsed
                    ? "h-11 w-11 mx-auto justify-center"
                    : "w-full px-3 py-2 justify-between",
                  "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                  {!collapsed && <span>{category}</span>}
                </div>

                {!collapsed &&
                  (isOpen ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  ))}
              </button>

              {!collapsed && isOpen ? (
                <div className="ml-7 mt-1 space-y-1">
                  {data.tools.map(tool => {
                    const ToolIcon = TOOL_ICONS[tool.name];

                    if (!ToolIcon) {
                      console.warn(`Missing icon for tool: ${tool.name}`);
                      return null;
                    }

                    return (
                      <Link key={tool.path} href={tool.path}>
                        <a
                          onClick={onToolClick}
                          className={cn(
                            "h-10 flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition",
                            location === tool.path
                              ? "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white"
                              : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                          )}
                        >
                          <ToolIcon className="h-4 w-4 shrink-0 opacity-80" />
                          <span>{tool.name}</span>
                        </a>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      {/* SUPPORT */}
      <div className="px-3 py-3 border-t border-slate-200 dark:border-slate-800">
        <a
          href="https://github.com/spring1843/FreeDevTool.App/issues"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center rounded-lg transition",
            collapsed
              ? "h-11 w-11 mx-auto justify-center"
              : "gap-3 px-3 py-2 justify-start",
            "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          )}
        >
          <Lock className="h-5 w-5" />
          {!collapsed && "Support"}
        </a>
      </div>
    </aside>
  );
}
