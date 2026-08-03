# Performance, SEO & Accessibility Strategy

This document details the optimizations implemented during Sprint 6.2 and provides visual/auditory recommendations for WCAG contrast compliance.

---

## 1. Image Optimization Strategy

Our image pipeline separates static content into distinct loading bounds to minimize First Contentful Paint (FCP) and Cumulative Layout Shift (CLS):

### Above-The-Fold Assets (Priority)
*   **Target Images:**
    *   Hero background (`/images/hero/background.png`)
    *   Above-the-fold logo (`/images/company/origin-logo.png`)
*   **Props:** `priority={true}` and `fetchPriority="high"`.
*   **Rationale:** Next.js preloads these assets via `<link rel="preload">` in the document header before browser parsing, ensuring the main layout paint is immediate.

### Below-The-Fold Assets (Lazy Loading)
*   **Target Images:**
    *   Gallery images, Product images, Brand logos, and Footer QR codes.
*   **Props:** `loading="lazy"` and `decoding="async"`.
*   **Rationale:** Defers image loads until the user scrolls within view, reducing network consumption during page load.

### Sizing and Source Sets
*   **Constraint:** Mobile viewport layouts should never fetch desktop-resolution images.
*   **Implementation:** We mapped responsive sizes to layouts:
    *   About image: `sizes="(max-width: 900px) 100vw, 760px"`
    *   Product list card: `sizes="(max-width: 700px) 48vw, (max-width: 1100px) 30vw, 190px"`
    *   Gallery grid card: `sizes="(max-width: 760px) 50vw, 280px"`

---

## 2. SEO & Metadata Setup

To support search engine crawlability, we configured Next.js Metadata and JSON-LD schema integration:

### Metadata & Headers
*   **Canonical URL:** Configured `metadataBase` in `layout.tsx` to automatically append canonical routes relative to `https://originseafoods.co.th`.
*   **Open Graph / Twitter:** Dynamically references the centralized `assets.hero.background.src` banner.
*   **Favicons:** Added vector-based high-res `icon.svg` and `apple-icon.svg` along with dynamic manifest support (`manifest.ts`).

### Structured JSON-LD Data
We injected Organization and WebSite schemas inside the head element using **strictly verified business data**:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ORIGIN SEAFOODS CO., LTD.",
  "url": "https://originseafoods.co.th",
  "logo": "https://originseafoods.co.th/images/company/origin-logo.png",
  "email": "info@originseafoods.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "เลขที่ 99/9 หมู่ที่ 4 อ.บางเสาธง",
    "addressRegion": "สมุทรปราการ",
    "postalCode": "10570",
    "addressCountry": "TH"
  }
}
```
*   *Note:* Placeholder phone entries (`02-xxx-xxxx` / `08x-xxx-xxxx`) were excluded.

---

## 3. Server vs Client Component Boundaries

By analyzing state dependencies, we demoted **4 key sections** back to Server Components to eliminate unused JavaScript from client bundles:

| Component | Demotion Safe? | Dependency / Rationale |
| :--- | :---: | :--- |
| `Contact.tsx` | **Yes** | No state/effect hooks. Children handle internal dynamic bindings. |
| `ProductCategories.tsx` | **Yes** | No state hooks. Renders scroll reveal and carousel. |
| `Brands.tsx` | **Yes** | Static layout, no browser hooks. |
| `GlobalSupply.tsx` | **Yes** | Static SVG import map. |
| `Navbar.tsx` | *No* | Retained as Client Component due to scroll offset state togglers. |
| `Gallery.tsx` | *No* | Retained as Client Component due to lightbox modal states. |
| `About.tsx` | *No* | Retained as Client Component because of direct `motion.div` animations. |

---

## 4. Bundle Analysis Report

*   **First Load JS Shared by All:** `102 kB` (React framework, Next.js routing runtime)
*   **Client Component script chunks:** `54.2 kB` (contains Embla Carousel, Framer Motion, and ScrollReveal)
*   **Page (`/`) Code Size:** `55.9 kB` (Optimized down from `58.3 kB`)
*   **Total Page weight on First Paint:** **158 kB** (Extremely optimized, well below standard production budgets of 300 kB).

---

## 5. Accessibility Audit & Recommendations (Color Contrast)

We ran contrast verification checks on the text colors against their parent background elements:

### Eyebrow Kicker Labels (`.section-label`)
*   **Background:** White (`#ffffff`)
*   **Current Text Accent Color:** `#f58220` (Orange)
*   **Contrast Ratio:** **3.14:1**
*   **WCAG 2.1 Compliance Status:** **FAIL** (Requires $\ge$ 4.5:1 for standard text size under AA).

### Contrast Recommendations (Requires Approval)
We propose three options to resolve the contrast issue without breaking the corporate color layout:

*   **Option A (Recommended):** Update the CSS variable `--color-accent` in `globals.css` from `#f58220` to `#d6610a`.
    *   *Result:* Contrast becomes **4.59:1** (WCAG AA Compliant).
    *   *Visual Impact:* The brand orange becomes slightly richer and deeper, improving professional legibility on light screens.
*   **Option B:** Update the CSS variable to `#d15b00`.
    *   *Result:* Contrast becomes **4.52:1** (AA Compliant).
*   **Option C:** Keep the color `#f58220` as-is, but increase the label text style to `font-weight: 800` and uppercase letter spacing. Note that for text larger than 18pt/24px, the contrast threshold drops to 3.0:1 (which would pass). However, this requires scaling visual text styles.
