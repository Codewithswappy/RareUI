'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Link } from 'next-view-transitions';

interface PreviewCardProps {
  item: {
    id: string;
    name: string;
    category: string;
    tag: string;
    preview: React.ReactNode;
    slug: string;
  };
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ item }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Link
      href={`/docs/${item.slug}`}
      className="group mx-auto block w-full max-w-[340px] rounded-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:max-w-[280px] dark:focus-visible:ring-white/20"
    >
      <motion.div
        layout
        layoutId={item.id}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -10 }}
        onViewportEnter={() => setIsVisible(true)}
        viewport={{ once: true, margin: '200px' }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="group flex w-full cursor-pointer flex-col gap-2 rounded-md border border-neutral-200/80 bg-white/50 p-2 shadow-md ring-1 shadow-black/5 ring-black/5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:border-neutral-800/60 dark:bg-neutral-900/50 dark:shadow-black/20 dark:ring-white/5 dark:hover:shadow-black/30"
      >
        {/* Visual Preview Container */}
        <div className="relative flex h-[180px] w-full items-center justify-center overflow-hidden rounded-md bg-[#FDFDFC] p-3 shadow-sm ring-2 shadow-black/5 ring-black/5 transition-all duration-300 group-hover:bg-[#F8F8F7] dark:bg-neutral-800/30 dark:shadow-black/20 dark:ring-white/10 dark:group-hover:bg-neutral-900/50">
          <div className="relative z-10 flex h-full w-full origin-center items-center justify-center">
            {isVisible ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-full w-full items-center justify-center"
              >
                {item.preview}
              </motion.div>
            ) : (
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-100 border-t-neutral-300 dark:border-neutral-700 dark:border-t-neutral-500" />
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between px-2">
          <span className="overflow-hidden text-[10px] font-semibold tracking-tight text-ellipsis whitespace-nowrap text-neutral-800 opacity-60 transition-opacity group-hover:opacity-100 dark:text-neutral-200">
            {item.name}
          </span>
          <div className="rounded-lg border-2 border-neutral-200/80 bg-neutral-50 px-2 py-1 text-neutral-500 group-hover:text-neutral-800 dark:border-neutral-700/50 dark:bg-neutral-800/50 dark:text-neutral-100 dark:group-hover:text-neutral-200">
            <IconArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
