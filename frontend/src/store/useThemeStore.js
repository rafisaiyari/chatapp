import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "retro", // Default theme in memory
  
  setTheme: (theme) => {
    set({ theme });
    document.documentElement.setAttribute("data-theme", theme);
  }
}));

// Set the initial theme on app load
document.documentElement.setAttribute("data-theme", "retro");