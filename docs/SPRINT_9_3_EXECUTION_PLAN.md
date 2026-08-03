# Sprint 9.3 Revised Execution Plan
**Payload CMS Foundation & Read-Only Provider Implementation**

## 1. Sprint Goal
Implement the Payload CMS integration foundation in Read-Only mode. This includes configuring collections, globals, the CMS client API fetching routines, response mappers, and the `CMSContentProvider` implementation, while keeping the Mock Provider as the default active source.

---

## 2. Scope

### In Scope:
*   **Payload Schema Configurations:** Define all collection files (`categories`, `series`, `product-lines`, `variants`, `brands`, `media`, `documents`) and globals (`homepage`, `company-profile`, `contact-settings`).
*   **CMS Client Binding:** Implement the dynamic API request fetch methods inside `src/lib/cms/client.ts`.
*   **Mapper Realization:** Complete mappers under `src/lib/cms/mappers/` to transform API response objects into validated domain entities.
*   **CMS Provider Implementation:** Update `CMSContentProvider.ts` to fetch live data from the CMS client and execute the mapping functions.
*   **Factory Verification:** Verify that the `getContentProvider()` factory successfully instantiates `CMSContentProvider` when the environment variable is switched to `"cms"`.

### Out of Scope:
*   Modifying the interface `IContentProvider` (signatures remain `Promise<T> | T`).
*   Removing `resolveSync()` or refactoring the synchronous DAL pipelines.
*   Refactoring the Homepage layout component (`src/app/page.tsx`) or its sub-sections.
*   Modifying client-side components (`Navbar`, `About`, `Gallery`, `Contact`) to accept props.

---

## 3. Implementation Order

### Step 1: Payload Collection Schemas
*   Define local collection configuration schemas matching B2B catalog structures.

### Step 2: Implement CMS Client Fetching
*   Implement `CMSClient.get<T>(path)` in `src/lib/cms/client.ts` to fetch from Payload CMS endpoints using the configured endpoint host.

### Step 3: Implement Mappers
*   Map Payload API JSON structures to the typescript interfaces inside `src/lib/cms/mappers/`.

### Step 4: Implement CMSContentProvider
*   Replace throw statements in `src/lib/providers/cms/CMSContentProvider.ts` with functional methods that:
    1. Call the `cmsClient` to fetch raw data.
    2. Map the data using mapping functions.
    3. Return the mapped objects (conforming to `Promise<T> | T`).

---

## 4. Proposed File Changes

| File Path | Action | Rationale |
| :--- | :--- | :--- |
| `src/lib/cms/client.ts` | **MODIFY** | Implement the `get` method to perform HTTP fetch operations against Payload endpoints. |
| `src/lib/providers/cms/CMSContentProvider.ts` | **MODIFY** | Implement all interface methods to call the CMS client and mappers instead of throwing errors. |
| `src/lib/cms/mappers/` files | **MODIFY** | Complete transformer methods to match incoming Payload database properties. |

---

## 5. Risk Assessment

*   **API Network Latency Risk (Low):** CMS data fetches could delay static page generation during builds.
    *   *Mitigation:* Keep the Mock Provider as the default active source. Network queries are only triggered when explicitly enabled via env variables.
*   **Zod Parser Validation Breakage (Medium):** If Payload CMS returns properties that do not match Zod validator checks (e.g. missing optional fields).
    *   *Mitigation:* Schema validation rules must have sensible fallback defaults for null or undefined properties.

---

## 6. Regression Checklist

The following must remain completely unchanged:
- **DAL & page routing structures:** The DAL functions remain synchronous, utilizing `resolveSync()`.
- **Homepage & Client Components:** Direct synchronous imports are retained inside `Navbar`, `About`, `Gallery`, and `Contact`.
- **Default Content Provider:** Mock Provider is initialized by default.

---

## 7. Validation Protocol

### Command Validations:
*   `npm run lint` $\rightarrow$ Must pass cleanly.
*   `npm run typecheck` $\rightarrow$ Must pass cleanly.
*   `npm run build` $\rightarrow$ Must compile all 95 static routes using mock data without error.

---

## 8. Rollback Plan
If Sprint 9.3 implementation fails:
1. Discard changes using Git:
   `git reset --hard HEAD`
2. Clear the build folder cache:
   `rmdir /s /q .next`
3. Restart the development environment.

---

## 9. Success Criteria
*   `CMSContentProvider` compiles cleanly and correctly calls mappers and the client API.
*   Payload CMS collections are fully defined.
*   All tests (`lint`, `typecheck`, `build`) compile with 100% success under the default Mock Provider.
