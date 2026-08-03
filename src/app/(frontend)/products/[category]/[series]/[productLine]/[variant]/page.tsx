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
    series: string;
    productLine: string;
    variant: string;
  }>;
}


export async function generateMetadata({ params }: VariantDetailPageProps): Promise<Metadata> {
  const { category, series, productLine, variant } = await params;
  const item = await getProductVariantBySlug(category, series, productLine, variant);

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
      canonical: `/products/${category}/${series}/${productLine}/${variant}`
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
  const { category, series, productLine, variant } = await params;
  
  const [categoryData, seriesData, productLineData, item, variantsList] = await Promise.all([
    getCategoryBySlug(category),
    getProductSeriesBySlug(category, series),
    getProductLineBySlug(category, series, productLine),
    getProductVariantBySlug(category, series, productLine, variant),
    getProductVariantsByProductLine(category, series, productLine)
  ]);

  if (!categoryData || !seriesData || !productLineData || !item) {
    notFound();
  }

  // Image & Gallery Fallback logic
  const primaryImage = (item.image && item.image.src) ? item.image : (productLineData.coverImage || { src: "", alt: "", title: "" });
  const galleryImages = (item.gallery && item.gallery.length > 0)
    ? item.gallery
    : (item.images && item.images.length > 0)
    ? item.images
    : [primaryImage];

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products", href: "/products" }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${item.thai} (${item.english})`,
    description: item.description,
    url: `/products/${category}/${series}/${productLine}/${variant}`,
    image: {
      "@type": "ImageObject",
      url: primaryImage.src,
      caption: primaryImage.alt
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((breadcrumbItem, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumbItem.label,
        item: breadcrumbItem.href ?? `/products/${category}/${series}/${productLine}/${variant}`
      }))
    }
  };

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
      categorySlug={item.categorySlug}
      seriesSlug={item.seriesSlug}
      productLineSlug={item.productLineSlug ?? item.groupSlug}
      excludeProductId={item.id} 
    />
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductLayout
        breadcrumb={<Breadcrumb items={breadcrumbItems} />}
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
    </>
  );
}

