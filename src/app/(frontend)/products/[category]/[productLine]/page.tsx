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
    productLine: string;
  }>;
}

export async function generateMetadata({ params }: ProductLinePageProps): Promise<Metadata> {
  const { category, productLine } = await params;
  const categoryData = await getCategoryBySlug(category);
  const productLineData = await getProductLineBySlug(category, productLine);

  if (!categoryData || !productLineData) {
    return {
      title: "ไม่พบสินค้า | Product Not Found",
    };
  }

  const variantsList = await getProductVariantsByProductLine(category, productLine);

  const safeVariants = variantsList || [];
  const firstVariant = safeVariants[0];
  const thaiTitle = firstVariant?.thai || productLineData.thai || "";
  const englishTitle = firstVariant?.english || productLineData.english || "";
  const description = firstVariant?.description || productLineData.description || `จำหน่าย ${thaiTitle} นำเข้าคุณภาพเกรดพรีเมียมสำหรับตลาด B2B ค้าส่งและอุตสาหกรรมอาหาร`;

  return {
    title: `${thaiTitle} (${englishTitle}) | Origin Seafoods B2B`,
    description,
    alternates: {
      canonical: `/products/${category}/${productLine}`
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
  const { category, productLine } = await params;
  
  const categoryData = await getCategoryBySlug(category);
  const productLineData = await getProductLineBySlug(category, productLine);

  if (!categoryData || !productLineData) {
    notFound();
  }

  const fetchedSeries = productLineData.seriesSlug 
    ? await getProductSeriesBySlug(category, productLineData.seriesSlug)
    : undefined;
  const seriesData = fetchedSeries ?? { slug: categoryData.slug, thai: categoryData.thai, english: categoryData.english };

  const variantsList = await getProductVariantsByProductLine(category, productLine);

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
    <main className="min-h-screen bg-white relative overflow-hidden">
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
