"use client";

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
    <div className="relative w-full h-full">
      <div key={key} className="w-full h-full">
        {children}
      </div>
      
      {/* Refresh Button - Positioned in Preview Container Top Right */}
      <button
        onClick={handleRefresh}
        className="absolute top-0 right-0 p-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border hover:bg-accent transition-all duration-200 group shadow-sm z-20"
        title="Replay animation"
        aria-label="Replay animation"
      >
        <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:rotate-180 duration-500" />
      </button>
    </div>
  );
}
