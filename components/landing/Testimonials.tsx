'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconBrandX } from '@tabler/icons-react';

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  verified?: boolean;
}

const FEEDBACK_WALL: Testimonial[] = [
  {
    id: 1,
    name: 'Pritam',
    handle: '@iPritamX',
    avatar: 'https://unavatar.io/twitter/iPritamX',
    content: 'Looks sharp!',
    verified: true,
  },
  {
    id: 2,
    name: 'Leo Do',
    handle: '@leododev',
    avatar: 'https://unavatar.io/twitter/leododev',
    content: 'Nice animations',
    verified: true,
  },
  {
    id: 3,
    name: 'subhan',
    handle: '@subhanmalik911',
    avatar: 'https://unavatar.io/twitter/subhanmalik911',
    content: 'Respect How long you been grinding on this? Looks solid already.',
    verified: false,
  },
  {
    id: 4,
    name: 'Terence',
    handle: '@terencebuilds',
    avatar: 'https://unavatar.io/twitter/terencebuilds',
    content: 'This is so cool and will distract me soooo much 😂',
    verified: true,
  },
  {
    id: 5,
    name: 'Terence',
    handle: '@terencebuilds',
    avatar: 'https://unavatar.io/twitter/terencebuilds',
    content: 'This looks really amazing.',
    verified: true,
  },
  {
    id: 6,
    name: 'Ilia Stepin',
    handle: '@martbln_dev',
    avatar: 'https://unavatar.io/twitter/martbln_dev',
    content: 'Love it! 😍',
    verified: true,
  },
  {
    id: 7,
    name: 'subhan',
    handle: '@subhanmalik911',
    avatar: 'https://unavatar.io/twitter/subhanmalik911',
    content: "This looks clean it's solid work man!",
    verified: false,
  },
  {
    id: 8,
    name: 'Ziwen Xu',
    handle: '@ziwenxu_',
    avatar: 'https://unavatar.io/twitter/ziwenxu_',
    content: 'Love the craft and the detail in this library! Truly amazing work.',
    verified: true,
  },
  {
    id: 9,
    name: 'Steven Tey',
    handle: '@steventey',
    avatar: 'https://unavatar.io/twitter/steventey',
    content:
      'The level of polish here is insane. RareUI is a game changer for anyone building high-performance landing pages.',
    verified: true,
  },
];

const PremiumTweetCard = ({ item }: { item: Testimonial }) => (
  <div className="rounded-xl bg-neutral-200/50 p-0.5 shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-800/30 dark:shadow-black/20 dark:ring-white/10">
    <div className="group relative flex h-[180px] min-h-[150px] flex-col justify-between gap-2 rounded-lg border border-neutral-100 bg-white p-4 shadow-sm ring-1 shadow-black/10 ring-black/10 transition-all duration-300 dark:border-neutral-800/60 dark:bg-neutral-900 dark:shadow-black/20 dark:ring-white/5">
      {/* Inner Highlight Layer */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 shadow-inner dark:border-neutral-600 dark:bg-neutral-700">
            <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm leading-tight font-bold text-neutral-900 dark:text-white">
                {item.name}
              </span>
              {item.verified && (
                <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] fill-current text-[#1D9BF0]">
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.08s-2.47-1.49-3.89-1.29c-.78-1.57-2.34-2.54-4.11-2.54s-3.33.97-4.11 2.54c-1.42-.2-2.88.18-3.89 1.29s-1.27 2.69-.81 4.08c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.97.81 4.08s2.47 1.49 3.89 1.29c.78 1.57 2.34 2.54 4.11 2.54s-3.33-.97 4.11-2.54c1.42.2 2.88-.18 3.89-1.29s1.27-2.69.81-4.08c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.3-5.3 1.4 1.4-6.7 6.7z" />
                </svg>
              )}
            </div>
            <span className="text-[12.5px] font-medium text-neutral-400 dark:text-neutral-500">
              {item.handle}
            </span>
          </div>
        </div>
        <IconBrandX
          className="h-[18px] w-[18px] text-neutral-200 dark:text-neutral-600"
          stroke={2}
        />
      </div>

      <p className="text-[14.5px] leading-relaxed tracking-tight text-neutral-700 dark:text-neutral-300">
        {item.content}
      </p>
    </div>
  </div>
);

export default function Testimonials() {
  const firstRow = FEEDBACK_WALL.slice(0, Math.ceil(FEEDBACK_WALL.length / 2));
  const secondRow = FEEDBACK_WALL.slice(Math.ceil(FEEDBACK_WALL.length / 2));

  // Create 4 copies so total width is 4x. Shifting by 50% traverses exactly 2 copies.
  const dupFirstRow = [...firstRow, ...firstRow, ...firstRow, ...firstRow];
  const dupSecondRow = [...secondRow, ...secondRow, ...secondRow, ...secondRow];

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-10 transition-colors duration-500 dark:bg-neutral-950">
      <div className="relative z-10 mx-auto w-full px-4">
        <div className="mx-auto mb-16 w-[98%] max-w-[1600px]">
          <h2 className="mb-4 text-3xl font-medium tracking-tighter text-neutral-900 md:text-5xl dark:text-white">
            Hear it from <br /> the community
          </h2>
          <p className="max-w-xl text-lg tracking-tight text-neutral-500 dark:text-neutral-400">
            Loved by builders and designers alike. A living wall of proof that is always evolving.
          </p>
        </div>

        {/* Marquee Container with edge masking */}
        <div className="flex flex-col gap-6 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Top Marquee Row */}
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex w-max shrink-0 gap-6"
          >
            {dupFirstRow.map((item, i) => (
              <div key={i} className="w-[320px] md:w-[400px]">
                <PremiumTweetCard item={item} />
              </div>
            ))}
          </motion.div>

          {/* Bottom Reverse Marquee Row */}
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex w-max shrink-0 gap-6"
          >
            {dupSecondRow.map((item, i) => (
              <div key={i} className="w-[320px] md:w-[400px]">
                <PremiumTweetCard item={item} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
