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
        className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="w-5 h-5 text-muted-foreground" />
      </button>
    );
  }

  // Use resolvedTheme to get the actual theme (handles "system" theme)
  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If view transitions are not supported, just switch theme
    if (!document.startViewTransition) {
      if (theme === "system") {
        setTheme(isDark ? "light" : "dark");
      } else {
        setTheme(isDark ? "light" : "dark");
      }
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
       if (theme === "system") {
         setTheme(isDark ? "light" : "dark");
       } else {
         setTheme(isDark ? "light" : "dark");
       }
    });

    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        
        document.documentElement.animate(
            {
                clipPath: clipPath,
            },
            {
                duration: 750,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
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