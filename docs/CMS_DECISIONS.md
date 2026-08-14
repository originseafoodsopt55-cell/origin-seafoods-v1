# Architecture Decision Record: Payload CMS Integration

This document outlines key technical decisions made for the integration of Payload CMS.

## 1. Separate CMS Deployment (Option B)
*   **Decision:** Deploy Payload CMS as an independent application server separate from the Next.js client website.
*   **Rationale:** Avoids shared CPU/Memory locks during high-intensity editor operations (like CSV uploads or asset processing). Ensures client-facing pages have maximum availability.

---

## 2. Payload Native Field Localization
*   **Decision:** Use Payload's native field localization instead of custom translation keys (e.g. `title_th`, `title_en`).
*   **Rationale:** Keeps database structures clean. Allows querying and retrieving localized API responses on-demand, reducing transmission payload sizes.

---

## 3. Normalized Child Relationship References
*   **Decision:** Store relation references on child entities (e.g., `series.category` points to the category ID) rather than maintaining array lists on parent documents.
*   **Rationale:** Prevents database performance degradation. Storing relationship arrays inside parent documents creates massive document sizes when scaling to 100,000+ variants.

---

## 4. Offloaded S3 / CDN Asset Management
*   **Decision:** Store all media and documents in an S3-compatible cloud storage bucket served via a dedicated CDN domain.
*   **Rationale:** Offloads asset hosting from the web server, reducing bandwidth charges, improving asset load times, and simplifying server backups.

---

## 5. Phased DAL Async Migration
*   **Decision:** Retain the synchronous DAL layer for Sprint 9.2, building only mock mapping files and provider schemas. Refactor the DAL to async Promises in Sprint 9.3/9.4.
*   **Rationale:** Ensures absolute safety. We verify the CMS foundation schema, mapper logic, and documentation boundaries first before modifying any page fetching routes.

---

## 6. ESM Module Conversion
*   **Decision:** Add `"type": "module"` to `package.json`.
*   **Rationale:** Next.js 15 and Payload 3.0+ native integration and CLI tools (like `npx payload generate:importmap`) require ES Modules. Activating ESM natively at the project root solves module loader conflicts.

---

## 7. Next.js 15 Server Action Wrapper for handleServerFunctions
*   **Decision:** Wrap `handleServerFunctions` inside an inline Server Action (`'use server'`) inside `src/app/(payload)/layout.tsx`.
*   **Rationale:** Under Next.js 15 React Server Component (RSC) boundary rules, raw functions cannot be passed directly from Server Components to Client Components. They must be explicitly marked as Server Actions via `"use server"`. Wrapping `handleServerFunctions` dynamically inside an async inline Server Action satisfies this constraint and resolves serialization errors cleanly.

---

## 8. Ephemeral Local Media Warning on Serverless Vercel
*   **Decision:** Warn and enforce cloud storage adapter migration for the Media collection.
*   **Rationale:** The initial bootstrap uses local disk storage (`public/media`). Because Vercel serverless instances use ephemeral file systems, any media uploaded local to the disk will be permanently wiped out on container restarts. We must migrate the Media collection to Vercel Blob or an AWS S3 adapter before deploying to production—this must be completed prior to the production launch sprint (indicated as Sprint 15 in the original roadmap).

---

## 9. Migration-Based Workflow for Production Databases
*   **Decision:** Shift from dev auto-push sync to migration files before production launch.
*   **Rationale:** During local development, Payload's PostgreSQL adapter uses auto-push schema sync to apply Drizzle schemas immediately to the database. However, this is unsafe for production, as auto-push can cause unintended data loss or lock tables. We must lock down schemas and migrate to a migration-based workflow (`npx payload migrate`) prior to deploying staging/production environments.

---

## 10. Public Read-Only Access for Catalog API Endpoints
*   **Decision:** Enable public read access (`read: () => true`) on `Categories` and `Media` collections.
*   **Rationale:** The product catalog is intended to be public-facing by design. Allowing anonymous read access on these endpoints enables Next.js to fetch catalog lists and display them to guest users without requiring auth overhead. Mutation endpoints (`create`, `update`, `delete`) remain fully protected under default Payload admin session requirements.

