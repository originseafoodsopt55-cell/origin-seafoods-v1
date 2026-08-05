"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductLayout } from "@/components/products/ProductLayout";
import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductInformation } from "@/components/catalog/ProductInformation";
import { ProductSpecifications } from "@/components/catalog/ProductSpecifications";
import { RelatedProducts } from "@/components/catalog/RelatedProducts";
import type { Category, Series, ProductLine, ProductVariant } from "@/types";

interface ProductClientViewProps {
  categoryData: Category | any;
  seriesData: Series | any;
  productLineData: ProductLine | any;
  variantsList: (ProductVariant | any)[];
}

export default function ProductClientView({
  categoryData,
  seriesData,
  productLineData,
  variantsList,
}: ProductClientViewProps) {
  const router = useRouter();
  const [activeVariantId, setActiveVariantId] = useState<string>(variantsList[0]?.id || "");
  const activeVariant = variantsList.find((v) => v.id === activeVariantId) || variantsList[0];

  const primaryImage = (activeVariant?.image && activeVariant.image.src) 
    ? activeVariant.image 
    : (productLineData?.coverImage || { src: "", alt: "", title: "" });
    
  const galleryImages = (activeVariant?.gallery && activeVariant.gallery.length > 0)
    ? activeVariant.gallery
    : (activeVariant?.images && activeVariant.images.length > 0)
    ? activeVariant.images
    : [primaryImage];

  const categoryName = categoryData.thaiTitle || categoryData.thai || "";
  const seriesName = seriesData.thaiTitle || seriesData.thai || "";

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products", href: "/products" },
    { label: categoryName, href: `/products/${categoryData.slug}` },
  ];

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center text-white/80 hover:text-white mb-6 transition-colors bg-black/40 px-4 py-2 rounded-full backdrop-blur-md w-fit cursor-pointer border border-white/10"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        ย้อนกลับ / Back
      </button>

      {variantsList.length > 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-black">
          <h3 className="text-lg font-bold mb-4">เลือกขนาด / Select Size:</h3>
          <div className="flex flex-wrap gap-3">
            {variantsList.map((variant) => {
              const isSelected = activeVariantId === variant.id;
              const displayLabel = variant.size || variant.thaiTitle || variant.thai || "Standard";
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setActiveVariantId(variant.id)}
                  className={`px-4 py-2 border rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600 font-bold"
                      : "border-gray-300 hover:border-blue-400 hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeVariant && (
        <ProductLayout
          breadcrumb={<Breadcrumb items={breadcrumbItems} />}
          gallery={
            <ProductGallery 
              primaryImage={primaryImage} 
              galleryImages={galleryImages} 
              productName={activeVariant.thaiTitle || activeVariant.thai || ""} 
            />
          }
          info={
            <ProductInformation 
              product={activeVariant} 
              categoryName={categoryName} 
              seriesName={seriesName} 
              variants={variantsList}
            />
          }
          description={
            (activeVariant.description || (activeVariant.features && activeVariant.features.length > 0)) ? (
              <div className="product-detail-description-block">
                {activeVariant.description && (
                  <div className="description-text-wrapper">
                    <h3 className="section-subtitle">รายละเอียดสินค้า / Description</h3>
                    <p className="description-paragraph">{activeVariant.description}</p>
                  </div>
                )}
                
                {activeVariant.features && activeVariant.features.length > 0 && (
                  <div className="features-list-wrapper">
                    <h3 className="section-subtitle">คุณลักษณะเด่น / Key Features</h3>
                    <ul className="features-bullet-list">
                      {activeVariant.features.map((feat: string, index: number) => (
                        <li key={index} className="feature-item">{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : undefined
          }
          specifications={<ProductSpecifications product={activeVariant} />}
          relatedProducts={
            <RelatedProducts 
              categorySlug={categoryData.slug}
              seriesSlug={seriesData.slug}
              productLineSlug={productLineData.slug}
              excludeProductId={activeVariant.id} 
            />
          }
        />
      )}
    </div>
  );
}
