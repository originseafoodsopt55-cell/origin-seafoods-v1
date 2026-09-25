import type { Metadata } from "next";
import { getCategories, getSeries, getProductLines, getProducts } from "@/lib/data";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { ProductLineGrid } from "@/components/catalog/ProductLineGrid";
import { CatalogSidebar } from "@/components/catalog/CatalogSidebar";
import { CategoryNavBar } from "@/components/catalog/CategoryNavBar";
import { ProductsBackground } from "@/components/layout/ProductsBackground";
import { sortCategories, sortSeries } from "@/lib/categoryOrder";

export const metadata: Metadata = {
  title: "แคตตาล็อกสินค้าอาหารทะเลแช่แข็งทั้งหมด | Product Catalog",
  description: "ออริจิน ซีฟู้ดส์ ผู้นำเข้าและจัดจำหน่ายอาหารทะเลแช่แข็งคุณภาพสูง หมวดหมู่ ปู หมึก หอย แมงกะพรุน ปลา และดักแด้หนอนไหมเกรดเอ",
  alternates: {
    canonical: "/products"
  },
  openGraph: {
    title: "Product Catalog | Origin Seafoods",
    description: "Imported frozen seafood catalog for B2B buyers.",
    url: "/products",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Catalog | Origin Seafoods",
    description: "Imported frozen seafood catalog for B2B buyers."
  }
};

export const dynamic = 'force-dynamic';

// กำหนด Class ตำแหน่งและระยะเวลาอนิเมชันของ Line Art แต่ละหมวดหมู่ให้มองเห็นชัดเจนที่สุด
const CATEGORY_LINE_ART_CONFIG: Record<
  string,
  { src: string; positionClass: string; duration: string }
> = {
  crabs: {
    src: "/images/line-art/crab.svg",
    positionClass: "top-2 right-0 sm:right-4 w-[280px] sm:w-[380px]",
    duration: "5s",
  },
  crab: {
    src: "/images/line-art/crab.svg",
    positionClass: "top-2 right-0 sm:right-4 w-[280px] sm:w-[380px]",
    duration: "5s",
  },
  squid: {
    src: "/images/line-art/squid.svg",
    // 1. หมึกย้ายมาฝั่งซ้ายใต้เมนูส้ม ไม่ทับการ์ดสินค้า และลอยขึ้น-ลงอย่างนุ่มนวล
    positionClass: "hidden lg:block top-[160px] -left-[295px] xl:-left-[315px] w-[240px] xl:w-[270px]",
    duration: "6s",
  },
  squids: {
    src: "/images/line-art/squid.svg",
    positionClass: "hidden lg:block top-[160px] -left-[295px] xl:-left-[315px] w-[240px] xl:w-[270px]",
    duration: "6s",
  },
  shellfish: {
    src: "/images/line-art/shell.svg",
    // ย้ายลงมามุมขวาล่างในพื้นที่ว่างของแถวที่ 2 พ้นแนวการ์ด 100%
    positionClass: "bottom-2 sm:bottom-4 right-4 sm:right-8 md:right-16 w-[260px] sm:w-[320px] md:w-[380px]",
    duration: "5.5s",
  },
  shell: {
    src: "/images/line-art/shell.svg",
    positionClass: "bottom-2 sm:bottom-4 right-4 sm:right-8 md:right-16 w-[260px] sm:w-[320px] md:w-[380px]",
    duration: "5.5s",
  },
  fish: {
    src: "/images/line-art/fish.svg",
    positionClass: "top-0 right-0 sm:right-4 w-[300px] sm:w-[420px]",
    duration: "5s",
  },
  fishes: {
    src: "/images/line-art/fish.svg",
    positionClass: "top-0 right-0 sm:right-4 w-[300px] sm:w-[420px]",
    duration: "5s",
  },
  jellyfish: {
    src: "/images/line-art/jellyfish.svg",
    // ปรับเลื่อนลงมาแนวดิ่ง (top-28 / top-[125px]) ให้อยู่กึ่งกลางพอดีกับแถวสินค้า
    positionClass: "hidden lg:block top-28 sm:top-32 lg:top-[125px] -left-[295px] xl:-left-[315px] w-[240px] xl:w-[270px]",
    duration: "6.5s",
  },
  silkworm: {
    src: "/images/line-art/silkworm.svg",
    positionClass: "top-2 right-0 sm:right-4 w-[280px] sm:w-[380px]",
    duration: "5s",
  },
  silkworms: {
    src: "/images/line-art/silkworm.svg",
    positionClass: "top-2 right-0 sm:right-4 w-[280px] sm:w-[380px]",
    duration: "5s",
  },
};