---

## 11. Serialization-Friendly Icon Schema for RSC Boundaries
*   **Decision:** Change the type of `icon` in `Feature` and `ContactLink` interfaces from `LucideIcon` (React component function) to `string | LucideIcon` (or `string` for data storage/transfers), and map it dynamically inside Client Components.
*   **Rationale:** Under Next.js React Server Components (RSC) boundary rules, functions (such as React components/icons) cannot be serialized and passed directly from Server Components to Client Components. Doing so throws a runtime prerender serialization error. Using string icon keys allows data to be serialized across the server-client boundary cleanly, and the Client Components can safely resolve the string to the actual Lucide Icon component at render time.

---

## 12. Explicit Media Relationship URL Mapping Checklist
*   **Decision:** In all future data mappers (such as `ProductLine`, `ProductVariant`, etc.), any nested relationship field pointing to the `Media` collection (such as `coverImage` or `seo.ogImage`) must be explicitly resolved to a URL string using `resolveMediaUrl(field?.url ?? "")`.
*   **Rationale:** Domain validation schemas (like `SEOSchema` or `ImageAssetSchema`) require these image paths to be `string` values. In Payload, populated media relation fields are returned as full media objects. Directly mapping `payload.seo` or `payload.coverImage` without extracting the `.url` string causes Zod type validation to fail on runtime schema parses (e.g. `ProductSeriesSchema.parse`). This has been a recurring issue identified in both `Category` and `Series` collections.

---

## 13. Non-Unique Slug Configuration for Deep Nested Catalog Levels
*   **Decision:** Do not set `unique: true` on the `slug` field in `ProductLines` (and other deep nested collections like `ProductVariants`). Instead, ensure duplicate check and lookup queries filter by both `slug` and parent relationship (e.g. `series` or `productLine`).
*   **Rationale:** In a multi-level nested catalog structure (such as `/products/[category]/[series]/[productLine]`), slugs only need to be unique *within* their parent context (e.g. two different product series can both have a product line with slug `ibnr` or `white-box`). Forcing `unique: true` globally on deep nested collection slugs creates database schema conflicts during seeding and prevents legitimate duplicate slug patterns (like `ibnr` under different series). This is a critical lesson for the upcoming `Variants` collection, where slugs (such as size labels like `200up-m`) will frequently recur across different product lines.

---

## 14. Compound Uniqueness Querying for Nested Catalog Seeding
*   **Decision:** For nested collections with non-unique global slugs (like `ProductLines` and `Variants`), all idempotent database seeding and update checks must query using compound filters (e.g. `slug` + parent relationship ID).
*   **Rationale:** Since nested slugs (such as `ibnr` or size labels like `60-80-m`) are not unique globally, querying or updating by slug alone will match documents belonging to other parent branches. Compound lookup queries guarantee idempotency, ensuring that data is updated in the correct parent context without corrupting records in other product lines.

---

## 15. Drizzle Column Name Collision in Group Fields
*   **Decision:** Avoid naming fields inside a nested group in a way that collides with the snake_case concatenated name format of the root level fields (e.g. root field `heroSubtitle` and group field `hero.subtitle` both generate the database column name `hero_subtitle`). When a collision is possible, rename the group's nested field (e.g. rename `hero.subtitle` to `hero.subtitleText`).
*   **Rationale:** The Payload Postgres adapter automatically flattens group fields by prefixing the group name (e.g. `groupName_fieldName`). If a root field has a name that matches this prefix combination (such as `heroSubtitle`), it will clash with the flattened group column name. Setting a custom `dbName` property on a nested field inside a group does not override this prefixing behavior in Drizzle. Therefore, renaming the schema field directly is the only reliable solution to prevent duplicate column definition database errors.

---

