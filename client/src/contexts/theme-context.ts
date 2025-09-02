import { createContext } from "react";

export type Theme = "dark" | "light";

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "light", // Safe fallback instead of calling getSystemTheme() during initialization
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function getSystemTheme(): Theme {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) return "dark";
  return "light";
}
