"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconCircuitChangeover, IconRocket } from "@tabler/icons-react";
import changelogData from "@/data/changelog.json";

// ─── Types ─────────────────────────────────────────────────────────
interface ChangelogGroup {
  title: string;
  entries: string[];
}

interface ChangelogVersion {
  version: string;
  date: string;
  latest: boolean;
  highlights: string[];
  groups: ChangelogGroup[];
}

export default function ChangelogPage() {
  const versions: ChangelogVersion[] = changelogData.versions;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8">
      {/* ─── Page Header ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-transparent ring-1 ring-orange-200 dark:ring-orange-300 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <IconCircuitChangeover className="w-5 h-5" stroke={2} />
          </div>
          <span className="text-[11px] font-mono font-semibold tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
            Changelog
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-3">
          What we&apos;ve shipped
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg tracking-tight max-w-xl font-light">
          New components, improvements, and fixes — shipped every week.
        </p>
      </motion.div>

      {/* ─── Timeline ─────────────────────────────────────────── */}
      <div className="relative">
        {versions.map((version, vi) => (
          <motion.div
            key={version.version}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: vi * 0.05 }}
            className="relative grid grid-cols-[100px_24px_1fr] md:grid-cols-[140px_24px_1fr] gap-x-4 md:gap-x-8 pb-20 last:pb-8"
          >
            {/* ─── Left: Date ─── */}
            <div className="text-right pt-0.5">
              <span className="text-[13px] font-mono font-medium text-neutral-400 dark:text-neutral-500 tracking-wide">
                {version.date}
              </span>
            </div>

            {/* ─── Center: Timeline Node + Line ─── */}
            <div className="flex flex-col items-center">
              {/* Node */}
              <div className="relative z-10 w-[9px] h-[9px] mt-[6px] rounded-full bg-neutral-300 dark:bg-neutral-600 ring-[3px] ring-neutral-50 dark:ring-neutral-950 shrink-0" />
              {/* Line */}
              <div className="flex-1 w-px mt-2">
                <svg width="1" height="100%" className="overflow-visible">
                  <line
                    x1="0.5" y1="0" x2="0.5" y2="100%"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    className="text-neutral-200 dark:text-neutral-800"
                  />
                </svg>
              </div>
            </div>

            {/* ─── Right: Content ─── */}
            <div className="min-w-0">
              {/* Version + Latest Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] font-mono font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/70 px-2.5 py-1 rounded border border-neutral-200/60 dark:border-neutral-700/50">
                  {version.version}
                </span>
                {version.latest && (
                  <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200/80 dark:border-orange-800/50">
                    Latest
                  </span>
                )}
              </div>

              {/* Highlight Badges */}
              {version.highlights.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {version.highlights.map((h, hi) => (
                    <span
                      key={hi}
                      className="inline-flex items-center gap-1.5 text-[12px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-800/60"
                    >
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">
                        {h.split(" ")[0]}
                      </span>{" "}
                      {h.split(" ").slice(1).join(" ")}
                    </span>
                  ))}
                </div>
              )}

              {/* Grouped Entries */}
              {version.groups.map((group, gi) => (
                <div key={gi} className="mb-7 last:mb-0">
                  {/* Group Title */}
                  <h3 className="text-[17px] md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
                    {group.title}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="flex flex-col gap-2.5">
                    {group.entries.map((entry, ei) => (
                      <li key={ei} className="flex items-start gap-3">
                        {/* Bullet dot */}
                        <span className="mt-[9px] w-[5px] h-[5px] rounded-full bg-neutral-300 dark:bg-neutral-700 shrink-0" />
                        <span className="text-[14px] md:text-[15px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {entry}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* ─── End Marker ─── */}
        <div className="relative grid grid-cols-[100px_24px_1fr] md:grid-cols-[140px_24px_1fr] gap-x-4 md:gap-x-8">
          <div />
          <div className="flex justify-center">
            <div className="w-[9px] h-[9px] rounded-full bg-neutral-200 dark:bg-neutral-800 ring-[3px] ring-neutral-50 dark:ring-neutral-950" />
          </div>
          <div>
            <span className="text-[12px] font-mono text-neutral-300 dark:text-neutral-700 tracking-wide">
              The beginning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
