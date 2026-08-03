# Phase 3 Baseline Freeze & Rollback Reference

**Document Version**: 1.0.0  
**Phase**: Phase 3A (Baseline Freeze)  
**Status**: KNOWN GOOD STATE  
**Date**: 2026-07-29  
**Git Tag**: `phase3-brand-values-baseline`  
**Commit Hash**: `37ac674c6ef891ba333e67fa8460fa3c6de0e282` (full: `37ac674c6ef891ba333e67fa8460fa3c6de0e282`)  

---

## 1. Executive Summary

This document establishes the official design, engineering, and visual rollback baseline for the **Origin Seafoods Website** before initiating the Phase 3B Brand Values visual redesign.

The repository is frozen at a verified Known Good State where:
1. Hardcoded constant `BRAND_VALUE_STATEMENTS` contains the 4 owner-approved statements (`GOOD LEARNING`, `GOOD GOAL`, `GOOD TEAM`, `GOOD JOB`).
2. Sticky pinning mechanism locks `.brand-values-sticky` at `top: 0` for `400dvh` scroll distance.
3. Live deterministic `getBoundingClientRect()` passive scroll progress listener updates `useMotionValue(0)` smoothly across frames.
4. Direct inline `itemRef.current.style.opacity` DOM subscribers drive sequential item transitions:
   - Statement 1 (`GOOD LEARNING`): Visible immediately at progress `0.000` (opacity 1.00) without initial fade-in.
   - Statement 2 (`GOOD GOAL`): Fades in at progress `0.25` - `0.40`.
   - Statement 3 (`GOOD TEAM`): Fades in at progress `0.50` - `0.66`.
   - Statement 4 (`GOOD JOB`): Fades in at progress `0.75` - `1.00` and holds visible until the section unpins.
5. Accessibility & Reduced Motion mode falls back cleanly to a vertical stack displaying all 4 statements statically.
6. Payload CMS / Neon PostgreSQL integration is active (`NEXT_PUBLIC_CMS_PROVIDER=cms`) with full data hydration for news, product categories, and media assets.

---

## 2. Technical Baseline Snapshot & Rollback Parameters

| Parameter | Value / Reference |
|---|---|
| **Git Commit Hash** | `37ac674c6ef891ba333e67fa8460fa3c6de0e282` |
| **Annotated Git Tag** | `phase3-brand-values-baseline` |
| **CMS Provider Mode** | `NEXT_PUBLIC_CMS_PROVIDER=cms` |
| **Database Connection** | Neon PostgreSQL (`DATABASE_URI`) |
| **Build Validation** | `npm run lint` (0 errors), `npm run typecheck` (0 errors), `npm run build` (0 errors) |
| **First Load JS Bundle** | `10.3 kB` |

---

## 3. Brand Values Implementation Specification

### 3.1 Hardcoded Data Model (`src/components/sections/BrandValues/index.tsx`)

```typescript
const BRAND_VALUE_STATEMENTS = [
  { id: "bv-1", title: "GOOD LEARNING" },
  { id: "bv-2", title: "GOOD GOAL" },
  { id: "bv-3", title: "GOOD TEAM" },
  { id: "bv-4", title: "GOOD JOB" },
] as const;
```

### 3.2 Dynamic Scroll Progress Calculation (`usePinnedScroll.ts`)

- **Outer Wrapper Height**: `400dvh` (3,600px on 900px viewport)
- **Sticky Viewport Height**: `100dvh` (900px)
- **Total Scrollable Range**: `3600px - 900px = 2700px`
- **Progress Formula**:
  $$\text{progress} = \text{clamp}\left(\frac{-\text{rect.top}}{\text{rect.height} - \text{window.innerHeight}}, 0, 1\right)$$

### 3.3 Static Range Mappings & Transition Intervals

