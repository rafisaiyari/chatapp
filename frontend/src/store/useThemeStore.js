import { create } from "zustand";

const THEME_KEY = "app-theme";
const DEFAULT_THEME = "retro";

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

// Apply immediately on script load (BEFORE store creation)
const initialTheme = getStoredTheme();
applyTheme(initialTheme);

export const useThemeStore = create((set) => ({
  theme: initialTheme,
  
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }
}));