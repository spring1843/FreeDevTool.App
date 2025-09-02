import { useEffect, useState, useMemo } from "react";
import {
  getSystemTheme,
  type Theme,
  ThemeProviderContext,
} from "@/contexts/theme-context";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme;
      if (stored && ["light", "dark"].includes(stored)) {
        return stored;
      }
      // Use system theme as fallback
      return getSystemTheme();
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme: (theme: Theme) => {
      // Save to localStorage before updating state
      localStorage.setItem("theme", theme);
      setThemeState(theme);
    },
  }), [theme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook moved to separate file to fix fast refresh
