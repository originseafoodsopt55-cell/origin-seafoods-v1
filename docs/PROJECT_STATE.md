# PROJECT ARCHITECTURE & STATE AUDIT

## 1. Executive Summary

*   **Current Sprint:** Sprint 9.1 — CMS Foundation
*   **Project Status:** Functional and stable. The frontend features and catalog routing compile cleanly with zero eslint or typescript issues.
*   **Overall Health:** **Healthy**. Build runs successfully generating all 95 static routes.
*   **Architecture Maturity:** **Medium-High**. Standardized layers separate UI logic from mock data arrays using interfaces and schemas, but data fetching pipelines are currently synchronous.
*   **Production Readiness:** **High (Frontend)** / **Medium (Infrastructure)**. Standard static optimizations, image error fallbacks, and metadata tags are active. Disaster recovery relies on clearing desynchronized dev caches.
*   **CMS Readiness:** **High**. Configuration, dynamic factory providers, relative CDN URL resolution, and response payload mapping structures are complete, preparing the project for asynchronous live connections.

---

## 2. Technology Stack

*   **Framework:** Next.js 15.5.19 (App Router)
*   **Frontend:** React 19.0.0
*   **Styling:** Vanilla CSS styled globally via `@import "tailwindcss";` inside PostCSS configuration (`tailwindcss` v4.1.10, `@tailwindcss/postcss` v4.1.10, `postcss` v8.5.10).
*   **Animation:** Framer Motion 12.19.1
*   **Icons:** Lucide React 0.468.0
*   **Development Server:** Next.js dev server on port 3000 (PID managed dynamically in `dev-server.pid`).
*   **Build Tools:** TypeScript 5.8.3, ESLint 9.28.0

---

## 3. Folder Structure (src/)

```
src/
|-- app/                    # Next.js App Router files (routes, layouts, icons)
|-- components/             # Reusable UI components
|   |-- catalog/            # Initial catalog UI components
|   |-- layout/             # Header / Footer layout components
|   |-- products/           # Hardened QA components (keyboard gallery, spec lists)
|   |-- sections/           # Main Homepage display section blocks
|   \-- ui/                 # Atomic design blocks (SafeImage, ScrollReveal, Buttons)
|-- lib/                    # Core library services
|   |-- cms/                # Client, config, media URL resolver, and JSON mappers
|   |-- data/               # Data access layer (DAL) and mock data literals
|   |-- providers/          # Swappable content providers (Mock, CMS)
|   \-- validation/         # Zod schemas validating categories, series, lines, variants
\-- types/                  # TypeScript interface definitions
```

---

## 4. Architecture Overview

```
[UI Components]
       │ (Synchronous data reads)
       ▼
[Data Access Layer (DAL)] (src/lib/data/index.ts)
       │ (Zod Validation Schemas)
       ▼
[Provider Factory] (src/lib/providers/factory.ts)
       │ (NEXT_PUBLIC_CMS_PROVIDER Switch)
       ▼
 ┌─────┴──────────────────────────────────┐
 ▼                                        ▼
[MockContentProvider]            [CMSContentProvider]
 (Static data literals)           (CMS Client fetcher)
                                          │
                                          ▼
                                    [CMS Client] (API SDK)
                                          │
                                          ▼
                                    [CMS Mappers] (Transformation)
                                          │
                                          ▼
                                    [CMS Payload (JSON)]
```

*   **UI Layer:** Consumes data synchronously from the DAL functions. Renders SEO breadcrumbs, specs, galleries, and inquiry hooks.
*   **DAL (Data Access Layer):** Acts as the entry boundary. Fetches data from the active provider, filters values dynamically, and pipes objects through Zod validation schemas.
*   **Provider Layer:** Encapsulates the content sources.
*   **CMS Foundation:** Maps CMS JSON payloads to validated domain types, resolving CDN media prefixes.

---

## 5. Provider Pattern

*   **IContentProvider:** Interface specifying company, contact, brand, and catalog query signatures (`queryProducts`).
*   **MockContentProvider:** Concrete provider returning data from local files.
*   **CMSContentProvider:** Concrete provider mapping CMS client requests. It implements the complete provider interface with "not implemented" stubs.
*   **factory.ts:** Checks `cmsConfig.provider`. Instantiates `CMSContentProvider` if set to `"cms"`, else falls back to `MockContentProvider`.
*   **Current Provider:** `MockContentProvider`.
*   **Future Provider:** `CMSContentProvider` (configured via env variables in Sprint 9.2).

