"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface GlassShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function GlassShimmerButton({
  children,
  className,
  ...props
}: GlassShimmerButtonProps) {
  return (
    <>
      <style jsx>{`
        @keyframes glass-shimmer {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(150%) skewX(-20deg);
          }
        }
      `}</style>
      <button
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
          "dark:bg-white/5 border border-white/10 px-8 py-3",
          "text-base font-medium text-white dark:text-white transition-all duration-300",
          "hover:bg-white/10 hover:scale-105 active:scale-95",
          "backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_0_0.4rgba(255,255,255,0.2)]",
          "bg-black hover:bg-black/30 dark:bg-white/30 dark:hover:bg-white/40",
          className
        )}
        {...props}
      >
        {/* Shimmer Animation Element */}
        <div
          className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255, 255, 255, 1) 50%, transparent)",
            animation: "glass-shimmer 2.5s infinite linear",
            width: "200%",
            left: "-50%",
          }}
        />

        {/* Static Glass Gloss Top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
        
        {/* Static Glass Gloss Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30" />

        {/* Content */}
        <span className="relative z-10 tracking-wide drop-shadow-sm">
          {children}
        </span>
        
        {/* Local Glow on Hover */}
        <div className="absolute inset-0 -z-10 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </button>
    </>
  )
}
