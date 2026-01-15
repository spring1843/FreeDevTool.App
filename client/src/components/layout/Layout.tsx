import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ChevronUp, ChevronDown } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Layout({ children }: { children: React.ReactNode }) {
  const [headerCollapsed, setHeaderCollapsed] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // ensure correct on first load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {isDesktop ? (
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
            <button
              onClick={() => setHeaderCollapsed(v => !v)}
              className="absolute - right-6 + right-2 -bottom-8 h-8 w-8 flex items-center justify-center rounded-lg bg-white shadow hover:bg-slate-100 border border-slate-400 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 transition z-20"
              aria-label={headerCollapsed ? "Show header" : "Hide header"}
            >
              {headerCollapsed ? (
                <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              ) : (
                <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>

          {/* MAIN CONTENT */}
          <main className="flex-1 overflow-auto p-6 lg:p-8 bg-white dark:bg-slate-950 no-scrollbar mt-[10px]">
            {children}
          </main>
        </div>

        {/* MOBILE SIDEBAR */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
      </div>
    </TooltipProvider>
  );
}
