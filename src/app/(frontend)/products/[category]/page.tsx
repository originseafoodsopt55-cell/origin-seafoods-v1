import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductSeriesByCategory, getCategories, getProductLines, getProducts } from "@/lib/data";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { ProductLineGrid } from "@/components/catalog/ProductLineGrid";
import { CategoryNavBar } from "@/components/catalog/CategoryNavBar";
import { CatalogSidebar } from "@/components/catalog/CatalogSidebar";

export const revalidate = 300;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}


export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryData = await getCategoryBySlug(category);

  if (!categoryData) {
    return {
      title: "หมวดหมู่ไม่พบ | Category Not Found",
    };
  }

  return {
    title: `นำเข้า${categoryData.thai}แช่แข็งเกรด B2B พรีเมียม (${categoryData.english}) | Origin Seafoods`,
    description: `คัดสรรซีรีส์ผลิตภัณฑ์ ${categoryData.thai} เกรดนำเข้า คุณภาพได้มาตรฐานสากล สำหรับร้านอาหาร กลุ่มค้าส่ง และผู้ผลิต`,
    alternates: {
      canonical: `/products/${category}`
    },
    openGraph: {
      title: `${categoryData.thai} (${categoryData.english}) | Origin Seafoods`,
      description: categoryData.description,
      url: `/products/${category}`,
      images: [{ url: categoryData.coverImage.src, alt: categoryData.coverImage.alt }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryData.thai} (${categoryData.english}) | Origin Seafoods`,
      description: categoryData.description
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Parallel fetch — category data + series + all categories for nav + lines + variants
  const [categoryData, seriesList, allCategories, allProductLines, allVariants] = await Promise.all([
    getCategoryBySlug(category),
    getProductSeriesByCategory(category),
    getCategories(),
    getProductLines(),
    getProducts()
  ]);

  if (!categoryData) {
    notFound();
  }

  // Group data: Sorted list of ProductLines with Variants (Series subheadings removed)
  const linesWithVariants: {
    productLine: typeof allProductLines[number];
    variants: typeof allVariants;
  }[] = [];

  seriesList.forEach((s) => {
    const seriesLines = allProductLines.filter(
      (line) => line.seriesSlug === s.slug && line.categorySlug === category
    );
    
    // Sort productLines internally by slug
    const sortedSeriesLines = [...seriesLines].sort((a, b) => a.slug.localeCompare(b.slug));

    sortedSeriesLines.forEach((line) => {
      const lineVariants = allVariants.filter(
        (v) => v.productLineSlug === line.slug && v.seriesSlug === s.slug && v.categorySlug === category
      );
      linesWithVariants.push({
        productLine: line,
        variants: lineVariants,
      });
    });
  });

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products", href: "/products" }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${categoryData.thai} (${categoryData.english})`,
    description: categoryData.description,
    url: `/products/${category}`,
    image: {
      "@type": "ImageObject",
      url: categoryData.coverImage.src,
      caption: categoryData.coverImage.alt
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href ?? `/products/${category}`
      }))
    }
  };

  const totalVariantsCount = linesWithVariants.reduce(
    (sum, item) => sum + item.variants.length,
    0
  );

  return (
    <div className="category-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CatalogHero
        breadcrumbItems={breadcrumbItems}
        eyebrow="PRODUCT CATEGORY"
        title={`${categoryData.thai} (${categoryData.english})`}
        description={`${categoryData.description} คัดเกรดพิเศษแยกหมวดหมู่ซีรีส์สินค้าเพื่อตอบสนองการใช้งานที่ตรงตามประเภทธุรกิจของคุณ`}
      />

      {/* Mobile-only: horizontal sticky category pill bar (M2) */}
      <div className="catalog-mobile-nav">
        <CategoryNavBar
          categories={allCategories}
          mode="category"
          initialActiveSlug={category}
        />
      </div>

      {/* Desktop two-column layout: sidebar left + content right */}
      <div className="catalog-layout-container">
        {/* Desktop sidebar — links to /products#{slug} anchors (N1) */}
        <aside className="catalog-sidebar-aside">
          <CatalogSidebar
            categories={allCategories}
            mode="category"
            activeSlug={category}
          />
        </aside>

        {/* Content: series groups with product line cards */}
        <main className="catalog-content-main">
          <section className="catalog-products-section">
            <CatalogHeader title={`สินค้าในหมวดหมู่นี้ / Products (${categoryData.thai})`} />
            {totalVariantsCount === 0 ? (
              <p className="no-products-message">ขณะนี้ไม่มีสินค้าในหมวดหมู่นี้ / No products in this category.</p>
            ) : (
              <ProductLineGrid linesWithVariants={linesWithVariants} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
