import clsx from "clsx";
import svgPaths from "../../imports/svg-3vrq16klz5";
import { Moon, Sun, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDemo } from "@/hooks/use-demo-hook";

interface HomeHeaderProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
  headerMinimized: boolean;
  setHeaderMinimized: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  showSearchDropdown: boolean;
  setShowSearchDropdown: (value: boolean) => void;
  selectedSearchIndex: number;
  setSelectedSearchIndex: (value: number) => void;
  filteredTools: any[];
  handleToolClick: (toolName: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchFocus: () => void;
  handleSearchBlur: () => void;
  searchRef: React.RefObject<HTMLDivElement>;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentColors: any;
}

export function HomeHeader({
  sidebarCollapsed,
  setSidebarCollapsed,
  headerMinimized,
  setHeaderMinimized,
  searchQuery,
  setSearchQuery,
  showSearchDropdown,
  setShowSearchDropdown,
  selectedSearchIndex,
  setSelectedSearchIndex,
  filteredTools,
  handleToolClick,
  handleSearchChange,
  handleSearchKeyDown,
  handleSearchFocus,
  handleSearchBlur,
  searchRef,
  theme,
  toggleTheme,
  currentColors
}: HomeHeaderProps) {
  const { startDemo } = useDemo();
  
  return (
    <>
      <div className="absolute content-stretch flex items-center justify-between left-0 right-0 top-0 z-10" data-name="Header">
        <div className={clsx(
          "content-stretch flex items-center justify-between pl-[16px] pr-[24px] relative shrink-0 transition-all duration-300 overflow-hidden",
          sidebarCollapsed ? "w-[80px]" : "w-[300px]",
          headerMinimized ? "h-0 py-0" : "h-[82px] py-[12px]"
        )} style={{ backgroundColor: currentColors.bg }} data-name="Left">
          <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" style={{ borderColor: currentColors.border }} />
          <div className="absolute bottom-0 h-0 left-[20px] right-[20px]" data-name="Divider">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 260 1">
                <line id="Divider" stroke={currentColors.divider} x2="260" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <div className={clsx(
            "content-stretch flex gap-[10px] items-center relative shrink-0 transition-all duration-300",
            sidebarCollapsed && "opacity-0 pointer-events-none w-0"
          )} data-name="Full Logo">
            <div className="bg-[#00c2ff] content-stretch flex items-center p-[5px] relative rounded-[8px] shrink-0" data-name="Icon">
              <div className="relative shrink-0 size-[32px]" data-name="image 1">
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic relative shrink-0" style={{ color: currentColors.text }} data-name="Logo">
              <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[20px] text-nowrap">FreeDevTool</p>
              <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[10px] w-[min-content]">Secure Developer Tools</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex items-center justify-center relative shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <div className={clsx(
              "flex-none transition-transform duration-300",
              sidebarCollapsed ? "rotate-0 scale-y-100" : "rotate-[180deg] scale-y-[-100%]"
            )}>
              <div className={clsx(
                "relative transition-all duration-300",
                sidebarCollapsed ? "size-[32px]" : "size-[20px]"
              )} data-name="Sidepanel Minimize">
                {sidebarCollapsed ? (
                  <div className="bg-[#00c2ff] content-stretch flex items-center justify-center p-[3px] relative rounded-[6px] size-full">
                  </div>
                ) : (
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g id="Sidepanel Minimize">
                      <path d={svgPaths.p164bfe00} id="Vector" stroke={currentColors.textSecondary} strokeWidth="1.46875" />
                      <path d="M7.91667 2.5V17.5" id="Vector_2" stroke={currentColors.textSecondary} strokeLinejoin="round" strokeWidth="1.46875" />
                      <path d={svgPaths.p271ce780} id="Vector_3" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.46875" />
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </button>
        </div>
        <div className={clsx(
          "content-stretch flex items-center justify-between pl-[24px] md:pl-[42px] pr-[24px] md:pr-[32px] relative shrink-0 transition-all duration-300",
          sidebarCollapsed ? "w-[calc(100%-80px)]" : "w-[calc(100%-300px)]",
          headerMinimized ? "h-0 py-0" : "h-[82px] py-[16px]"
        )} style={{ backgroundColor: currentColors.bg }} data-name="Right">
          <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid inset-0 pointer-events-none" style={{ borderColor: currentColors.divider }} />
          
          {/* Search Field with Dropdown */}
          <div ref={searchRef} className={clsx(
            "relative w-full max-w-[360px] transition-all duration-300",
            headerMinimized ? "opacity-0 pointer-events-none scale-95" : "opacity-100 pointer-events-auto scale-100"
          )}>
            <div className={clsx(
              "content-stretch flex h-[48px] items-center pl-[14px] pr-[20px] py-[13px] relative rounded-[12px] shrink-0 w-full transition-colors border",
              theme === 'dark' ? 'shadow-[0px_2px_4px_0px_rgba(1,5,17,0.2)]' : ''
            )}
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : '#ffffff',
                borderColor: theme === 'dark' ? 'transparent' : currentColors.border
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.09)' : '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : '#ffffff'}
              data-name="Search Field">
              <div className="content-stretch flex gap-[10px] items-center relative w-full">
                <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Search">
                  <div className="absolute inset-[8.33%]" data-name="safearea">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                      <g id="safearea">
                        <path d={svgPaths.p1b971580} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeWidth="1.5" />
                      </g>
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="Search 47 tools... (Ctrl+S)"
                  style={{ color: currentColors.textSecondary }}
                  className="bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] font-normal text-[14px] opacity-60 focus:opacity-100 transition-opacity w-full placeholder:opacity-60"
                />
              </div>
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && filteredTools.length > 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 w-full min-w-[360px] max-w-[500px] border rounded-[12px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.4)] max-h-[70vh] overflow-y-auto backdrop-blur-[10px] custom-scrollbar"
                style={{
                  backgroundColor: theme === 'dark' ? '#0a1330' : '#ffffff',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  zIndex: 9999
                }}>
                <div className="py-[8px]">
                  {filteredTools.map((tool, index) => {
                    const IconComponent = tool.icon;
                    return (
                      <button
                        key={tool.name}
                        onClick={() => handleToolClick(tool.name)}
                        onMouseEnter={() => setSelectedSearchIndex(index)}
                        className="w-full px-[16px] py-[12px] flex items-start gap-[12px] transition-colors cursor-pointer group text-left"
                        style={{
                          backgroundColor: selectedSearchIndex === index 
                            ? (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)')
                            : 'transparent'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}
                        onMouseOut={(e) => {
                          if (selectedSearchIndex !== index) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div className="shrink-0 mt-[2px]">
                          <div className="p-[8px] rounded-[8px] transition-colors"
                            style={{
                              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
                            }}>
                            <IconComponent className="size-[16px] transition-colors" style={{ color: currentColors.textSecondary }} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-[12px] mb-[4px] flex-wrap">
                            <h4 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] truncate" style={{ color: currentColors.text }}>
                              {tool.name}
                            </h4>
                            <span className="font-['Inter:Regular',sans-serif] text-[10px] opacity-60 shrink-0 hidden sm:inline" style={{ color: currentColors.textSecondary }}>
                              {tool.shortcut}
                            </span>
                          </div>
                          <div className="flex items-center gap-[8px] mb-[6px]">
                            <span className="inline-flex items-center px-[8px] py-[2px] rounded-[4px] font-['Inter:Medium',sans-serif] text-[10px]"
                              style={{
                                backgroundColor: theme === 'dark' ? 'rgba(85,214,255,0.1)' : 'rgba(0,145,204,0.1)',
                                borderColor: theme === 'dark' ? 'rgba(85,214,255,0.2)' : 'rgba(0,145,204,0.2)',
                                color: currentColors.accentText,
                                border: '1px solid'
                              }}>
                              {tool.category}
                            </span>
                          </div>
                          <p className="font-['Inter:Regular',sans-serif] text-[12px] leading-[16px] line-clamp-2" style={{ color: currentColors.textMuted }}>
                            {tool.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {showSearchDropdown && searchQuery.trim() && filteredTools.length === 0 && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 w-full min-w-[360px] max-w-[500px] border rounded-[12px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.4)] backdrop-blur-[10px]"
                style={{
                  backgroundColor: theme === 'dark' ? '#0a1330' : '#ffffff',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  zIndex: 9999
                }}>
                <div className="py-[24px] px-[16px] text-center">
                  <Search className="size-[32px] opacity-30 mx-auto mb-[12px]" style={{ color: currentColors.textSecondary }} />
                  <p className="font-['Inter:Medium',sans-serif] text-[14px]" style={{ color: currentColors.textSecondary }}>No tools found</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[12px] mt-[4px]" style={{ color: currentColors.textMuted }}>Try a different search term</p>
                </div>
              </div>
            )}
          </div>

          <div className={clsx(
            "content-stretch flex gap-[12px] md:gap-[16px] items-center relative shrink-0 transition-all duration-300",
            headerMinimized ? "opacity-0 pointer-events-none scale-95" : "opacity-100 pointer-events-auto scale-100"
          )} data-name="Right Actions">
            <button 
              onClick={startDemo}
              className="h-[46px] relative rounded-[12px] shadow-[0px_2.931px_14.656px_0px_rgba(99,102,241,0.3)] shrink-0 hover:shadow-[0px_4px_20px_0px_rgba(99,102,241,0.5)] hover:scale-105 transition-all cursor-pointer hidden md:block" 
              data-name="Demo Tour Buttons" 
              style={{ backgroundImage: "linear-gradient(134.42deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 100%)" }}
              aria-label="Start demo tour"
            >
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex gap-[5.862px] h-full items-center px-[17.587px] py-[10px] relative">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Play Circle">
                    <div className="absolute inset-[8.33%]" data-name="safearea">
                      <div className="absolute inset-[-3.75%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
                          <g id="safearea">
                            <g id="Vector">
                              <path d={svgPaths.p29ccc300} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
                              <path d={svgPaths.p237c5700} stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-['Arial:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15.26px] text-center text-nowrap text-white">
                    <p className="leading-[normal]">Demo Tour (47 tools)</p>
                  </div>
                </div>
              </div>
            </button>
            <button 
              onClick={toggleTheme}
              className="content-stretch flex items-center justify-center overflow-clip p-[11.75px] relative rounded-[12px] shrink-0 size-[48px] transition-all cursor-pointer" 
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}
              data-name="Theme Switch" 
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="size-[24px] transition-all" style={{ color: currentColors.textSecondary }} />
              ) : (
                <Moon className="size-[24px] transition-all" style={{ color: currentColors.textSecondary }} />
              )}
            </button>
          </div>
        </div>
      </div>
      <button 
        onClick={() => setHeaderMinimized(!headerMinimized)}
        className={clsx(
          "absolute content-stretch flex h-[20px] items-center justify-center overflow-clip pb-[4px] pt-[2px] px-[8px] right-[32px] rounded-bl-[4px] rounded-br-[4px] w-[48px] transition-all duration-300 cursor-pointer z-20",
          headerMinimized ? "top-0" : "top-[82px]"
        )}
        style={{ 
          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}
        data-name="Header Minimize"
        aria-label={headerMinimized ? "Expand header" : "Minimize header"}
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div className={clsx(
            "flex-none transition-transform duration-300",
            headerMinimized ? "scale-y-[100%] rotate-0" : "scale-y-[-100%] rotate-0"
          )}>
            <svg className="block size-[13.333px]" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
              <g id="safearea">
                <path d={svgPaths.p34af4380} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </button>
    </>
  );
}
