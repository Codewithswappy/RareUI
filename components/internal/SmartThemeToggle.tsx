"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface SmartThemeToggleProps {
  // Dimensions & Appearance
  size?: number; // Size in px
  borderRadius?: number; // Border radius in px (or large number for circle)

  // Colors (Light Mode)
  lightBg?: string;
  lightIconColor?: string;

  // Colors (Dark Mode)
  darkBg?: string;
  darkIconColor?: string;

  // Effects
  shadow?: string;
  hoverScale?: number;
  tapScale?: number;

  // Audio
  enableSound?: boolean;
  soundUrl?: string; // URL to custom sound file
  volume?: number; // 0 to 1

  // External Control
  onThemeChange?: (theme: "light" | "dark") => void;
}

export default function SmartThemeToggle({
  size = 48,
  borderRadius = 999,
  lightBg = "transparent",
  lightIconColor = "#ffffff",
  darkBg = "transparent",
  darkIconColor = "#ffffff",
  shadow = "0 1px 1px rgba(0,0,0,0.1)",
  hoverScale = 1.05,
  tapScale = 0.9,
  enableSound = true,
  soundUrl = "/sounds/switch-click.mp3",
  volume = 0.5,
  onThemeChange,
}: SmartThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    if (enableSound && typeof window !== "undefined") {
      const actualSound =
        soundUrl === "/sounds/switch-click.mp3"
          ? "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU..."
          : soundUrl;

      if (soundUrl !== "/sounds/switch-click.mp3") {
        audioRef.current = new Audio(actualSound);
        audioRef.current.volume = Math.max(0, Math.min(1, volume));
      }
    }
  }, [enableSound, soundUrl, volume]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (onThemeChange) onThemeChange(newTheme);

    // Play Sound
    if (enableSound) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } else if (soundUrl === "/sounds/switch-click.mp3") {
        try {
          const AudioContext =
            window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = "sine";
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(
              100,
              ctx.currentTime + 0.1
            );

            gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
          }
        } catch (e) {
          console.error("Audio fallback failed", e);
        }
      }
    }
  };

  if (!mounted) return <div style={{ width: size, height: size }} />;

  const isDark = resolvedTheme === "dark";
  const iconSize = size * 0.5;

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center overflow-hidden z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      style={{
        width: size,
        height: size,
        borderRadius: borderRadius,
        backgroundColor: isDark ? darkBg : lightBg,
        boxShadow: shadow,
      }}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon
              size={iconSize}
              color={darkIconColor}
              fill={darkIconColor}
              strokeWidth={1.5}
            />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun
              size={iconSize}
              color={lightIconColor}
              fill={lightIconColor}
              strokeWidth={1.5}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
