import { Search, Moon, Sun, X, Play, Pause, PanelLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/providers/theme-provider";
import { useSearch } from "@/hooks/use-search";
import { SearchResults } from "@/components/ui/search-results";
import { getToolsCount } from "@/data/tools";
import { useState, useRef, useEffect } from "react";
import { useDemo } from "@/hooks/use-demo-hook";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const {
    isDemoRunning,
    isDemoPaused,
    startDemo,
    stopDemo,
    pauseDemo,
    resumeDemo,
    skipToNext,
    skipToPrevious,
    demoSpeed,
    setDemoSpeed,
  } = useDemo();

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedIndex,
    navigateResults,
    selectResult,
    resetSelection,
  } = useSearch();

  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.trim().length > 0);
    resetSelection();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    resetSelection();
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!showResults || searchResults.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        navigateResults("down");
        break;
      case "ArrowUp":
        event.preventDefault();
        navigateResults("up");
        break;
      case "Enter": {
        event.preventDefault();
        const selected = selectResult();
        if (selected) {
          window.location.href = selected.path;
          setShowResults(false);
          setSearchQuery("");
        }
        break;
      }
      case "Escape":
        event.preventDefault();
        setShowResults(false);
        resetSelection();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <TooltipProvider>
      <header
        className="
          h-16 px-6 flex items-center justify-between
          bg-white text-slate-900
          dark:bg-slate-950 dark:text-white dark:border-slate-800 gap-2
        "
      >
        {/* LEFT: Menu + Search */}
        <div className="flex items-center gap-3 w-full max-w-xl">
            {/* Menu Button */} 
            {!isDemoRunning && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="
                  h-9 w-9 p-0 rounded-lg transition
                  text-slate-600 hover:text-slate-900 hover:bg-slate-300 bg-slate-200
                  dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:bg-slate-800
                "
                aria-label="Toggle menu"
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
            )}
            
            {/* Search */}
            {!isDemoRunning && (
              <div
                className="relative flex-1 w-full max-w-[160px] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[380px]"
                ref={searchRef}
              >
                <Search
                  className="
                    absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
                    text-slate-500 dark:text-slate-400
                  "
                />
                <Input
                  name="search_bar"
                  type="text"
                  placeholder={`Search ${getToolsCount()} tools... (Ctrl+S)`}
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={() => setShowResults(searchQuery.trim().length > 0)}
                  className="
                    pl-10 pr-8 rounded-lg
                    bg-slate-100 text-slate-900 placeholder-slate-500
                    border border-slate-300
                    dark:bg-slate-800 dark:text-slate-100
                    dark:placeholder-slate-400 dark:border-slate-700
                  "
                  data-testid="search-input"
                />
                {searchQuery ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="
                      absolute right-2 top-1/2 -translate-y-1/2
                      h-6 w-6 p-0
                      text-slate-500 hover:text-slate-900
                      dark:text-slate-400 dark:hover:text-white
                    "
                  >
                    <X className="h-3 w-3" />
                  </Button>
                ) : null}

                {showResults ? (
                  <SearchResults
                    results={searchResults}
                    selectedIndex={selectedIndex}
                    onResultClick={() => {
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                  />
                ) : null}
              </div>
            )}
        </div>

        {/* RIGHT: Demo + Theme */}
        <div className="flex items-center gap-3">
          {/* Demo Tour */}
          {!isDemoRunning && (
            <Button
              size="sm"
              onClick={startDemo}
              className="
                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:from-indigo-600 hover:to-purple-700
                text-white rounded-lg
              "
            >
              <Play className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">
                Demo Tour ({getToolsCount()} tools)
              </span>
            </Button>
          )}

          {/* DEMO CONTROLS */}
          {isDemoRunning ? (
            <div className="flex items-center gap-1">
              {/* PREVIOUS */}
              <button
                onClick={skipToPrevious}
                className="
        flex items-center px-2 py-2 rounded-lg
        bg-white/10 text-white
        hover:bg-white/20 transition
      "
                aria-label="Previous demo step"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* PLAY / PAUSE */}
              {!isDemoPaused ? (
                <button
                  onClick={pauseDemo}
                  className="
          flex items-center px-2 py-2 rounded-lg
          bg-yellow-500/10 text-yellow-500
          hover:bg-yellow-500/20 transition
        "
                  aria-label="Pause demo"
                >
                  <Pause className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={resumeDemo}
                  className="
          flex items-center px-2 py-2 rounded-lg
          bg-green-500/10 text-green-500
          hover:bg-green-500/20 transition
        "
                  aria-label="Resume demo"
                >
                  <Play className="h-4 w-4" />
                </button>
              )}

              {/* NEXT */}
              <button
                onClick={skipToNext}
                className="
        flex items-center px-2 py-2 rounded-lg
        bg-white/10 text-white
        hover:bg-white/20 transition
      "
                aria-label="Next demo step"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* DEMO SPEED */}
              <select
                value={demoSpeed}
                onChange={(e) =>
                  setDemoSpeed(e.target.value as "slow" | "normal" | "fast" | "very-fast" | "crazy-fast")
                }
                className="
    px-1 py-1 rounded-lg text-sm
    bg-slate-800 text-slate-200
    border border-slate-700
    hover:bg-slate-700
    focus:outline-none
  "
                aria-label="Demo speed"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
                <option value="very-fast">Very Fast</option>
                <option value="crazy-fast">Crazy Fast</option>
              </select>

              {/* STOP */}
              <button
                onClick={stopDemo}
                className="
        flex items-center px-2 py-2 rounded-lg
        bg-red-500/10 text-red-500
        hover:bg-red-500/20 transition
      "
                aria-label="Stop demo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          {/* Theme Toggle */}
          {!isDemoRunning && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="
                    h-9 w-9 p-0 rounded-lg transition
                    text-slate-600 hover:text-slate-900 hover:bg-slate-300 bg-slate-200
                    dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:bg-slate-800
                  "
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme (Ctrl+D)</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
}
