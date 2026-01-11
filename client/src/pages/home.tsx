import svgPaths from "../imports/svg-3vrq16klz5";
import clsx from "clsx";
import imgImage1 from "../../assets/cc6f2cda9a25c54a6f83a4fd1205dc5119a27992.png";
import { useState, useRef, useEffect } from "react";
import React from "react";
import { useLocation } from "wouter";
import { useDemo } from "@/hooks/use-demo-hook";
import { 
  Calendar, FileJson, Globe, Ruler, Link2, FileText, Binary,
  Code, Code2, FileCode, Sparkles, Timer, Hash, Lock, Key, Shield,
  FileSearch, Braces, ListOrdered, FileType, QrCode, Barcode, Type, Languages,
  KeyRound, Fingerprint, Search, Replace, SplitSquareVertical,
  Clock, TimerIcon, StopCircle, CalendarClock, Diff, Music,
  DollarSign, CreditCard, Palette, Camera, Mic, Keyboard, Info, Moon, Sun,
  Square, SkipForward, SkipBack, Play, Pause
} from "lucide-react";

// Tool data structure
const allTools = [
  // Conversions
  { name: "Date Converter", category: "Conversions", icon: Calendar, shortcut: "Ctrl+Shift+1", description: "Convert dates between various formats including ISO 8601, Unix timestamps, and more." },
  { name: "JSON → YAML", category: "Conversions", icon: FileJson, shortcut: "Ctrl+Shift+2", description: "Transform JSON data into YAML format, making your configuration files more human-readable." },
  { name: "Timezone Converter", category: "Conversions", icon: Globe, shortcut: "Ctrl+Shift+3", description: "Convert times between different timezones effortlessly." },
  { name: "Unit Converter", category: "Conversions", icon: Ruler, shortcut: "Ctrl+Shift+4", description: "Convert between various units of measurement." },
  { name: "URL to JSON", category: "Conversions", icon: Link2, shortcut: "Ctrl+Shift+5", description: "Convert URL parameters to JSON format." },
  { name: "CSV to JSON", category: "Conversions", icon: FileText, shortcut: "Ctrl+Shift+6", description: "Transform CSV data into JSON format." },
  { name: "Number Base Converter", category: "Conversions", icon: Binary, shortcut: "Ctrl+Shift+7", description: "Convert numbers between different bases (binary, hex, decimal)." },
  
  // Formatters
  { name: "JSON Formatter", category: "Formatter", icon: Code, shortcut: "Ctrl+Shift+J", description: "Beautify and format JSON data." },
  { name: "JSONC Formatter", category: "Formatter", icon: Code2, shortcut: "Ctrl+Shift+C", description: "Format JSON with comments." },
  { name: "HTML Beautifier", category: "Formatter", icon: FileCode, shortcut: "Ctrl+Shift+H", description: "Format and beautify HTML code." },
  { name: "YAML Formatter", category: "Formatter", icon: FileJson, shortcut: "Ctrl+Shift+Y", description: "Format and validate YAML files." },
  { name: "Markdown Formatter", category: "Formatter", icon: FileText, shortcut: "Ctrl+Shift+M", description: "Format markdown documents." },
  { name: "CSS/LESS/SCSS Formatter", category: "Formatter", icon: Sparkles, shortcut: "Ctrl+Shift+S", description: "Format CSS and preprocessor files." },
  { name: "JavaScript/TypeScript Formatter", category: "Formatter", icon: Code, shortcut: "Ctrl+Shift+T", description: "Format JavaScript and TypeScript code." },
  { name: "GraphQL Formatter", category: "Formatter", icon: Braces, shortcut: "Ctrl+Shift+G", description: "Format GraphQL queries and schemas." },
  { name: "Time Formatter", category: "Formatter", icon: Clock, shortcut: "Ctrl+Shift+F", description: "Format time in various formats." },
  
  // Encoders
  { name: "Base64 Encoder", category: "Encoders", icon: Binary, shortcut: "Ctrl+E+1", description: "Encode/decode Base64 strings." },
  { name: "URL Encoder", category: "Encoders", icon: Link2, shortcut: "Ctrl+E+2", description: "Encode/decode URL strings." },
  { name: "JWT Decoder", category: "Encoders", icon: Key, shortcut: "Ctrl+E+3", description: "Decode and inspect JWT tokens." },
  { name: "TLS Certificate Decoder", category: "Encoders", icon: Shield, shortcut: "Ctrl+E+4", description: "Decode and inspect TLS certificates." },
  { name: "MD5 Hash", category: "Encoders", icon: Hash, shortcut: "Ctrl+E+5", description: "Generate MD5 hashes." },
  { name: "BCrypt Hash", category: "Encoders", icon: Lock, shortcut: "Ctrl+E+6", description: "Generate BCrypt hashes." },
  
  // Text Tools
  { name: "Text Diff", category: "Text Tools", icon: Diff, shortcut: "Ctrl+T+1", description: "Compare two text files." },
  { name: "Regex Tester", category: "Text Tools", icon: FileSearch, shortcut: "Ctrl+T+2", description: "Test regular expressions." },
  { name: "Text Sorter", category: "Text Tools", icon: ListOrdered, shortcut: "Ctrl+T+3", description: "Sort text lines." },
  { name: "Word Counter", category: "Text Tools", icon: FileType, shortcut: "Ctrl+T+4", description: "Count words and characters." },
  { name: "QR Generator", category: "Text Tools", icon: QrCode, shortcut: "Ctrl+T+5", description: "Generate QR codes." },
  { name: "Barcode Generator", category: "Text Tools", icon: Barcode, shortcut: "Ctrl+T+6", description: "Generate barcodes." },
  { name: "Lorem Generator", category: "Text Tools", icon: Type, shortcut: "Ctrl+T+7", description: "Generate Lorem Ipsum text." },
  { name: "Unicode Characters", category: "Text Tools", icon: Languages, shortcut: "Ctrl+T+8", description: "Browse Unicode characters." },
  { name: "Password Generator", category: "Text Tools", icon: KeyRound, shortcut: "Ctrl+T+9", description: "Generate secure passwords." },
  { name: "UUID Generator", category: "Text Tools", icon: Fingerprint, shortcut: "Ctrl+T+0", description: "Generate UUIDs." },
  { name: "Search & Replace", category: "Text Tools", icon: Replace, shortcut: "Ctrl+T+S", description: "Search and replace in text." },
  { name: "Text Split", category: "Text Tools", icon: SplitSquareVertical, shortcut: "Ctrl+T+X", description: "Split text by delimiter." },
  
  // Time Tools
  { name: "World Clock", category: "Time Tools", icon: Globe, shortcut: "Ctrl+W+1", description: "View times around the world." },
  { name: "Timer", category: "Time Tools", icon: TimerIcon, shortcut: "Ctrl+W+2", description: "Set a countdown timer." },
  { name: "Stopwatch", category: "Time Tools", icon: StopCircle, shortcut: "Ctrl+W+3", description: "Track elapsed time." },
  { name: "Countdown", category: "Time Tools", icon: CalendarClock, shortcut: "Ctrl+W+4", description: "Countdown to a specific date." },
  { name: "Date/Time Difference", category: "Time Tools", icon: Diff, shortcut: "Ctrl+W+5", description: "Calculate time differences." },
  { name: "Metronome", category: "Time Tools", icon: Music, shortcut: "Ctrl+W+6", description: "Digital metronome." },
  
  // Financial Tools
  { name: "Compound Interest", category: "Financial Tools", icon: DollarSign, shortcut: "Ctrl+F+1", description: "Calculate compound interest." },
  { name: "Debt Repayment", category: "Financial Tools", icon: CreditCard, shortcut: "Ctrl+F+2", description: "Plan debt repayment." },
  
  // Color Tools
  { name: "Color Palette Generator", category: "Color Tools", icon: Palette, shortcut: "Ctrl+C+1", description: "Generate color palettes." },
  
  // System
  { name: "Camera Test", category: "System", icon: Camera, shortcut: "Ctrl+S+1", description: "Test your camera." },
  { name: "Microphone Test", category: "System", icon: Mic, shortcut: "Ctrl+S+2", description: "Test your microphone." },
  { name: "Keyboard Test", category: "System", icon: Keyboard, shortcut: "Ctrl+S+3", description: "Test your keyboard." },
  { name: "Browser Info", category: "System", icon: Info, shortcut: "Ctrl+S+4", description: "View browser information." },
];

