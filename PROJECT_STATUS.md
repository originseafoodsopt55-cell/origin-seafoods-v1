# Origin Seafoods - Project Status Report
**Date:** 30 กันยายน 2026 (September 30, 2026, 16:10 +07:00)

---

## 1. Project Overview
* **Brand:** Origin Seafoods (INTERNATIONAL SEAFOODS IMPORTER-EXPORTER)
* **Company:** Origin Seafoods Co., Ltd. (บริษัท ออริจิน ซีฟู้ดส์ จำกัด)
* **Type:** Corporate B2B Landing Page & Interactive Product Catalog
* **Tech Stack:**
  * **Framework:** Next.js 15.5.19 (App Router Architecture with `src/app/(frontend)` route group)
  * **Core Libraries:** React 19.0.0, TypeScript 5.8.3
  * **Styling:** Tailwind CSS 4.1.10 (PostCSS plugin), Framer Motion 12.19.1, Lucide React 0.468.0
  * **Fonts:** Satoshi & Anuphan (Google Fonts / Fontshare)
* **CMS & Backend Infrastructure:**
  * **CMS:** Payload CMS 3.86.0 (Embedded seamlessly within Next.js under `/admin` and `/api/[[...slug]]`)
  * **Database:** PostgreSQL via `@payloadcms/db-postgres` (Neon Serverless PostgreSQL connection pooling)
  * **Collections Configured:** Users, Media, Categories, Series, ProductLines, Variants, Features, Countries, Brands, Gallery, News, SourcingRegions, Navigation, ContactLinks, SocialReels
