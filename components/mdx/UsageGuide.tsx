'use client';

import React from 'react';
import { CopyButton } from '@/components/mdx/copy-button';
import { SyntaxHighlighter } from '@/components/mdx/SyntaxHighlighter';

interface UsageStep {
  title: string;
  description?: string;
  code: string;
}

interface UsageGuideProps {
  steps: UsageStep[];
  title?: string;
}

export const UsageGuide = ({ steps, title = 'Usage' }: UsageGuideProps) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-3">
        <h2 className="font-mono text-4xl font-bold tracking-tight text-neutral-400 dark:text-neutral-800">
          {title}
        </h2>
      </div>

      <div className="relative flex flex-col gap-10 border-l border-neutral-200 pl-6 md:gap-16 md:pl-10 dark:border-neutral-800">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Step Number Indicator */}
            <div className="absolute top-0 -left-[37px] flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-[10px] font-bold text-neutral-500 md:-left-[56px] md:h-8 md:w-8 md:text-xs dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              {index + 1}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {step.title}
              </h3>

              {step.description && <p className="text-sm text-neutral-500">{step.description}</p>}

              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex h-10 items-center justify-between border-b border-neutral-100 bg-neutral-50/50 px-4 dark:border-neutral-900 dark:bg-neutral-900/50">
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
                <div className="overflow-x-auto bg-[#FAFAFA] p-5 font-mono text-[13px] leading-relaxed whitespace-pre text-neutral-500 dark:bg-neutral-950/50">
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
