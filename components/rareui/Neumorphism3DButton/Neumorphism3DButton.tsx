'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Neumorphism3DButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Neumorphism3DButton = ({
  children = 'Click Me',
  onClick,
  disabled,
}: Neumorphism3DButtonProps) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      className={cn(
        '-webkit-tap-highlight-color-transparent relative cursor-pointer rounded-full transition-all duration-300 outline-none',
        'bg-neutral-200 shadow-[-0.15em_-0.15em_0.15em_-0.075em_rgba(255,255,255,1),0.0375em_0.0375em_0.0675em_0_rgba(0,0,0,0.15)]',
        'dark:bg-neutral-900 dark:shadow-[-0.15em_-0.15em_0.15em_-0.075em_rgba(255,255,255,0.05),0.0375em_0.0375em_0.0675em_0_rgba(0,0,0,0.5)]'
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full',
          'top-[-0.15em] left-[-0.15em] h-[calc(100%+0.3em)] w-[calc(100%+0.3em)]',
          'opacity-25 mix-blend-multiply blur-[0.0125em]',
          'bg-[linear-gradient(-135deg,rgba(0,0,0,0.2),transparent_20%,transparent_100%)]',
          'dark:bg-[linear-gradient(-135deg,rgba(255,255,255,0.1),transparent_20%,transparent_100%)] dark:mix-blend-overlay'
        )}
      />

      <div
        className={cn(
          'relative rounded-full transition-all duration-300',
          isActive
            ? 'shadow-[0_0_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_0_0_0_rgba(0,0,0,0.5)]'
            : 'shadow-[0_0.05em_0.05em_-0.01em_rgba(0,0,0,0.2),0_0.01em_0.01em_-0.01em_rgba(0,0,0,0.1),0.15em_0.3em_0.1em_-0.01em_rgba(0,0,0,0.05)] dark:shadow-[0_0.05em_0.05em_-0.01em_rgba(0,0,0,0.5),0_0.01em_0.01em_-0.01em_rgba(0,0,0,0.3),0.15em_0.3em_0.1em_-0.01em_rgba(0,0,0,0.2)]'
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-full px-6 py-4 transition-all duration-250',
            'bg-[linear-gradient(135deg,rgba(240,240,240,1),rgba(210,210,210,1))]',
            'dark:bg-[linear-gradient(135deg,rgba(40,40,40,1),rgba(20,20,20,1))]',
            isActive ? 'scale-[0.975]' : 'scale-100',
            isActive
              ? 'shadow-[inset_0.1em_0.15em_0.05em_0_rgba(0,0,0,0.1),inset_-0.025em_-0.03em_0.05em_0.025em_rgba(255,255,255,0.5)] dark:shadow-[inset_0.1em_0.15em_0.05em_0_rgba(0,0,0,0.5),inset_-0.025em_-0.03em_0.05em_0.025em_rgba(255,255,255,0.1)]'
              : 'shadow-[inset_-0.05em_-0.05em_0.05em_0_rgba(0,0,0,0.1),inset_0.025em_0.05em_0.1em_0_rgba(255,255,255,1)] dark:shadow-[inset_-0.05em_-0.05em_0.05em_0_rgba(0,0,0,0.5),inset_0.025em_0.05em_0.1em_0_rgba(255,255,255,0.1)]'
          )}
        >
          <span
            className={cn(
              'relative block text-sm font-medium tracking-tight transition-transform duration-250 select-none',
              isActive ? 'scale-[0.975]' : 'scale-100',
              'bg-clip-text text-transparent',
              'bg-linear-to-br from-neutral-800 to-neutral-600',
              'dark:from-neutral-100 dark:to-neutral-300',
              'drop-shadow-sm'
            )}
          >
            {children}
          </span>
        </div>
      </div>
    </button>
  );
};
