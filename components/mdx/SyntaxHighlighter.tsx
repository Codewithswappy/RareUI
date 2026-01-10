"use client";
import React from "react";

export const SyntaxHighlighter = ({ code }: { code: string }) => {
  const tokens = code.split(
    /(\b(?:import|export|const|let|var|function|return|type|interface|default|from|switch|case|if|else|React|useState|motion|AnimatePresence|useSpring|useMotionValue|useTransform|LiquidTooltip|Placement|LiquidTooltipProps|ReactNode|ClassValue|twMerge|clsx)\b|['"`].*?['"`]|\/\/.*)/g
  );

  return (
    <span className="font-mono">
      {tokens.map((token, i) => {
        if (!token) return null;
        if (/^['"`].*?['"`]$/.test(token)) {
          return (
            <span key={i} className="text-emerald-500">
              {token}
            </span>
          );
        }
        if (
          /^(?:import|export|const|let|var|function|return|type|interface|default|from|switch|case|if|else)$/.test(
            token
          )
        ) {
          return (
            <span key={i} className="text-rose-500">
              {token}
            </span>
          );
        }
        if (
          /^(?:React|useState|motion|AnimatePresence|useSpring|useMotionValue|useTransform|LiquidTooltip|Placement|LiquidTooltipProps|ReactNode|ClassValue|twMerge|clsx)$/.test(
            token
          )
        ) {
          return (
            <span key={i} className="text-sky-500">
              {token}
            </span>
          );
        }
        if (/^\/\/.*$/.test(token)) {
          return (
            <span key={i} className="text-neutral-500">
              {token}
            </span>
          );
        }
        return token;
      })}
    </span>
  );
};
