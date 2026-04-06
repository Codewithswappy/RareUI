'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function PreviewCode({ children, code }: { children: React.ReactNode; code: string }) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="border-border bg-card my-6 overflow-hidden rounded-xl border">
      <div className="p-6">{children}</div>

      <button
        onClick={() => setShow(!show)}
        className="border-border bg-muted/50 text-muted-foreground hover:text-foreground w-full border-t py-2 text-sm transition-colors"
      >
        {show ? 'Hide Code' : 'Show Code'}
      </button>

      {show && (
        <pre className="border-border bg-muted/30 text-foreground overflow-x-auto border-t p-4 text-xs">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
