"use client";

import { ArrowLeft } from "lucide-react";

export function GoBackButton() {
  return (
    <button
      onClick={() => typeof window !== "undefined" && window.history.back()}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      Go Back
    </button>
  );
}
