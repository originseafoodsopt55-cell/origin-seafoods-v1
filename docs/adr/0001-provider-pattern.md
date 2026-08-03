# ADR 0001: Provider Pattern

## Context and Problem

The Origin Seafoods application initially hardcoded mock data access throughout components and pages. As the codebase expands to integrate multiple external data systems (including B2B catalog queries, staging mock sets, and headless CMS integrations like Payload, Strapi, or Contentful), directly coupling components or the data layer to specific data source APIs would introduce severe maintenance costs and tight coupling.

We need a strategy to isolate data-source implementations, making them swappable without changing the presentation layers.

## Decision

We chose to implement the **Provider Pattern**.

We defined a uniform interface contract `IContentProvider` specifying all query actions. The DAL (Data Access Layer) depends strictly on the `IContentProvider` interface. A Provider Factory (`getContentProvider`) dynamically instantiates and injects the active provider instance (e.g. `MockContentProvider` or `CMSContentProvider`) at runtime based on environment configuration.

```
UI/Consumer -> DAL (Data Access Layer) -> Provider Factory -> Active Content Provider
```

## Consequences

*   **Decoupling:** UI components and dynamic pages are completely decoupled from how or where data is fetched.
*   **Swappability:** Changing from mock data to a live API in production requires zero modifications to files outside the provider factory config.
*   **Simulated Backend:** We can safely simulate and test missing mock parameters or slow loading states by editing our mock provider while keeping live APIs untouched.
