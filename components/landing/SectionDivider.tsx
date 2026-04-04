"use client";

import React from "react";

/**
 * Decorative corner-bracket section divider.
 * Renders small L-shaped corner marks with a connecting horizontal line.
 * Use between major landing page sections for editorial separation.
 */
export function SectionDivider() {
  return (
    <div className="w-[98%] max-w-[1600px] mx-auto px-4">
      <div className="relative h-16 flex items-center">
        {/* Horizontal line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-400 dark:bg-neutral-600" />

        {/* Left corner mark */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-300 dark:text-neutral-700">
            <path d="M0 12V0H12" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Right corner mark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-300 dark:text-neutral-700">
            <path d="M12 12V0H0" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Corner brackets for content cards — renders small L marks at corners.
 * Wrap around any content block to give it the technical drawing treatment.
 */
export function CornerFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner marks */}
      {/* Top-left */}
      <svg className="absolute -top-px -left-px w-4 h-4 text-neutral-300 dark:text-neutral-700" viewBox="0 0 16 16" fill="none">
        <path d="M0 16V0H16" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Top-right */}
      <svg className="absolute -top-px -right-px w-4 h-4 text-neutral-300 dark:text-neutral-700" viewBox="0 0 16 16" fill="none">
        <path d="M16 16V0H0" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute -bottom-px -left-px w-4 h-4 text-neutral-300 dark:text-neutral-700" viewBox="0 0 16 16" fill="none">
        <path d="M0 0V16H16" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute -bottom-px -right-px w-4 h-4 text-neutral-300 dark:text-neutral-700" viewBox="0 0 16 16" fill="none">
        <path d="M16 0V16H0" stroke="currentColor" strokeWidth="1" />
      </svg>

      {children}
    </div>
  );
}
