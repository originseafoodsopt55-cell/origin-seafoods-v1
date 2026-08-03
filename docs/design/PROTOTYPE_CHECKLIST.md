# Brand Values Prototype Approval Checklist

**Document Version**: 1.0.0  
**Phase**: Phase 3B.0 (Activity 4 — Implementation Readiness)  
**Purpose**: Mandatory pre-approval evaluation checklist before merging any prototype to production.  

---

## 1. Visual Standards Checklist
- [ ] Typography scale strictly matches `ORIGIN_DESIGN_LANGUAGE_V1.md` specifications.
- [ ] Contrast ratio between text and background meets WCAG AA standard ($\ge 4.5:1$).
- [ ] Color tokens conform to the approved Origin Design Language palette.
- [ ] Visual hierarchy clearly distinguishes header, statement, and surrounding section content.

## 2. Motion & Animation Checklist
- [ ] Statement 1 (`GOOD LEARNING`) is visible immediately at progress `0.000` without initial fade-in delay.
- [ ] Statement 4 (`GOOD JOB`) holds visible at progress `1.000` until the section unpins.
- [ ] No cross-fade text overlap occurs between adjacent statements (minimum 15-20% rest gap preserved).
- [ ] Motion timing uses continuous, smooth easing curves without sudden frame drops.

## 3. Accessibility Checklist
- [ ] Section element includes `aria-label="Brand Values"`.
- [ ] Statements are structured inside an ordered list (`<ol>`) with `aria-label="Our brand values"`.
- [ ] `prefers-reduced-motion: reduce` renders a clean, static vertical stack displaying all 4 statements.
- [ ] Interactive elements pass focus-visible outline specifications (`outline: 3px solid ...`).

## 4. Performance Checklist
- [ ] Main-thread scroll listener runs in passive mode (`{ passive: true }`).
- [ ] Progress calculation uses `requestAnimationFrame` ticking without layout thrashing.
- [ ] Component maintains $\ge 60\text{fps}$ frame rate during continuous mouse wheel scrolling.
- [ ] Zero unnecessary React component re-renders occur during scroll transitions.

## 5. Responsive Layout Checklist
- [ ] Desktop viewport (1440px): Full sticky pinning and statement transitions verified.
- [ ] Tablet viewport (768px): Typography scales appropriately without text clipping.
- [ ] Mobile viewport (375px): Dynamic address bar resize (`dvh`) causes zero scroll jumps.
- [ ] Text wrapping maintains readable line breaks across all screen sizes.

## 6. Regression Checklist
- [ ] 16-point inline style opacity telemetry test verifies transitions from `[1,0,0,0]` to `[0,0,0,1]`.
- [ ] Section unpinning at progress `1.05` correctly reveals Product Categories without hiding statement 4.
- [ ] Payload CMS hydration in `cms` mode functions with zero 500/404 API errors.
- [ ] Surrounding sections (`About`, `Categories`, `News`) retain original layout alignment.

## 7. Engineering Standards Checklist
- [ ] Code is isolated inside `BrandValuesPrototype.tsx` or designated extension directories without mutating frozen baseline files.
- [ ] No inline style hacks or arbitrary fixed pixel offsets used for dynamic layout math.
- [ ] Hardcoded statement constant array maintains the approved 4 statements in exact order.
- [ ] Decoupled custom hooks separate progress logic from visual presentation.

## 8. Code Quality Checklist
- [ ] `npm run lint` passes with 0 errors and 0 warnings.
- [ ] `npm run typecheck` passes with 0 TypeScript errors.
- [ ] `npm run build` compiles clean production bundle (`First Load JS <= 11.5 kB`).
- [ ] No `console.log` debug statements remain in the committed source code.

## 9. Documentation Checklist
- [ ] Architecture design decision record (`docs/design/DESIGN_DECISIONS.md`) updated with decision rationale.
- [ ] Prototype review screenshots (Desktop, Tablet, Mobile, Reduced Motion) captured and saved.
- [ ] Rollback path to `phase3-brand-values-baseline` verified intact.
