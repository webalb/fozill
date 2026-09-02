"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-foreground/70 hover:text-foreground hover:border-gold/50 hover:bg-surface transition-colors"
    >
      <Sun
        className={`absolute w-4 h-4 transition-all duration-300 ${
          !mounted || isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all duration-300 ${
          !mounted || isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
    </button>
  );
}