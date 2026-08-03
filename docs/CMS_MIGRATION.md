# Mock Data to Payload CMS Migration Strategy

This document outlines the migration path to transfer local mock data files into the Payload CMS database, ensuring zero regressions on the frontend UI.

## 1. Migration Steps

```
[ Local Mock JSON files ]
          │
          ▼ (Parse files & read records)
[ Node Migration Script ]
          │
          ▼ (Execute Local API transactions)
[ Payload CMS Database (PostgreSQL / Mongo) ]
```

### Step 1: Initialize Database & Collections
- Deploy the Payload CMS server pointing to the target database.
- Configure all collections (`categories`, `series`, `product-lines`, `variants`, `brands`) with their validated schemas.

### Step 2: Write the Import Seed Script
- Create a script `scripts/migrate-mock-data.ts` that:
  1. Imports the Payload Local API (`payload.init`).
  2. Reads static mock objects from `src/lib/data/` (e.g. `categories.ts`, `series.ts`, `productLines.ts`, `products.ts`).
  3. Inserts each item into its respective collection using `payload.create()`.
  4. Resolves parent/child relationship IDs mapping parent reference fields.

### Step 3: Map Media Assets
- During migration, upload image files from `/public/images/` to the S3 cloud storage bucket.
- Save the resolved media IDs as relationships on their parent `variant` or `category` records.

---

## 2. Verification Protocol

To verify successful migration:
1. **Zod Schema Validation:** Run the migrated datasets through the Zod schemas in `src/lib/validation/`.
2. **Page Count Integrity:** Verify that Next.js compiles the exact same number of static pages (95 pages) after switching the provider.
3. **Link Verification:** Audit sitemaps and canonical URLs to confirm that generated slugs match the old routing layout.
