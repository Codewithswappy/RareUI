'use client';

import { ArrowLeft } from 'lucide-react';

export function GoBackButton() {
  return (
    <button
      onClick={() => typeof window !== 'undefined' && window.history.back()}
      className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </button>
  );
}
