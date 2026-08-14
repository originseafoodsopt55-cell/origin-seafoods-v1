import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { 
  getCategoryBySlug, 
  getProductSeriesBySlug, 
  getProductLineBySlug, 
  getProductVariantBySlug,
  getProductVariantsByProductLine,
} from "@/lib/data";

export const revalidate = 300;
import { ProductLayout } from "@/components/products/ProductLayout";
import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductInformation } from "@/components/catalog/ProductInformation";
import { ProductSpecifications } from "@/components/catalog/ProductSpecifications";
import { RelatedProducts } from "@/components/catalog/RelatedProducts";

interface VariantDetailPageProps {
  params: Promise<{
    category: string;
    productLine: string;
    variant: string;
  }>;
}

export async function generateMetadata({ params }: VariantDetailPageProps): Promise<Metadata> {
  const { category, productLine, variant } = await params;
  const item = await getProductVariantBySlug(category, productLine, variant);

  if (!item) {
    return {
      title: "ไม่พบสินค้า | Product Not Found",
    };
  }

  const description = item.description || `จำหน่าย ${item.thai} นำเข้าคุณภาพเกรดพรีเมียมสำหรับตลาด B2B ค้าส่งและอุตสาหกรรมอาหาร`;

  return {
    title: `${item.thai} (${item.english}) | Origin Seafoods B2B`,
    description,
    alternates: {
      canonical: `/products/${category}/${productLine}/${variant}`
    },
    openGraph: {
      title: `${item.thai} (${item.english}) | Origin Seafoods`,
      description,
      images: [
        {
          url: item.image.src,
          alt: item.image.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.thai} (${item.english}) | Origin Seafoods`,
      description
    }
  };
}

export default async function ProductDetailPage({ params }: VariantDetailPageProps) {
  const { category, productLine, variant } = await params;
  
  const categoryData = await getCategoryBySlug(category);
  const productLineData = await getProductLineBySlug(category, productLine);
  const item = await getProductVariantBySlug(category, productLine, variant);

  if (!categoryData || !productLineData || !item) {
    notFound();
  }

  const fetchedSeries = productLineData.seriesSlug 
    ? await getProductSeriesBySlug(category, productLineData.seriesSlug)
    : undefined;
  const seriesData = fetchedSeries ?? { slug: categoryData.slug, thai: categoryData.thai, english: categoryData.english };

  const variantsList = await getProductVariantsByProductLine(category, productLine);

  // Image & Gallery Fallback logic
  const primaryImage = (item.image && item.image.src) ? item.image : (productLineData.coverImage || { src: "", alt: "", title: "" });
  const galleryImages = (item.gallery && item.gallery.length > 0)
    ? item.gallery
    : (item.images && item.images.length > 0)
    ? item.images
    : [primaryImage];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${item.thai} (${item.english})`,
    description: item.description,
    url: `/products/${category}/${productLine}/${variant}`,
    image: {
      "@type": "ImageObject",
      url: primaryImage.src,
      caption: primaryImage.alt
    }
  };

  const bgImageUrl = categoryData.backgroundImage?.src || "";

  const infoNode = (
    <ProductInformation 
      product={item} 
      categoryName={categoryData.thai} 
      seriesName={seriesData.thai} 
      variants={variantsList}
    />
  );

  const descriptionNode = (item.description || (item.features && item.features.length > 0)) ? (
    <div className="product-detail-description-block">
      {item.description && (
        <div className="description-text-wrapper">
          <h3 className="section-subtitle">รายละเอียดสินค้า / Description</h3>
          <p className="description-paragraph">{item.description}</p>
        </div>
      )}
      
      {item.features && item.features.length > 0 && (
        <div className="features-list-wrapper">
          <h3 className="section-subtitle">คุณลักษณะเด่น / Key Features</h3>
          <ul className="features-bullet-list">
            {item.features.map((feat, index) => (
              <li key={index} className="feature-item">{feat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : undefined;

  const specificationsNode = <ProductSpecifications product={item} />;

  const relatedProductsNode = (
    <RelatedProducts 
      categorySlug={categoryData.slug}
      seriesSlug={seriesData.slug}
      productLineSlug={productLineData.slug}
      excludeProductId={item.id} 
    />
  );

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products", href: "/products" },
    { label: categoryData.thai, href: `/products/${categoryData.slug}` },
    { label: productLineData.thai, href: `/products/${categoryData.slug}/${productLineData.slug}` },
    { label: item.thai }
  ];

  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden"
      style={bgImageUrl ? { backgroundImage: `url('${bgImageUrl}')` } : { backgroundColor: "#0f172a" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative z-10">
        <ProductLayout
          breadcrumb={
            <Breadcrumb items={breadcrumbItems} />
          }
          gallery={
            <ProductGallery 
              primaryImage={primaryImage}
              galleryImages={galleryImages} 
              productName={item.thai} 
            />
          }
          info={infoNode}
          description={descriptionNode}
          specifications={specificationsNode}
          relatedProducts={relatedProductsNode}
        />
      </div>
    </main>
  );
}
