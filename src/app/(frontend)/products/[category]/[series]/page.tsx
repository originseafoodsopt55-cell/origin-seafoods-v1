import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductSeriesBySlug, getProductLinesBySeries, getProducts } from "@/lib/data";

export const revalidate = 300;
import { Container } from "@/components/ui/Container";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { ProductLineGrid } from "@/components/catalog/ProductLineGrid";

interface SeriesPageProps {
  params: Promise<{
    category: string;
    series: string;
  }>;
}


export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { category, series } = await params;
  const [categoryData, seriesData] = await Promise.all([
    getCategoryBySlug(category),
    getProductSeriesBySlug(category, series)
  ]);

  if (!categoryData || !seriesData) {
    return {
      title: "ซีรีส์ไม่พบ | Series Not Found",
    };
  }

  return {
    title: `${seriesData.thai} (${seriesData.english}) | Origin Seafoods`,
    description: seriesData.description,
    alternates: {
      canonical: `/products/${category}/${series}`
    },
    openGraph: {
      title: `${seriesData.thai} (${seriesData.english}) | Origin Seafoods`,
      description: seriesData.description,
      url: `/products/${category}/${series}`,
      images: [{ url: seriesData.image.src, alt: seriesData.image.alt }]
    },
    twitter: {
      card: "summary_large_image",
      title: `${seriesData.thai} (${seriesData.english}) | Origin Seafoods`,
      description: seriesData.description
    }
  };
}

export default async function ProductSeriesPage({ params }: SeriesPageProps) {
  const { category, series } = await params;

  const [categoryData, seriesData, productLinesList, allVariants] = await Promise.all([
    getCategoryBySlug(category),
    getProductSeriesBySlug(category, series),
    getProductLinesBySeries(category, series),
    getProducts()
  ]);

  if (!categoryData || !seriesData) {
    notFound();
  }

  const linesWithVariants = productLinesList.map((line) => {
    const lineVariants = allVariants.filter(
      (v) => v.productLineSlug === line.slug && v.seriesSlug === series && v.categorySlug === category
    );
    return {
      productLine: line,
      variants: lineVariants,
    };
  });

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products", href: "/products" }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${seriesData.thai} (${seriesData.english})`,
    description: seriesData.description,
    url: `/products/${category}/${series}`,
    image: {
      "@type": "ImageObject",
      url: seriesData.image.src,
      caption: seriesData.image.alt
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href ?? `/products/${category}/${series}`
      }))
    }
  };

  return (
    <div className="product-series-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CatalogHero
        breadcrumbItems={breadcrumbItems}
        eyebrow="PRODUCT SERIES"
        title={`${seriesData.thai} (${seriesData.english})`}
        description={seriesData.description}
      />

      {/* Product Lines List */}
      <section className="catalog-products-section">
        <Container compact>
          <CatalogHeader title={`สายผลิตภัณฑ์ / Product Lines (${productLinesList.length})`} />
          {productLinesList.length === 0 ? (
            <p className="no-products-message">ขณะนี้ไม่มีสายผลิตภัณฑ์ในซีรีส์นี้ / No product lines in this series.</p>
          ) : (
            <ProductLineGrid linesWithVariants={linesWithVariants} />
          )}
        </Container>
      </section>
    </div>
  );
}
