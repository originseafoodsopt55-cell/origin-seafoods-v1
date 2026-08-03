# Verified Stable Baseline Checkpoint (v1.0.0)

> **Checkpoint ID**: `baseline-v1`  
> **Git Tag**: `baseline-v1`  
> **Git Branch**: `main`  
> **Verification Date**: 2026-08-03  
> **Status**: Verified & Production Ready  

---

## A. File Structure Verification (Audited Counts)

| Directory | Disk File Count | Git Tracked File Count | Verification Status |
| :--- | :---: | :---: | :---: |
| `src/components` | **60** | **60** | ✅ 100% Match |
| `src/app` | **27** | **27** | ✅ 100% Match |
| `src/collections` | **15** | **15** | ✅ 100% Match |
| `public/images` | **87** | **87** | ✅ 100% Match |
| `public/media` | **96** (106.38 MB) | **96** | ✅ 100% Match |

---

## B. Brand Values Section Parameters (Source: `globals.css` & `BrandValues/index.tsx`)

- **Section Height**: `240dvh` (`.brand-values-section`)
- **Text Color**: `#082b59` (`.brand-values-statement`, `.brand-values-item`)
- **Text Shadow**: `0 4px 16px rgba(255, 255, 255, 0.65), 0 2px 6px rgba(255, 255, 255, 0.4)`
- **Font Family**: `var(--font-family-base)` (`"Satoshi", "Anuphan", "Segoe UI", sans-serif`)
- **Font Weight**: `800`
- **Font Size by Viewport**:
  - **Desktop (>1024px)**: `88px`
  - **Tablet (641px - 1024px)**: `64px`
  - **Mobile (<=640px)**: `42px`
- **Letter Spacing**: `0.05em`
- **Line Height**: `1.05`
- **Artwork File Names & Dimensions**:
  - **Desktop**: `/images/brand-values/brand-values-desktop-artwork.png` (`2560 x 6000 px`)
  - **Tablet**: `/images/brand-values/brand-values-desktop-artwork.png` (`2560 x 6000 px`)
  - **Mobile**: `/images/brand-values/brand-values-mobile-artwork.png` (`1200 x 3200 px`)
- **Keyframes / Ranges (Opacity & translateY)**:
  - **Item Opacity Input Ranges**:
    - Item 1 ("GOOD LEARNING"): `[0.0, 0.1625, 0.20, 0.25]` -> Output: `[1, 1, 0, 0]`
    - Item 2 ("GOOD GOAL"): `[0.25, 0.2875, 0.4125, 0.45, 0.50]` -> Output: `[0, 1, 1, 0, 0]`
    - Item 3 ("GOOD TEAM"): `[0.50, 0.5375, 0.6625, 0.70, 0.75]` -> Output: `[0, 1, 1, 0, 0]`
    - Item 4 ("GOOD JOB"): `[0.75, 0.7875, 1.0]` -> Output: `[0, 1, 1]`
  - **Background Artwork Scroll translateY**: Continuous linear mapping `[0.0, 1.0]` -> `[0, -Math.max(0, height - viewportHeight)]` calculated dynamically via `getBoundingClientRect().height`
- **Vertical Positioning of Text**:
  - **Screen-relative shift**: `transform: translateY(-6vh);` (moves statement text 6% of viewport height upwards)
  - **Layout Grid**: `grid-template-areas: "statement"`, centered in `100dvh` sticky viewport container (`.brand-values-sticky`).

---

## C. Motion & Animation Configurations (Source: `ScrollReveal.tsx` & `StaggerGroup.tsx`)

- **ScrollReveal Component (`ScrollReveal.tsx`)**:
  - `y` offset: `40px` (default)
  - `duration`: `0.8s`
  - `easing`: `cubic-bezier(0.16, 1, 0.3, 1)`
  - `viewport`: `{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }`
- **StaggerGroup Component (`StaggerGroup.tsx`)**:
  - `staggerChildren`: `0.1s` (default) / `0.06s` (when `fast = true`)
  - `delayChildren`: `0.05s`
  - `staggerItem`: `{ opacity: 0, y: 40 }` -> `{ opacity: 1, y: 0 }` (`0.8s`, `ease: [0.16, 1, 0.3, 1]`)
- **Sections WITHOUT Entrance Motion**:
  - **Brand Values**: Uses continuous scroll-pinned canvas transforms (`useTransform`), bypassing entrance fade-in.
  - **Products Background**: Uses continuous CSS float loops (`animate-float-slow` / `animate-float-delayed`), bypassing ScrollReveal entrance.

---

## D. Core Layout Configuration (Source: `globals.css`)

- **Container Max-Width**: `1440px` (`--container-max`)
- **Container Gutter**: `80px` (`--container-gutter`), implemented as `width: min(var(--container-max), calc(100% - var(--container-gutter)))`
- **Key Section Padding**:
  - **Hero Section**: `padding: 100px 0 140px;` (Desktop)
  - **About Section**: `padding: 120px 0 130px;` (Desktop)
  - **Product Categories Section**: `padding: 60px 0 70px;` (Desktop)
  - **Global Supply Map Section**: `padding: 120px max(56px, calc((100vw - var(--container-max)) / 2));` (Desktop)
  - **Brands Section**: `padding: 120px 0 130px;` (Desktop)
  - **Corporate Newsroom Section**: `padding: 80px 0 60px;` (Desktop)
  - **Contact Section**: `padding: 120px 0;` (Desktop)

---

## E. Essential Environment Variables (Vercel Requirements)

> ⚠️ **Security Policy**: Secret values are omitted. Configure these key names in Vercel Environment Variables:

1. `POSTGRES_URL` (Neon PostgreSQL database connection string)
2. `DATABASE_URL` (Direct Neon database pool URL)
3. `PAYLOAD_SECRET` (Payload CMS secret key for authentication & JWT)
4. `NEXT_PUBLIC_SERVER_URL` (Base domain URL for Next.js and Payload asset resolution)

---

## F. Verified Features & Page Status

- ✅ **Homepage (`/`)**: All 8 sections rendering, interactive globe, scroll-pinned Brand Values, Corporate Newsroom grid, and responsive header/footer.
- ✅ **Product Catalog Hub (`/products`)**: Mfood-style centered cards, sharp blue hover borders, scroll-spy sticky sidebar (flush left, orange theme, smooth anchor jumping), line-art SVG background, float contact button.
- ✅ **Product Details (`/products/...`)**: Dynamic routing for categories, series, product lines, and variants.
- ✅ **Corporate Newsroom (`/news` & `/news/[slug]`)**: Full listing grid, formatted dates, detailed article view.
- ✅ **Vercel Build Integration**: `.npmrc` (`legacy-peer-deps=true`) & `vercel.json` (`installCommand: "npm install --legacy-peer-deps"`).
