import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SoftButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SoftButton = ({ children = 'Button', className, ...props }: SoftButtonProps) => {
  return (
    // Outer Wrapper
    <div
      className={cn(
        'group relative top-0 left-0 m-0 flex h-[50px] w-[160px] cursor-pointer items-center justify-center',
        className
      )}
      {...props}
    >
      {/* Inner Div */}
      <div className="/* Base Styles */ text-foreground /* Borders */ /* SHADOW EXPLANATION: We use arbitrary values because Neumorphism requires very specific multi-layer shadows. Light Mode Shadow: 1. 4px 4px... White (Bottom-Right Highlight) 2. -4px -4px... Gray (Top-Left Shadow) 3. Inset -4px -4px... White (Inner Top-Left Highlight) 4. Inset 4px 4px... Black (Inner Bottom-Right Shadow) Dark Mode Shadow (dark: prefix): 1. 4px 4px... Faint White (Bottom-Right Highlight, opacity reduced to 0.05) 2. -4px -4px... Deep Black (Top-Left Shadow, opacity 0.5) 3. Inset -4px -4px... Faint White (Inner Top-Left Highlight) 4. Inset 4px 4px... Deep Black (Inner Bottom-Right Shadow) */ /* Transitions */ /* Hover States */ /* Active State */ /* Enhanced Hover Shadow */ /* Dark Mode Hover Adjustment */ z-10 flex h-full w-full items-center justify-center rounded-[30px] border-t border-b border-white/10 bg-transparent font-medium tracking-[1px] shadow-[4px_4px_6px_0_rgba(255,255,255,0.5),-4px_-4px_6px_0_rgba(116,125,136,0.5),inset_-4px_-4px_6px_0_rgba(255,255,255,0.2),inset_4px_4px_6px_0_rgba(0,0,0,0.4)] transition-all duration-[600ms] group-hover:scale-[1.05] group-hover:bg-black group-hover:tracking-[2px] group-hover:text-white group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.6),4px_4px_8px_0_rgba(255,255,255,0.3),-4px_-4px_8px_0_rgba(116,125,136,0.3)] group-active:scale-[0.98] dark:border-black/20 dark:shadow-[4px_4px_6px_0_rgba(255,255,255,0.05),-4px_-4px_6px_0_rgba(0,0,0,0.5),inset_-4px_-4px_6px_0_rgba(255,255,255,0.05),inset_4px_4px_6px_0_rgba(0,0,0,0.6)] dark:group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.6),4px_4px_8px_0_rgba(255,255,255,0.08),-4px_-4px_8px_0_rgba(0,0,0,0.6)] dark:hover:bg-white dark:hover:text-black">
        {children}
      </div>
    </div>
  );
};

export default SoftButton;
