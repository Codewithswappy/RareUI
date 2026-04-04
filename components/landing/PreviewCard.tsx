"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Link } from "next-view-transitions";

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
      className="block w-full max-w-[340px] sm:max-w-[280px] mx-auto group outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-md transition-all duration-300"
    >
      <motion.div
        layout
        layoutId={item.id}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -10 }} 
        onViewportEnter={() => setIsVisible(true)}
        viewport={{ once: true, margin: "200px" }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col gap-2 group cursor-pointer w-full rounded-md shadow-md shadow-black/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5 border border-neutral-200/80 dark:border-neutral-800/60 p-2 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300"
      >
        {/* Visual Preview Container */}
        <div className="h-[180px] w-full bg-[#FDFDFC] dark:bg-neutral-800/30 rounded-md shadow-sm shadow-black/5 dark:shadow-black/20 ring-2 ring-black/5 dark:ring-white/10 overflow-hidden flex items-center justify-center relative p-3 transition-all duration-300 group-hover:bg-[#F8F8F7] dark:group-hover:bg-neutral-900/50">
          <div className="w-full h-full relative z-10 flex items-center justify-center origin-center">
            {isVisible ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center"
              >
                {item.preview}
              </motion.div>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-neutral-100 dark:border-neutral-700 border-t-neutral-300 dark:border-t-neutral-500 animate-spin" />
            )}
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="flex items-center justify-between px-2">
          <span className="text-[10px] font-semibold text-neutral-800 dark:text-neutral-200 opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
            {item.name}
          </span>
          <div className="px-2 py-1 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg text-neutral-500 dark:text-neutral-100 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 border-2 border-neutral-200/80 dark:border-neutral-700/50">
            <IconArrowUpRight className="w-5 h-5 " />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
