import { X } from "lucide-react";
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
  onHeaderMinimize: () => void;
}

export function Header({ onMenuClick, onHeaderMinimize }: HeaderProps) {
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
          <div
            className="relative flex items-center justify-between bg-[#081028]"
            style={{
              width: '300px',
              height: '82px',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              paddingRight: '24px',
              borderRight: '1px rgba(255, 255, 255, 0.08) solid'
            }}
          >
            <div
              className="absolute"
              style={{
                width: '260px',
                height: '0px',
                left: '20px',
                top: '82px',
                outline: '1px #111F49 solid',
                outlineOffset: '-0.50px'
              }}
            />

            <div className="flex items-center" style={{ gap: '10px' }}>
              {/* Logo with cyan background */}
              <Link href="/">
                <div
                  className="flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    padding: '5px',
                    background: '#00C2FF',
                    borderRadius: '8px',
                    gap: '10px'
                  }}
                >
                  <img
                    src="/assets/favicon-32x32.png"
                    alt="FreeDevTool"
                    style={{ width: '32px', height: '32px' }}
                  />
                </div>
              </Link>

              {/* Title */}
              <div className="inline-flex flex-col" style={{ gap: '2px' }}>
                <Link href="/">
                  <h1
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    style={{
                      color: 'white',
                      fontSize: '20px',
                      fontFamily: 'Inter',
                      fontWeight: '700',
                      wordWrap: 'break-word'
                    }}
                  >
                    FreeDevTool
                  </h1>
                </Link>
                <p
                  style={{
                    color: 'white',
                    fontSize: '10px',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                  }}
                >
                  Secure Developer Tools
                </p>
              </div>
            </div>

            {/* Menu Toggle Icon */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onMenuClick}
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{
                    width: '32px',
                    height: '32px',
                    padding: '6px',
                    background: 'rgba(255, 255, 255, 0.07)',
                    borderRadius: '8px'
                  }}
                  data-testid="logo-menu-toggle"
                  aria-label="Toggle navigation menu"
                >
                  <img
                    src="/assets/header-icons/side-panel-switch-icon.svg"
                    alt="Toggle menu"
                    style={{
                      width: '20px',
                      height: '20px',
                      filter: 'brightness(0) saturate(100%) invert(78%) sepia(9%) saturate(1015%) hue-rotate(192deg) brightness(93%) contrast(88%)'
                    }}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Menu (Ctrl+M)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right Section - Search and Controls */}
          <div
            className="flex-1 flex items-center justify-between bg-[#081028]"
            style={{
              height: '82px',
              paddingTop: '16px',
              paddingBottom: '16px',
              paddingLeft: '42px',
              paddingRight: '32px',
              borderBottom: '1px #111F49 solid'
            }}
          >
            {/* Search Bar */}
            <div className="hidden md:block relative z-50" style={{ width: '360px' }} ref={searchRef}>
              <div
                className="flex items-center relative"
                style={{
                  height: '48px',
                  paddingTop: '13px',
                  paddingBottom: '13px',
                  paddingLeft: '14px',
                  paddingRight: '100px',
                  background: 'rgba(255, 255, 255, 0.07)',
                  boxShadow: '0px 2px 4px rgba(1, 5, 17, 0.20)',
                  borderRadius: '12px',
                  gap: '10px'
                }}
              >
                <div className="flex items-center" style={{ gap: '10px' }}>
                  <div
                    className="relative overflow-hidden"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <img
                      src="/assets/header-icons/search-icon.svg"
                      alt="Search"
                      className="w-full h-full"
                      style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(9%) saturate(1015%) hue-rotate(192deg) brightness(93%) contrast(88%)' }}
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder={`Search ${getToolsCount()} tools... (Ctrl+S)`}
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{
                      opacity: 0.6,
                      color: '#AEB9E1',
                      fontSize: '14px',
                      fontFamily: 'Inter',
                      fontWeight: '400',
                      wordWrap: 'break-word'
                    }}
                    data-testid="search-input"
                    onFocus={() => setShowResults(searchQuery.trim().length > 0)}
                  />
                </div>
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
                  <button
                    onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                    className="flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
                    style={{
                      width: '48px',
                      height: '48px',
                      padding: '11.75px',
                      background: 'rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                      gap: '9.40px'
                    }}
                    data-testid="mobile-search-toggle"
                    aria-label="Toggle search"
                  >
                    <div className="relative overflow-hidden" style={{ width: '30px', height: '30px' }}>
                      <img
                        src="/assets/header-icons/search-icon.svg"
                        alt="Search"
                        className="w-full h-full"
                        style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(9%) saturate(1015%) hue-rotate(192deg) brightness(93%) contrast(88%)' }}
                      />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Search (Ctrl+S)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center" style={{ gap: '16px' }}>
              {/* Demo Tour Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={startDemo}
                    className="flex items-center hover:opacity-90 transition-all"
                    style={{
                      height: '46px',
                      paddingLeft: '17.59px',
                      paddingRight: '17.59px',
                      paddingTop: '8.79px',
                      paddingBottom: '8.79px',
                      background: 'linear-gradient(168deg, #6366F1 0%, #8B5CF6 100%)',
                      boxShadow: '0px 2.931162118911743px 14.655810356140137px rgba(99, 102, 241, 0.30)',
                      borderRadius: '12px',
                      gap: '5.86px'
                    }}
                    data-testid="start-demo-button"
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ width: '24px', height: '24px' }}
                    >
                      <img
                        src="/assets/header-icons/demo-button-play.svg"
                        alt="Play"
                        className="w-full h-full"
                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                      />
                    </div>
                    <div
                      className="text-center flex justify-center"
                      style={{
                        color: 'white',
                        fontSize: '15.26px',
                        fontFamily: 'Arial',
                        fontWeight: '700',
                        wordWrap: 'break-word'
                      }}
                    >
                      Demo Tour ({totalTools} tools)
                    </div>
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
                    className="flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
                    style={{
                      width: '48px',
                      height: '48px',
                      padding: '11.75px',
                      background: 'rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                      gap: '9.40px'
                    }}
                    data-testid="theme-toggle"
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode (CTRL+D)`}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ width: '30px', height: '30px' }}
                    >
                      <img
                        src="/assets/header-icons/themeicon.svg"
                        alt="Theme"
                        className="w-full h-full"
                        style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(9%) saturate(1015%) hue-rotate(192deg) brightness(93%) contrast(88%)' }}
                      />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {theme === "dark" ? "Light" : "Dark"} Mode (Ctrl+D)</p>
                </TooltipContent>
              </Tooltip>

              {/* Header Minimize Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onHeaderMinimize}
                    className="flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity"
                    style={{
                      width: '48px',
                      height: '48px',
                      padding: '11.75px',
                      background: 'rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                      gap: '9.40px'
                    }}
                    data-testid="header-minimize-button"
                    aria-label="Minimize header"
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: '30px',
                        height: '30px'
                      }}
                    >
                      <img
                        src="/assets/header-icons/header-minimize.svg"
                        alt="Minimize"
                        className="w-full h-full"
                        style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(9%) saturate(1015%) hue-rotate(192deg) brightness(93%) contrast(88%)' }}
                      />
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Minimize Header</p>
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
            <div
              className="flex items-center relative"
              style={{
                height: '48px',
                paddingTop: '13px',
                paddingBottom: '13px',
                paddingLeft: '14px',
                paddingRight: '14px',
                background: 'rgba(255, 255, 255, 0.07)',
                boxShadow: '0px 2px 4px rgba(1, 5, 17, 0.20)',
                borderRadius: '12px',
                gap: '10px'
              }}
            >
              <div className="flex items-center flex-1" style={{ gap: '10px' }}>
                <div
                  className="relative overflow-hidden flex-shrink-0"
                  style={{ width: '20px', height: '20px' }}
                >
                  <img
                    src="/assets/header-icons/search-icon.svg"
                    alt="Search"
                    className="w-full h-full"
                    style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(9%) saturate(1015%) hue-rotate(192deg) brightness(93%) contrast(88%)' }}
                  />
                </div>
                <Input
                  type="text"
                  placeholder={`Search ${getToolsCount()} tools... (Ctrl+S)`}
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                  style={{
                    opacity: 0.6,
                    color: '#AEB9E1',
                    fontSize: '14px',
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                  }}
                  data-testid="mobile-search-input"
                  autoFocus
                />
              </div>
              {searchQuery ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="h-6 w-6 p-0 hover:bg-transparent flex-shrink-0"
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
