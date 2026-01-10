"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/mdx/copy-button";
import { SyntaxHighlighter } from "@/components/mdx/SyntaxHighlighter";

interface InstallationGuideProps {
  componentName: string;
  dependencies: string;
  componentCode: string;
  componentPath: string;
}

export const InstallationGuide = ({
  componentName,
  dependencies,
  componentCode,
  componentPath,
}: InstallationGuideProps) => {
  const [installMethod, setInstallMethod] = useState<"cli" | "manual">("cli");
  const [packageManager, setPackageManager] = useState<
    "npm" | "pnpm" | "bun" | "yarn"
  >("pnpm");
  const [copied, setCopied] = useState(false);
  const [isManualCodeExpanded, setIsManualCodeExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-6 mb-12">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-neutral-400 dark:text-neutral-800 font-inter">
          Installation
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Install Method Toggle */}
        <div className="relative inline-flex p-[4px] gap-1 rounded-lg bg-linear-to-b from-neutral-100/80 to-neutral-200/50 dark:from-neutral-800/80 dark:to-neutral-900/50 shadow-sm border border-neutral-200/60 dark:border-neutral-800/60 w-fit">
          {["cli", "manual"].map((method) => (
            <button
              key={method}
              onClick={() => setInstallMethod(method as "cli" | "manual")}
              className={cn(
                "relative flex items-center justify-center min-w-[80px] px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 uppercase cursor-pointer",
                installMethod === method
                  ? "text-neutral-900 dark:text-neutral-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_6px_12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02),inset_0_1px_0.5px_rgba(255,255,255,0.8)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_6px_12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0.5px_rgba(255,255,255,0.1)]"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              )}
            >
              <span className="relative z-10">{method}</span>
              {installMethod === method && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-md -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={installMethod}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10"
            >
              {installMethod === "cli" ? (
                <div className="flex flex-col gap-12 relative">
                  {/* Step 1: Run Command */}
                  <div className="relative">
                    <div className="flex flex-col gap-4">
                      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-4 h-10 border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/50">
                          <div className="flex items-center gap-4">
                            <div className="grid grid-cols-2 gap-0.5 opacity-30">
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                            </div>
                            <div className="flex items-center gap-4 h-full">
                              {["npm", "pnpm", "bun", "yarn"].map((pm) => (
                                <button
                                  key={pm}
                                  onClick={() =>
                                    setPackageManager(
                                      pm as typeof packageManager
                                    )
                                  }
                                  className={cn(
                                    "text-[10px] font-bold transition-colors relative h-10 flex items-center",
                                    packageManager === pm
                                      ? "text-neutral-900 dark:text-white"
                                      : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                                  )}
                                >
                                  {pm}
                                  {packageManager === pm && (
                                    <motion.div
                                      layoutId="pmUnderline"
                                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white"
                                      transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                        duration: 0.6,
                                      }}
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const cmd =
                                packageManager === "npm"
                                  ? `npx rareui add ${componentName}`
                                  : packageManager === "pnpm"
                                    ? `pnpm dlx rareui add ${componentName}`
                                    : packageManager === "bun"
                                      ? `bunx rareui add ${componentName}`
                                      : `yarn dlx rareui add ${componentName}`;
                              navigator.clipboard.writeText(cmd);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-500"
                          >
                            {copied ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                  ry="2"
                                />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {/* Command Display */}
                        <div className="p-4 font-mono text-xs text-neutral-600 dark:text-neutral-400 overflow-x-auto">
                          <span className="text-neutral-900 dark:text-neutral-100 font-bold">
                            {packageManager === "npm"
                              ? "npx"
                              : packageManager === "pnpm"
                                ? "pnpm"
                                : packageManager === "bun"
                                  ? "bunx"
                                  : "yarn"}
                          </span>{" "}
                          {packageManager === "npm" ? "" : "dlx "}
                          rareui add {componentName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8 md:gap-12 border-neutral-200 dark:border-neutral-800 relative py-6 ">
                  {/* Step 1: Dependencies */}
                  <div className="relative">
                    <div className="absolute -left-[37px] md:-left-[56px] top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] md:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 ">
                      1
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Install the following dependencies
                      </h3>
                      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-4 h-10 border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/50">
                          <div className="flex items-center gap-4">
                            <div className="grid grid-cols-2 gap-0.5 opacity-30">
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                              <div className="w-1 h-1 bg-neutral-900 dark:bg-neutral-100" />
                            </div>
                            <div className="flex items-center gap-4 h-full">
                              {["pnpm", "yarn", "npm", "bun"].map((pm) => (
                                <button
                                  key={pm}
                                  onClick={() =>
                                    setPackageManager(
                                      pm as typeof packageManager
                                    )
                                  }
                                  className={cn(
                                    "text-[10px] font-bold transition-colors relative h-10 flex items-center",
                                    packageManager === pm
                                      ? "text-neutral-900 dark:text-white"
                                      : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                                  )}
                                >
                                  {pm}
                                  {packageManager === pm && (
                                    <motion.div
                                      layoutId="pmUnderlineManual"
                                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-white"
                                      transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                        duration: 0.6,
                                      }}
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                          <CopyButton
                            text={`${packageManager} add ${dependencies}`}
                          />
                        </div>
                        <div className="p-4 font-mono text-xs text-neutral-600 dark:text-neutral-400 overflow-x-auto whitespace-nowrap">
                          <span className="text-neutral-900 dark:text-neutral-100 font-bold">
                            {packageManager}
                          </span>{" "}
                          add {dependencies}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: cn helper */}
                  <div className="relative">
                    <div className="absolute -left-[37px] md:-left-[56px] top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] md:text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                      2
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Add a cn helper
                      </h3>
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
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                              <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                            <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                              lib/utils.ts
                            </span>
                          </div>
                          <CopyButton
                            text={`import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};`}
                          />
                        </div>
                        <div className="p-5 font-mono text-[11px] leading-relaxed text-neutral-500 bg-[#FAFAFA] dark:bg-neutral-950/50 overflow-x-auto">
                          <div className="flex gap-4">
                            <div className="text-neutral-300 select-none text-right w-4 shrink-0">
                              1
                              <br />2<br />3<br />4<br />5<br />6<br />7
                            </div>
                            <pre className="whitespace-pre">
                              <SyntaxHighlighter
                                code={`import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};`}
                              />
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Component Code */}
                  <div className="relative">
                    <div className="absolute -left-[37px] md:-left-[56px] top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] md:text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                      3
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Copy and paste the following code into your project
                      </h3>
                      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm relative">
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
                              className="text-sky-500"
                            >
                              <path d="m11 17 5 5 5-5" />
                              <path d="m11 7 5-5 5 5" />
                              <circle cx="5" cy="12" r="3" />
                            </svg>
                            <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                              {componentPath}
                            </span>
                          </div>
                          <CopyButton text={componentCode} />
                        </div>
                        <div
                          className={cn(
                            "p-5 font-mono text-[11px] leading-relaxed text-neutral-500 bg-[#FAFAFA] dark:bg-neutral-950/50 transition-all duration-500 overflow-hidden relative",
                            isManualCodeExpanded
                              ? "max-h-[2000px]"
                              : "max-h-[300px]"
                          )}
                        >
                          <pre className="whitespace-pre overflow-x-auto">
                            <SyntaxHighlighter code={componentCode} />
                          </pre>
                          {!isManualCodeExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white dark:from-neutral-950 to-transparent flex items-end justify-center pb-4 pointer-events-none" />
                          )}
                        </div>
                        <div className="flex items-center justify-center py-4 border-t border-neutral-100 dark:border-neutral-900 bg-white/50 dark:bg-neutral-950/50">
                          <button
                            onClick={() =>
                              setIsManualCodeExpanded(!isManualCodeExpanded)
                            }
                            className="px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[10px] font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all shadow-sm"
                          >
                            {isManualCodeExpanded
                              ? "Collapse Code"
                              : "Expand Code"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Update paths */}
                  <div className="relative">
                    <div className="absolute -left-[37px] md:-left-[56px] top-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] md:text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
                      4
                    </div>
                    <div className="flex flex-col gap-2 pt-1.5">
                      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-none">
                        Update the import paths to match your project setup
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Ensure the component and utility paths align with your
                        directory structure.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
