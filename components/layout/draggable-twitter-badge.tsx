"use client";

import { motion } from "motion/react";
import { useRef } from "react";

export function DraggableTwitterBadge() {
  const constraintsRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Simple icon path for Twitter/X
  const xIcon = (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  return (
    <>
      <div 
        ref={constraintsRef} 
        className="fixed inset-8 pointer-events-none z-[100]" 
      />
      
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={true}
        onDragStart={() => {
            isDraggingRef.current = true;
        }}
        onDragEnd={() => {
            setTimeout(() => {
                isDraggingRef.current = false;
            }, 150);
        }}
        whileHover={{ scale: 1.05, cursor: "grab" }}
        whileTap={{ scale: 0.95, cursor: "grabbing" }}
        whileDrag={{ cursor: "grabbing" }}
        className="fixed top-24 left-0 right-0 mx-auto w-fit z-[101] flex"
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
           className="flex items-center gap-2 p-3 md:px-4 md:py-2 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg hover:shadow-xl transition-all group select-none"
        >
          <div className="text-foreground group-hover:text-primary transition-colors">
            {xIcon}
          </div>
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors pr-1 hidden md:block">
            @heyyswap
          </span>
        </a>
      </motion.div>
    </>
  );
}
