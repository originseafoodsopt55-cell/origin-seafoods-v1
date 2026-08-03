# ADR 0005: CMS Foundation

## Context and Problem

Origin Seafoods is moving toward a Headless CMS architecture. During the transition, we must:
1.  Isolate CMS-specific configurations, SDKs, and network fetch instances from the rest of the application.
2.  Ensure that switching content backends (e.g. from Mock to Strapi, Payload, or Contentful) requires zero changes to UI components and minimum changes to the data access layer.
3.  Support resolving assets (images/logos) that are hosted on external CMS CDNs/hosts.

## Decision

We designed and implemented a CMS foundation layer in Sprint 9.1:

1.  **CMS Client (`src/lib/cms/client.ts`):** Isolates HTTP/SDK requests, preventing external libraries from leaking into the core application.
2.  **CMS Config (`src/lib/cms/config.ts`):** Stores CMS endpoints, media host URLs, and active provider switches inside type-safe environment variables.
3.  **CMS Mapper Layer (`src/lib/cms/mappers/`):** Translates raw CMS response payloads into Domain Models. CMS-specific field names (e.g. `attributes`, `data`, or arbitrary CMS naming variations) are fully encapsulated within these mapper modules.
4.  **Media Abstraction (`src/lib/cms/media.ts`):** Standardizes media resolving. Appends `mediaHost` configurations to relative asset paths dynamically, allowing CDNs to host seafood images.

```
CMS response payload -> Mapper -> Domain Model -> validation -> UI
```

## Consequences

*   **Platform Agnostic:** We can switch from Payload to Strapi or Contentful in future sprints by updating only the Client and Mappers, without editing UI components or layout files.
*   **Media Swappability:** Images can be served locally from public folders or externally from standard CDNs simply by changing configuration variables.
*   **Encapsulation:** CMS SDK imports are fully isolated, avoiding build conflicts or unused client-side bundles.