## 16. Strict Prevention of Hallucinating/Reconstructing Truncated Tool Outputs
*   **Decision:** Never estimate, speculate, or reconstruct truncated tool outputs or JSON structures in project communications. If an output is truncated by the assistant environment, the assistant must explicitly read the underlying log files, write the output to a temporary file and read it, or state clearly that the output was truncated.
*   **Rationale:** The verification gates of this project rely on exact, unmodified database outputs and raw API JSON payloads. Hallucinating or manually reconstructing missing parts of logs ruins the integrity of these validation checks and hides potential configuration bugs. Genuine, partial data is infinitely more valuable than artificially complete information.

---

## 17. Routing Isolation (Multiple Root Layouts) & Admin Params Preservation
*   **Decision:**
    1.  **Multiple Root Layouts Isolation:** Place client-facing pages and resources inside their own dedicated route group (e.g., `(frontend)`) separate from the `(payload)` route group. Never keep a `layout.tsx` rendering `<html>` and `<body>` tags directly at the root `src/app/` level, as it will nest other layouts (like `(payload)`) inside itself, causing duplicate HTML/Body tags.
    2.  **Preservation of Params Promise in Admin Route:** Do not `await` and re-wrap the native Next.js `params` promise inside `src/app/(payload)/admin/[[...segments]]/page.tsx` (e.g. passing `Promise.resolve({ segments })`). Instead, cast it using `as unknown as Promise<{ segments: string[] }>` and pass it directly to `<RootPage params={params} />`.
*   **Rationale:** 
    1.  Next.js App Router renders root layouts from parents to children. A root-level `layout.tsx` wraps all route groups, breaking Payload's internal root layout rendering structure and causing hydration issues.
    2.  Next.js 15 uses a special proxy Promise for dynamic route params. Manual re-wrapping destroys this proxy wrapper context, causing React's internal `use()` calls in Payload's `RootPage` component to fail to resolve the catch-all dynamic route correctly, resulting in silent `notFound()` 404 errors.



## 18. Permanent Activation of CMSContentProvider from Sprint 15 Onward
*   **Decision:** From Sprint 15 onward, `NEXT_PUBLIC_CMS_PROVIDER=cms` is the permanent default for this project. It is no longer a temporary bypass. If a developer switches to `mock` for isolated testing, they **must** restore it to `cms` before ending their work session and committing changes. The direction of "default vs. exception" is now reversed from all Sprint 9.5–14 patterns: `cms` is the default, `mock` is the exception.
*   **Rationale:** Sprint 9.2's factory guard block was justified at the time because `CMSContentProvider` was incomplete (missing async-safe `getSeries` and `getProductLines`). By Sprint 14 all endpoints had been implemented and verified individually. Keeping `mock` as the default caused a critical gap: CMS admin changes (Gallery, Globals, etc.) were silently invisible on the live website because the frontend was reading hardcoded TypeScript files, not the database. Activating `cms` permanently closes this gap and makes the CMS the single source of truth for all content from this point forward.

---

## 19. Page Rendering Strategy for REST-Based CMSContentProvider
*   **Decision:** All pages that fetch data from `CMSContentProvider` (via `CMSClient.fetch()`) must use one of the following rendering strategies — never rely on Next.js static pre-rendering at build time:
    1.  **Static routes** (`/`, `/products`): `export const dynamic = 'force-dynamic'` — rendered on every request. Required because Next.js pre-renders static routes at build time regardless of `revalidate`, and there is no HTTP server at `localhost:3000` during `npm run build`.
    2.  **Dynamic routes without `generateStaticParams`** (`/products/[category]`, `/products/[category]/[series]`, `/products/[category]/[series]/[productLine]`, `/products/[category]/[series]/[productLine]/[variant]`): `export const revalidate = 300` (5-minute ISR). First render happens on the first actual user request (not at build time), then cached for 300 seconds before background revalidation.
