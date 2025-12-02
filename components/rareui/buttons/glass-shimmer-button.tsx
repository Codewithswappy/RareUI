"use client"

import type React from "react"

import { useState } from "react"

interface GlassShimmerButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function GlassShimmerButton({ children, onClick }: GlassShimmerButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block px-5 py-2.5 text-base font-medium text-black bg-black border border-neutral-400 rounded overflow-hidden transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "white",
          transform: isHovered
            ? "perspective(5px) rotateX(0deg) rotateY(0deg)"
            : "perspective(5px) rotateX(2deg) rotateY(2deg)",
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Text content */}
      <span className="relative z-10">Hover Me</span>
    </button>
  )
}