```typescript
const ITEM_OPACITY_RANGES = [
  { input: [0.0, 0.1625, 0.20, 0.25], output: [1, 1, 0, 0] },     // Item 0: GOOD LEARNING
  { input: [0.25, 0.2875, 0.4125, 0.45, 0.50], output: [0, 1, 1, 0, 0] }, // Item 1: GOOD GOAL
  { input: [0.50, 0.5375, 0.6625, 0.70, 0.75], output: [0, 1, 1, 0, 0] }, // Item 2: GOOD TEAM
  { input: [0.75, 0.7875, 1.0], output: [0, 1, 1] },              // Item 3: GOOD JOB (holds)
];
```

---

## 4. CSS Architecture & Tokens (`src/app/(frontend)/globals.css`)

### 4.1 Relevant CSS Variables
- `--color-background`: `#070d18` / `#050a12` (dark marine baseline)
- `--color-text-primary`: `#ffffff`
- `--text-statement`: `clamp(32px, 5vw, 64px)`
- `--fw-extra`: `800`
- `--space-8`: `32px`

### 4.2 Core Structural Classes
- `.brand-values-section`: `position: relative; height: 400dvh; padding: 100px 0;`
- `.brand-values-sticky`: `position: sticky; top: 0; height: 100dvh; display: flex; align-items: center; justify-content: center; overflow: hidden;`
- `.brand-values-items-list`: `display: grid; grid-template-areas: "statement"; max-width: 940px; min-height: 220px;`
- `.brand-values-item`: `grid-area: statement; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;`
- `.brand-values-statement`: `font-size: var(--text-statement); font-weight: var(--fw-extra); line-height: 1.25; letter-spacing: -0.025em;`

### 4.3 Reduced Motion CSS Fallback
```css
.brand-values-section.reduced-motion {
  height: auto;
  padding: 100px 0;
}
.brand-values-section.reduced-motion .brand-values-sticky {
  position: relative;
  height: auto;
  overflow: visible;
}
.brand-values-section.reduced-motion .brand-values-items-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  grid-template-areas: none;
}
.brand-values-section.reduced-motion .brand-values-item {
  grid-area: auto;
  opacity: 1 !important;
  transform: none !important;
}
```

---

## 5. Visual Reference Screenshots Index

The following continuous region screenshots capture the section sequence `About` ↓ `Brand Values` ↓ `Product Categories` across all required breakpoints and serve as the official visual reference:

1. **Desktop (1440px)**:  
   `baseline_about_brandvalues_categories_desktop_1440.png`  
   Path: `file:///C:/Users/AVS_KTB/.gemini/antigravity/brain/29cf395e-72b0-4f87-b570-a587cda5a5ab/baseline_about_brandvalues_categories_desktop_1440.png`

2. **Tablet (768px)**:  
   `baseline_about_brandvalues_categories_tablet_768.png`  
   Path: `file:///C:/Users/AVS_KTB/.gemini/antigravity/brain/29cf395e-72b0-4f87-b570-a587cda5a5ab/baseline_about_brandvalues_categories_tablet_768.png`

3. **Mobile (375px)**:  
   `baseline_about_brandvalues_categories_mobile_375.png`  
   Path: `file:///C:/Users/AVS_KTB/.gemini/antigravity/brain/29cf395e-72b0-4f87-b570-a587cda5a5ab/baseline_about_brandvalues_categories_mobile_375.png`

4. **Reduced Motion (1440px)**:  
   `baseline_about_brandvalues_categories_reduced_motion_1440.png`  
   Path: `file:///C:/Users/AVS_KTB/.gemini/antigravity/brain/29cf395e-72b0-4f87-b570-a587cda5a5ab/baseline_about_brandvalues_categories_reduced_motion_1440.png`

---

## 6. How to Perform Instant Rollback

If Phase 3B redesign requires reverting to this baseline, execute:

```bash
git checkout phase3-brand-values-baseline
```

Or reset current branch to the baseline commit:

```bash
git reset --hard phase3-brand-values-baseline
```
