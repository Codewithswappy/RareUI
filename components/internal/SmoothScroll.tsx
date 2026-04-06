'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef(null);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
