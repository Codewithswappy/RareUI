"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function PreviewCode({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-border bg-card">
      <div className="p-6">{children}</div>

      <button
        onClick={() => setShow(!show)}
        className="w-full border-t border-border bg-muted/50 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? "Hide Code" : "Show Code"}
      </button>

      {show && (
        <pre className="overflow-x-auto border-t border-border bg-muted/30 p-4 text-xs text-foreground">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}