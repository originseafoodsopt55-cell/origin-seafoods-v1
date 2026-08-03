# Origin Design Language Current (v1.0 Inventory)

**Document Version**: 1.0.0  
**Phase**: Phase 3B.0 (Origin Design Language Discovery — Activity 2 of 4)  
**Status**: FACTUAL INVENTORY ONLY (Zero code modifications, zero redesign proposals)  
**Date**: 2026-07-29  
**Target Repository**: `origin-seafoods-v1`  
**Baseline Reference Tag**: `phase3-brand-values-baseline`  

---

## 1. Brand Personality

The current homepage communicates an identity defined by four distinct characteristics:

- **Corporate & International**:  
  Communicated through metric badges ("30+ Years", "50+ Countries"), global sourcing region maps, accreditation partner logos (Altamar, Aquafrost, Costa, Deepblue, Interatlantic, Santa), and formal corporate statements.
- **Oceanic & Maritime**:  
  Communicated via deep marine blue color palettes (`#0a4d8c`, `#082b59`, `#070d18`), aquatic asset placement (blue swimming crab, squid, sea snail, blood cockle, scallop), and water-inspired background glows.
- **Premium & Professional**:  
  Expressed through high-resolution studio seafood photography (products displayed fresh on ice with chili and lime garnish), heavy typography weights (`800` Extra Bold, `900` Black), and dark-mode glassmorphic container elements.
- **Structured & Direct**:  
  Reflected in standard multi-column card grids, explicit sitemap footers, and clear category navigation bars.

---

## 2. Color Language

### 2.1 Palette Tokens (`src/app/(frontend)/globals.css`)
- **Primary Color**: `--color-primary: #0a4d8c` (Deep Ocean Blue)
- **Secondary Color**: `--color-secondary: #082b59` (Midnight Navy)
- **Accent Color**: `--color-accent: #f58220` (Vibrant Coral / Orange)
- **Secondary Accent**: `--color-green: #42b549` (Sustainability Green)
- **Background Color**: `--color-background: #ffffff` (Light fallback) / `#070d18` (Dark oceanic surface base)
- **Surface Colors**:
  - Light Surface: `--color-surface: #ffffff`
  - Soft Surface: `--color-surface-soft: #f8fcff`
  - Product Container Surface: `--color-product-bg: #eef8ff`
  - Section Highlight Surface: `--color-section-blue: #dff3ff`
- **Text Colors**:
  - Primary Text: `--color-text-primary: #102038` (Light mode) / `#ffffff` (Dark mode)
  - Secondary Text: `--color-text-secondary: #516a83`
  - Footer Text: `--color-footer-text: #dcefff`
- **Border Tokens**:
  - `--color-border: rgba(8, 43, 89, 0.12)`
  - `--color-border-soft: rgba(8, 43, 89, 0.08)`

### 2.2 Contrast Philosophy
The site uses high-contrast light-on-dark text rendering in hero, brand values, and header sections, transitioning to medium-contrast navy text on soft blue/white surfaces in secondary product and content areas. Focus indicators enforce high contrast (`outline: 3px solid rgba(245, 130, 32, 0.45)`).

---

## 3. Typography Language

### 3.1 Font Family & Weights
- **Base Font Family**: `"Segoe UI", "Noto Sans Thai", Tahoma, Arial, sans-serif`
- **Weights**:
  - Regular: `400`
  - Semi-Bold / Bold: `--fw-bold: 700`
  - Extra Bold: `--fw-extra: 800`
  - Black: `--fw-black: 900`

### 3.2 Typographic Scales
- **Micro Labels**: `--text-xs: 9px`
- **Small Text**: `--text-sm: 13px`
- **Body Text**: `--text-base: 14px`, `--text-md: 16px`, `--text-lg: 18px`
- **Sub-headings**: `--text-xl: 20px`, `--text-heading-sm: clamp(22px, 1.8vw, 28px)`
- **Section Headings**: `--text-heading: clamp(26px, 2.4vw, 36px)`
- **Hero Title**: `--text-hero: clamp(32px, 3vw, 48px)`
- **Brand Value Statement**: `--text-statement: clamp(28px, 4.2vw, 54px)`

### 3.3 Line Height & Spacing
- Tight Heading Line Height: `--leading-tight: 1.05`
- Body Line Height: `--leading-normal: 1.55`
- Reading Line Height: `--leading-reading: 1.85`
- Kicker Letter Spacing: `--tracking-kicker: 0.08em`

### 3.4 Alignment & Rhythm
Section headings use centered alignment for single-focus and grid sections (`Brand Values`, `Product Categories`, `Brands`), and left alignment for narrative sections (`About`, `News`).

---

## 4. Layout Language

### 4.1 Container & Grid Standards
- **Max Container Width**: `--container-max: 1440px`
- **Horizontal Gutter**: `--container-gutter: 80px` (desktop)
- **Header Height**: `--header-height: 82px`
- **Grid Layouts**: 3-column desktop (`repeat(3, 1fr)`), 2-column tablet, 1-column mobile stacked layouts.

