# ADR 0003: Query API

## Context and Problem

Our data access layer previously returned full flat arrays (e.g. `getProducts()`). While simple, this approach has scalability concerns when live content databases scale to hundreds or thousands of products/SKUs. Returning all items in a single query increases database overhead, network transfer sizes, and client rendering load. We need a query model that supports filtering and pagination.

## Decision

We introduced a dedicated pagination query API `queryProducts()` separate from `getProducts()`. It accepts query parameters (`page`, `limit`, `categorySlug`, `seriesSlug`, `productLineSlug`, `status`) and returns an offset-paginated metadata structure:

```typescript
export interface PaginatedProducts {
  items: ProductVariant[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}
```

We keep the legacy `getProducts()` signature unchanged to maintain complete backward compatibility, but mark it as a legacy compatibility API. All new data queries are routed through `queryProducts`.

## Consequences

*   **Scalability:** The database/CMS only returns the requested slice of products, resolving backend performance concerns.
*   **Static Site Generation:** This query interface works cleanly with Next.js `generateStaticParams()` to fetch product lists for build-time generation.
*   **UX Readiness:** The pagination metadata parameters (`page`, `hasNextPage`) lay the groundwork for adding page navigation UI in future sprints.
