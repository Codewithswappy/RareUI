'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface DemoWithRefreshProps {
  children: React.ReactNode;
}

export function DemoWithRefresh({ children }: DemoWithRefreshProps) {
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="relative h-full w-full">
      <div key={key} className="h-full w-full">
        {children}
      </div>

      {/* Refresh Button - Positioned in Preview Container Top Right */}
      <button
        onClick={handleRefresh}
        className="bg-background/90 border-border hover:bg-accent group absolute top-0 right-0 z-20 rounded-lg border p-2 shadow-sm backdrop-blur-sm transition-all duration-200"
        title="Replay animation"
        aria-label="Replay animation"
      >
        <RefreshCw className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-all duration-500 group-hover:rotate-180" />
      </button>
    </div>
  );
}
