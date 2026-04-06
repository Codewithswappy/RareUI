'use client';

import Link from 'next/link';
import { sidebarData } from '@/lib/sidebar-data';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export function ComponentsGrid() {
  const componentSections = sidebarData.filter(
    (section) =>
      !['Getting Started', 'Installation', 'Interactive Background'].includes(section.title)
  );

  return (
    <div className="space-y-24 pb-20">
      {componentSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="relative">
          {/* Section Header */}
          <div className="mb-8 flex items-end gap-4 overflow-hidden">
            <h2 className="text-foreground/20 absolute -top-8 -left-2 hidden scale-150 transform-gpu text-4xl font-bold tracking-tight uppercase opacity-20 select-none md:block md:text-5xl">
              {section.title}
            </h2>
            <div className="relative z-10 flex w-full items-center gap-4">
              <h2 className="text-foreground text-2xl font-bold tracking-tight">{section.title}</h2>
              <div className="bg-border/40 ml-4 h-px flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {section.items.map(
              (item: { title: string; href: string; badge?: string }, itemIndex) => {
                const delay = (itemIndex % 10) * 0.05;

                return (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
                  >
                    <Link
                      href={item.href}
                      className="group border-border/40 hover:border-foreground/20 flex items-center justify-between border-b py-3 no-underline transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground group-hover:text-foreground text-base font-medium transition-all duration-300 group-hover:pl-2">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span
                            className={cn(
                              'rounded border px-1.5 py-px text-[10px] font-bold tracking-wider uppercase',
                              item.badge.toLowerCase() === 'new'
                                ? 'border-primary/30 text-primary bg-primary/5'
                                : 'border-muted-foreground/30 text-muted-foreground bg-muted/50'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <ArrowRight className="text-muted-foreground/30 h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
