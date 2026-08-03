# ADR 0002: Domain Model

## Context and Problem

Traditional B2C e-commerce websites typically flatten products into a single-level catalog containing search filters and categories. However, Origin Seafoods is a B2B corporate seafood catalog. Seafood purchasing in bulk is heavily structured (e.g. buyers search for specific categories, species, sizes, processing types, and packaging grades rather than buying single products). 

A flat catalog model would make catalog browsing confusing and hard to map to standard seafood industry logistics.

## Decision

We designed a strict 4-level B2B seafood catalog domain hierarchy:

```
Category (e.g. Crabs)
  └─ Series (e.g. Blue Swimming Crab)
       └─ Product Line (e.g. IBNR / White Box packaging)
            └─ Variant (e.g. Size: 60-80 M, Packing: 10kg)
```

Each level is represented by a dedicated domain model with strongly-typed interfaces. The Variant represents the final SKU-like entity containing specific technical measurements, B2B specs, storage conditions, and inquiry hooks.

## Consequences

*   **B2B Alignment:** Navigation paths match exactly how bulk seafood orders are placed (Category $\rightarrow$ Series $\rightarrow$ Brand/Line $\rightarrow$ Size variant).
*   **CMS Compatibility:** The structured nesting aligns perfectly with standard relational databases and schema relationships of headless CMS options (Payload, Strapi, Sanity).
*   **SEO indexing:** The structured nested hierarchy enables search engines to map Breadcrumbs correctly, increasing search rankings for specific niche seafood parameters.
