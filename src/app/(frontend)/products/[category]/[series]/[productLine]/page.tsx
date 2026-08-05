import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  getCategoryBySlug, 
  getProductSeriesBySlug, 
  getProductLineBySlug, 
  getProductVariantsByProductLine 
} from "@/lib/data";
import ProductClientView from "./ProductClientView";
import { RelatedProducts } from "@/components/catalog/RelatedProducts";

export const revalidate = 300;

interface ProductLinePageProps {
  params: Promise<{
    category: string;
    series: string;
    productLine: string;
  }>;
}

export async function generateMetadata({ params }: ProductLinePageProps): Promise<Metadata> {
  const { category, series, productLine } = await params;
  const [categoryData, seriesData, productLineData, variantsList] = await Promise.all([
    getCategoryBySlug(category),
    getProductSeriesBySlug(category, series),
    getProductLineBySlug(category, series, productLine),
    getProductVariantsByProductLine(category, series, productLine)
  ]);

  if (!categoryData || !seriesData || !productLineData || !variantsList || variantsList.length === 0) {
    return {
      title: "ไม่พบสินค้า | Product Not Found",
    };
  }

  const firstVariant = variantsList[0];
  const thaiTitle = firstVariant?.thai || productLineData.thai || "";
  const englishTitle = firstVariant?.english || productLineData.english || "";
  const description = firstVariant?.description || productLineData.description || `จำหน่าย ${thaiTitle} นำเข้าคุณภาพเกรดพรีเมียมสำหรับตลาด B2B ค้าส่งและอุตสาหกรรมอาหาร`;

  return {
    title: `${thaiTitle} (${englishTitle}) | Origin Seafoods B2B`,
    description,
    alternates: {
      canonical: `/products/${category}/${series}/${productLine}`
    },
    openGraph: {
      title: `${thaiTitle} (${englishTitle}) | Origin Seafoods`,
      description,
      images: firstVariant?.image?.src ? [{ url: firstVariant.image.src, alt: firstVariant.image.alt }] : []
    },
    twitter: {
      card: "summary_large_image",
      title: `${thaiTitle} (${englishTitle}) | Origin Seafoods`,
      description
    }
  };
}

export default async function ProductLinePage({ params }: ProductLinePageProps) {
  const { category, series, productLine } = await params;
  
  const [categoryData, seriesData, productLineData, variantsList] = await Promise.all([
    getCategoryBySlug(category),
    getProductSeriesBySlug(category, series),
    getProductLineBySlug(category, series, productLine),
    getProductVariantsByProductLine(category, series, productLine)
  ]);

  if (!categoryData || !seriesData || !productLineData || !variantsList || variantsList.length === 0) {
    notFound();
  }

  const bgImageUrl = categoryData.backgroundImage?.src || "";

  // Render Server Component Node for RelatedProducts
  const relatedProductsNode = (
    <RelatedProducts 
      categorySlug={categoryData.slug}
      seriesSlug={seriesData.slug}
      productLineSlug={productLineData.slug}
      excludeProductId={variantsList[0]?.id} 
    />
  );

  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden"
      style={bgImageUrl ? { backgroundImage: `url('${bgImageUrl}')` } : { backgroundColor: "#0f172a" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      <ProductClientView 
        categoryData={categoryData} 
        seriesData={seriesData} 
        productLineData={productLineData} 
        variantsList={variantsList}
        relatedProductsNode={relatedProductsNode}
      />
    </main>
  );
}
