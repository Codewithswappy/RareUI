"use client";

import { useSearchContext } from "@/components/rareui/search-context";

export function ModalDemo() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button 
      onClick={() => setOpenSearch(true)}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Open Modal (or press Cmd+K)
    </button>
  );
}
