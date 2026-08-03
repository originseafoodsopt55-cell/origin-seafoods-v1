"use client";

import type { ReactNode } from "react";
import { ScrollReveal as MotionScrollReveal } from "@/components/motion/ScrollReveal";

type Direction = "up" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  id?: string;
  y?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  id,
  y = 30,
}: ScrollRevealProps) {
  return (
    <div id={id} className={className}>
      <MotionScrollReveal delay={delay} y={y}>
        {children}
      </MotionScrollReveal>
    </div>
  );
}
