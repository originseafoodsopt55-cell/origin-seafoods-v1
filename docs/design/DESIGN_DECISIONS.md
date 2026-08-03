# Design Decisions Record

---

## Decision ID: ADR-P3-001

### Date
2026-07-29

### Status
Approved / Implemented

### Context
Phase 3 requires a major visual redesign of the Brand Values section to align with the upcoming Origin Design Language v1.0. Before any visual modifications begin, a verified rollback point and technical baseline must be established to guarantee zero regression risk and instant rollback capability.

### Decision
Establish the Phase 3A Baseline Freeze at Git commit `37ac674c6ef891ba333e67fa8460fa3c6de0e282` and tag `phase3-brand-values-baseline`. Freeze all production UI, CSS, typography, and layout code while preserving:
1. Hardcoded constant `BRAND_VALUE_STATEMENTS` (`GOOD LEARNING`, `GOOD GOAL`, `GOOD TEAM`, `GOOD JOB`).
2. Sticky pinning mechanism (`400dvh` container, `100dvh` sticky viewport).
3. Passive deterministic `getBoundingClientRect()` live progress calculation.
4. Direct inline `itemRef.current.style.opacity` DOM subscriber transitions.
5. Reduced-motion fallback mode (`.reduced-motion`).

### Rationale
Creating a mandatory baseline freeze prevents accidental visual/functional regressions during subsequent iterative redesign activities. It provides an immutable reference state supported by automated telemetry and continuous scroll visual baseline snapshots.

### Constraints
- Zero code refactoring, redesign, or optimization permitted during baseline freeze.
- `NEXT_PUBLIC_CMS_PROVIDER` must remain set to `cms` for full website content hydration.
- The 4 approved brand value statements and their sequential ordering are locked.

### Engineering Impact
- All subsequent Phase 3B visual experiments will be isolated inside new prototype components (`BrandValuesPrototype.tsx`) or staged branches without mutating the frozen baseline until explicitly approved.
- Instant rollback can be performed via `git checkout phase3-brand-values-baseline`.

### References
- `docs/design/PHASE3_BASELINE.md`
- `docs/design/HOMEPAGE_VISUAL_AUDIT.md`
- `docs/design/ORIGIN_DESIGN_LANGUAGE_CURRENT.md`
- Git Tag: `phase3-brand-values-baseline`
