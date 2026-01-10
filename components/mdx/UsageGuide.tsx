"use client";

import React from "react";
import { CopyButton } from "@/components/mdx/copy-button";
import { SyntaxHighlighter } from "@/components/mdx/SyntaxHighlighter";

interface UsageStep {
  title: string;
  description?: string;
  code: string;
}

interface UsageGuideProps {
  steps: UsageStep[];
}

export const UsageGuide = ({ steps }: UsageGuideProps) => {
  return (
    <div className="flex flex-col gap-12 mt-12">
      <div className="flex items-center gap-3">
        <h2 className="text-4xl font-bold text-neutral-400 dark:text-neutral-800 font-mono tracking-tight">
          Usage
        </h2>
      </div>

      <div className="flex flex-col gap-10 md:gap-16 border-l border-neutral-200 dark:border-neutral-800 pl-6 md:pl-10 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step Number Indicator */}
            <div className="absolute -left-[37px] md:-left-[56px] top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] md:text-xs font-bold text-neutral-500 dark:text-neutral-400">
              {index + 1}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {step.title}
              </h3>

              {step.description && (
                <p className="text-sm text-neutral-500">{step.description}</p>
              )}

              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-4 h-10 border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/50">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-400"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <CopyButton text={step.code} />
                </div>
                <div className="p-5 font-mono text-[11px] leading-relaxed text-neutral-500 bg-[#FAFAFA] dark:bg-neutral-950/50 overflow-x-auto whitespace-pre">
                  <SyntaxHighlighter code={step.code} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