### 4.2 Spacing Token Scale
- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 24px`
- `--space-6: 32px`
- `--space-7: 40px`
- `--space-8: 48px`
- `--space-9: 56px`
- `--space-10: 72px`

### 4.3 Vertical Rhythm & Whitespace
Standard sections specify `padding: 100px 0` or dynamic `padding: clamp(60px, 8vw, 100px) 0`. Vertical margins between headings and body elements use `--space-5` (24px) to `--space-8` (48px).

---

## 5. Motion Language

### 5.1 Animation Philosophy & Durations
- **Fast Interactivity**: `--duration-fast: 160ms` (button hovers, link highlights)
- **Standard Transition**: `--duration-base: 280ms` (card elevation, menu expansion)
- **Easing Curve**: `--ease-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### 5.2 Scroll Interaction & Pinned Progress
- **Brand Values Section**: Operates on a `400dvh` section container with a `100dvh` sticky viewport (`top: 0`).
- **Live Progress Calculation**: Uses a passive scroll listener calculating:
  $$\text{progress} = \text{clamp}\left(\frac{-\text{rect.top}}{\text{rect.height} - \text{window.innerHeight}}, 0, 1\right)$$
- **Direct DOM Mutation**: Inline `element.style.opacity` subscribers transition statements cleanly without React re-renders.

### 5.3 Reduced Motion Behaviour
When `prefers-reduced-motion: reduce` is detected:
- Section height converts from `400dvh` to `auto`.
- Sticky positioning converts to `position: relative`.
- Grid transitions convert to a static vertical column (`display: flex; flex-direction: column; gap: var(--space-8)`).
- Opacity forces `1 !important` and `transform: none !important`.

---

## 6. Visual Components

- **Hero Component**:  
  Full-viewport presentation with layered floating seafood PNG graphics, glowing gradient halos, and dual primary/secondary action buttons.
- **Cards (Categories & News)**:  
  Structured rectangular cards with `--radius-xl: 12px` or `--radius-lg: 8px`, subtle border stroke `--color-border`, image headers, and hover lift effects (`transform: translateY(-4px)`).
- **Buttons**:  
  Pill (`--radius-pill: 999px`) or rounded rectangular (`--radius-lg: 8px`) buttons. Primary buttons use coral `--color-accent` (`#f58220`) or ocean blue `--color-primary` (`#0a4d8c`) fills with shadow `--shadow-button`.
- **Images**:  
  High-resolution product cutouts displayed over gradient ice/ocean surfaces or framed photography tiles.
- **Section Backgrounds**:  
  Alternating solid dark marine (`#070d18`), soft blue tint (`#f8fcff`), and dark navy (`#082b59`).
- **Icons & Dividers**:  
  Standard SVG linear icon set (18px, 24px, 32px); horizontal dividing rules (`rgba(255,255,255,0.1)`).

---

## 7. Emotional Journey

Scrolling through the homepage creates the following sequence of user experiences:

1. **Hero**: **Immersive & Impactful**  
   The user enters a deep oceanic dark-mode scene with floating marine life, establishing immediate scale, freshness, and brand presence.
2. **About**: **Informative & Grounded**  
   The tone shifts slightly to structured corporate storytelling, building trust through concrete statistics (30+ years, 50+ countries).
3. **Brand Values**: **Focused & Reflective**  
   Vertical momentum pauses as the sticky scroll pins the screen, presenting 4 core philosophies (`GOOD LEARNING`, `GOOD GOAL`, `GOOD TEAM`, `GOOD JOB`) sequentially in single-focus typography.
4. **Product Categories**: **Commercial & Appetizing**  
   The user encounters rich, colorful seafood media grids showcasing physical products available for import/export.
5. **Brands & Global Supply**: **Reassuring & International**  
   Logos and regional maps reinforce operational scale and corporate partnerships.
6. **News**: **Active & Engaged**  
   Recent trade show participation (THAIFEX) demonstrates active industry participation.
7. **Footer**: **Conclusive & Accessible**  
   Clear sitemap navigation and contact links provide a structured resolution to the page.

---

## 8. Internal Consistency

### 8.1 Strongly Consistent Areas
- **Color Token Integration**: Standard CSS custom properties (`--color-primary`, `--color-accent`, `--color-background`) are used across all components.
- **Brand Value Pinning Logic**: Live progress calculation and DOM opacity subscribers operate with 100% mathematical consistency across viewports.
- **Accessibility & Focus States**: Outline rules (`focus-visible`) and skip links are uniformly implemented.

### 8.2 Moderately Consistent Areas
- **Section Heading Typography**: Heading font sizes vary slightly between fixed `px` definitions and dynamic `clamp()` utilities across older vs newer components.
- **Card Spacing & Padding**: Card padding ranges between `var(--space-5)` (24px) and `var(--space-6)` (32px) depending on feature area.

### 8.3 Weakly Consistent Areas
- **Card Container Surface Styles**: Category cards use semi-transparent dark borders, news cards use flat surface fills, and stat cards use simplified borderless blocks.
- **Background Transition Contrast**: The jump between dark oceanic backgrounds (`#070d18`) and lighter surface sections produces slight contrast variations.
