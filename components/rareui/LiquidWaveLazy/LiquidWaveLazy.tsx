'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LiquidWaveDynamic = dynamic(() => import('../LiquidWave'), {
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-900"
      style={{ minHeight: '400px' }}
    >
      <div className="animate-pulse text-center">
        <div className="text-muted-foreground text-sm">Loading WebGL Simulation...</div>
      </div>
    </div>
  ),
  ssr: false,
});

// Forward props wrapper
export default function LiquidWave(props: any) {
  return <LiquidWaveDynamic {...props} />;
}
