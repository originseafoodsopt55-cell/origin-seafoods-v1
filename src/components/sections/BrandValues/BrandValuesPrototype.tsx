"use client";

import React, { useRef } from "react";
import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { usePinnedScroll } from "./usePinnedScroll";

/**
 * Origin Design Language v1.0 Prototype Specifications
 * ---------------------------------------------------
 * Primary Theme: Deep Oceanic Dark Mode (#070d18 / #040810)
 * Accent Coral: #f58220 (Brand Kicker & Active Identifiers)
 * Primary Cyan Glow: rgba(0, 242, 254, 0.15)
 * Surface Backdrop: Glassmorphic Navy Card (rgba(10, 30, 60, 0.45) + 1px rgba(255,255,255,0.1) stroke)
 */
const PROTOTYPE_STATEMENTS = [
  { id: "bv-1", index: "01", title: "GOOD LEARNING", kicker: "Continuous Knowledge & Growth" },
  { id: "bv-2", index: "02", title: "GOOD GOAL", kicker: "Clear Vision & Purpose" },
  { id: "bv-3", index: "03", title: "GOOD TEAM", kicker: "Synergy & Mutual Respect" },
  { id: "bv-4", index: "04", title: "GOOD JOB", kicker: "Excellence in Execution" },
] as const;

// Static range mappings for 4 items to ensure Framer Motion useTransform reference stability
const PROTOTYPE_ITEM_RANGES = [
  { input: [0.0, 0.1625, 0.20, 0.25], output: [1, 1, 0, 0] },
  { input: [0.25, 0.2875, 0.4125, 0.45, 0.50], output: [0, 1, 1, 0, 0] },
  { input: [0.50, 0.5375, 0.6625, 0.70, 0.75], output: [0, 1, 1, 0, 0] },
  { input: [0.75, 0.7875, 1.0], output: [0, 1, 1] },
];

interface BrandValuePrototypeItemProps {
  item: typeof PROTOTYPE_STATEMENTS[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}

function BrandValuePrototypeItem({
  item,
  index,
  scrollYProgress,
  shouldReduceMotion,
}: BrandValuePrototypeItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const range = PROTOTYPE_ITEM_RANGES[index] || PROTOTYPE_ITEM_RANGES[0];
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
    <motion.li
      ref={itemRef}
      className="brand-values-prototype-item"
      style={{
        gridArea: "statement",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      {/* Brand Kicker Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "999px",
          background: "rgba(245, 130, 32, 0.12)",
          border: "1px solid rgba(245, 130, 32, 0.3)",
          color: "#f58220",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        <span>{item.index}</span>
        <span style={{ opacity: 0.5 }}>/</span>
        <span>04</span>
      </div>

      {/* Main Statement Title */}
      <h3
        className="brand-values-prototype-title"
        style={{
          fontSize: "clamp(36px, 5.5vw, 68px)",
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          margin: "0 0 12px 0",
          textShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
        }}
      >
        {item.title}
      </h3>

      {/* Subtitle / Kicker Description */}
      <p
        style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "rgba(255, 255, 255, 0.7)",
          margin: 0,
          fontWeight: 400,
          letterSpacing: "-0.01em",
        }}
      >
        {item.kicker}
      </p>
    </motion.li>
  );
}

export function BrandValuesPrototype({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = usePinnedScroll({
    targetRef: containerRef,
    itemCount: PROTOTYPE_STATEMENTS.length,
  });

  return (
    <section
      ref={containerRef}
      id="brand-values-prototype"
      className={`brand-values-prototype-section ${shouldReduceMotion ? "reduced-motion" : ""} ${className}`.trim()}
      aria-label="Brand Values Prototype"
      style={{
        position: "relative",
        height: shouldReduceMotion ? "auto" : "400dvh",
        background: "#070d18",
        padding: "100px 0",
      }}
    >
      {/* Background Depth Halo Layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.08) 0%, rgba(7, 13, 24, 0) 70%)",
          zIndex: 1,
        }}
      />

      {/* Pinned Sticky Viewport Container */}
      <div
        className="brand-values-prototype-sticky"
        style={{
          position: shouldReduceMotion ? "relative" : "sticky",
          top: 0,
          height: shouldReduceMotion ? "auto" : "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <Container className="brand-values-prototype-content-wrapper">
          {/* Section Kicker Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Our Core Beliefs
            </span>
          </div>

          {/* Statement List Container */}
          <ol
            aria-label="Our brand values prototype"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "960px",
              minHeight: "260px",
              listStyle: "none",
              padding: "40px 24px",
              margin: "0 auto",
              display: shouldReduceMotion ? "flex" : "grid",
              flexDirection: shouldReduceMotion ? "column" : undefined,
              gap: shouldReduceMotion ? "32px" : undefined,
              gridTemplateAreas: shouldReduceMotion ? undefined : '"statement"',
              alignItems: "center",
              justifyItems: "center",
              background: "rgba(10, 26, 48, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            {PROTOTYPE_STATEMENTS.map((item, index) => (
              <BrandValuePrototypeItem
                key={item.id}
                item={item}
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

export default BrandValuesPrototype;
