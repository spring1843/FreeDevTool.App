import { Search, Moon, Sun, Menu, X, Play, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/providers/theme-provider";
import { Link } from "wouter";
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
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedIndex,
    navigateResults,
    selectResult,
    resetSelection,
  } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { startDemo, totalTools } = useDemo();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.trim().length > 0);
    resetSelection(); // Reset selection when search changes
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
    setIsMobileSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    resetSelection();
  };

  const focusSearch = () => {
    const searchInput = document.querySelector(
      '[data-testid="search-input"]'
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  };

  // Close search results when clicking outside
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

  // Handle keyboard navigation in search
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
          // Navigate to the selected result
          window.location.href = selected.path;
          handleResultClick();
        }
        break;
      }
      case "Escape":
        event.preventDefault();
        setShowResults(false);
        resetSelection();
        (event.target as HTMLInputElement).blur();
        break;
      default: {
        // Handle default case
      }
    }
  };

  // Add Ctrl+S keyboard shortcut for search
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        focusSearch();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <TooltipProvider>
      <header className="bg-[#081028] border-b border-[#111F49] relative">
        <div className="w-full flex items-center justify-between">
          {/* Left Section - Logo and Title */}
          <div className="w-[300px] h-[82px] px-4 py-3 border-r border-[#ffffff14] flex items-center justify-between relative">
            <div className="absolute bottom-0 left-5 w-[260px] h-px bg-[#111F49]" />

            <div className="flex items-center gap-2.5">
              {/* Logo with cyan background */}
              <Link href="/">
                <div className="p-1.5 bg-[#00C2FF] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                  <img
                    src="/assets/favicon-32x32.png"
                    alt="FreeDevTool"
                    className="w-8 h-8"
                  />
                </div>
              </Link>

              {/* Title */}
              <div className="flex flex-col gap-0.5">
                <Link href="/">
                  <h1 className="text-white text-xl font-bold leading-tight cursor-pointer hover:opacity-90 transition-opacity">
                    FreeDevTool
                  </h1>
                </Link>
                <p className="text-white text-[10px] font-normal leading-tight">
                  Secure Developer Tools
                </p>
              </div>
            </div>

            {/* Collapse/Expand Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onMenuClick}
                  className="w-5 h-5 flex items-center justify-center hover:opacity-80 transition-opacity"
                  data-testid="logo-menu-toggle"
                  aria-label="Toggle navigation menu"
                >
                  <ChevronLeft className="w-4 h-4 text-[#AEB9E1]" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Menu (Ctrl+M)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right Section - Search and Controls */}
          <div className="flex-1 h-[82px] px-8 py-4 flex items-center justify-between">
            {/* Search Bar */}
            <div className="hidden md:block relative z-50 w-[360px]" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#AEB9E1] h-5 w-5 z-10" />
                <Input
                  type="text"
                  placeholder={`Search ${getToolsCount()} tools... (Ctrl+S)`}
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="h-12 pl-10 pr-8 bg-[#ffffff12] border-0 rounded-xl text-[#AEB9E1] placeholder:text-[#AEB9E199] text-sm shadow-[0px_2px_4px_rgba(1,5,17,0.2)] focus-visible:ring-1 focus-visible:ring-[#00C2FF]"
                  data-testid="search-input"
                  onFocus={() => setShowResults(searchQuery.trim().length > 0)}
                />
                {searchQuery ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                        data-testid="desktop-clear-search"
                      >
                        <X className="h-3 w-3 text-[#AEB9E1] hover:text-white" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear Search</p>
                    </TooltipContent>
                  </Tooltip>
                ) : null}
              </div>
              {showResults ? (
                <SearchResults
                  results={searchResults}
                  onResultClick={handleResultClick}
                  selectedIndex={selectedIndex}
                />
              ) : null}
            </div>

            {/* Mobile Search Toggle */}
            <div className="md:hidden">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-12 w-12 p-0 rounded-xl bg-[#ffffff12] hover:bg-[#ffffff1a] transition-colors"
                    onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                    data-testid="mobile-search-toggle"
                    aria-label="Toggle search"
                  >
                    <Search className="h-5 w-5 text-[#AEB9E1]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Search (Ctrl+S)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* Demo Tour Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={startDemo}
                    className="h-[46px] px-[18px] py-2.5 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] hover:from-[#5558E3] hover:to-[#7C4DE7] rounded-xl shadow-[0px_3px_15px_rgba(99,102,241,0.3)] flex items-center gap-1.5 transition-all hover:scale-105"
                    data-testid="start-demo-button"
                  >
                    <Play className="w-5 h-5 text-white fill-white" />
                    <span className="text-white text-[15px] font-bold leading-tight">
                      Demo Tour ({totalTools} tools)
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start Interactive Demo Tour</p>
                </TooltipContent>
              </Tooltip>

              {/* Theme Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleTheme}
                    className="w-12 h-12 p-3 bg-[#ffffff12] hover:bg-[#ffffff1a] rounded-xl flex items-center justify-center transition-colors"
                    data-testid="theme-toggle"
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode (CTRL+D)`}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-6 h-6 text-[#AEB9E1]" />
                    ) : (
                      <Moon className="w-6 h-6 text-[#AEB9E1]" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {theme === "dark" ? "Light" : "Dark"} Mode (Ctrl+D)</p>
                </TooltipContent>
              </Tooltip>

              {/* Menu Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onMenuClick}
                    className="w-12 h-12 p-3 bg-[#ffffff12] hover:bg-[#ffffff1a] rounded-xl flex items-center justify-center transition-colors"
                    data-testid="menu-button"
                    aria-label="Toggle navigation menu"
                  >
                    <Menu className="w-6 h-6 text-[#AEB9E1]" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Menu (Ctrl+M)</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen ? (
          <div
            className="md:hidden border-t border-[#111F49] p-4 relative z-50"
            ref={searchRef}
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#AEB9E1] h-5 w-5 z-10" />
              <Input
                type="text"
                placeholder={`Search ${getToolsCount()} tools... (Ctrl+S)`}
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="h-12 pl-10 pr-8 w-full bg-[#ffffff12] border-0 rounded-xl text-[#AEB9E1] placeholder:text-[#AEB9E199] text-sm"
                data-testid="mobile-search-input"
                autoFocus
              />
              {searchQuery ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                      data-testid="mobile-clear-search"
                    >
                      <X className="h-3 w-3 text-[#AEB9E1] hover:text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear Search</p>
                  </TooltipContent>
                </Tooltip>
              ) : null}
            </div>
            {showResults ? (
              <SearchResults
                results={searchResults}
                onResultClick={handleResultClick}
                selectedIndex={selectedIndex}
                className="mt-2 relative"
              />
            ) : null}
          </div>
        ) : null}
      </header>
    </TooltipProvider>
  );
}
