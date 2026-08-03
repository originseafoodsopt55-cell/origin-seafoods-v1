# Payload CMS Architecture Design

This document details the high-level architecture for integrating Payload CMS into the Origin Seafoods corporate website and premium B2B catalog.

## 1. System Topology

We recommend **Option B: Separate Deployment** to decouple the public-facing Next.js frontend from the Payload CMS administrative panel and database connection.

```
                  +-----------------------------------+
                  |        Corporate Frontend         |
                  |         (Next.js App Router)      |
                  +-----------------------------------+
                                    |
                                    | HTTP / REST API
                                    v
+------------------+     +----------------------------+     +-----------------------+
|  Cloud Storage   | <---|        Payload CMS         |---> |   S3 Asset Bucket     |
| (Database: PG)   |     |    (Separate Node App)     |     | (Cloudflare R2/S3)    |
+------------------+     +----------------------------+     +-----------------------+
```

### Rationale
- **High Uptime:** Uptime of the public catalog remains isolated from CMS administrative actions (e.g., bulk product CSV imports, media processing).
- **Scale:** Better memory and CPU scaling when running high-scale variants queries.
- **Security:** Allows placing Payload CMS admin routes behind restricted subnets or corporate VPNs while keeping the public Next.js frontend globally accessible.

---

## 2. Component Layers

The integration introduces three layers on the frontend to query and consume CMS data:

### A. Configuration Layer (`src/lib/cms/config.ts`)
Validates environment parameters (`NEXT_PUBLIC_CMS_ENDPOINT`, `NEXT_PUBLIC_CMS_MEDIA_HOST`) and enables toggling between the Mock Provider and the CMS Provider.

### B. Client Layer (`src/lib/cms/client.ts`)
Encapsulates HTTP fetching logic, authorization headers, and API endpoint calls.

### C. Mapper Layer (`src/lib/cms/mappers/`)
Translates untyped JSON data Transfer Objects (DTOs) returned by the CMS API into the type-safe Domain models expected by the UI.

---

## 3. SWC & Bundle Splitting Optimization

During production builds, Next.js code-splits common client-side libraries into standalone chunks under `vendor-chunks/` (such as `framer-motion`). 
- **Pre-rendering (SSG):** Dynamic pages use `generateStaticParams` to fetch data from the active provider at build time.
- **Cache Isolation:** Ensure that building the site (`npm run build`) does not conflict with active local dev server runs, which can corrupt the `.next` compilation folder.
