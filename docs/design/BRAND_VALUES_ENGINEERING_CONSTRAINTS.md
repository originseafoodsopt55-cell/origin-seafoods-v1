# Brand Values Engineering Constraints

**Document Version**: 1.0.0  
**Phase**: Phase 3B.0 (Activity 3 — Engineering Preparation)  
**Status**: MANDATORY STABILITY RULES  
**Date**: 2026-07-29  

---

## 1. Overview

This document specifies the technical and architectural elements of the Brand Values section that **MUST REMAIN STABLE** during the Phase 3B visual redesign. Any proposed modification to these constrained areas requires explicit engineering approval and regression testing.

---

## 2. Immutable Engineering Constraints

### 2.1 Scroll Progress Algorithm
- **Formula**: Relative scroll progress MUST be calculated dynamically on every frame via:
  $$\text{progress} = \text{clamp}\left(\frac{-\text{rect.top}}{\text{rect.height} - \text{window.innerHeight}}, 0, 1\right)$$
- **Execution Mechanism**: MUST use a passive window scroll/resize listener (`{ passive: true }`) combined with `requestAnimationFrame` ticking to guarantee zero main-thread scroll hijacking.
- **Dynamic Bounding Box**: MUST measure live `getBoundingClientRect()` values on every frame tick to account for dynamic layout settling, dynamic address bar heights (`dvh`), and image loading without hardcoded cached heights.

### 2.2 Motion Values & DOM Inline Style Binding
- **Motion Value Instance**: `scrollYProgress` MUST be instantiated via `useMotionValue(0)` inside `usePinnedScroll`.
- **Reference Stability**: `ITEM_OPACITY_RANGES` array mappings MUST maintain static memory reference equality to prevent `useTransform` subscriber invalidation across React re-renders.
- **Direct DOM Subscribers**: Transformed opacity values MUST be written directly to `itemRef.current.style.opacity = v.toString()` inside a `transformOpacity.on("change")` subscriber, bypassing React VDOM re-renders for 60fps/120fps frame performance.

### 2.3 Reduced-Motion Behavior & Accessibility
- **Hook Detection**: `useReducedMotion()` from `framer-motion` MUST be evaluated on mount.
- **CSS Structural Switch**: When `.reduced-motion` class is present:
  - Container height MUST convert from `400dvh` to `auto`.
  - Sticky viewport MUST convert from `position: sticky; top: 0` to `position: relative`.
  - Grid layout MUST convert to a static vertical column (`display: flex; flex-direction: column; gap: var(--space-8)`).
  - All statements MUST force `opacity: 1 !important` and `transform: none !important`.
- **A11y Attributes**:
  - Section element MUST retain `aria-label="Brand Values"`.
  - List container MUST retain `<ol className="brand-values-items-list" aria-label="Our brand values">`.

### 2.4 DOM Structure & Component Boundaries
- **Outer Wrapper**: `<section ref={containerRef} id="brand-values" className="brand-values-section ...">`
- **Sticky Container**: `<div className="brand-values-sticky">` wrapping `<Container className="brand-values-content-wrapper">`
- **Ordered List**: `<ol className="brand-values-items-list">` wrapping individual statement item components (`<BrandValueItem>`).
- **Component Separation**: `usePinnedScroll` hook MUST remain content-agnostic and decoupled from component presentation logic.

### 2.5 Data Model Stability
- Statement titles MUST strictly maintain the owner-approved constant array in exact order:
  1. `GOOD LEARNING`
  2. `GOOD GOAL`
  3. `GOOD TEAM`
  4. `GOOD JOB`
