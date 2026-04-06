'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconCircuitChangeover, IconRocket } from '@tabler/icons-react';
import changelogData from '@/data/changelog.json';

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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* ─── Page Header ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-24"
      >
        <h1 className="mb-3 text-3xl font-medium tracking-tighter text-neutral-900 md:text-6xl dark:text-white">
          What we&apos;ve shipped
        </h1>
        <p className="max-w-xl text-base font-light tracking-tight text-neutral-500 md:text-lg dark:text-neutral-400">
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
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: vi * 0.05 }}
            className="relative grid grid-cols-[24px_1fr] gap-x-4 pb-12 last:pb-8 md:grid-cols-[140px_24px_1fr] md:gap-x-8 md:pb-20"
          >
            {/* ─── Left: Date (Desktop Only) ─── */}
            <div className="hidden pt-0.5 text-right md:block">
              <span className="font-mono text-[13px] font-medium tracking-wide text-neutral-400 dark:text-neutral-500">
                {version.date}
              </span>
            </div>

            {/* ─── Center: Timeline Node + Line ─── */}
            <div className="flex flex-col items-center">
              {/* Node */}
              <div className="relative z-10 mt-[6px] h-[9px] w-[9px] shrink-0 rounded-full bg-neutral-300 ring-[3px] ring-neutral-50 md:mt-[6px] dark:bg-neutral-600 dark:ring-neutral-950" />
              {/* Line */}
              <div className="mt-2 w-px flex-1">
                <svg width="1" height="100%" className="overflow-visible">
                  <line
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="100%"
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
              {/* Mobile Date */}
              <div className="mb-2 md:hidden">
                <span className="font-mono text-[12px] font-medium tracking-wide text-neutral-400 dark:text-neutral-500">
                  {version.date}
                </span>
              </div>

              {/* Version + Latest Badge */}
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded border border-neutral-200/60 bg-neutral-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-neutral-500 md:px-2.5 md:py-1 md:text-[12px] dark:border-neutral-700/50 dark:bg-neutral-800/70 dark:text-neutral-400">
                  {version.version}
                </span>
                {version.latest && (
                  <span className="rounded border border-orange-200/80 bg-orange-50 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wide text-orange-600 uppercase md:px-2 md:text-[10px] dark:border-orange-800/50 dark:bg-orange-950/40 dark:text-orange-400">
                    Latest
                  </span>
                )}
              </div>

              {/* Highlight Badges */}
              {version.highlights.length > 0 && (
                <div className="mb-5 flex flex-wrap items-center gap-1.5 md:mb-6 md:gap-2">
                  {version.highlights.map((h, hi) => (
                    <span
                      key={hi}
                      className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200/60 bg-neutral-50 px-2 py-0.5 font-mono text-[11px] text-neutral-500 md:px-2.5 md:py-1 md:text-[12px] dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:text-neutral-400"
                    >
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">
                        {h.split(' ')[0]}
                      </span>{' '}
                      {h.split(' ').slice(1).join(' ')}
                    </span>
                  ))}
                </div>
              )}

              {/* Grouped Entries */}
              {version.groups.map((group, gi) => (
                <div key={gi} className="mb-6 last:mb-0 md:mb-7">
                  {/* Group Title */}
                  <h3 className="mb-2.5 text-[16px] font-bold tracking-tight text-neutral-900 md:mb-3 md:text-lg dark:text-white">
                    {group.title}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="flex flex-col gap-2 md:gap-2.5">
                    {group.entries.map((entry, ei) => (
                      <li key={ei} className="flex items-start gap-2.5 md:gap-3">
                        {/* Bullet dot */}
                        <span className="mt-[8px] h-[4px] w-[4px] shrink-0 rounded-full bg-neutral-300 md:mt-[9px] md:h-[5px] md:w-[5px] dark:bg-neutral-700" />
                        <span className="text-[13px] leading-relaxed text-neutral-600 md:text-[15px] md:leading-relaxed dark:text-neutral-400">
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
        <div className="relative grid grid-cols-[24px_1fr] gap-x-4 md:grid-cols-[140px_24px_1fr] md:gap-x-8">
          <div className="hidden md:block" />
          <div className="flex justify-center">
            <div className="h-[9px] w-[9px] rounded-full bg-neutral-200 ring-[3px] ring-neutral-50 dark:bg-neutral-800 dark:ring-neutral-950" />
          </div>
          <div>
            <span className="font-mono text-[11px] tracking-wide text-neutral-300 md:text-[12px] dark:text-neutral-700">
              The beginning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
