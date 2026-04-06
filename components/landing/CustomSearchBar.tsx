'use client';

import { useSearchContext } from '@/components/internal/search-context';
import { useEffect } from 'react';

export function CustomSearchBar() {
  const { enabled, setOpenSearch } = useSearchContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch(true);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpenSearch]);

  if (!enabled) return null;

  return (
    <button
      onClick={() => setOpenSearch(true)}
      className="focus-visible:ring-ring border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground group relative inline-flex h-10 w-64 cursor-pointer items-center justify-start gap-2 rounded-md border px-4 py-2 text-sm font-normal whitespace-nowrap shadow-sm ring-1 shadow-black/10 ring-black/10 backdrop-blur-md transition-all duration-300 hover:shadow-md focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
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
        className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="hidden opacity-80 transition-opacity group-hover:opacity-100 lg:inline-flex">
        Search Components...
      </span>
      <span className="inline-flex opacity-80 transition-opacity group-hover:opacity-100 lg:hidden">
        Search...
      </span>
      <kbd className="border-border bg-background text-muted-foreground pointer-events-none absolute top-1/2 right-2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 shadow-sm select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
