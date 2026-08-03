# Sprint 8 & Sprint 8.2 & Sprint 8.4 & Sprint 8.5 & Sprint 9.1 — Task List

## Step 1: Category PNG Assets
- [x] Copy category PNG files (`PNG Crabs.png`, etc.) to `/public/images/categories/`

## Step 2: B2B Data Model Types
- [x] Refactor `ProductVariant`, `ProductGroup`, and `ProductSeries` in `src/types/product.ts`

## Step 3: Mock Data Hierarchy
- [x] Update `src/lib/data/categories.ts` (include `silkworm`, update cover images)
- [x] Update `src/lib/data/products.ts` (re-wire into B2B categories, series, groups, variants)

## Step 4: Provider & DAL Updates
- [x] Add getCategoryBySlug and B2B hierarchy queries to `IContentProvider.ts`
- [x] Implement B2B catalog queries in `MockContentProvider.ts`
- [x] Implement stub stubs in `CMSContentProvider.ts`
- [x] Export queries in `src/lib/data/index.ts`

## Step 5: Homepage Refactor
- [x] Backup modified files before editing (`ProductCategories.tsx.bak`, `globals.css.bak`)
- [x] Update `ProductCategories.tsx` to render 6 category cards using cover images
- [x] Remove individual SKU carousel from Homepage
- [x] Add arrow icon, English name, Thai name, small description to category cards
- [x] Link category card click behavior to `/products/[category]`
- [x] Link "ดูสินค้าทั้งหมด" button to `/products`

## Step 6: Catalog Routing Pages
- [x] Update `/products` catalog page
- [x] Update `/products/[category]` category page to display Product Series cards
- [x] Create `/products/[category]/[series]` page to display Product Groups cards
- [x] Create `/products/[category]/[series]/[group]` page to display Product Variants
- [x] Create `/products/[category]/[series]/[group]/[variant]` page for detail specs and Inquiry button
- [x] Delete old overlapping route `/products/[category]/[slug]`

## Step 7: Reusable Components Refactor
- [x] Refactor `CatalogProductCard.tsx` with dynamic URL path parser
- [x] Refactor `RelatedProducts.tsx` to query all variants filtered by category

## Step 8: Style & Code Polish
- [x] Add B2B Category grid CSS rules to `globals.css`
- [x] Clean imports and fix lint errors
- [x] Clear Next.js cache
- [x] 9. รัน npm run build
- [x] 10. รันสคริปต์ verify-catalog-ux.ts ทดสอบการทำงานของระบบหลังคอมไพล์
- [x] 11. เปิด dev server พร้อมใช้งานบนพอร์ต 3000 ให้ผู้ใช้กดทดสอบพฤติกรรมจริงในเบราว์เซอร์

---

## Sprint 8.2: Dynamic Catalog Architecture Design
- [x] Review current dynamic routing and provider pattern architecture
- [x] Map dynamic route path layout matching B2B Product Line terminology
- [x] Design B2B SEO schemas (Organization, WebSite, WebPage, BreadcrumbList, ImageObject)
- [x] Extend ERD model to map specifications, gallery, documents, and downloads to the Variant entity
- [x] Create and refine implementation_plan.md design specifications
- [x] Obtain architecture design approval

---

## Sprint 8.4: Catalog QA & Production Polish
- [x] Clean Node processes and restart background dev server
- [x] Create reusable `<SafeImage>` component with fallback handling to `origin-logo.svg`
- [x] Implement fallback support in `CatalogProductCard.tsx` and `ProductGallery.tsx`
- [x] Implement keydown listeners (ArrowLeft/ArrowRight) for gallery thumbnails
- [x] Add clean, styled empty-state container in `ProductSpecification.tsx`
- [x] Create root-level lightweight `loading.tsx` skeleton for the catalog routes
- [x] Create branded error boundary `error.tsx` under `/products` route namespace
- [x] Run npm run lint, npm run typecheck, and npm run build validation checks
- [x] Generate QA walkthrough and verify zero homepage/global regressions

---

## Sprint 8.5: Domain Hardening & CMS Readiness
- [x] Install `zod` validation package
- [x] Define domain-scoped Zod schemas for Category, Series, ProductLine, and ProductVariant
- [x] Integrate validation schema filters on all DAL dynamic query wrappers
- [x] Implement `queryProducts` pagination API on Mock/CMS Providers and DAL
- [x] Refactor dynamic page templates `generateStaticParams()` to use DAL query methods
- [x] Implement incremental assets migration (inlined assets on data files, fallback to `assets.ts`)
- [x] Validate build success,eslint check, and typecheck compile integrity

---

## Sprint 9.1: CMS Foundation
- [x] Create headless CMS configuration layer (`config.ts`)
- [x] Create CMSClient layer isolating API connection logic (`client.ts`)
- [x] Create Media abstraction layer mapping relative path prefixes (`media.ts`)
- [x] Create Category, Series, ProductLine, and ProductVariant CMS mapper modules
- [x] Fully implement `CMSContentProvider` interface methods with completed stubs
- [x] Refactor factory to dynamically resolve swappable providers based on config
- [x] Write 5 Architecture Decision Records (ADRs) under `docs/adr/`
- [x] Run ESLint syntax parsing, typecheck compiling, and Next.js static builds
- [x] Clear desynchronized .next/ build cache directory and resolve static assets 404
