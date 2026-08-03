# ADR 0004: Validation Layer

## Context and Problem

Data fetched from external APIs or headless CMS databases is implicitly untrusted. A CMS administrator could enter invalid configurations, duplicate slugs, or omit required fields (e.g. leaving out Thai titles, cover images, or variant size names). Consuming this malformed data directly inside Next.js pages or components could trigger runtime exceptions, breaking the layout or leading to blank screens.

We need a way to validate incoming payloads and guarantee domain type-safety.

## Decision

We chose to implement a validation pipeline using **Zod**.

The validation layer sits inside the DAL (`src/lib/data/index.ts`). Every data query that returns categories, series, product lines, or variants maps the provider's returned payload through a domain-scoped Zod validation schema (e.g. `CategorySchema.safeParse(data)`):

```
Provider -> Zod validation parsing -> DAL -> UI Components
```

If validation fails, we log structured warnings/errors on the server while returning fallback/partially-validated objects, protecting the production site from crashes.

## Consequences

*   **Robustness:** UI components can confidently assume required attributes exist and have correct types, avoiding React/Next rendering crashes.
*   **Fail-Safe:** Malformed API responses are caught and handled gracefully before reaching presentation layers.
*   **Decoupled Schemas:** The validation rules are isolated under `src/lib/validation/` and are organized by domain, avoiding monolithic validation code.
