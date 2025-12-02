"use client";

import * as React from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useSearchContext } from "@/components/rareui/search-context";

export function CommandPaletteModal() {
const { openSearch, setOpenSearch } = useSearchContext();
const [search, setSearch] = React.useState("");

const items = [
  { category: "Pages", label: "Home", url: "/" },
  { category: "Pages", label: "About", url: "/about" },
  { category: "Components", label: "Button", url: "/components/button" },
  { category: "Components", label: "Modal", url: "/components/modal" },
];

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

return (
    <AnimatePresence>
      {openSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpenSearch(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-2xl rounded-2xl border bg-neutral-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="rounded-2xl text-neutral-50">
              <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
                <Search className="h-4 w-4 text-neutral-400" />
                <Command.Input
                  placeholder="Search..."
                  value={search}
                  onValueChange={setSearch}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-500"
                  autoFocus
                />
                <kbd className="rounded bg-neutral-800 px-2 py-1 text-[10px] text-neutral-400">
                  Esc
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto px-2 py-2">
                {filteredItems.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm text-neutral-400">
                    No results found.
                  </div>
                )}

                {Array.from(new Set(filteredItems.map(item => item.category))).map((category) => {
                  const categoryItems = filteredItems.filter(item => item.category === category);
                  if (!categoryItems.length) return null;
                  return (
                    <Command.Group key={category} heading={category} className="text-neutral-500 px-2 py-1 text-xs font-semibold">
                      {categoryItems.map((item, i) => (
                        <Command.Item
                          key={i}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-neutral-800 cursor-pointer"
                          onSelect={() => {
                            window.location.href = item.url;
                            setOpenSearch(false);
                          }}
                        >
                          {item.label}
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