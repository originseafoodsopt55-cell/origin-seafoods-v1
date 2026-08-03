"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { usePinnedScroll } from "./usePinnedScroll";

// Approved brand values — hardcoded, single source of truth
const BRAND_VALUE_STATEMENTS = [
  { id: "bv-1", title: "GOOD LEARNING" },
  { id: "bv-2", title: "GOOD GOAL" },
  { id: "bv-3", title: "GOOD TEAM" },
  { id: "bv-4", title: "GOOD JOB" },
] as const;

// Static range mappings for 4 items to ensure Framer Motion useTransform reference stability
const ITEM_OPACITY_RANGES = [
  { input: [0.0, 0.1625, 0.20, 0.25], output: [1, 1, 0, 0] },
  { input: [0.25, 0.2875, 0.4125, 0.45, 0.50], output: [0, 1, 1, 0, 0] },
  { input: [0.50, 0.5375, 0.6625, 0.70, 0.75], output: [0, 1, 1, 0, 0] },
  { input: [0.75, 0.7875, 1.0], output: [0, 1, 1] },
];

// Static range mappings for continuous artwork translateY scroll (bypassing low-contrast regions during rest gaps)
const ARTWORK_SCROLL_INPUT = [0.0, 1.0];

interface BrandValueItemProps {
  title: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}

function BrandValueItem({
  title,
  index,
  scrollYProgress,
  shouldReduceMotion,
}: BrandValueItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const range = ITEM_OPACITY_RANGES[index] || ITEM_OPACITY_RANGES[0];
  const transformOpacity = useTransform(scrollYProgress, range.input, range.output);

  React.useEffect(() => {
    if (shouldReduceMotion) return;

    // Apply initial opacity immediately on mount
    if (itemRef.current) {
      itemRef.current.style.opacity = transformOpacity.get().toString();
    }

    // Direct, 100% deterministic DOM inline style subscriber
    return transformOpacity.on("change", (v) => {
      if (itemRef.current) {
        itemRef.current.style.opacity = v.toString();
      }
    });
  }, [transformOpacity, shouldReduceMotion]);

  return (
    <motion.li ref={itemRef} className="brand-values-item">
      <h3 className="brand-values-statement">{title}</h3>
    </motion.li>
  );
}

export function BrandValues({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopBgRef = useRef<HTMLDivElement>(null);
  const tabletBgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);

  const [desktopRange, setDesktopRange] = React.useState<[number, number]>([0, 0]);
  const [tabletRange, setTabletRange] = React.useState<[number, number]>([0, 0]);
  const [mobileRange, setMobileRange] = React.useState<[number, number]>([0, 0]);

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = usePinnedScroll({
    targetRef: containerRef,
    itemCount: BRAND_VALUE_STATEMENTS.length,
  });

  const desktopY = useTransform(scrollYProgress, ARTWORK_SCROLL_INPUT, desktopRange);
  const tabletY = useTransform(scrollYProgress, ARTWORK_SCROLL_INPUT, tabletRange);
  const mobileY = useTransform(scrollYProgress, ARTWORK_SCROLL_INPUT, mobileRange);

  React.useEffect(() => {
    const calculateRanges = () => {
      const viewportHeight = window.innerHeight;

      if (desktopBgRef.current) {
        const height = desktopBgRef.current.getBoundingClientRect().height;
        setDesktopRange([0, -Math.max(0, height - viewportHeight)]);
      }
      if (tabletBgRef.current) {
        const height = tabletBgRef.current.getBoundingClientRect().height;
        setTabletRange([0, -Math.max(0, height - viewportHeight)]);
      }
      if (mobileBgRef.current) {
        const height = mobileBgRef.current.getBoundingClientRect().height;
        setMobileRange([0, -Math.max(0, height - viewportHeight)]);
      }
    };

    calculateRanges();

    window.addEventListener("resize", calculateRanges);
    return () => window.removeEventListener("resize", calculateRanges);
  }, []);

  React.useEffect(() => {
    if (shouldReduceMotion) return;

    // Apply initial transforms immediately on mount
    if (desktopBgRef.current) {
      desktopBgRef.current.style.transform = `translateY(${desktopY.get()}px) translateZ(0px)`;
    }
    if (tabletBgRef.current) {
      tabletBgRef.current.style.transform = `translateY(${tabletY.get()}px) translateZ(0px)`;
    }
    if (mobileBgRef.current) {
      mobileBgRef.current.style.transform = `translateY(${mobileY.get()}px) translateZ(0px)`;
    }

    // Direct, 100% deterministic DOM transform subscribers
    const unsubDesktop = desktopY.on("change", (v) => {
      if (desktopBgRef.current) {
        desktopBgRef.current.style.transform = `translateY(${v}px) translateZ(0px)`;
      }
    });
    const unsubTablet = tabletY.on("change", (v) => {
      if (tabletBgRef.current) {
        tabletBgRef.current.style.transform = `translateY(${v}px) translateZ(0px)`;
      }
    });
    const unsubMobile = mobileY.on("change", (v) => {
      if (mobileBgRef.current) {
        mobileBgRef.current.style.transform = `translateY(${v}px) translateZ(0px)`;
      }
    });

    return () => {
      unsubDesktop();
      unsubTablet();
      unsubMobile();
    };
  }, [desktopY, tabletY, mobileY, shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      id="brand-values"
      className={`brand-values-section ${shouldReduceMotion ? "reduced-motion" : ""} ${className}`.trim()}
      aria-label="Brand Values"
    >
      {/* Unified Viewport Container — single DOM path for both Motion and Reduced Motion */}
      <div className="brand-values-sticky">
        {/* Background Artwork Layer */}
        <div className="brand-values-bg-layer" aria-hidden="true">
          <motion.div
            ref={desktopBgRef}
            className="brand-values-bg-desktop"
            style={{ y: shouldReduceMotion ? 0 : desktopY }}
          >
            <Image
              src="/images/brand-values/brand-values-desktop-artwork.png"
              alt=""
              width={2560}
              height={6000}
              sizes="100vw"
              quality={100}
              priority
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </motion.div>
          <motion.div
            ref={tabletBgRef}
            className="brand-values-bg-tablet"
            style={{ y: shouldReduceMotion ? 0 : tabletY }}
          >
            <Image
              src="/images/brand-values/brand-values-desktop-artwork.png"
              alt=""
              width={2560}
              height={6000}
              sizes="100vw"
              quality={100}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </motion.div>
          <motion.div
            ref={mobileBgRef}
            className="brand-values-bg-mobile"
            style={{ y: shouldReduceMotion ? 0 : mobileY }}
          >
            <Image
              src="/images/brand-values/brand-values-mobile-artwork.png"
              alt=""
              width={1200}
              height={3200}
              sizes="145vw"
              quality={100}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </motion.div>
        </div>

        <Container className="brand-values-content-wrapper">
          <h2 className="sr-only">Brand Values</h2>
          {/* Single Unified Statement List */}
          <ol className="brand-values-items-list" aria-label="Our brand values">
            {BRAND_VALUE_STATEMENTS.map((item, index) => (
              <BrandValueItem
                key={item.id}
                title={item.title}
                index={index}
                scrollYProgress={scrollYProgress}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}

export default BrandValues;