export default async function ProductCatalogPage() {
  // Parallel fetch — no N+1
  const [categories, allSeries, allProductLines, allVariants] = await Promise.all([
    getCategories(),
    getSeries(),
    getProductLines(),
    getProducts(),
  ]);

  // Sort categories by canonical order
  const sortedCategories = sortCategories(categories);

  // Group data: Category -> Sorted list of ProductLines with Variants (Series subheadings removed)
  const sectionsData = sortedCategories.map((cat) => {
    const catSeries = sortSeries(allSeries.filter((s) => s.categorySlug === cat.slug));

    // Flatten lines under category, grouped by series order to keep logical groups intact
    const linesWithVariants: {
      productLine: typeof allProductLines[number];
      variants: typeof allVariants;
    }[] = [];

    catSeries.forEach((s) => {
      const seriesLines = allProductLines.filter(
        (line) => line.seriesSlug === s.slug && line.categorySlug === cat.slug
      );

      // Sort productLines internally by slug
      const sortedSeriesLines = [...seriesLines].sort((a, b) => a.slug.localeCompare(b.slug));

      sortedSeriesLines.forEach((line) => {
        const lineVariants = allVariants.filter(
          (v) => v.productLineSlug === line.slug && v.seriesSlug === s.slug && v.categorySlug === cat.slug
        );
        linesWithVariants.push({
          productLine: line,
          variants: lineVariants,
        });
      });
    });

    return {
      category: cat,
      linesWithVariants,
    };
  });

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products" }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Product Catalog",
    url: "/products",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href ?? "/products"
      }))
    }
  };

  return (
    <div className="products-catalog-page products-hub-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* 4. สไตล์อนิเมชันลอยขึ้น-ลงอย่างนุ่มนวล */}
      <style>{`
        @keyframes oceanicFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(0.5deg);
          }
        }
        .animate-ocean-float {
          animation-name: oceanicFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
      <ProductsBackground />

      {/* Mobile-only: horizontal sticky category pill bar (M2) */}
      <div className="catalog-mobile-nav relative z-10">
        <CategoryNavBar
          categories={sortedCategories}
          mode="hub"
        />
      </div>

      {/* Desktop two-column layout: sidebar left + content right */}
      <div className="catalog-layout-container relative z-10">
        {/* Desktop sidebar (hidden on mobile via CSS) */}
        <aside className="catalog-sidebar-aside">
          <CatalogSidebar
            categories={sortedCategories}
            mode="hub"
          />
        </aside>

        {/* Content: scrollable sections, one per category */}
        <main className="catalog-content-main">
          {sectionsData.map(({ category, linesWithVariants }) => {
            const totalLines = linesWithVariants.length;
            const config = CATEGORY_LINE_ART_CONFIG[category.slug];

            return (
              <section
                key={category.slug}
                id={category.slug}
                className="relative hub-category-section overflow-visible mb-16 pb-10 border-b border-slate-100 last:border-b-0"
              >
                {/* ภาพ Line Art พร้อมอนิเมชันลอย ขึ้น-ลง */}
                {config && (
                  <div
                    className={`absolute ${config.positionClass} pointer-events-none select-none opacity-25 -z-0 animate-ocean-float`}
                    style={{ animationDuration: config.duration }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={config.src}
                      alt={`${category.thai || category.english} line art`}
                      className="w-full h-auto object-contain drop-shadow-sm"
                    />
                  </div>
                )}

                {/* 1. Header หัวข้อหมวดหมู่ */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <CatalogHeader
                    title={`${category.thai} / ${category.english}`}
                  />
                </div>

                {/* 2. Grid การ์ดสินค้า (วาง relative z-10 เพื่อให้อยู่เหนือลายน้ำ) */}
                <div className="relative z-10">
                  {totalLines === 0 ? (
                    <p className="no-products-message">
                      ขณะนี้ยังไม่มีสินค้าในหมวดหมู่นี้ / No products in this category.
                    </p>
                  ) : (
                    <ProductLineGrid linesWithVariants={linesWithVariants} />
                  )}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
