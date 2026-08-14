"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductLayout } from "@/components/products/ProductLayout";
import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductInformation } from "@/components/catalog/ProductInformation";
import { ProductSpecifications } from "@/components/catalog/ProductSpecifications";
import type { Category, Series, ProductLine, ProductVariant } from "@/types";

interface ProductClientViewProps {
  categoryData: Category | any;
  seriesData: Series | any;
  productLineData: ProductLine | any;
  variantsList: (ProductVariant | any)[];
  relatedProductsNode?: React.ReactNode;
}

export default function ProductClientView({
  categoryData,
  seriesData,
  productLineData,
  variantsList,
  relatedProductsNode,
}: ProductClientViewProps) {
  const router = useRouter();

  const safeVariantsList = variantsList || [];

  // Extract unique brand names available in variants
  const availableBrands = Array.from(
    new Set(safeVariantsList.map((v) => v.brand).filter((b): b is string => Boolean(b && b.trim())))
  );

  const [selectedBrand, setSelectedBrand] = useState<string>(() => {
    return availableBrands.length > 0 ? availableBrands[0] : "";
  });

  // Filter variants for the selected brand (or keep all if no brand names present)
  const brandVariants = availableBrands.length > 0 && selectedBrand
    ? safeVariantsList.filter((v) => v.brand === selectedBrand)
    : safeVariantsList;

  const [activeVariantId, setActiveVariantId] = useState<string>(() => {
    return brandVariants[0]?.id || safeVariantsList[0]?.id || "";
  });

  // Currently active variant (falls back safely to ProductLine Data)
  const activeVariant = safeVariantsList.find((v) => v.id === activeVariantId) || brandVariants[0] || safeVariantsList[0];

  const fallbackProduct: any = {
    id: productLineData.id || productLineData.slug,
    slug: productLineData.slug,
    thaiTitle: productLineData.thaiTitle || productLineData.thai || "",
    thai: productLineData.thaiTitle || productLineData.thai || "",
    englishTitle: productLineData.englishTitle || productLineData.english || "",
    english: productLineData.englishTitle || productLineData.english || "",
    categorySlug: categoryData.slug,
    seriesSlug: seriesData.slug,
    productLineSlug: productLineData.slug,
    groupSlug: productLineData.slug,
    description: productLineData.description || "",
    image: productLineData.coverImage || productLineData.image || {
      src: "/images/products/blue-swimming-crab.webp",
      alt: productLineData.englishTitle || productLineData.thaiTitle || "",
      title: productLineData.englishTitle || ""
    },
  };

  const currentProduct = activeVariant || fallbackProduct;

  // Handler for brand selection
  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    const firstVariantForBrand = safeVariantsList.find((v) => v.brand === brandName);
    if (firstVariantForBrand) {
      setActiveVariantId(firstVariantForBrand.id);
    }
  };

  const primaryImage = (currentProduct?.image && currentProduct.image.src) 
    ? currentProduct.image 
    : (productLineData?.coverImage || { src: "", alt: "", title: "" });
    
  const galleryImages = (currentProduct?.gallery && currentProduct.gallery.length > 0)
    ? currentProduct.gallery
    : (currentProduct?.images && currentProduct.images.length > 0)
    ? currentProduct.images
    : [primaryImage];

  const categoryName = categoryData.thaiTitle || categoryData.thai || "";
  const seriesName = seriesData.thaiTitle || seriesData.thai || "";

  const breadcrumbItems = [
    { label: "หน้าแรก / Home", href: "/" },
    { label: "สินค้าทั้งหมด / Products", href: "/products" },
    { label: categoryName, href: `/products#${categoryData.slug}` },
  ];

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
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

      {/* Control Panel: Brand & Size Selection */}
      {(availableBrands.length > 0 || variantsList.length > 1) && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-black border border-gray-100">
          {/* Brand Selector */}
          {availableBrands.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3 flex items-center text-gray-900">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-2 inline-block"></span>
                เลือกแบรนด์ / Select Brand:
              </h3>
              <div className="flex flex-wrap gap-3">
                {availableBrands.map((brandName) => {
                  const isSelected = selectedBrand === brandName;
                  return (
                    <button
                      key={brandName}
                      type="button"
                      onClick={() => handleBrandSelect(brandName)}
                      className={`px-5 py-2 border rounded-lg transition-all cursor-pointer font-medium text-sm ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20 font-bold shadow-sm"
                          : "border-gray-200 hover:border-blue-400 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {brandName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {brandVariants.length > 0 && (
            <div>
              <h3 className="text-base font-bold mb-3 flex items-center text-gray-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mr-2 inline-block"></span>
                เลือกขนาด / Select Size:
              </h3>
              <div className="flex flex-wrap gap-3">
                {brandVariants.map((variant) => {
                  const isSelected = activeVariantId === variant.id;
                  const displayLabel = variant.size || variant.thaiTitle || variant.thai || "Standard";
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setActiveVariantId(variant.id)}
                      className={`px-4 py-2 border rounded-lg transition-all cursor-pointer text-sm ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20 font-bold shadow-sm"
                          : "border-gray-200 hover:border-emerald-400 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {displayLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Product Layout */}
      {currentProduct && (
        <ProductLayout
          breadcrumb={<Breadcrumb items={breadcrumbItems} />}
          gallery={
            <ProductGallery 
              primaryImage={primaryImage} 
              galleryImages={galleryImages} 
              productName={currentProduct.thaiTitle || currentProduct.thai || ""} 
            />
          }
          info={
            <ProductInformation 
              product={currentProduct} 
              categoryName={categoryName} 
              seriesName={seriesName} 
              variants={safeVariantsList}
            />
          }
          description={
            (currentProduct.description || (currentProduct.features && currentProduct.features.length > 0)) ? (
              <div className="product-detail-description-block">
                {currentProduct.description && (
                  <div className="description-text-wrapper">
                    <h3 className="section-subtitle">รายละเอียดสินค้า / Description</h3>
                    <p className="description-paragraph">{currentProduct.description}</p>
                  </div>
                )}
                
                {currentProduct.features && currentProduct.features.length > 0 && (
                  <div className="features-list-wrapper">
                    <h3 className="section-subtitle">คุณลักษณะเด่น / Key Features</h3>
                    <ul className="features-bullet-list">
                      {currentProduct.features.map((feat: string, index: number) => (
                        <li key={index} className="feature-item">{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : undefined
          }
          specifications={<ProductSpecifications product={currentProduct} />}
          relatedProducts={relatedProductsNode}
        />
      )}
    </div>
  );
}
