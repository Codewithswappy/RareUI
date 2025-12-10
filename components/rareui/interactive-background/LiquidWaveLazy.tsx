"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const LiquidWaveDynamic = dynamic(
  () => import('@/components/rareui/interactive-background/LiquidWave'),
  {
    loading: () => (
      <div 
        className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900"
        style={{ minHeight: '400px' }}
      >
        <div className="animate-pulse text-center">
          <div className="text-sm text-muted-foreground">Loading WebGL Simulation...</div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

// Forward props wrapper
export default function LiquidWave(props: any) {
  return <LiquidWaveDynamic {...props} />;
}
