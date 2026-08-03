# Phase 3B Implementation Readiness Architecture

**Document Version**: 1.0.0  
**Phase**: Phase 3B.0 (Activity 4 — Implementation Readiness)  
**Status**: ARCHITECTURAL PLANNING ONLY (Zero code modifications)  
**Date**: 2026-07-29  

---

## 1. Current State

The repository is currently frozen at a verified Known Good State (`phase3-brand-values-baseline` / Commit `37ac674c6ef891ba333e67fa8460fa3c6de0e282`). 
- Production website runs in live CMS mode (`NEXT_PUBLIC_CMS_PROVIDER=cms`).
- Build, lint, and typecheck passes with 0 errors (`10.3 kB` First Load JS bundle).
- Passive `getBoundingClientRect()` live scroll listener and direct inline `element.style.opacity` DOM subscribers drive statement transitions with 100% mathematical accuracy.
- Engineering constraints, design decisions, architectural layer classifications, and visual baseline snapshots are fully documented in `docs/design/`.

---

## 2. Frozen Components

The following components and configuration files are **FROZEN** and MUST NOT be modified during prototype experimentation:

- `src/components/sections/BrandValues/index.tsx` (Production BrandValues component)
- `src/components/sections/BrandValues/usePinnedScroll.ts` (Core pinned scroll hook)
- `src/app/(frontend)/page.tsx` (Production homepage entry point)
- `src/app/(frontend)/globals.css` (Base CSS tokens and baseline rules)
- `src/lib/data/*` (Data providers and mapper layers)
- `src/payload.config.ts` & database collections

---

## 3. Replaceable Components

When prototype approval is reached in Phase 3C, the following production entry points will be updated to switch from the baseline component to the new Origin Design Language v1.0 component:

- `src/components/sections/BrandValues/index.tsx` (Will be updated to export the approved Brand Values implementation)

---

## 4. Safe Extension Points

To isolate prototype experimentation from production code, new files MUST be created exclusively within the designated prototype extension boundaries:

```
src/components/sections/BrandValues/
├── BrandValuesPrototype.tsx           # Primary prototype staging component
├── BrandValueStatementPrototype.tsx  # Individual statement presenter prototype
├── prototypes/                        # Alternative visual exploratory prototypes
│   ├── VariantA.tsx
│   └── VariantB.tsx
├── hooks/                             # Staged hook extensions
│   └── usePrototypeScroll.ts
├── motion/                            # Prototype animation definitions
│   └── transitions.ts
└── backgrounds/                       # Prototype canvas / background layers
    └── DepthCanvas.tsx
```

---

## 5. Expected Integration Flow

```
+-------------------------------------------------------------+
| 1. Authoring ORIGIN_DESIGN_LANGUAGE_V1.md (Design Director) |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| 2. Implement BrandValuesPrototype.tsx in Safe Extension     |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| 3. Visual & Automated Telemetry Review (Playwright)         |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| 4. Checklist Validation (PROTOTYPE_CHECKLIST.md)            |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| 5. Explicit Owner / Design Director Approval               |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| 6. Production Integration & Baseline Merge                  |
+-------------------------------------------------------------+
```

---

## 6. Risk Matrix

| Risk Domain | Risk Description | Prevention / Mitigation Strategy |
|---|---|---|
| **Accessibility** | Over-styling text could reduce contrast ratio below WCAG AA (4.5:1). | Enforce high-contrast text tokens; retain `.reduced-motion` static fallback. |
| **Performance** | Complex heavy background canvases could drop frame rate below 60fps. | Use CSS hardware acceleration (`transform: translateZ(0)`), passive scroll listeners, and `requestAnimationFrame`. |
| **Regression** | Modifications could re-introduce statement opacity locking (`[1,0,0,0]`). | Retain 16-point inline style Playwright telemetry script during testing. |
| **Motion** | Complex Framer Motion re-renders could trigger main-thread layout thrashing. | Maintain direct DOM inline style mutation or isolated sub-component MotionValue bindings. |
| **Responsive Layout** | Mobile dynamic address bar resizing could cause sticky scroll jumps. | Preserve `400dvh` wrapper and `100dvh` viewport container properties. |
| **Hydration** | SSR mismatch on `useReducedMotion()` or window measurements. | Ensure initial render is hydration-safe with explicit client-side mounting checks. |
| **Bundle Size** | Heavy third-party canvas libraries could inflate bundle size beyond threshold. | Restrict dependencies; rely on pure CSS gradients and lightweight Framer Motion / SVG primitives. |
