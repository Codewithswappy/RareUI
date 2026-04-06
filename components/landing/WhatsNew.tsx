'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import { IconArrowRight } from '@tabler/icons-react';
import changelogData from '@/data/changelog.json';

export default function WhatsNew() {
  const latestVersion = changelogData.versions[0];
  // Take first entry from each group for variety
  const previewEntries: { group: string; text: string }[] = [];
  for (const group of latestVersion.groups) {
    if (previewEntries.length >= 3) break;
    previewEntries.push({ group: group.title, text: group.entries[0] });
  }

  return (
    <section className="bg-neutral-50 py-10 transition-colors duration-500 md:py-20 dark:bg-neutral-950">
      <div className="mx-auto w-[98%] max-w-[1600px] px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Left: Heading */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 text-3xl font-medium tracking-tighter text-neutral-900 md:text-5xl dark:text-white"
            >
              What&apos;s new <br /> in RareUI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8 max-w-sm text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400"
            >
              We ship new components and improvements every week. Here&apos;s what landed recently.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/changelog"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-neutral-500 transition-colors duration-300 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
              >
                View full changelog
                <IconArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  stroke={2}
                />
              </Link>
            </motion.div>
          </div>

          {/* Right: Entries */}
          <div className="flex flex-col gap-0">
            {previewEntries.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group border-b border-neutral-200/60 py-5 first:border-t dark:border-neutral-800/50"
              >
                {/* Group Label */}
                <span className="mb-2 block font-mono text-[10px] font-semibold tracking-[0.12em] text-neutral-400 uppercase dark:text-neutral-600">
                  {entry.group}
                </span>

                {/* Entry Text */}
                <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px] dark:text-neutral-300">
                  {entry.text}
                </p>
              </motion.div>
            ))}

            {/* Highlight badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              {latestVersion.highlights.map((h, hi) => (
                <span
                  key={hi}
                  className="rounded border border-neutral-200/50 bg-neutral-100/80 px-2.5 py-1 font-mono text-[11px] text-neutral-400 dark:border-neutral-800/40 dark:bg-neutral-900/60 dark:text-neutral-500"
                >
                  {h}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
