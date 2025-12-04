"use client";

import { useSearchContext } from '@/components/rareui/search-context';
import { useEffect } from 'react';


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
      className="relative inline-flex items-center gap-2 whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground px-4 py-2 justify-start rounded-xl text-sm font-normal shadow-sm hover:shadow-md h-10 w-64 backdrop-blur-md group"
      type="button"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="hidden lg:inline-flex opacity-80 group-hover:opacity-100 transition-opacity">Search Components...</span>
      <span className="inline-flex lg:hidden opacity-80 group-hover:opacity-100 transition-opacity">Search...</span>
      <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex shadow-sm">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
