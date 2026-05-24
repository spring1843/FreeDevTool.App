import { useState, useEffect, useMemo } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useDemo } from "@/hooks/use-demo-hook";
import { useTheme } from "@/providers/theme-provider";
import { useLocation } from "wouter";
import { toolsData } from "@/data/tools";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

// Maps the key segment of a "Ctrl+Shift+X" shortcut string to a KeyboardEvent.code value.
// Using event.code (physical key) is layout-independent, so Ctrl+Shift+1 works on all layouts.
// Only base (unshifted) key representations are mapped here — shifted-symbol aliases
// (e.g. "!" for Digit1, "@" for Digit2, "~" for Backquote) are intentionally omitted to
// prevent two different shortcut strings from colliding on the same physical key.
function shortcutKeyToCode(key: string): string {
  if (key.length === 1) {
    const upper = key.toUpperCase();
    if (upper >= "A" && upper <= "Z") return `Key${upper}`;
    if (key >= "0" && key <= "9") return `Digit${key}`;
  }
  const map: Record<string, string> = {
    "`": "Backquote",
    "-": "Minus",
    "=": "Equal",
    "[": "BracketLeft",
    "]": "BracketRight",
    "\\": "Backslash",
    ";": "Semicolon",
    "'": "Quote",
    ",": "Comma",
    ".": "Period",
    "/": "Slash",
  };
  return map[key] ?? "";
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { isDemoRunning } = useDemo();
  const { theme, setTheme } = useTheme();
  const [location, navigate] = useLocation();

  const allTools = useMemo(
    () => Object.values(toolsData).flatMap(category => category.tools),
    []
  );

  const [isSidebarOpen] = useState(true);

  const [headerCollapsed, setHeaderCollapsed] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    // Desktop pe sirf homepage par sidebar expanded rahe
    if (isDesktop) {
      setSidebarCollapsed(location !== "/");
    }
  }, [location, isDesktop]);

  useEffect(() => {
    if (isDesktop && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isDesktop, mobileMenuOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isDemoRunning) return;

      if (!event.ctrlKey) return;

      // Ctrl+Shift+* → navigate to tool by shortcut
      if (event.shiftKey) {
        const matchedTool = allTools.find(t => {
          if (!t.shortcut?.startsWith("Ctrl+Shift+")) return false;
          const key = t.shortcut.slice("Ctrl+Shift+".length);
          return shortcutKeyToCode(key) === event.code;
        });
        if (matchedTool) {
          event.preventDefault();
          navigate(matchedTool.path);
        }
        // Don't fall through to Ctrl-only shortcuts
        return;
      }

      switch (event.key.toLowerCase()) {
        case "d":
          event.preventDefault();
          setTheme(theme === "dark" ? "light" : "dark");
          break;

        case "m":
          event.preventDefault();
          setSidebarCollapsed(prev => !prev);
          break;

        case "s":
          event.preventDefault();
          window.dispatchEvent(new CustomEvent("focus-search"));
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [theme, setTheme, isDemoRunning, allTools, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      // ✅ IMPORTANT: when going to desktop, force-close the mobile sheet
      if (desktop) setMobileMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tool = allTools.find(t => t.path === location);

    if (tool?.metadata.title) {
      document.title = `${tool.metadata.title} | FreeDevTool.App`;
    } else {
      document.title = "FreeDevTool.App | Free Developer Tools";
    }
  }, [location, allTools]);

  return (
    <TooltipProvider>
      <div
        className="
          flex h-screen w-screen overflow-hidden
          bg-white
          dark:bg-slate-950
        "
      >
        {/* DESKTOP SIDEBAR */}
        {isDesktop && !sidebarCollapsed && !isDemoRunning && isSidebarOpen ? (
          <Sidebar
            collapsed={sidebarCollapsed}
            onExpandRequest={() => setSidebarCollapsed(false)}
          />
        ) : null}

        {/* RIGHT COLUMN */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* HEADER */}
          <div className="relative">
            {/* HEADER */}
            {!headerCollapsed && (
              <div className="h-16">
                <Header
                  onMenuClick={() => {
                    if (isDesktop) {
                      setSidebarCollapsed(v => !v);
                    } else {
                      setMobileMenuOpen(v => !v);
                    }
                  }}
                />
              </div>
            )}

            {/* HEADER TOGGLE BUTTON */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setHeaderCollapsed(v => !v)}
                  className="absolute right-6 -bottom-8 h-8 w-8 flex items-center justify-center rounded-lg bg-white shadow hover:bg-slate-100 border border-slate-400 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 transition z-20"
                  aria-label={headerCollapsed ? "Show header" : "Hide header"}
                >
                  {headerCollapsed ? (
                    <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">Toggle Header</TooltipContent>
            </Tooltip>
          </div>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-auto p-6 lg:p-8 bg-white dark:bg-slate-950 no-scrollbar mt-[10px]">
            {children}
          </main>
        </div>

        {/* MOBILE SIDEBAR */}
        {!isDesktop && (
          <Sheet
            open={!isDemoRunning && mobileMenuOpen}
            onOpenChange={open => {
              if (!isDemoRunning) setMobileMenuOpen(open);
            }}
          >
            <SheetContent
              side="left"
              className="
                w-72 p-0 border-0
                bg-white
                dark:bg-slate-950
              "
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Sidebar navigation</SheetDescription>
              </SheetHeader>

              <Sidebar
                collapsed={false}
                onToolClick={() => setMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </TooltipProvider>
  );
}
