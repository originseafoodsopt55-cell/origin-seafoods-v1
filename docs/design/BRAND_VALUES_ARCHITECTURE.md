# Brand Values Component Layer Classification

**Document Version**: 1.0.0  
**Phase**: Phase 3B.0 (Activity 3 — Engineering Preparation)  
**Status**: ARCHITECTURAL CLASSIFICATION  
**Date**: 2026-07-29  

---

## 1. Architectural Overview

This document classifies the current Brand Values implementation (`src/components/sections/BrandValues/index.tsx` and `usePinnedScroll.ts`) into six decoupled architectural layers. This classification ensures clean layer isolation during the upcoming Phase 3B visual redesign.

---

## 2. Layer Classification

### 2.1 Visual Layer
- **Responsibility**: Typography rendering, colors, background styling, spacing, and DOM element layout.
- **Code Artifacts**:
  - `src/components/sections/BrandValues/index.tsx` (`<section>`, `<div className="brand-values-bg-layer">`, `<div className="brand-values-sticky">`, `<ol>`, `<h3 className="brand-values-statement">`).
  - `src/app/(frontend)/globals.css` (`.brand-values-section`, `.brand-values-sticky`, `.brand-values-items-list`, `.brand-values-item`, `.brand-values-statement`).
- **Classification Characteristics**: Presentation-only CSS rules, font family definitions, colors, container max-widths, and layout alignment.

### 2.2 Interaction Layer
- **Responsibility**: Capturing user scroll input and window resize events without altering browser scroll behavior.
- **Code Artifacts**:
  - `src/components/sections/BrandValues/usePinnedScroll.ts` (`window.addEventListener("scroll", onScroll, { passive: true })`, `window.addEventListener("resize", onScroll, { passive: true })`).
- **Classification Characteristics**: Event listener registration, passive execution mode, cleanup handlers on unmount.

### 2.3 Layout Layer
- **Responsibility**: Defining physical container dimensions, sticky pinning viewport boundaries, and grid cell positioning.
- **Code Artifacts**:
  - `.brand-values-section`: `height: 400dvh; position: relative;`
  - `.brand-values-sticky`: `position: sticky; top: 0; height: 100dvh; overflow: hidden;`
  - `.brand-values-items-list`: `display: grid; grid-template-areas: "statement";`
  - `.brand-values-item`: `grid-area: statement;`
- **Classification Characteristics**: Viewport dimensions (`dvh`), CSS Grid area alignment, and positioning rules.

### 2.4 Data Layer
- **Responsibility**: Providing the single source of truth for brand value statements.
- **Code Artifacts**:
  - `src/components/sections/BrandValues/index.tsx`:
    ```typescript
    const BRAND_VALUE_STATEMENTS = [
      { id: "bv-1", title: "GOOD LEARNING" },
      { id: "bv-2", title: "GOOD GOAL" },
      { id: "bv-3", title: "GOOD TEAM" },
      { id: "bv-4", title: "GOOD JOB" },
    ] as const;
    ```
- **Classification Characteristics**: Hardcoded constant array structure, item IDs, and statement text string definitions.

### 2.5 Motion Layer
- **Responsibility**: State interpolation between scroll progress and visual opacity values.
- **Code Artifacts**:
  - `useMotionValue(0)` inside `usePinnedScroll.ts`
  - `ITEM_OPACITY_RANGES` static range input/output definitions inside `index.tsx`
  - `useTransform(scrollYProgress, range.input, range.output)` inside `BrandValueItem`
  - Direct `transformOpacity.on("change", (v) => itemRef.current.style.opacity = v.toString())` subscriber.
- **Classification Characteristics**: Mathematical range mapping, frame scheduling (`requestAnimationFrame`), and MotionValue subscriptions.

### 2.6 Accessibility Layer
- **Responsibility**: ARIA landmarks, keyboard navigation accessibility, and static reduced-motion fallback states.
- **Code Artifacts**:
  - `aria-label="Brand Values"` on `<section>`
  - `aria-label="Our brand values"` on `<ol>`
  - `useReducedMotion()` hook detection
  - `.brand-values-section.reduced-motion` CSS overrides (`height: auto`, `position: relative`, `display: flex; flex-direction: column`, `opacity: 1 !important`).
- **Classification Characteristics**: ARIA semantics, prefers-reduced-motion media query handling, and non-animated fallback paths.