* **Deployment & Environments:**
  * **Local Environment:** `http://127.0.0.1:3000/` (Next.js Dev Server)
  * **Production URL:** [https://origin-seafoods-v1.vercel.app](https://origin-seafoods-v1.vercel.app) (Vercel Automated CI/CD)
  * **Repository:** `https://github.com/originseafoodsopt55-cell/origin-seafoods-v1.git` (Branch: `main`)

---

## 2. Current State (Landing Page)
สรุป Component และเซกชันที่พัฒนาและได้รับการอนุมัติเรียบร้อยแล้ว (Approved by User):

### 1. Hero Section (`src/components/sections/Hero.tsx`)
* **Layout:** Centered Layout แบบดั้งเดิม จัดวางองค์ประกอบทั้งหมดอยู่ตรงกลางของหน้าจออย่างสมดุลบนทุกขนาดหน้าจอ (`max-w-5xl mx-auto`)
* **Background Image:**
  * ใช้ภาพพื้นหลัง `hero-bg-1.png` กางเต็มจอ (`bg-cover bg-bottom bg-no-repeat`)
  * กำหนดตำแหน่งชิดขอบล่าง (`bg-bottom`) เพื่อป้องกันการโดนตัดทอนของวัตถุดิบอาหารทะเลบริเวณส่วนล่างของภาพ
* **Contrast & Glow Effect:**
  * นำ Overlay สีดำออก เพื่อให้ภาพพื้นหลังแสดงสีสันสดใสเต็มที่ 100% ตามภาพต้นฉบับ
  * เสริมวงแสงสีขาวฟุ้งขนาดใหญ่ด้านหลังข้อความ (White Glow Effect: `w-[95%] md:w-[900px] h-[160%] bg-white/85 blur-[60px] md:blur-[100px] rounded-[100%]`) ช่วยขับให้ข้อความและโลโก้ลอยเด่น คมชัด อ่านง่าย
* **Brand Logo:**
  * ใช้ Component `<Image />` ของ Next.js ดึงรูปภาพโลโก้ทางการจาก `/images/company/origin-logo.png` (ไฟล์เดียวกับที่ใช้บน Navbar) แสดงรายละเอียดกราฟิกและจุดไข่ปลาครบถ้วน
* **Typography:**
  * **ชื่อบริษัท (H1):** `ORIGIN SEAFOODS CO., LTD.` สีกรมท่า `#072a58` คมเข้ม
  * **ซับไตเติ้ลภาษาไทย (P):** `บริษัทนำเข้าและส่งออกอาหารทะเลแช่แข็งทั่วโลก` สีกรมท่า `#072a58`
  * **ซับไตเติ้ลภาษาอังกฤษ (H3):**
    * บรรทัดบน: `INTERNATIONAL SEAFOODS` (สีกรมท่า `#072a58`)
    * บรรทัดล่าง: `IMPORTER-EXPORTER` (สีส้ม `#f57e2a`)
    * บังคับตัดขึ้นบรรทัดใหม่เสมอ (`<br />`) ในทุกขนาดหน้าจอ
* **Call to Action (CTA) Buttons:**
  * ปุ่ม **"ดูสินค้า &rarr;"**: พื้นหลังสีส้มแบรนด์ `bg-[#f57e2a]` (Hover: `bg-[#e06917]`) ตัวหนังสือและลูกศรสีขาว บังคับด้วย `!text-white` และ Inline Style เชื่อมโยงไปยังหน้าแคตตาล็อก `/products`
  * ปุ่ม **"ติดต่อเรา &rarr;"**: พื้นหลังสีน้ำเงินเข้ม `bg-[#0e659e]` (Hover: `bg-[#072a58]`) ตัวหนังสือและลูกศรสีขาว บังคับด้วย `!text-white` และ Inline Style เชื่อมโยงแบบ Smooth Scroll ไปยังเซกชัน `#contact` บนหน้าแรก

---

### 2. About Us Section (`src/components/sections/AboutPreview.tsx`)
* **Layout:** Full-Width Breakout Section ใช้เทคนิค `w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]` ปลดล็อกขอบจอให้ขยายเต็ม 100%
* **Parallax Background:**
  * ใช้ภาพ `about-us-1.png` กางเต็มจอพร้อมเอฟเฟกต์ Parallax (`bg-fixed bg-cover bg-center`) ภาพตรึงอยู่กับที่เมื่อเลื่อนหน้าจอ สร้างมิติความลึกที่หรูหรา
* **Gradient Fade Transition:**
  * แผ่นฟิล์มไล่ระดับสีขาวจากซ้ายไปขวา (`from-white via-white/95 to-transparent md:w-[75%]`) เพื่อให้พื้นที่อ่านข้อความกลืนไปกับภาพพื้นหลังอย่างเป็นธรรมชาติ โดยไม่ต้องมีกรอบกล่องข้อความทึบแสง
* **Content & Highlights:**
  * หัวข้อ: `ABOUT US` &rarr; `เกี่ยวกับเรา` &rarr; `Origin Seafoods Co., Ltd.`
  * ไอคอนคุณสมบัติเด่น 4 ด้าน บนวงกลมสีขาวมินิมอล (`bg-white shadow-md border border-slate-100`) พร้อม Hover Effect เปลี่ยนเป็นสีน้ำเงิน `#0e76bc`:
    1. บริการลูกค้าแบบมืออาชีพ
    2. คัดสรรคุณภาพเกรดพรีเมียม
    3. ควบคุมอุณหภูมิได้มาตรฐาน
    4. จัดหาสินค้าจากทั่วโลก
* **Clean Action:** ลบปุ่ม "ดูเพิ่มเติม" ออกเพื่อความเรียบหรูและกระชับ คงไว้ซึ่ง `id="about"` เพื่อรองรับการ Scroll มาจากเมนูนำทาง

---

### 3. Social Reels Section (`src/components/sections/SocialReels.tsx`)
* **Facebook Community Banner:**
  * พื้นหลังภาพอาหารจริง `/images/reels/origins-kitchen-cover.jpg`
  * เลเยอร์ไล่สีเทาพรีเมียม (`from-gray-900/95 via-gray-800/60 to-transparent`) ตัวหนังสือสีขาวคมชัด
  * ติดตั้งวิดเจ็ต Facebook Page Plugin (`Origin Seafoods`) แบบฝัง iframe แสดงภาพปก ปุ่ม Like/Follow และรูปโปรไฟล์ผู้ติดตามครบถ้วน
* **Origin Kitchen Reels Showcase:**
  * หัวข้อ: `ORIGIN KITCHEN` / `รีวิวเมนูเด็ดจากครัวออริจิน`
  * วิดีโอ Facade อัตราส่วน 9:16 สำหรับเมนูจริง 4 รายการ (หอยหลอดย่างเนยชีส, หมึกดำย่างหมาล่า, หมึกอาร์เจนชุบแป้งทอด, หมึกดำผัดพริกแกงใต้)
  * ปุ่มเล่นวิดีโอ Glassmorphic Play Button สีส้ม และระบบ Lightbox Modal สำหรับเปิดดูคลิป
  * ปุ่มลิงก์หัวข้อชี้ไปที่ `https://www.facebook.com/Originseafoods/reels/`

---

### 4. Navigation & Site Shell
* **Navbar (`src/components/layout/Navbar.tsx`):**
  * Fixed/Sticky Header แสดงผลสมบูรณ์พร้อมจับการเลื่อนจอ (`scrolled`)
  * ปรับแต่งการเชื่อมโยงเมนู:
    * `หน้าแรก` &rarr; `#home` / `/`
    * `เกี่ยวกับเรา` &rarr; `#about`
    * `สินค้า` &rarr; ลิงก์ตรงไปที่ `/products`
    * `แบรนด์ที่นำเข้า` &rarr; `#brands`
    * `ข่าวสาร` &rarr; `#news` (หรือ `/news`)
    * `ติดต่อเรา` &rarr; `#contact`
  * รองรับ Language Switcher (TH / EN) และเมนูมือถือ Responsive Drawer พร้อม Accessibility Keyboard Trap
* **Clean Routing Structure:**
  * ลบหน้า `/contact` ที่เป็น Standalone Page ออก เพื่อป้องกันความสับสนและให้การคลิกติดต่อสื่อสารนำทางตรงไปยังฟอร์มและข้อมูลในเซกชัน Contact (`#contact`) บน Landing Page อย่างเป็นเอกภาพ

---

### 5. Other Integrated Sections on Landing Page
* **ProductCategories:** เมนูและภาพ Line Art หมวดหมู่สัตว์น้ำ 6 ประเภท (ปู, หมึก, หอย, แมงกะพรุน, ปลา, ดักแด้หนอนไหม) ธีมสีฟ้าไอซ์บลู
* **Brands (`src/components/sections/Brands.tsx`):** รางและรายการแบรนด์นำเข้าคุณภาพ
* **GlobalSupply (`src/components/sections/GlobalSupply.tsx`):** แผนที่แหล่งกำเนิดและระบบซัพพลายเชนทั่วโลก
* **BrandValues (`src/components/sections/BrandValues/`):** ค่านิยมหลัก 4 ด้าน (Good Learning, Good Goal, Good Team, Good Job)
* **NewsSection (`src/components/sections/NewsSection.tsx`):** รายการข่าวสารและประชาสัมพันธ์องค์กร
* **Contact (`src/components/sections/Contact.tsx`):** ข้อมูลบริษัท, ลิงก์ Google Maps สมุทรสาคร, คิวอาร์โค้ด LINE Official Account, และฟอร์มติดต่อสอบถาม
* **Footer (`src/components/layout/Footer.tsx`):** ส่วนท้ายเว็บพร้อมข้อมูลลิขสิทธิ์และลิงก์ติดต่อด่วน

---

## 3. Next Steps (Roadmap)
ส่วนที่เตรียมพร้อมสำหรับการพัฒนาหรือปรับแต่งในระยะถัดไป (Pending / Future Iterations):

1. **Product Catalog Refinement (`/products`):**
   * ปรับแต่งการกรองสินค้า (Filter By Category / Series / Glazing / Packing Size)
   * ขยายหน้ารายละเอียดของแต่ละสายผลิตภัณฑ์ (`/products/[category]/[productLine]`) และตัวเลือกรหัสสินค้า (Variants Matrix)
2. **Brand & Partner Profiles:**
   * เสริมหน้าประวัติและเรื่องราวเฉพาะของแต่ละแบรนด์สินค้านำเข้า
3. **Newsroom Expansion (`/news`):**
   * พัฒนาระบบค้นหาและแบ่งหน้าสำหรับบทความข่าวสารองค์กร
4. **Form Integration & Notifications:**
   * เชื่อมต่อฟอร์มติดต่อในหน้า Contact กับ Email Provider (เช่น Resend หรือ Nodemailer) หรือ Webhook ส่งแจ้งเตือนเข้า LINE Notify / Telegram
5. **SEO & Performance Optimization:**
   * ตรวจสอบคะแนน Core Web Vitals (LCP, CLS, FID) และปรับแต่ง Cache Headers สำหรับไฟล์รูปภาพขนาดใหญ่
