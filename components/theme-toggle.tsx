"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-5 h-5 text-muted-foreground" />
      </button>
    );
  }

  // Use resolvedTheme to get the actual theme (handles "system" theme)
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (theme === "system") {
      // If system, toggle to the opposite of current resolved theme
      setTheme(isDark ? "light" : "dark");
    } else {
      // Toggle between light and dark
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
}