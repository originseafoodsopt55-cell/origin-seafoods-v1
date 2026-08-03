# Sprint 9.4A Payload CMS Bootstrap Plan (Revised)

This document details the configuration, database selection, project layout, and implementation steps to integrate Payload CMS into the B2B catalog architecture.

---

## 1. Payload Version Selection
*   **Recommended Version:** **Payload 3.0+**
*   **Technical Rationale:** 
    *   Payload 3.0 was rewritten from scratch to run natively inside the Next.js App Router.
    *   It executes as React Server Components (RSC) and integrates directly into the Next.js build trace, making it highly optimized for serverless deployments on platforms like Vercel (no separate Node/Express server required).

---

## 2. Database Selection (Serverless Compatibility)
We analyze the three database adapters supported by Payload:

| Database Adapter | Local Development | Vercel (Production) | Trade-Offs | Viability |
| :--- | :--- | :--- | :--- | :--- |
| **SQLite** | Extremely easy (zero setup local file) | **Not Viable** (Wiped out due to Vercel ephemeral disk) | No persistent database file storage in serverless functions. | Local-only |
| **MongoDB** | Requires local running instance or Atlas | **Viable** (via Atlas Serverless) | Document database. Easy schema adjustments, but lacks strict relation constraints. | Viable |
| **PostgreSQL** | Requires local PG server or local Docker | **Viable** (via Neon / Supabase) | Relational database. Perfect match for 4-level catalog relationships. Supported via `@payloadcms/db-postgres` (Drizzle ORM). | **Recommended** |

*   **Final Decision:** **PostgreSQL** (using local PG for development and Neon/Supabase for production) is the most robust option.

---

## 3. Project Structure Layout
For Next.js 15 App Router embedded deployment:

```
src/
|-- app/
|   |-- (app)/              # Public customer website routes
|   \-- (payload)/          # Payload CMS Admin panel folder
|       \-- admin/          # Admin page entry point (page.tsx, layout.tsx)
|-- collections/            # Payload Collections config
|   |-- Categories.ts
|   |-- Series.ts
|   |-- ProductLines.ts
|   |-- Variants.ts
|   \-- Media.ts
|-- globals/                # Payload Globals config
|   |-- Homepage.ts
|   \-- Contact.ts
|-- hooks/                  # Collection-specific logic lifecycle hooks
|-- access/                 # Permissions configurations
|-- fields/                 # Shared field groupings (SEO, Image fields)
|-- payload.config.ts       # Main Payload Config file
```

---

## 4. Provider Pattern Integration
The swappable content provider structure ensures that the UI remains completely isolated from database client imports:

```
[UI Components]
       │ (Call DAL functions)
       ▼
[Data Access Layer (DAL)] (src/lib/data/index.ts)
       │ (Delegates queries)
       ▼
[Provider Factory] (src/lib/providers/factory.ts)
       │ (Dynamic selection: NEXT_PUBLIC_CMS_PROVIDER)
       ├──────────────────────────────────────────────┐
       ▼ (if "mock")                                  ▼ (if "cms")
[MockContentProvider]                        [CMSContentProvider]
 (Reads local JSON)                           (Calls client)
                                                      │
                                                      ▼
                                             [CMSClient] (src/lib/cms/client.ts)
                                                      │
                                                      ▼
                                             [Payload CMS REST API]
```

---

## 5. Category Domain Model Field Mapping

The fields in the Category collection must map directly to the existing domain properties. Note that since the website displays both Thai and English content concurrently on a single page, we **avoid** using Payload's built-in `localized: true` feature and instead declare separate fields:

| Payload CMS Field | DB Type | Domain Property (`Category`) | Validation Schema | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| `id` | Integer (Auto) | `id` | `z.string().min(1)` | Primary Key (Cast to String in Mapper) |
| `slug` | Text (Unique) | `slug` | `z.string().min(1)` | URL routing identifier |
| `thaiTitle` | Text | `thai` | `z.string().min(1)` | Thai translation title |
| `englishTitle` | Text | `english` | `z.string().min(1)` | English translation title |
| `description` | Textarea | `description` | `z.string()` | Category description text |
| `coverImage` | Relationship (Media) | `coverImage` | `ImageAssetSchema` | Main category card cover image |
| `published` | Boolean | `published` | `z.boolean().optional()` | Controls public visibility status |
| `seo` | Group | `seo` | `SEOSchema` | SEO metadata group (ogImage, canonical) |

