"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    
    if (props.onClick) {
      props.onClick(e);
    }

    // Fallback for browsers without View Transition API support
    if (!document.startViewTransition) {
      router.push(href.toString());
      return;
    }

    // Start variable transition
    document.startViewTransition(async () => {
      router.push(href.toString());
      // Slight delay to allow React to render the new state (if needed for complex transitions)
      await sleep(50); 
    });
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