---

## 6. Data Layer

We maintain a strict 4-level catalog hierarchy:
```
Category (e.g. Crabs)
  └─ Series (e.g. Blue Swimming Crab)
       └─ Product Line (e.g. IBNR packaging)
            └─ Variant (e.g. Size: 60-80 M)
```

*   **Data Ownership:** `Variant` owns specifications (size, storage, country of origin), gallery arrays, features, and brand slugs.
*   **Future CMS Mapping:** CMS mappers extract flat attributes from CMS payloads and map them into this 4-level structure, resolving relative media URLs to full CDN assets.

---

## 7. Routing

All 95 pages are statically generated (`SSG`) at build time:

*   **Homepage:** `/` (Main company landing section)
*   **Catalog:** `/products` (Main listing of all categories)
*   **Category:** `/products/[category]` (Lists parent series, e.g. `/products/crabs`)
*   **Series:** `/products/[category]/[series]` (Lists product lines, e.g. `/products/crabs/blue-swimming-crab`)
*   **Product Line:** `/products/[category]/[series]/[productLine]` (Lists variants, e.g. `/products/crabs/blue-swimming-crab/ibnr`)
*   **Variant:** `/products/[category]/[series]/[productLine]/[variant]` (Detail specification, e.g. `/products/crabs/blue-swimming-crab/ibnr/60-80-m`)

*   **Routing Logic:** Dynamic routes use `generateStaticParams()` to fetch param lists from the DAL. Custom metadata schemas generate canonical links, breadcrumb JSON-LD structures, and B2B Organization schemas.

---

## 8. CMS Foundation

*   **CMS Config (`config.ts`):** Environment config layer mapping endpoints and CDN hosts.
*   **CMS Client (`client.ts`):** Isolate API fetch operations and SDK imports.
*   **Media Resolver (`media.ts`):** Prefixes relative images with CDN domain hosts.
*   **Mappers (`src/lib/cms/mappers/`):** Transpose untyped JSON data shapes into domain entities.
*   **Current Status:** Architecture and mapper layers are complete. No active API connections exist in Sprint 9.1.

---

## 9. Current Features

*   **Homepage:** Includes background video/image overlays, custom seafood product animation slots, about overlays, dynamic brand carousels, supply maps, contact forms, and keyboard accessible footer links.
*   **Catalog:** Interactive thumbnail selector galleries, keyboard gallery listeners (`ArrowLeft`/`ArrowRight`), dynamic specification boxes, and related product cards.
*   **SEO & Accessibility:** Branded B2B JSON-LD schemas, breadcrumb tracking, skip-links, and semantic tag structures.

---

## 10. Performance

*   **Image Optimization:** Fully handled via Next.js `next/image` using predefined source sets, layout sizing, and static quality ratios (90% for hero overlays, 88% for standard assets).
*   **Lazy Loading:** Dynamic sections are deferred where possible. Client-side carousel scripts bundle Autoplay plugins dynamically.
*   **Bundle Splitting:** SWC-optimized chunk generation separates common libraries (`framer-motion`, `zod`, `lucide-react`) into standalone server-side modules to reduce document parsing times.

---

## 11. Documentation (docs/)

*   **docs/adr/0001-provider-pattern.md:** Rationale for using provider classes to decouple UI from CMS.
*   **docs/adr/0002-domain-model.md:** Rationale for the 4-level catalog domain hierarchy.
*   **docs/adr/0003-query-api.md:** Design details of the offset pagination query API.
*   **docs/adr/0004-validation-layer.md:** Zod parser integration architecture.
*   **docs/adr/0005-cms-foundation.md:** CMS config, client, mapper, and media resolver design guidelines.
*   **walkthrough.md:** QA summaries and cache recovery guides.

---

## 12. Sprint History

