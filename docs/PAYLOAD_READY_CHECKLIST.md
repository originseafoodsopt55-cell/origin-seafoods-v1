# Payload Ready Checklist — Sprint 9.4 Phase A

## 1. Payload Installation
*   **สถานะ:** ยังไม่พร้อม (Not Installed)
*   **รายละเอียด:** 
    *   ไม่มีไฟล์ `payload.config.ts` อยู่ในโปรเจกต์
    *   ใน `package.json` ไม่มี dependency `"payload"` ปรากฏอยู่
    *   ไม่มี dependencies/devDependencies อื่นๆ ที่เกี่ยวข้องกับ Payload CMS
    *   **สรุป:** ปัจจุบันยังไม่มีการติดตั้ง Payload CMS และ package dependencies ใดๆ มีเพียงโครงสร้างสถาปัตยกรรม Mapper, Client และ CMS Provider ที่ถูกสร้างขึ้นเตรียมไว้ในฝั่งของ Next.js เท่านั้น

---

## 2. CMS Layer
*   **สถานะ:** พร้อมบางส่วน (Mappers & Client config are ready, but disconnected from API)
*   **โครงสร้างไฟล์ใน `src/lib/cms/`:**
    *   `client.ts` (Dynamic HTTP fetch utility using standard `fetch` API)
    *   `config.ts` (Environment variables loader)
    *   `media.ts` (CDN URL resolving helper)
    *   `mappers/` (Mapper layer converting JSON records into typed domains)
*   **สถานะของ Mapper แต่ละตัว:**
    *   `mapCMSCategory()` (`categoryMapper.ts`) $\rightarrow$ **ทำงานได้จริง** (พร้อม Zod validation: `CategorySchema.parse()`)
    *   `mapCMSSeries()` / `mapCMSProductSeries()` (`seriesMapper.ts`) $\rightarrow$ **ทำงานได้จริง**
    *   `mapCMSProductLine()` (`productLineMapper.ts`) $\rightarrow$ **ทำงานได้จริง**
    *   `mapCMSProductVariant()` (`productVariantMapper.ts`) $\rightarrow$ **ทำงานได้จริง**
    *   `mapCMSProductGroup()` (`productGroupMapper.ts`) $\rightarrow$ **ทำงานได้จริง**
    *   `mapCMSBrand()`, `mapCMSCompany()`, `mapCMSFeature()`, `mapCMSCountry()`, `mapCMSGalleryItem()`, `mapCMSNavigationItem()`, `mapCMSContact()`, `mapCMSContactLink()` (`commonMappers.ts`) $\rightarrow$ **ทำงานได้จริง**
    *   **สรุป:** ทุก Mapper ได้รับการเปลี่ยนจาก throw-only stub เป็นฟังก์ชันการแมปข้อมูลที่ทำงานได้จริง (ไม่มี mapper ใดเป็น throw-only stub แล้ว)

---

## 3. Provider Layer
*   **สถานะ:** พร้อมบางส่วน (CMS Provider stubs are removed and delegated to mock, but locked by Factory Guard)
*   **รายละเอียด Factory Guard:**
    *   ไฟล์ `src/lib/providers/factory.ts` ตรวจสอบค่า `cmsConfig.provider`.
    *   หากกำหนดเป็น `"cms"` จะทำการ `throw new Error()` บล็อกการคอมไพล์หรือสตาร์ตเซิร์ฟเวอร์ทันที เพื่อป้องกันการรันโค้ดที่ยังไม่พร้อมในส่วน async.
*   **สถานะของ CMSContentProvider:**
    *   ไม่มี method ใดใน `CMSContentProvider.ts` ที่ `throw error` อีกต่อไป (ได้รับการแก้ไขใน Sprint 9.3.2)
    *   **การจัดการ Method:**
        *   *Dynamic queries (Async):* เมธอดจำพวก `getCategoryBySlug`, `getProductVariantBySlug`, ฯลฯ ใช้ `cmsClient` ดึงข้อมูลและแปลงผ่าน Mapper
        *   *Synchronous queries (Mock fallbacks):* เมธอดจำพวก `getSeries()`, `getProductLines()`, ฯลฯ ทำการส่งค่าต่อให้ `this.mockProvider` (MockContentProvider) ทำงานแทน เพื่อหลีกเลี่ยงการ crash ที่ฝั่งหน้าบ้าน