function BackgroundBorderOverlayBlurBackgroundImage({ children, theme }: React.PropsWithChildren<{ theme?: 'dark' | 'light' }>) {
  const bgGradient = theme === 'light' 
    ? "linear-gradient(135.827deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.04) 100%)"
    : "linear-gradient(135.827deg, rgba(255, 255, 255, 0.024) 0%, rgba(255, 255, 255, 0.035) 100%)";
  
  return (
    <div style={{ backgroundImage: bgGradient }} className="backdrop-blur-[7.472px] backdrop-filter w-full relative rounded-[20px]">
      {children}
    </div>
  );
}

function BackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className="flex items-center justify-center relative shrink-0 size-[16px]">
      {children}
    </div>
  );
}

type BackgroundImage1Props = {
  additionalClassNames?: string;
  text: string;
  icon?: any;
  textColor?: string;
  iconColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
};

function BackgroundImage1({ children, additionalClassNames = "", text, icon: Icon, textColor = "#aeb9e1", iconColor = "#aeb9e1", bgColor, hoverBgColor }: React.PropsWithChildren<BackgroundImage1Props>) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className={clsx("h-[44px] relative rounded-[4px] shrink-0 w-full", additionalClassNames)}
      style={{ backgroundColor: isHovered && hoverBgColor ? hoverBgColor : bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[58px] pr-[20px] py-[12px] relative size-full">
          <div className="content-stretch flex items-center gap-[8px] relative shrink-0">
            {Icon && <Icon className="size-[14px] opacity-60" style={{ color: iconColor }} />}
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap" style={{ color: textColor }}>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type ComponentBackgroundImageProps = {
  additionalClassNames?: string;
  style?: React.CSSProperties;
};

function ComponentBackgroundImage({ children, additionalClassNames = "", style }: React.PropsWithChildren<ComponentBackgroundImageProps>) {
  return (
    <div className={clsx("h-[46px] relative rounded-[12px] shrink-0 w-full", additionalClassNames)} style={style}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[10px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

function SafeareaBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[8.33%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="safearea">{children}</g>
      </svg>
    </div>
  );
}

type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
        <g id="safearea">{children}</g>
      </svg>
    </div>
  );
}

type OverlayBorderBackgroundImage1Props = {
  additionalClassNames?: string;
};

function OverlayBorderBackgroundImage1({ additionalClassNames = "", bgColor, borderColor, textColor, iconColor }: OverlayBorderBackgroundImage1Props & { bgColor?: string; borderColor?: string; textColor?: string; iconColor?: string }) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className="h-[38px] relative rounded-[12px] shrink-0 w-full transition-colors cursor-pointer"
      style={{ 
        backgroundColor: isHovered 
          ? (bgColor?.replace('0.08', '0.12') || 'rgba(255,255,255,0.12)')
          : (bgColor || 'rgba(255,255,255,0.08)')
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[12px]" style={{ borderColor: borderColor || 'rgba(255,255,255,0.15)' }} />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[9.714px] py-[5.23px] relative size-full">
          <BackgroundImageAndText text="Open Tool" additionalClassNames="text-[14px]" style={{ color: textColor || '#55d6ff' }} />
          <div className="relative shrink-0 size-[16px]">
            <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
              <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <g id="Icon Frame">
                    <g id="Base"></g>
                    <path d={svgPaths.p3dc64a80} id="Vector" stroke={iconColor || '#55D6FF'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ContainerBackgroundImageProps = {
  text: string;
  text1: string;
  textColor?: string;
};

function ContainerBackgroundImage({ text, text1, textColor = "#94a3b8" }: ContainerBackgroundImageProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[17.186px] not-italic relative shrink-0 text-[10.76px]" style={{ color: textColor }}>
        <p className="mb-0">{text}</p>
        <p>{text1}</p>
      </div>
    </div>
  );
}

type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
  style?: React.CSSProperties;
};

function BackgroundImageAndText({ text, additionalClassNames = "", style }: BackgroundImageAndTextProps) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100", ...style }} className={clsx("flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-nowrap", additionalClassNames)}>
      <p className="leading-[normal]">{text}</p>
    </div>
  );
}

