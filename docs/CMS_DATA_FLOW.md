# CMS Data Flow Lifecycle

This document describes how data flows from the Payload CMS database to the client browser layout inside the Origin Seafoods Next.js web application.

## 1. Request Data Pipeline

```
[ Browser / Next.js Server ]
            │
            ▼
[ Page Router / Layout ]  (e.g., /products/[category]/[series]/[productLine]/[variant]/page.tsx)
            │
            ▼
[ Data Access Layer (DAL) ]  (src/lib/data/index.ts)
            │
            ▼
[ Provider Factory ]  (src/lib/providers/factory.ts)
            │
            ├─►  MockProvider  ──► Read from Local Mock JSON Literals
            │
            └─►  CMSProvider   ──► [ CMS Client ] ──► API Request (REST / GraphQL)
                                         │
                                         ▼
                                   [ CMS Mappers ] ──► Map payloads to Domain Models
                                         │
                                         ▼
                                   [ Zod Validation ] ──► Validate fields against Schema
```

---

## 2. Responsibilities by Layer

### A. Routing / Page Components
- Extracts routing params from URL variables.
- Executes dynamic head configuration (`generateMetadata`).
- Fetches data from the DAL.
- Passes typed domain models directly to pure presentational UI components.

### B. Data Access Layer (DAL)
- Serves as the single API entry point for the UI.
- Delegates fetch operations to the active provider selected by the Factory.
- Validates data payloads returned by the provider using Zod validation schemas.
- Filters and queries lists (e.g. pagination, offset, and categories).

### C. Providers (Mock vs CMS)
- **MockProvider:** Reads JSON data directly from `src/lib/data/` data folders.
- **CMSProvider:** Queries Payload CMS via HTTP using the `CMSClient`.

### D. CMS Client (`CMSClient`)
- Executes fetch calls to Payload API endpoints.
- Manages HTTP cache headers, authorization tokens, and connection timeouts.

### E. Mappers (`src/lib/cms/mappers/`)
- Sanitizes incoming untyped REST/GraphQL JSON payloads.
- Translates field structures (e.g. mapping `payload.thaiTitle` to domain field `thai`).
- Calls the media resolver to prefix relative media asset links with CDN hosts.
