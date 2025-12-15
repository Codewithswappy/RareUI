"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const LiquidMetalDynamic = dynamic(
    () => import('@/components/rareui/LiquidMetal'),
    {
        loading: () => (
            <div
                className="w-full h-full flex items-center justify-center bg-transparent"
                style={{ minHeight: '400px' }}
            >
                <div className="animate-pulse text-center">
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Loading Metal Effect...</div>
                </div>
            </div>
        ),
        ssr: false,
    }
);

import { LiquidMetalProps } from '@/components/rareui/LiquidMetal';

// Forward props wrapper
export default function LiquidMetal(props: LiquidMetalProps) {
    return <LiquidMetalDynamic {...props} />;
}