*   **Prohibition:** Do **not** add `generateStaticParams` back to any page that uses `CMSContentProvider` as long as `CMSClient` relies on `fetch()` to a local HTTP endpoint. Static path enumeration at build time will fail with `fetch failed` because no HTTP server is running during `npm run build`.
*   **Rationale:** `CMSClient` uses `fetch("http://localhost:3000/api/...")` which requires a running Next.js server. The Next.js build process is a standalone Node.js process with no HTTP server. ISR for dynamic routes avoids this constraint because Next.js does not attempt to pre-render dynamic paths at build time when `generateStaticParams` is absent.

---

## 20. BrandValues Collection Schema & Data Layer Integration ~~[REVERTED]~~

* **Original Decision (implemented):** Implement `BrandValuesCollection` in Payload CMS (`src/collections/BrandValues.ts`) holding 4 items ordered by `order` field (with `title`, `order`, and optional `bgImage` upload relation). Wire `getBrandValues()` through `IContentProvider`, `MockContentProvider`, `CMSContentProvider`, and `src/lib/data/brandValues.ts`.
* **Original Rationale:** Provides project staff with full autonomy to edit company core statements and background image assets via Payload Admin UI, while adhering to Sprint 15 Payload standards.

### ⚠️ REVERTED — July 29, 2026

* **Reversal Decision:** Remove `BrandValuesCollection` from Payload CMS and all associated data-layer code (`getBrandValues()`, `brandValuesMapper.ts`, `seed-brand-values.ts`). Replace with a **hardcoded constant array** (`BRAND_VALUE_STATEMENTS`) directly inside `src/components/sections/BrandValues/index.tsx`.
* **Reversal Rationale:**
  1. The PostgreSQL DB was never running during the Phase 3 development and review cycle, so the CMS seed script (`seed-brand-values.ts`) never executed successfully — meaning the database table was never populated.
  2. The mock provider contained incorrect placeholder content (Thai-language quality/supply chain descriptions), not the 4 approved value statements (GOOD LEARNING / GOOD GOAL / GOOD TEAM / GOOD JOB). As a result, all Phase 3 art direction work (typography scale, motion pacing, fade timing, scroll budget) was reviewed against the wrong content — the Owner never saw the approved statements on the real website.
  3. Owner decision: The 4 value statements are fixed brand identity — they do not require CMS editability. Hardcoding eliminates the CMS dependency risk and guarantees the correct content is always displayed.
* **Effective Commit:** `fix(brand-values): replace CMS data layer with approved hardcoded constant BRAND_VALUE_STATEMENTS`
* **Files removed from data layer:** `getBrandValues()` from `IContentProvider`, `MockContentProvider`, `CMSContentProvider`, `data/index.ts`, `data/brandValues.ts` (defunct), `mappers/brandValuesMapper.ts`, `scripts/seed-brand-values.ts`, `collections/BrandValues.ts` (import removed from `payload.config.ts`)
* **Historical Note:** The `BrandValues.ts` collection file, `brandValuesMapper.ts`, and `seed-brand-values.ts` files are retained in the repository as historical artifacts. They are no longer imported or executed anywhere in the codebase.

---

## 21. Category-Scoped ProductLine Slugs for 3-Level URL Routing Architecture (Updating Decisions 13 & 14)

* **Decision:** Shorten product catalog URLs from 4 levels (`/products/[category]/[series]/[productLine]`) to 3 levels (`/products/[category]/[productLine]`). Update slug uniqueness scoping for `ProductLine` so that slugs must be unique **within their parent Category** instead of within their parent Series.
* **Rationale:** 
  1. The 4-level URL structure created duplicate slug path segments in 95.2% of catalog items (e.g. `/products/crabs/blue-swimming-crab/blue-swimming-crab`).
  2. Shortening the URL to 3 levels improves user readability, shareability, and SEO structure.
  3. Under 3-level routing (`/products/[category]/[productLine]`), `productLine.slug` is evaluated directly under `category.slug`. Therefore, slug uniqueness must be scoped to `Category` to prevent routing collisions under the same category.
  4. The `Series` collection and database taxonomy remain 100% intact in the database and CMS for grouping and administrative management.
* **Effective Branch:** `refactor/shorten-product-urls`

