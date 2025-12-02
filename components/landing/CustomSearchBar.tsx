"use client";

import { useSearchContext } from '@/components/rareui/search-context';
import { useEffect } from 'react';
import Loader from '../rareui/buttons/loader';

export function CustomSearchBar() {
  const { enabled, setOpenSearch } = useSearchContext();
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpenSearch]);
  
  if (!enabled) return null;

  return (
    <button
      onClick={() => setOpenSearch(true)}
      className="relative inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground px-3 py-2 justify-start rounded-full text-sm font-normal shadow-none h-10 w-64"
      type="button"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <div className="scale-[0.5]">
          <Loader />
        </div>
      </div>
      <span className="hidden lg:inline-flex">Search Components</span>
      <span className="inline-flex lg:hidden">Search...</span>
      {/* <kbd className="pointer-events-none absolute right-[0.3rem] top-1/2 -translate-y-1/2 flex h-7 select-none items-center gap-1 rounded border border-[--border] bg-[--muted] px-1.5 font-mono text-[10px] font-medium opacity-100">
        <span className="text-xs leading-none">⌘</span>K
      </kbd> */}
    </button>
  );
}
