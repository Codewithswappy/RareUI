"use client";

import * as React from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles
} from "lucide-react";
import { useSearchContext } from "@/components/rareui/search-context";
import { sidebarData } from "@/lib/sidebar-data";
import { useRouter } from "next/navigation";

export function CommandPaletteModal() {
  const { openSearch, setOpenSearch } = useSearchContext();
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  // Flatten sidebar data
  const items = React.useMemo(() => {
    const flatItems: any[] = [];
    sidebarData.forEach((section) => {
      section.items.forEach((item) => {
        flatItems.push({
          category: section.title,
          label: item.title,
          url: item.href,
          external: item.href.startsWith("http"),
        });
      });
    });
    return flatItems;
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch(true);
      }
      if (e.key === "Escape") setOpenSearch(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpenSearch]);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (url: string, external: boolean) => {
    if (external) {
      window.open(url, "_blank");
    } else {
      router.push(url);
    }
    setOpenSearch(false);
    setSearch("");
  };

  const getIcon = (category: string, label: string, className: string) => {
    const lowerLabel = label.toLowerCase();
    const lowerCategory = category.toLowerCase();

    if (lowerLabel.includes("twitter") || lowerLabel.includes("follow")) return <AtSign className={className} />;
    
    // Category based
    if (lowerCategory.includes("installation")) return <Terminal className={className} />;
    if (lowerCategory.includes("buttons")) return <MousePointerClick className={className} />;
    if (lowerCategory.includes("cards")) return <CreditCard className={className} />;
    if (lowerCategory.includes("inputs")) return <Type className={className} />;
    if (lowerCategory.includes("navigation")) return <Menu className={className} />;
    if (lowerCategory.includes("overlays") || lowerCategory.includes("modals")) return <Layers className={className} />;
    if (lowerCategory.includes("feedback")) return <MessageSquare className={className} />;
    
    // Label based
    if (lowerLabel.includes("cli")) return <Terminal className={className} />;
    if (lowerLabel.includes("utils")) return <Wrench className={className} />;
    if (lowerLabel.includes("install")) return <Download className={className} />;
    if (lowerLabel.includes("premium")) return <Sparkles className={className} />;
    if (lowerLabel.includes("layout")) return <LayoutTemplate className={className} />;
    
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
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpenSearch(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="w-full bg-transparent">
              <div className="flex items-center border-b border-border/50 px-4 py-4">
                <Search className="mr-3 h-5 w-5 text-muted-foreground/70" />
                <Command.Input
                  placeholder="Search documentation..."
                  value={search}
                  onValueChange={setSearch}
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70 text-foreground"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-border bg-muted/50 px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">ESC</span>
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2 scroll-smooth">
                {filteredItems.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-sm text-muted-foreground">No results found.</p>
                  </div>
                )}

                {Array.from(new Set(filteredItems.map(item => item.category))).map((category) => {
                  const categoryItems = filteredItems.filter(item => item.category === category);
                  if (!categoryItems.length) return null;
                  
                  return (
                    <Command.Group 
                      key={category} 
                      heading={category} 
                      className="px-2 py-2 text-xs font-semibold text-muted-foreground/70 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-muted-foreground/50"
                    >
                      {categoryItems.map((item, i) => (
                        <Command.Item
                          key={i}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out aria-selected:bg-accent/50"
                          onSelect={() => handleSelect(item.url, item.external)}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 bg-background/50 group-hover:border-primary/20 group-hover:bg-primary/10 transition-colors">
                            {item.external ? (
                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            ) : (
                              getIcon(category, item.label, "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors")
                            )}
                          </div>
                          <span className="flex-1 truncate font-medium">{item.label}</span>
                          {item.external && (
                            <span className="text-xs text-muted-foreground/50">External</span>
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