*   *Note on Structural Identity:* "Structurally identical" per Sprint 9.3.2 approval refers to TYPE consistency (id remains string), not value consistency (literal ID values will differ between Mock and CMS output). Confirmed safe because:
    1.  No code performs string matching, prefixes, or comparison checks on Category `id` (verified zero instances of `startsWith` or raw equality checks on Category `id` in `src/`).
    2.  Category `id` is exclusively used as React rendering keys (`key={cat.id}`) inside consumer lists.
    3.  All dynamic catalog queries and routing resolutions map using `slug` and `categorySlug` (verified that no other mock files or databases contain `categoryId` references).
    4.  There is no usage of Category `id` inside URL parameters, cookies, local/session storage, or caching pipelines.

---

### PostgreSQL ID Design Analysis

By default, `@payloadcms/db-postgres` creates the primary key `id` as an **auto-incrementing integer** (identity column in PostgreSQL). We evaluate two options for ID handling:

#### Option 1: Custom Text ID Field
*   Configure the Category collection schema with a custom text `id` field to preserve string IDs like `"cat-crabs"`.
*   *Pros:* Complete matching with legacy Mock data string values.
*   *Cons:* Bypasses standard database auto-increment mechanics. Requires editors to manually type unique IDs during category creation, increasing human error risk.

#### Option 2: Default Integer ID + Mapper Cast (`String(payload.id)`)
*   Retain PostgreSQL default integer PK generation, and perform type-casting inside the mapper: `id: String(payload.id)`.
*   *Pros:* Safe, robust, and leverages native DB indexing. In our Next.js App Router, dynamic routing uses the unique **`slug`** (e.g., `/products/crabs`) instead of `id` for page queries, making the actual ID value invisible to frontend users.
*   *Cons:* ID values (`"1"`, `"2"`) will not match the mock strings (`"cat-crabs"`).

#### Architecture Decision:
**Option 2** is chosen. It ensures standard database conventions, eliminates manual ID input errors for editors, and easily satisfies the Zod `z.string()` validator via type-casting inside `mapCMSCategory`.

---

## 6. Implementation Order & Verification Gates

### Crucial Safety Rule:
*   The **Factory Guard** inside `src/lib/providers/factory.ts` **must remain active** and block CMS Provider instantiation across all phases, until Phase 5 (verification) is fully completed and approved.

### Phase 1: Dependencies Installation
*   Add `@payloadcms/next`, `@payloadcms/db-postgres`, and `@payloadcms/richtext-lexical` to `package.json`.
*   Run `npm install`.

### Phase 2: Bootstrap Payload Config & Admin Route
*   Create `src/payload.config.ts` pointing to local PostgreSQL connection string.
*   Setup Next.js route handlers inside `src/app/(payload)/admin/`.

### Phase 3: Category Collection Schema Definition
*   Define the `Categories` collection schema in `src/collections/Categories.ts` with `thaiTitle`, `englishTitle`, `slug`, `description`, `coverImage` relationship, `published`, and `seo` fields.

---
> [!IMPORTANT]
> **GATE 1: Compile & Linter Verification**
> Before proceeding to Phase 4, the following check commands must pass successfully:
> * `npm run lint`
> * `npm run typecheck`
> * `npm run build`
---

### Phase 4: Database Seed & Local API Integration
*   *Precondition:* A local PostgreSQL database instance must be running, and the connection string environment variable must be configured in `.env` before running the seed script.
*   Write a local import script to populate the database with mock category records from `src/lib/data/categories.ts`.
*   Start the development server and verify that Payload REST API exposes data on `http://localhost:3000/api/categories`.

### Phase 5: Verification & Factory Guard Clearance (Approval Required)
*   Temporarily bypass the factory guard under local test environment to verify that `CMSContentProvider` fetches and maps categories correctly.
*   Restore the Factory Guard.
*   Run `npm run typecheck` and `npm run build` to confirm the guard successfully blocks CMS Provider activation as expected.
*   Request final project review before starting async provider migration in a future sprint.