type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text, textColor = "#f1f5f9" }: HeadingBackgroundImageAndTextProps & { textColor?: string }) {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14.944px] text-nowrap" style={{ color: textColor }}>
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}

function OverlayBorderBackgroundImage() {
  return (
    <div className="bg-[rgba(255,255,255,0.08)] content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]">
      <div aria-hidden="true" className="absolute border-[0.747px] border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[7.472px]" />
      <div className="relative shrink-0 size-[20px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Calendar / Calendar_Days">
            <path d={svgPaths.p23539900} id="Vector" stroke="var(--stroke-0, #AEB9E1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="basis-0 content-stretch flex gap-[6px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#99a0ae] text-[14px] text-nowrap tracking-[-0.084px]">
        <p className="leading-[20px]">{text}</p>
      </div>
    </div>
  );
}

type SafeareaBackgroundImageProps = {
  additionalClassNames?: string;
  strokeColor?: string;
};

function SafeareaBackgroundImage({ additionalClassNames = "", strokeColor = "#AEB9E1" }: SafeareaBackgroundImageProps) {
  return (
    <BackgroundImage additionalClassNames={additionalClassNames}>
      <path d={svgPaths.p34af4380} id="Vector" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </BackgroundImage>
  );
}

interface HomeProps {
  isToolPage?: boolean;
  children?: React.ReactNode;
}

export default function App({ isToolPage = false, children }: HomeProps = {}) {
  const { 
    startDemo, 
    isDemoRunning,
    isDemoPaused,
    currentDemoTool,
    demoProgress,
    demoSpeed,
    stopDemo,
    pauseDemo,
    resumeDemo,
    skipToNext,
    skipToPrevious,
    setDemoSpeed
  } = useDemo();
  const [location, setLocation] = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerMinimized, setHeaderMinimized] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    home: false,
    conversions: false,
    formatters: false,
    encoders: false,
    textTools: false,
    timeTools: false,
    financialTools: false,
    colorTools: false,
    system: false
  });
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Theme colors
  const colors = {
    dark: {
      bg: '#081028',
      cardBg: 'rgba(255,255,255,0.04)',
      cardBgHover: 'rgba(255,255,255,0.06)',
      cardBgActive: 'rgba(255,255,255,0.08)',
      border: 'rgba(255,255,255,0.08)',
      text: '#ffffff',
      textSecondary: '#aeb9e1',
      textMuted: '#99A0AE',
      accent: '#00c2ff',
      accentText: '#55d6ff',
      inputBg: 'rgba(255,255,255,0.04)',
      divider: '#111F49',
      gradient1: 'rgba(87, 240, 217, 0.2)',
      gradient2: 'rgba(100, 132, 255, 0.2)',
      privacyBg: 'rgba(10, 19, 48, 0.6)',
    },
    light: {
      bg: '#f5f7fa',
      cardBg: '#ffffff',
      cardBgHover: '#f0f2f5',
      cardBgActive: '#e8eaed',
      border: 'rgba(0,0,0,0.08)',
      text: '#081028',
      textSecondary: '#4a5568',
      textMuted: '#718096',
      accent: '#0091cc',
      accentText: '#0091cc',
      inputBg: '#ffffff',
      divider: '#e2e8f0',
      gradient1: 'rgba(87, 240, 217, 0.15)',
      gradient2: 'rgba(100, 132, 255, 0.15)',
      privacyBg: 'rgba(255, 255, 255, 0.9)',
    }
  };

  const currentColors = colors[theme];

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => {
      // Create new state with all menus collapsed
      const newState: { [key: string]: boolean } = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      // Only expand the clicked menu if it was previously collapsed
      newState[menuKey] = !prev[menuKey];
      return newState;
    });
  };

  const getToolPath = (toolName: string) => {
    const specialCases: { [key: string]: string } = {
      "Date Converter": "/tools/date-converter",
      "JSON → YAML": "/tools/json-yaml-converter",
      "Timezone Converter": "/tools/timezone-converter",
      "Unit Converter": "/tools/unit-converter",
      "URL to JSON": "/tools/url-to-json",
      "CSV to JSON": "/tools/csv-to-json",
      "Number Base Converter": "/tools/number-base-converter",
      "JSON Formatter": "/tools/json-formatter",
      "JSONC Formatter": "/tools/jsonc-formatter",
      "HTML Beautifier": "/tools/html-formatter",
      "YAML Formatter": "/tools/yaml-formatter",
      "Markdown Formatter": "/tools/markdown-formatter",
      "CSS/LESS/SCSS Formatter": "/tools/css-formatter",
      "JavaScript/TypeScript Formatter": "/tools/typescript-formatter",
      "GraphQL Formatter": "/tools/graphql-formatter",
      "Time Formatter": "/tools/time-formatter",
      "Base64 Encoder": "/tools/base64",
      "URL Encoder": "/tools/url-encoder",
      "JWT Decoder": "/tools/jwt-decoder",
      "TLS Certificate Decoder": "/tools/tls-decoder",
      "MD5 Hash": "/tools/md5-hash",
      "BCrypt Hash": "/tools/bcrypt-hash",
      "Text Diff": "/tools/text-diff",
      "Regex Tester": "/tools/regex-tester",
      "Text Sorter": "/tools/text-sort",
      "Word Counter": "/tools/text-counter",
      "Text Split": "/tools/text-split",
      "Search & Replace": "/tools/search-replace",
      "QR Generator": "/tools/qr-generator",
      "Barcode Generator": "/tools/barcode-generator",
      "Lorem Generator": "/tools/lorem-generator",
      "Unicode Characters": "/tools/unicode-characters",
      "Password Generator": "/tools/password-generator",
      "UUID Generator": "/tools/uuid-generator",
      "World Clock": "/tools/world-clock",
      "Timer": "/tools/timer",
      "Stopwatch": "/tools/stopwatch",
      "Countdown": "/tools/countdown",
      "Date/Time Difference": "/tools/datetime-diff",
      "Metronome": "/tools/metronome",
      "Compound Interest": "/tools/compound-interest",
      "Debt Repayment": "/tools/debt-repayment",
      "Color Palette Generator": "/tools/color-palette-generator",
      "Camera Test": "/tools/webcam-test",
      "Microphone Test": "/tools/microphone-test",
      "Keyboard Test": "/tools/keyboard-test",
      "Browser Info": "/tools/browser-info",
    };

    if (specialCases[toolName]) return specialCases[toolName];

    // Fallback: slugify the tool name (lowercase, replace non-alphanum with hyphens)
    const slug = toolName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return `/tools/${slug}`;
  };

  const handleToolClick = (toolName: string) => {
    const path = getToolPath(toolName);
    setSelectedTool(toolName);
    setSearchQuery("");
    setShowSearchDropdown(false);
    // navigate using wouter
    try {
      setLocation(path);
    } catch (err) {
      console.warn("Failed to navigate to", path, err);
    }
  };

  // Filter tools based on search query
  const filteredTools = searchQuery.trim() 
    ? allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchDropdown(value.trim().length > 0);
    setSelectedSearchIndex(0);
  };

  // Handle input focus
  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowSearchDropdown(true);
    }
  };

  // Handle input blur (with delay to allow clicks on dropdown)
  const handleSearchBlur = () => {
    // Don't close immediately to allow clicking on dropdown items
    setTimeout(() => {
      // Will be handled by click outside
    }, 100);
  };

  // Handle keyboard navigation in search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSearchDropdown || filteredTools.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSearchIndex(prev => 
        prev < filteredTools.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSearchIndex(prev => prev > 0 ? prev - 1 : 0);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredTools[selectedSearchIndex]) {
        handleToolClick(filteredTools[selectedSearchIndex].name);
      }
    } else if (e.key === 'Escape') {
      setShowSearchDropdown(false);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search dropdown when header is minimized
  useEffect(() => {
    if (headerMinimized) {
      setShowSearchDropdown(false);
    }
  }, [headerMinimized]);

  // Get tools by category for sidebar
  const getToolsByCategory = (category: string) => {
    return allTools.filter(tool => tool.category === category);
  };

  return (
    <div className="relative size-full min-h-screen overflow-hidden transition-colors duration-300" style={{ backgroundColor: currentColors.bg }} data-name="Desktop">
      <style>{`
        :root {
          --text-primary: ${currentColors.text};
          --text-secondary: ${currentColors.textSecondary};
          --text-muted: ${currentColors.textMuted};
          --bg-primary: ${currentColors.bg};
          --bg-card: ${currentColors.cardBg};
          --bg-card-hover: ${currentColors.cardBgHover};
          --border-color: ${currentColors.border};
          --accent: ${currentColors.accent};
          --accent-text: ${currentColors.accentText};
        }
        .theme-text { color: ${currentColors.text} !important; }
        .theme-text-secondary { color: ${currentColors.textSecondary} !important; }
        .theme-text-muted { color: ${currentColors.textMuted} !important; }
        .theme-bg-card { background-color: ${currentColors.cardBg} !important; }
      `}</style>

      {/* Demo Status Bar */}
      {isDemoRunning && (
        <div className="absolute top-0 left-0 right-0 z-50 px-4 py-2 border-b transition-colors duration-300" 
          style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(219, 234, 254, 1)',
            borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(191, 219, 254, 1)'
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 rounded text-xs font-medium" 
                style={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(37, 99, 235, 0.8)' : 'rgba(37, 99, 235, 1)',
                  color: '#ffffff'
                }}>
                Demo Mode Active
              </span>
              <span className="text-sm font-medium" style={{ color: theme === 'dark' ? 'rgba(147, 197, 253, 1)' : 'rgba(30, 64, 175, 1)' }}>
                {currentDemoTool}
              </span>
              <div className="w-32 rounded-full h-1.5" style={{ backgroundColor: theme === 'dark' ? 'rgba(30, 58, 138, 1)' : 'rgba(191, 219, 254, 1)' }}>
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${demoProgress}%`,
                    backgroundColor: theme === 'dark' ? 'rgba(37, 99, 235, 1)' : 'rgba(37, 99, 235, 1)'
                  }}
                />
              </div>
              <span className="text-xs" style={{ color: theme === 'dark' ? 'rgba(96, 165, 250, 1)' : 'rgba(37, 99, 235, 1)' }}>
                {Math.round(demoProgress)}%
              </span>
              <div className="flex items-center space-x-1">
                <Timer className="w-3 h-3" style={{ color: theme === 'dark' ? 'rgba(96, 165, 250, 1)' : 'rgba(37, 99, 235, 1)' }} />
                <select 
                  value={demoSpeed} 
                  onChange={(e) => setDemoSpeed(e.target.value as any)}
                  className="h-7 px-2 text-xs rounded border cursor-pointer"
                  style={{ 
                    backgroundColor: currentColors.cardBg,
                    color: currentColors.text,
                    borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(191, 219, 254, 1)'
                  }}
                >
                  <option value="slow">Slow (8s)</option>
                  <option value="normal">Normal (5s)</option>
                  <option value="fast">Fast (3s)</option>
                  <option value="very-fast">Very Fast (1.5s)</option>
                  <option value="crazy-fast">Crazy Fast (100ms)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={skipToPrevious}
                className="flex items-center space-x-1 h-7 px-3 text-xs rounded border transition-colors"
                style={{ 
                  backgroundColor: currentColors.cardBg,
                  color: currentColors.text,
                  borderColor: currentColors.border
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.cardBgHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentColors.cardBg}
              >
                <SkipBack className="w-3 h-3" />
                <span>Previous</span>
              </button>
              <button
                onClick={isDemoPaused ? resumeDemo : pauseDemo}
                className="flex items-center space-x-1 h-7 px-3 text-xs rounded border transition-colors"
                style={{ 
                  backgroundColor: currentColors.cardBg,
                  color: currentColors.text,
                  borderColor: currentColors.border
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.cardBgHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentColors.cardBg}
              >
                {isDemoPaused ? (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                )}
              </button>
              <button
                onClick={skipToNext}
                className="flex items-center space-x-1 h-7 px-3 text-xs rounded border transition-colors"
                style={{ 
                  backgroundColor: currentColors.cardBg,
                  color: currentColors.text,
                  borderColor: currentColors.border
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentColors.cardBgHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentColors.cardBg}
              >
                <SkipForward className="w-3 h-3" />
                <span>Next</span>
              </button>
              <button
                onClick={stopDemo}
                className="flex items-center space-x-1 h-7 px-3 text-xs rounded transition-colors"
                style={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(220, 38, 38, 0.8)' : 'rgba(220, 38, 38, 1)',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(220, 38, 38, 1)' : 'rgba(185, 28, 28, 1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(220, 38, 38, 0.8)' : 'rgba(220, 38, 38, 1)'}
              >
                <Square className="w-3 h-3" />
                <span>Stop</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute content-stretch flex items-center justify-between left-0 right-0 z-10" 
        style={{ top: isDemoRunning ? '52px' : '0' }}
        data-name="Header">
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
            <div className="bg-[#00c2ff] content-stretch flex items-center p-[5px] relative rounded-[12px] shrink-0" data-name="Icon">
              <div className="relative shrink-0 size-[32px]" data-name="image 1">
                <img alt="FreeDevTool Logo" className="absolute inset-0 w-full h-full object-contain pointer-events-none" src="/assets/original-lgo.svg" />
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
                  <div className="bg-[#00c2ff] content-stretch flex items-center justify-center p-[3px] relative rounded-[8px] size-full">
                    <img alt="FreeDevTool Logo" className="w-full h-full object-contain pointer-events-none" src="/assets/original-lgo.svg" />
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
      <div className={clsx(
        "absolute content-stretch flex items-start left-0 right-0 bottom-0 transition-all duration-300",
        headerMinimized ? (isDemoRunning ? "top-[52px]" : "top-0") : (isDemoRunning ? "top-[134px]" : "top-[82px]")
      )} data-name="Main">
        <div className={clsx(
          "content-stretch flex flex-col gap-[20px] h-full items-start pb-[16px] pt-[20px] px-[14px] relative shrink-0 transition-all duration-300 overflow-y-auto hide-scrollbar",
          sidebarCollapsed ? "w-[80px]" : "w-[300px]"
        )} data-name="Sidepanel">
          <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none" style={{ borderColor: currentColors.border }} />
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Navigation">
            {/* Home */}
            <button 
              onClick={() => setLocation('/')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ 
                  backgroundColor: currentColors.cardBg,
                }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <path d={svgPaths.p11fe8040} id="Vector" stroke={currentColors.accent} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.accent }}>Home</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.home ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="opacity-0 overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <BackgroundImage additionalClassNames="absolute inset-[8.33%]">
                          <path d={svgPaths.p34af4380} id="Vector" stroke="var(--stroke-0, #55D6FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </BackgroundImage>
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Conversions */}
            <button 
              onClick={() => toggleMenu('conversions')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <path d={svgPaths.p13b69f00} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Conversions</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.conversions ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" strokeColor={currentColors.textSecondary} />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Conversions Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.conversions ? "max-h-[500px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Conversions").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Formatters */}
            <button 
              onClick={() => toggleMenu('formatters')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <path d={svgPaths.p16cdb000} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Formatter</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.formatters ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Formatters Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.formatters ? "max-h-[600px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Formatter").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Encoders */}
            <button 
              onClick={() => toggleMenu('encoders')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <path d={svgPaths.pe94f800} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Encoders</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.encoders ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Encoders Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.encoders ? "max-h-[400px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Encoders").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Text Tools */}
            <button 
              onClick={() => toggleMenu('textTools')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <path d={svgPaths.p22c0d580} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeWidth="1.5" />
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Text Tools</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.textTools ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Text Tools Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.textTools ? "max-h-[700px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Text Tools").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Time Tools */}
            <button 
              onClick={() => toggleMenu('timeTools')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <path d={svgPaths.p5826b00} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Time Tools</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.timeTools ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Time Tools Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.timeTools ? "max-h-[400px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Time Tools").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Financial Tools */}
            <button 
              onClick={() => toggleMenu('financialTools')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <div className="absolute inset-[8.33%]" data-name="safearea">
                      <div className="absolute inset-[0_-3.75%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 20">
                          <g id="safearea">
                            <path d={svgPaths.p1e77a000} id="Vector" stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Financial Tools</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.financialTools ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Financial Tools Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.financialTools ? "max-h-[200px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Financial Tools").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Color Tools */}
            <button 
              onClick={() => toggleMenu('colorTools')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <SafeareaBackgroundImage1>
                      <g id="Vector">
                        <path d={svgPaths.p3fbb2700} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPaths.p39c71600} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPaths.p254f4d80} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d={svgPaths.p3f1ae300} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </g>
                    </SafeareaBackgroundImage1>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Color Tools</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.colorTools ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* Color Tools Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.colorTools ? "max-h-[150px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("Color Tools").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* System */}
            <button 
              onClick={() => toggleMenu('system')}
              className="w-full"
            >
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Component 2">
                    <div className="absolute inset-[8.33%]" data-name="safearea">
                      <div className="absolute left-px size-[18px] top-px" data-name="Vector">
                        <div className="absolute inset-[-4.17%_-4.21%]" style={{ "--stroke-0": currentColors.textSecondary } as React.CSSProperties}>
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5151 19.5">
                            <g id="Vector">
                              <path d={svgPaths.p6214600} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d={svgPaths.p1fef8cc0} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d={svgPaths.p21668700} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d={svgPaths.pc7b5300} stroke={currentColors.textSecondary} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>System</p>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <BackgroundImage2>
                    <div className={clsx(
                      "flex-none transition-transform duration-200",
                      expandedMenus.system ? "rotate-[180deg]" : "rotate-[270deg]"
                    )}>
                      <div className="overflow-clip relative size-[16px]" data-name="Chevron Down">
                        <SafeareaBackgroundImage additionalClassNames="absolute inset-[8.33%]" />
                      </div>
                    </div>
                  </BackgroundImage2>
                )}
              </ComponentBackgroundImage>
            </button>

            {/* System Submenu */}
            {!sidebarCollapsed && (
              <div className={clsx(
                "content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full transition-all duration-300",
                expandedMenus.system ? "max-h-[300px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                {getToolsByCategory("System").map(tool => (
                  <button key={tool.name} onClick={() => handleToolClick(tool.name)} className="w-full">
                    <BackgroundImage1 
                      additionalClassNames="transition-colors cursor-pointer" 
                      text={tool.name}
                      icon={tool.icon}
                      textColor={currentColors.textSecondary}
                      iconColor={currentColors.textSecondary}
                      bgColor="transparent"
                      hoverBgColor={currentColors.cardBg}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start justify-end min-h-px min-w-px relative shrink-0 w-full" data-name="Supporting Content">
            <button className="relative shrink-0 w-full" data-name="Sidebar Items [Sidebar] [1.0]">
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[20px]" data-name="settings-2-line">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g id="settings-2-line">
                        <path d={svgPaths.p37cb6600} fill={currentColors.textMuted} id="Vector" />
                      </g>
                    </svg>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Settings</p>
                  )}
                </div>
              </ComponentBackgroundImage>
            </button>
            <button className="relative shrink-0 w-full" data-name="Sidebar Items [Sidebar] [1.0]">
              <ComponentBackgroundImage 
                style={{ backgroundColor: currentColors.bg }}
                additionalClassNames="transition-colors cursor-pointer hover:opacity-90"
              >
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[20px]" data-name="headphone-line">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <g id="headphone-line">
                        <path d={svgPaths.p19d58300} fill={currentColors.textMuted} id="Vector" />
                      </g>
                    </svg>
                  </div>
                  {!sidebarCollapsed && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-nowrap" style={{ color: currentColors.textSecondary }}>Support</p>
                  )}
                </div>
              </ComponentBackgroundImage>
            </button>
          </div>
        </div>
        <div className={clsx(
          "basis-0 grow h-full min-h-px min-w-px relative shrink-0 overflow-y-auto transition-all duration-300 custom-scrollbar"
        )} style={{ backgroundColor: currentColors.bg }} data-name="Content">
          <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid inset-0 pointer-events-none" style={{ borderColor: currentColors.divider }} />
          
          {/* If this is being used as a layout wrapper for tool pages, render children */}
          {isToolPage && children ? (
            <div className="p-6 lg:p-8">
              {children}
            </div>
          ) : (
            <div className="content-stretch flex flex-col gap-[24px] items-start p-[20px] md:p-[32px] lg:p-[40px] relative min-h-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] tracking-[-0.36px] w-full" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Welcome Back!</p>
                </div>
              </div>
            <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
              <div className="backdrop-blur-[7.328px] backdrop-filter h-auto min-h-[180px] relative rounded-[14.656px] shrink-0 w-full" style={{ backgroundColor: currentColors.cardBg }}>
                <div className="overflow-clip relative rounded-[inherit] size-full min-h-[180px]">
                  <div className="absolute opacity-50 right-[-230px] rounded-[450.163px] size-[900.326px] top-[50%] translate-y-[-50%]" data-name="Gradient" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 900.33 900.33\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(63.663 0 0 63.663 450.16 450.16)\\'><stop stop-color=\\'rgba(34,211,238,0.15)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(34,211,238,0)\\' offset=\\'0.7\\'/></radialGradient></defs></svg>')" }} />
                  <div className="relative flex flex-col gap-[14px] items-start px-[24px] md:px-[38px] py-[24px] md:py-[32px] w-full max-w-[600px]">
                    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[0] not-italic relative shrink-0 w-full">
                      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end relative shrink-0 text-[18px] md:text-[22px] tracking-[-0.33px] w-full" style={{ color: currentColors.text }}>
                        <p className="leading-[24px]">Your Data Never Leaves Your Device</p>
                      </div>
                      <div className="flex flex-col font-['SF_Pro_Text:Regular',sans-serif] justify-center relative shrink-0 text-[14px] md:text-[17px] w-full" style={{ color: currentColors.textSecondary }}>
                        <p className="leading-[24px] md:whitespace-nowrap">No back-end desgin. All processing happens entirely in your browser. Your data is never sent to any server.</p>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[8.793px] items-center relative shrink-0 flex-wrap" data-name="Container">
                      <div className="bg-[rgba(59,130,246,0.1)] content-stretch flex flex-col items-start px-[10.992px] py-[5.13px] relative rounded-[4.397px] shrink-0" data-name="Overlay+Border">
                        <div aria-hidden="true" className="absolute border-[#3b82f6] border-[0.733px] border-solid inset-0 pointer-events-none rounded-[4.397px]" />
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60a5fa] text-[8.793px] text-nowrap">
                          <p className="leading-[normal]">Open Source</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(16,185,129,0.1)] content-stretch flex flex-col items-start px-[10.992px] py-[5.13px] relative rounded-[4.397px] shrink-0" data-name="Overlay+Border">
                        <div aria-hidden="true" className="absolute border-[#10b981] border-[0.733px] border-solid inset-0 pointer-events-none rounded-[4.397px]" />
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#34d399] text-[8.793px] text-nowrap">
                          <p className="leading-[normal]">Free</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(139,92,246,0.1)] content-stretch flex flex-col items-start px-[10.992px] py-[5.13px] relative rounded-[4.397px] shrink-0" data-name="Overlay+Border">
                        <div aria-hidden="true" className="absolute border-[#8b5cf6] border-[0.733px] border-solid inset-0 pointer-events-none rounded-[4.397px]" />
                        <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a78bfa] text-[8.793px] text-nowrap">
                          <p className="leading-[normal]">Offline</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute content-stretch flex gap-[6px] items-center left-1/2 bottom-[16px] translate-x-[-50%]">
                    <div className="bg-[#55d6ff] h-[10px] rounded-[3000px] shrink-0 w-[32px]" />
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="bg-[#55d6ff] opacity-30 rounded-[3000px] shrink-0 size-[10px]" />
                    ))}
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[0.733px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[14.656px]" />
              </div>
            </div>


            {/*Converters*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Conversions</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Conversions").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Conversions").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Formatters*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Formatter</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Formatter").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Formatter").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Encoders*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Encoders</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Encoders").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Encoders").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Text Tools*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Text Tools</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Text Tools").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Text Tools").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Time Tools*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Time Tools</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Time Tools").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Time Tools").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Financial Tools*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Financial Tools</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Financial Tools").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Financial Tools").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Color Tools*/}
            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-center flex flex-wrap gap-[8px] md:gap-[11.956px] items-center relative shrink-0 w-full" data-name="Container">
                <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[20px] md:text-[24px] text-nowrap tracking-[-0.36px]" style={{ color: currentColors.text }}>
                  <p className="leading-[24px]">Color Tools</p>
                </div>
                <div className="content-stretch flex items-center px-[11.208px] py-[5.23px] relative rounded-[5.978px] shrink-0" style={{ backgroundColor: currentColors.cardBgActive }} data-name="Overlay+Border">
                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[5.978px]" style={{ borderColor: currentColors.border }} />
                  <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[10.461px] text-nowrap" style={{ color: currentColors.textSecondary }}>
                    <p className="leading-[normal]">{getToolsByCategory("Color Tools").length} Tools</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[14px] w-full" data-name="Container">
                {getToolsByCategory("Color Tools").map((tool, index) => {
                  const IconComponent = tool.icon;
                  return (
                    <div key={tool.name} className="group">
                      <BackgroundBorderOverlayBlurBackgroundImage theme={theme}>
                        <div className="min-w-[inherit] overflow-clip rounded-[20px] size-full group-hover:scale-[1.02] transition-transform">
                          <div className="content-stretch flex flex-col items-start min-w-[inherit] px-[22px] py-[20px] relative w-full rounded-[20px]" style={{ backgroundColor: currentColors.cardBg }}>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex items-center justify-center pb-[7.472px] pt-[8.219px] px-[0.747px] relative rounded-[7.472px] shrink-0 size-[35.867px]" style={{ backgroundColor: currentColors.cardBgActive }}>
                                  <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[7.472px]" style={{ borderColor: currentColors.border }} />
                                  <IconComponent className="size-[20px]" style={{ color: currentColors.textSecondary }} />
                                </div>
                                <div className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 w-full">
                                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                                    <HeadingBackgroundImageAndText text={tool.name} textColor={currentColors.text} />
                                    <BackgroundImageAndText text={tool.shortcut} additionalClassNames="text-[9.564px]" style={{ color: currentColors.textSecondary }} />
                                  </div>
                                  <ContainerBackgroundImage text={tool.description.split('.')[0]} text1={tool.description.split('.')[1] || ''} textColor={currentColors.textMuted} />
                                </div>
                              </div>
                              <button 
                                onClick={() => handleToolClick(tool.name)}
                                className="w-full"
                              >
                                <OverlayBorderBackgroundImage1 
                                  bgColor={currentColors.cardBgActive}
                                  borderColor={currentColors.border}
                                  textColor={currentColors.accentText}
                                  iconColor={currentColors.accent}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border-[0.747px] border-solid inset-0 pointer-events-none rounded-[20px]" style={{ borderColor: currentColors.border }} />
                      </BackgroundBorderOverlayBlurBackgroundImage>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
      <button 
        onClick={() => setHeaderMinimized(!headerMinimized)}
        className={clsx(
          "absolute content-stretch flex h-[20px] items-center justify-center overflow-clip pb-[4px] pt-[2px] px-[8px] right-[32px] rounded-bl-[4px] rounded-br-[4px] w-[48px] transition-all duration-300 cursor-pointer z-20",
          headerMinimized ? (isDemoRunning ? "top-[52px]" : "top-0") : (isDemoRunning ? "top-[134px]" : "top-[82px]")
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
            <SafeareaBackgroundImage additionalClassNames="relative size-[13.333px]" />
          </div>
        </div>
      </button>
    </div>
  );
}
