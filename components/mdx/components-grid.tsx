"use client";

import Link from "next/link";
import { sidebarData } from "@/lib/sidebar-data";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function ComponentsGrid() {
  const componentSections = sidebarData.filter(
    section => !["Getting Started", "Installation", "Interactive Background"].includes(section.title)
  );

  return (
    <div className="space-y-24 pb-20">
      {componentSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="relative">
          {/* Section Header */}
          <div className="mb-8 flex items-end gap-4 overflow-hidden">
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground/20 uppercase select-none absolute -top-8 -left-2 scale-150 transform-gpu opacity-20 hidden md:block">
                {section.title}
             </h2>
             <div className="relative z-10 flex items-center gap-4 w-full">
                 <h2 className="text-2xl font-bold tracking-tight text-foreground">{section.title}</h2>
                 <div className="h-px flex-1 bg-border/40 ml-4" />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
            {section.items.map((item, itemIndex) => {
              const delay = (itemIndex % 10) * 0.05;

              return (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay, ease: "easeOut" }}
                >
                  <Link 
                    href={item.href} 
                    className="group flex items-center justify-between py-3 border-b border-border/40 hover:border-foreground/20 transition-colors no-underline"
                  >
                    <div className="flex items-center gap-3">
                        <span className="text-base text-muted-foreground group-hover:text-foreground group-hover:pl-2 transition-all duration-300 font-medium">
                            {item.title}
                        </span>
                        {item.badge && (
                            <span className={cn(
                                "text-[10px] uppercase font-bold tracking-wider px-1.5 py-px rounded border",
                                item.badge.toLowerCase() === 'new' 
                                    ? "border-primary/30 text-primary bg-primary/5" 
                                    : "border-muted-foreground/30 text-muted-foreground bg-muted/50"
                            )}>
                                {item.badge}
                            </span>
                        )}
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
