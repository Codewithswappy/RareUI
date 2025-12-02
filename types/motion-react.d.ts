declare module 'motion-react' {
  import { ComponentType, HTMLAttributes } from 'react';

  export interface MotionProps extends HTMLAttributes<HTMLElement> {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileFocus?: any;
    whileDrag?: any;
    drag?: boolean | 'x' | 'y';
    dragConstraints?: any;
    dragElastic?: number;
    dragMomentum?: boolean;
    layout?: boolean | 'position' | 'size';
    layoutId?: string;
  }

  export const motion: {
    [K in keyof JSX.IntrinsicElements]: ComponentType<
      JSX.IntrinsicElements[K] & MotionProps
    >;
  };
}
