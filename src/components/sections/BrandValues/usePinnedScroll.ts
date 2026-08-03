"use client";

import { useMotionValue } from "framer-motion";
import { useEffect, type RefObject } from "react";

export interface PinnedScrollOptions {
  targetRef: RefObject<HTMLElement | null>;
  itemCount: number;
}

/**
 * Helper to clamp values between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Content-agnostic custom hook for pinned sticky scroll progress mapping.
 * Pure structural calculation: receives targetRef + itemCount, returns scrollYProgress and item range mapping.
 * Uses a passive scroll listener with requestAnimationFrame to calculate exact relative scroll progress:
 * progress = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1)
 */
export function usePinnedScroll({ targetRef, itemCount }: PinnedScrollOptions) {
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const updateProgress = () => {
      const el = targetRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const totalScrollable = rect.height - viewportHeight;

        // Dynamic live progress calculation measured on every frame
        const rawProgress = totalScrollable > 0 ? -rect.top / totalScrollable : 0;
        const progress = clamp(rawProgress, 0, 1);
        scrollYProgress.set(progress);
      }
    };

    const onScroll = () => {
      updateProgress();
    };

    // Calculate initial progress on mount
    updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef, scrollYProgress]);

  const getSequentialItemRanges = (index: number) => {
    if (itemCount <= 0) return { opacityInput: [0, 1], opacityOutput: [0, 1] };

    const step = 1 / itemCount;
    const fadeDuration = step * 0.15; // 15% linear fade transition
    const gapDuration = step * 0.20;  // 20% rest gap between statements for zero overlap

    const start = index * step;
    const end = (index + 1) * step;

    const fadeInStart = start;
    const fadeInEnd = start + fadeDuration;
    const fadeOutStart = end - gapDuration - fadeDuration;
    const fadeOutEnd = end - gapDuration;

    const isFirst = index === 0;
    const isLast = index === itemCount - 1;

    if (isFirst) {
      // First statement (GOOD LEARNING) is opacity 1 immediately when section pins (no initial fade-in)
      return {
        opacityInput: [
          0.0,
          Math.max(0, fadeOutStart),
          Math.min(1, fadeOutEnd),
          Math.min(1, end),
        ],
        opacityOutput: [1, 1, 0, 0],
      };
    }

    if (isLast) {
      // Last statement stays fully visible until the section unpins (Fixes Task 3.6)
      return {
        opacityInput: [
          Math.max(0, fadeInStart),
          Math.min(1, fadeInEnd),
          1.0,
        ],
        opacityOutput: [0, 1, 1],
      };
    }

    return {
      opacityInput: [
        Math.max(0, fadeInStart),
        Math.min(1, fadeInEnd),
        Math.max(0, fadeOutStart),
        Math.min(1, fadeOutEnd),
        Math.min(1, end),
      ],
      opacityOutput: [0, 1, 1, 0, 0],
    };
  };

  return { scrollYProgress, getSequentialItemRanges };
}
