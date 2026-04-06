'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ExternalLink,
  Hash,
  Laptop,
  FileText,
  Terminal,
  MousePointerClick,
  CreditCard,
  LayoutTemplate,
  Type,
  Menu,
  Layers,
  MessageSquare,
  Wrench,
  Download,
  Box,
  AtSign,
  Sparkles,
} from 'lucide-react';
import { useSearchContext } from '@/components/internal/search-context';
import { sidebarData } from '@/lib/sidebar-data';
import { useRouter } from 'next/navigation';

export function CommandPaletteModal() {
  const { openSearch, setOpenSearch } = useSearchContext();
  const [search, setSearch] = React.useState('');
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  React.useEffect(() => {
    if (openSearch) {
      // Small delay to ensure the animation has started and element is visible
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [openSearch]);

  // Flatten sidebar data
  const items = React.useMemo(() => {
    const flatItems: any[] = [];
    sidebarData.forEach((section) => {
      section.items.forEach((item) => {
        flatItems.push({
          category: section.title,
          label: item.title,
          url: item.href,
          external: item.href.startsWith('http'),
        });
      });
    });
    return flatItems;
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch(true);
      }
      if (e.key === 'Escape') setOpenSearch(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpenSearch]);

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (url: string, external: boolean) => {
    if (external) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
    setOpenSearch(false);
    setSearch('');
  };

  const getIcon = (category: string, label: string, className: string) => {
    const lowerLabel = label.toLowerCase();
    const lowerCategory = category.toLowerCase();

    if (lowerLabel.includes('twitter') || lowerLabel.includes('follow'))
      return <AtSign className={className} />;

    // Category based
    if (lowerCategory.includes('installation')) return <Terminal className={className} />;
    if (lowerCategory.includes('buttons')) return <MousePointerClick className={className} />;
    if (lowerCategory.includes('cards')) return <CreditCard className={className} />;
    if (lowerCategory.includes('inputs')) return <Type className={className} />;
    if (lowerCategory.includes('navigation')) return <Menu className={className} />;
    if (lowerCategory.includes('overlays') || lowerCategory.includes('modals'))
      return <Layers className={className} />;
    if (lowerCategory.includes('feedback')) return <MessageSquare className={className} />;

    // Label based
    if (lowerLabel.includes('cli')) return <Terminal className={className} />;
    if (lowerLabel.includes('utils')) return <Wrench className={className} />;
    if (lowerLabel.includes('install')) return <Download className={className} />;
    if (lowerLabel.includes('premium')) return <Sparkles className={className} />;
    if (lowerLabel.includes('layout')) return <LayoutTemplate className={className} />;

    return <Box className={className} />;
  };

  return (
    <AnimatePresence>
      {openSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center border border-neutral-200/80 bg-black/60 px-4 pt-[15vh] shadow-md ring-1 shadow-black/10 ring-black/10"
          onClick={() => setOpenSearch(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-border/50 bg-background/80 relative w-full max-w-2xl overflow-hidden rounded-md border shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="w-full bg-transparent" shouldFilter={false}>
              <div className="border-border/50 flex items-center border-b px-4 py-4">
                <Search className="text-muted-foreground/70 mr-3 h-5 w-5" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="placeholder:text-muted-foreground/70 text-foreground flex-1 bg-transparent text-base outline-none"
                  autoFocus
                />
                <kbd className="border-border bg-muted/50 text-muted-foreground hidden h-6 items-center gap-1 rounded border px-2 font-mono text-[10px] font-medium opacity-100 select-none sm:inline-flex">
                  <span className="text-xs">ESC</span>
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto overscroll-contain p-2">
                {filteredItems.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground text-sm">No results found.</p>
                  </div>
                )}

                {Array.from(new Set(filteredItems.map((item) => item.category))).map((category) => {
                  const categoryItems = filteredItems.filter((item) => item.category === category);
                  if (!categoryItems.length) return null;

                  return (
                    <Command.Group
                      key={category}
                      heading={category}
                      className="text-muted-foreground/70 [&_[cmdk-group-heading]]:text-muted-foreground/50 px-2 py-2 text-xs font-semibold [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2"
                    >
                      {categoryItems.map((item, i) => (
                        <Command.Item
                          key={i}
                          className="group text-foreground hover:bg-accent/50 hover:text-accent-foreground aria-selected:bg-accent/50 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200 ease-in-out"
                          onSelect={() => handleSelect(item.url, item.external)}
                        >
                          <div className="border-border/50 bg-background/50 group-hover:border-primary/20 group-hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md border transition-colors">
                            {item.external ? (
                              <ExternalLink className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                            ) : (
                              getIcon(
                                category,
                                item.label,
                                'h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors'
                              )
                            )}
                          </div>
                          <span className="flex-1 truncate font-medium">{item.label}</span>
                          {item.external && (
                            <span className="text-muted-foreground/50 text-xs">External</span>
                          )}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
