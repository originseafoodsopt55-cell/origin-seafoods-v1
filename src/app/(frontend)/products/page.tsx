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

            return (
              <section
                key={category.slug}
                id={category.slug}
                className="hub-category-section"
              >
                <CatalogHeader
                  title={`${category.thai} / ${category.english}`}
                />

                {totalLines === 0 ? (
                  <p className="no-products-message">
                    ขณะนี้ยังไม่มีสินค้าในหมวดหมู่นี้ / No products in this category.
                  </p>
                ) : (
                  <ProductLineGrid linesWithVariants={linesWithVariants} />
                )}
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