---

## 4. Data Access Layer (DAL)
*   **สถานะ:** พร้อมบางส่วน (Synchronous only)
*   **Provider ที่ใช้งานอยู่ตอนนี้:** `MockContentProvider` (เนื่องจาก Factory Guard บล็อกการเลือกใช้ `"cms"`)
*   **ประเภทของฟังก์ชัน:** ทุกฟังก์ชันใน `src/lib/data/index.ts` (DAL) ยังทำงานแบบ **Synchronous** ทั้งสิ้น โดยมีการใช้ `resolveSync()` ตรวจสอบ หากได้รับค่าเป็น Promise จะสั่งแครชระบบทันที

---

## 5. Validation (Zod)
*   **สถานะ:** พร้อม (Validation Schemas exist and are integrated)
*   **รายชื่อไฟล์ใน `src/lib/validation/`:**
    *   `category.ts` (CategorySchema)
    *   `series.ts` (SeriesSchema)
    *   `productLine.ts` (ProductLineSchema)
    *   `productVariant.ts` (ProductVariantSchema)
    *   `shared.ts` (ImageAssetSchema, SEOSchema)
    *   `index.ts`
*   **การใช้งานจริง:**
    *   ทุก Schema ถูกดึงไปใช้งานจริงใน DAL (`src/lib/data/index.ts`) เพื่อตรวจสอบความถูกต้องของข้อมูล Mock ก่อนส่งต่อให้ UI
    *   `CategorySchema` ถูกผูกเข้าใน Mapper (`categoryMapper.ts`) โดยเรียกใช้ `CategorySchema.parse(mapped)` ทันทีที่มีการแปลงค่าจาก Payload payload

---

## 6. Types
*   **สถานะ:** พร้อม (Type definitions are complete)
*   **รายละเอียดฟิลด์ของ Category (`src/types/category.ts`):**
    ```typescript
    export interface Category extends CMSMetadata {
      id: string;
      slug: string;
      thai: string;
      english: string;
      description: string;
      coverImage: ImageAsset;
    }
    ```
*   **ความตรงกัน:** ฟิลด์ที่แมปใน `mapCMSCategory` รองรับครบตรงกับ Type ทุกตัว

---

## 7. Category Mock Data ตัวอย่าง
ข้อมูล 1 รายการเต็มจาก `src/lib/data/categories.ts`:
```json
{
  "id": "cat-crabs",
  "slug": "crabs",
  "thai": "ปู",
  "english": "Crabs",
  "description": "ปูคุณภาพเยี่ยมคัดสรรพิเศษเพื่อความสดใหม่",
  "coverImage": {
    "src": "/images/categories/PNG Crabs.png",
    "alt": "Crabs Category",
    "title": "Crabs"
  }
}
```

---

## 8. Payload Collection สำหรับ Category
*   **สถานะ:** ไม่มี
*   **รายละเอียด:** "ยังไม่มี Payload Collection สำหรับ Category" (เนื่องจากยังไม่มีการติดตั้ง Payload CMS และการคอนฟิกในโปรเจกต์นี้)

---

## สรุปสิ่งที่ต้องทำก่อนเริ่ม Sprint 9.4 Phase B
1.  **ติดตั้ง Payload CMS:** เพิ่ม dependency `"payload"` ใน `package.json` พร้อมลงทะเบียน config database (PostgreSQL/MongoDB)
2.  **สร้าง `payload.config.ts`:** กำหนดคอนฟิกตั้งต้นของระบบ CMS
3.  **สร้าง Payload Category Collection:** สร้าง schema คอนฟิกของ Categories ให้มีฟิลด์ตรงกับตัวอย่างใน Category Mock Data
4.  **ย้ายระบบ DAL เข้าสู่ Async (ในอนาคต):** เตรียมย้ายฟังก์ชันของ DAL ให้ส่งค่าเป็น Promise เพื่อรองรับการทำงานของ CMSProvider ในระบบจริง
