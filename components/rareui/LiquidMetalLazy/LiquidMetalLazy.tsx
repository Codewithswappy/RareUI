'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import type { LiquidMetalProps } from '../LiquidMetal';

const LiquidMetalDynamic = dynamic(() => import('../LiquidMetal'), {
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center bg-transparent"
      style={{ minHeight: '400px' }}
    >
      <div className="animate-pulse text-center">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Loading Metal Effect...
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

// Forward props wrapper
export default function LiquidMetal(props: LiquidMetalProps) {
  return <LiquidMetalDynamic {...props} />;
}
