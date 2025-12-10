"use client";

import dynamic from 'next/dynamic';
import React from 'react';

interface LazyLoadProps {
  /**
   * Dynamic import function that returns the component
   * Example: () => import('@/components/MyComponent')
   */
  componentImport: () => Promise<{ default: React.ComponentType<any> }>;
  
  /**
   * Props to pass to the lazy-loaded component
   */
  componentProps?: Record<string, any>;
  
  /**
   * Custom loading component (optional)
   */
  loadingComponent?: React.ReactNode;
  
  /**
   * Loading message to display (if no custom loading component)
   */
  loadingMessage?: string;
  
  /**
   * Disable server-side rendering (useful for WebGL/Canvas components)
   */
  disableSSR?: boolean;
}

/**
 * Reusable lazy loading wrapper for heavy components
 * 
 * @example
 * ```tsx
 * <LazyLoad
 *   componentImport={() => import('@/components/rareui/interactive-background/LiquidWave')}
 *   componentProps={{ color1: "#5227FF", className: "w-full h-full" }}
 *   loadingMessage="Loading WebGL simulation..."
 *   disableSSR={true}
 * />
 * ```
 */
export function LazyLoad({
  componentImport,
  componentProps = {},
  loadingComponent,
  loadingMessage = "Loading...",
  disableSSR = false,
}: LazyLoadProps) {
  const DynamicComponent = React.useMemo(
    () =>
      dynamic(componentImport, {
        loading: () =>
          loadingComponent || (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
              <div className="animate-pulse text-center">
                <div className="text-sm text-muted-foreground">{loadingMessage}</div>
              </div>
            </div>
          ),
        ssr: !disableSSR,
      }),
    [componentImport, loadingComponent, loadingMessage, disableSSR]
  );

  return <DynamicComponent {...componentProps} />;
}
