"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  enabled: boolean;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        enabled: true,
        openSearch,
        setOpenSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
