# Payload CMS Collections & Globals Schema

This document details the configuration properties for all collections and globals within Payload CMS.

## 1. Core Collections

### A. Categories
*   **Slug:** `categories`
*   **Localization:** Field-Level Enabled
*   **Fields:**
    *   `name` (Text, required, localized)
    *   `slug` (Text, unique, required, index: true)
    *   `description` (Textarea, localized)
    *   `coverImage` (Relationship to `media`, required)
    *   `status` (Select: `draft`, `published`, `archived`, default: `draft`)
    *   `seo` (Group: meta fields)

### B. Series
*   **Slug:** `series`
*   **Localization:** Field-Level Enabled
*   **Fields:**
    *   `name` (Text, required, localized)
    *   `slug` (Text, unique, required, index: true)
    *   `category` (Relationship to `categories`, required, index: true)
    *   `description` (Rich Text, localized)
    *   `status` (Select: `draft`, `published`, `archived`, default: `draft`)
    *   `seo` (Group: meta fields)

### C. Product Lines
*   **Slug:** `product-lines`
*   **Localization:** Field-Level Enabled
*   **Fields:**
    *   `name` (Text, required, localized)
    *   `slug` (Text, unique, required, index: true)
    *   `series` (Relationship to `series`, required, index: true)
    *   `description` (Rich Text, localized)
    *   `status` (Select: `draft`, `published`, `archived`, default: `draft`)
    *   `seo` (Group: meta fields)

### D. Variants
*   **Slug:** `variants`
*   **Localization:** Field-Level Enabled
*   **Fields:**
    *   `sku` (Text, unique, required, index: true)
    *   `name` (Text, required, localized)
    *   `slug` (Text, unique, required, index: true)
    *   `productLine` (Relationship to `product-lines`, required, index: true)
    *   `brand` (Relationship to `brands`, required, index: true)
    *   `size` (Text, localized)
    *   `package` (Text, localized)
    *   `packing` (Text, localized)
    *   `storage` (Text, localized)
    *   `scientificName` (Text)
    *   `description` (Rich Text, localized)
    *   `country` (Text, localized)
    *   `variant` (Text, localized)
    *   `features` (Array of Strings, localized)
    *   `gallery` (Relationship to `media`, hasMany: true)
    *   `documents` (Relationship to `documents`, hasMany: true)
    *   `status` (Select: `draft`, `published`, `archived`, default: `draft`)
    *   `seo` (Group: meta fields)

### E. Brands
*   **Slug:** `brands`
*   **Fields:**
    *   `name` (Text, required)
    *   `slug` (Text, unique, required, index: true)
    *   `logo` (Relationship to `media`, required)
    *   `description` (Text, localized)

### F. Media (Upload Collection)
*   **Slug:** `media`
*   **Upload Settings:**
    *   Static Dir: `media`
    *   Mime Types: `image/*`
    *   Image Sizes: `thumbnail` (200x200), `tablet` (768xAuto), `desktop` (1200xAuto)
    *   Format: WebP auto-conversion enabled

### G. Documents (Upload Collection)
*   **Slug:** `documents`
*   **Upload Settings:**
    *   Mime Types: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

---

## 2. Globals (Single Instance Models)

### A. Homepage
*   **Slug:** `homepage`
*   **Fields:**
    *   `heroTitle` (Text, localized)
    *   `heroSubtitle` (Text, localized)
    *   `heroBackground` (Relationship to `media`, required)
    *   `aboutTitle` (Text, localized)
    *   `aboutContent` (Rich Text, localized)
    *   `gallery` (Relationship to `media`, hasMany: true)
    *   `seo` (Group: meta fields)

### B. Company Profile
*   **Slug:** `company-profile`
*   **Fields:**
    *   `name` (Text, localized)
    *   `registrationNumber` (Text)
    *   `about` (Rich Text, localized)
    *   `certifications` (Array of logos/titles)

### C. Contact Settings
*   **Slug:** `contact`
*   **Fields:**
    *   `email` (Text, required)
    *   `phone` (Text, required)
    *   `address` (Text, localized)
    *   `socialLinks` (Array of objects)
