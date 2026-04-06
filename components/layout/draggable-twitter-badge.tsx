'use client';

import { motion } from 'motion/react';
import { useRef } from 'react';

export function DraggableTwitterBadge() {
  const constraintsRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Simple icon path for Twitter/X
  const xIcon = (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  return (
    <>
      <div ref={constraintsRef} className="pointer-events-none fixed inset-8 z-100" />

      <motion.div
        // drag
        // dragConstraints={constraintsRef}
        // dragMomentum={true}
        // onDragStart={() => {
        //     isDraggingRef.current = true;
        // }}
        // onDragEnd={() => {
        //     setTimeout(() => {
        //         isDraggingRef.current = false;
        //     }, 150);
        // }}
        // whileHover={{ scale: 1.05, cursor: "grab" }}
        // whileTap={{ scale: 0.95, cursor: "grabbing" }}
        // whileDrag={{ cursor: "grabbing" }}
        className="fixed top-2 right-0 left-0 z-101 mx-auto flex w-fit"
      >
        <a
          href="https://x.com/heyyswap"
          target="_blank"
          rel="noopener noreferrer"
          // Prevent native drag of the link element
          onDragStart={(e) => e.preventDefault()}
          // Prevent click if we were just dragging
          onClick={(e) => {
            if (isDraggingRef.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className="group flex items-center gap-2 rounded-lg p-3 shadow-sm ring-1 ring-black/10 transition-all select-none hover:shadow-md md:px-4 md:py-2 dark:ring-white/10"
        >
          <div className="text-foreground group-hover:text-primary transition-colors">{xIcon}</div>
          <span className="text-muted-foreground group-hover:text-foreground hidden pr-1 text-sm font-medium transition-colors md:block">
            @heyyswap
          </span>
        </a>
      </motion.div>
    </>
  );
}