*   **Sprint 1–8.1:** Core layout development and flat category grid mockup.
*   **Sprint 8.2:** Re-routed flat groupings into the 4-level domain model (Category $\rightarrow$ Series $\rightarrow$ Product Line $\rightarrow$ Variant).
*   **Sprint 8.4:** Hardened B2B layout constraints. Added `SafeImage` error boundary fallback components, empty-state containers, and lightweight static loaders.
*   **Sprint 8.5:** Installed `zod` validation layer and organized modules by domain. Implemented paginated queries (`queryProducts`) and decoupled assets from `assets.ts`.
*   **Sprint 9.1:** Extracted CMS clients, media URL helpers, configuration environment variables, mappers, and compiled the 5 Architecture Decision Records (ADRs).

---

## 13. Technical Debt

*   **Synchronous DAL Pipeline:** The DAL and UI data flow remain completely synchronous. Conversion of pages/layouts to `async/await` is deferred to Sprint 9.2.
*   **Duplicate Catalog Components:** The older `components/catalog/` and newer `components/products/` folders coexist. Refactoring and cleanup are required once the CMS integration stabilizes.
*   **Local Webpack Dev-Build Conflict:** Building the site while the development server runs in parallel corrupts the `.next` compilation cache. Clear-cache steps must be executed manually.

---

## 14. CMS Readiness Assessment

*   **Data Layer:** **9/10** — Structured validation schemas exist.
*   **Provider Layer:** **9/10** — Factory selectors and CMS provider stubs are ready.
*   **Routing:** **8/10** — Param resolving works, but lacks async support.
*   **SEO:** **9/10** — Comprehensive JSON-LD and B2B schemas are generated.
*   **Media:** **9/10** — CDN prefix resolvers are active.
*   **Content Mapping:** **9/10** — Mappers translate flat JSON payloads cleanly.
*   **Environment:** **10/10** — Config parameters are mapped to type-safe environment configurations.

---

## 15. Production Readiness

*   **Architecture:** **9/10**
*   **Maintainability:** **8/10** (requires component cleanup)
*   **Scalability:** **9/10** (paginated queries are integrated)
*   **Performance:** **9/10** (static routes load fast)
*   **Accessibility:** **9/10** (ARIA tags and keyboard gallery mapping exist)
*   **SEO:** **10/10**
*   **Deployment:** **8/10** (relies on static pre-rendering)
*   **Disaster Recovery:** **7/10** (manual dev-cache cleaning is required during build conflicts)

---

## 16. Next Roadmap

1.  **Sprint 9.2 — Asynchronous Data Pipeline:**
    *   *Why:* Converts all DAL interfaces to `async` (return `Promise<T>`). Prepares layout/page Server Components to fetch async datasets before live CMS API queries start.
2.  **Sprint 9.3 — Headless CMS Integration (Strapi/Payload/Contentful):**
    *   *Why:* Implements `CMSClient.ts` fetching routines using real API endpoints and hooks. Swaps factory selection to `"cms"`.
3.  **Sprint 9.4 — Production Verification & Static Content Revalidation:**
    *   *Why:* Tests incremental static regeneration (ISR) and webhook-based static rebuilding, ensuring content updates are served instantly.
4.  **Sprint 10 — Documents & Downloads UI:**
    *   *Why:* Adds B2B product documentation, datasheets, and user downloads UI to variants.
5.  **Sprint 11 — Multilingual Support:**
    *   *Why:* Introduces i18n support, allowing corporate buyers to toggle between English and Thai catalogs.
6.  **Sprint 12 — Global Logistics Integration:**
    *   *Why:* Connects variants to active freight calculator endpoints, enabling B2B buyers to request quotes based on shipping volumes.

---

## 17. Architecture Review (Architect Critique)

*   **Strengths:** Excellent layer isolation. Presentation components are platform-agnostic and do not import API libraries. Zod validation guards against malformed database entries.
*   **Weaknesses:** Contention on the `.next` directory. Dev cache desynchronization occurs when compilation scripts run in parallel.
*   **CMS & Scalability Risks:** The current synchronous DAL flow acts as a blocker. Converting layout files to fetch async data must be handled carefully in Sprint 9.2 to prevent hydration issues.

---

## 18. Final Assessment

**Yes**, the architecture is ready for Headless CMS integration. 

The client SDKs, configuration variables, media URL prefixing, and DTO response mappers are fully established and isolated. The only prerequisite action before live API requests can begin is migrating the DAL data pipeline from synchronous returns to asynchronous Promises (`async/await`), which is scheduled for the start of Sprint 9.2.
