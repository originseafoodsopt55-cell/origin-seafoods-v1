"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ProductLayout } from "@/components/products/ProductLayout";
import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { ProductInformation } from "@/components/catalog/ProductInformation";
import { ProductSpecifications } from "@/components/catalog/ProductSpecifications";
import { SafeImage } from "@/components/ui/SafeImage";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Category, Series, ProductLine, ProductVariant, BrandOption, ImageAsset } from "@/types";

interface ProductClientViewProps {
  categoryData: Category | any;
  seriesData: Series | any;
  productLineData: ProductLine | any;
  variantsList: (ProductVariant | any)[];
  relatedProductsNode?: React.ReactNode;
}

/* ──────────────────────────────────────────────────────────────────
   Brand Selector View (when brandOptions exist)
   ────────────────────────────────────────────────────────────────── */

interface BrandSelectorViewProps {
  categoryData: any;
  seriesData: any;
  productLineData: any;
  relatedProductsNode?: React.ReactNode;
}

interface SelectedSizeState {
  gender: "MALE" | "FEMALE";
  size: string;
}

function BrandSelectorView({
  categoryData: _categoryData,
  seriesData: _seriesData,
  productLineData,
  relatedProductsNode,
}: BrandSelectorViewProps) {
  const router = useRouter();
  const brandOptions: BrandOption[] = productLineData.brandOptions ?? [];

  const [selectedBrandIndex, setSelectedBrandIndex] = useState<number | null>(null);
  const [selectedSizeObj, setSelectedSizeObj] = useState<SelectedSizeState | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const selectedBrand = selectedBrandIndex !== null ? brandOptions[selectedBrandIndex] : null;

  // Helper to extract size text from string or BrandSizeOption object
  const getSizeText = useCallback((item: any): string => {
    if (typeof item === "string") return item;
    return item?.sizeText ?? item?.size ?? "";
  }, []);

  // Helper to extract size image from BrandSizeOption object
  const getSizeImage = useCallback((item: any): ImageAsset | undefined => {
    if (typeof item === "object" && item !== null && item.sizeImage) {
      return item.sizeImage;
    }
    return undefined;
  }, []);

  // When a brand is clicked (Direct selection - never toggle off to null)
  const handleBrandClick = useCallback((index: number) => {
    setIsAutoplayPaused(true);
    setSelectedBrandIndex(index);
    setCarouselIndex(0);
    const brand = brandOptions[index];
    if (brand && brand.maleSizes && brand.maleSizes.length > 0) {
      setSelectedSizeObj({ gender: "MALE", size: getSizeText(brand.maleSizes[0]) });
    } else if (brand && brand.femaleSizes && brand.femaleSizes.length > 0) {
      setSelectedSizeObj({ gender: "FEMALE", size: getSizeText(brand.femaleSizes[0]) });
    } else {
      setSelectedSizeObj(null);
    }
  }, [brandOptions, getSizeText]);

  // Gallery images for carousel (Default State vs Brand Selected State)
  const galleryImages = useMemo(() => {
    // 1. กรณีคลิกเลือกแบรนด์แล้ว -> ใช้รูปเฉพาะของแบรนด์นั้น
    if (selectedBrand) {
      const brandList: ImageAsset[] = [];
      if (selectedBrand.gallery && selectedBrand.gallery.length > 0) {
        brandList.push(...selectedBrand.gallery);
      } else if (selectedBrand.boxImage) {
        brandList.push(selectedBrand.boxImage);
      }

      // Include size images for selected brand if available
      const allSizes = [...(selectedBrand.maleSizes || []), ...(selectedBrand.femaleSizes || [])];
      allSizes.forEach((item) => {
        const img = getSizeImage(item);
        if (img && img.src && !brandList.some((existing) => existing.src === img.src)) {
          brandList.push(img);
        }
      });

      if (brandList.length > 0) {
        return brandList;
      }
      return productLineData.coverImage ? [productLineData.coverImage] : [];
    }

    // 2. กรณีหน้าแรก (ยังไม่เลือกแบรนด์) -> ใช้รูปแกลเลอรีสินค้าจริงของ ProductLine
    if (productLineData.gallery && productLineData.gallery.length > 0) {
      return productLineData.gallery;
    }
    if (productLineData.coverImage) {
      return [productLineData.coverImage];
    }
    return [];
  }, [selectedBrand, productLineData, getSizeImage]);

  // Handle Size selection (Mutually Exclusive gender+size) & Carousel sync
  const handleSizeClick = useCallback((gender: "MALE" | "FEMALE", sizeItem: any) => {
    const sizeText = typeof sizeItem === "string" ? sizeItem : sizeItem?.sizeText ?? sizeItem?.size ?? "";
    const sizeImage = typeof sizeItem === "object" ? sizeItem?.sizeImage : undefined;

    setSelectedSizeObj({ gender, size: sizeText });
    setIsAutoplayPaused(true);

    if (sizeImage && sizeImage.src) {
      const existingIdx = galleryImages.findIndex((img: ImageAsset) => img.src === sizeImage.src);
      if (existingIdx !== -1) {
        setCarouselIndex(existingIdx);
      }
    }
  }, [getSizeText, getSizeImage, galleryImages]);

  // Carousel Autoplay Timer (4000ms) - starts on page load, pauses on user interaction
  useEffect(() => {
    if (isAutoplayPaused || galleryImages.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoplayPaused, galleryImages.length]);

  const primaryImage = galleryImages[carouselIndex] || galleryImages[0] || productLineData.coverImage || { src: "", alt: "", title: "" };

  // Title
  const thaiName = productLineData.thaiTitle || productLineData.thai || "";
  const englishName = productLineData.englishTitle || productLineData.english || "";
  const displayTitle = selectedBrand ? `${thaiName} ${selectedBrand.brandName}` : thaiName;

  // Render Brand Thumbnails row (supports 'large' for initial brand selector and 'compact' for carousel thumbnail strip)
  const renderBrandThumbnails = (variant: "large" | "compact" = "large") => {
    if (!brandOptions || brandOptions.length === 0) return null;

    const isCompact = variant === "compact";

    return (
      <div
        className={`flex overflow-x-auto scrollbar-thin ${
          isCompact ? "gap-2.5 sm:gap-3 p-1 max-w-full" : "gap-4 sm:gap-5 p-2"
        }`}
      >
        {brandOptions.map((brand, idx) => {
          const isSelected = selectedBrandIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleBrandClick(idx);
              }}
              className={`group flex-shrink-0 flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer ${
                isCompact ? "gap-1.5" : "gap-2.5"
              } ${
                isSelected ? "-translate-y-1" : "hover:-translate-y-0.5"
              }`}
            >
              {/* กรอบรูปภาพ: แยกขนาดตาม Variant */}
              <div
                className={`relative rounded-xl sm:rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden bg-white ${
                  isCompact
                    ? "w-16 h-16 sm:w-20 sm:h-20 p-2"
                    : "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 p-3"
                } ${
                  isSelected
                    ? "ring-2.5 ring-[#f58220] ring-offset-1 shadow-md shadow-orange-500/20 bg-orange-50/50 opacity-100"
                    : "ring-1 ring-gray-200 opacity-80 group-hover:opacity-100 group-hover:ring-1.5 group-hover:ring-orange-300 group-hover:shadow-sm"
                }`}
              >
                {brand.boxImage?.src ? (
                  <SafeImage
                    src={brand.boxImage.src}
                    alt={brand.boxImage.alt || brand.brandName}
                    title={brand.brandName}
                    fill
                    sizes={isCompact ? "80px" : "128px"}
                    className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-400">
                    {brand.brandName}
                  </div>
                )}
              </div>

              {/* ข้อความชื่อแบรนด์ */}
              <span
                className={`text-center leading-tight transition-colors duration-300 line-clamp-2 ${
                  isCompact
                    ? "text-[11px] sm:text-xs max-w-[68px] sm:max-w-[80px]"
                    : "text-xs md:text-sm font-semibold max-w-[110px] sm:max-w-[128px]"
                } ${
                  isSelected
                    ? "font-bold text-[#f58220]"
                    : "font-medium text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {brand.brandName}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="content-grid relative z-10 pt-2 pb-8">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-3 transition-colors bg-gray-100 px-4 py-2 rounded-full w-fit cursor-pointer border border-gray-200"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        ย้อนกลับ / Back
      </button>

      {/* Main 2-Column Layout (5:7 ratio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column (5 cols): Image + Brand Thumbnails (only when selectedBrand is active) */}
        <div className="lg:col-span-5 w-full">
          {/* Main Image / Carousel Container */}
          <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-3 border border-gray-100 flex items-center justify-center">
            <SafeImage
              src={primaryImage.src}
              alt={primaryImage.alt || displayTitle}
              title={primaryImage.title || displayTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
              className="object-contain p-0"
            />

            {/* Navigation Arrows Overlay (when gallery has multiple images) */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoplayPaused(true);
                    setCarouselIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-gray-200/60 hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoplayPaused(true);
                    setCarouselIndex((prev) => (prev + 1) % galleryImages.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-md backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer border border-gray-200/60 hover:scale-110"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dots Indicator Overlay (when gallery has multiple images) */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-xs">
                {galleryImages.map((_: ImageAsset, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsAutoplayPaused(true);
                      setCarouselIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === carouselIndex
                        ? "bg-[#f58220] scale-125 shadow-sm"
                        : "bg-white/70 hover:bg-white"
                    }`}
                    aria-label={`View image ${idx + 1} of ${galleryImages.length}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Brand Thumbnails Row (in Left Column only when brand is selected) */}
          {selectedBrand && (
            <div className="w-full pt-1">
              {renderBrandThumbnails("compact")}
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Info, Brand Thumbnails (when no brand selected), Size Selector, Specs */}
        <div className="lg:col-span-7 w-full pl-0 lg:pl-4">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1 mb-1">{displayTitle}</h1>
          <p className="text-lg text-gray-500 mb-6">{englishName}</p>

          {/* CTA Button (Synced styling with Legacy Product / Centered layout) */}
          <div className="mb-8">
            <Button
              variant="hero-orange"
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-center font-bold text-white shadow-md hover:shadow-lg transition-all"
            >
              <span>สนใจติดต่อ / สั่งซื้อ</span>
              <ArrowRight size={18} className="text-white" />
            </Button>
          </div>

          {/* Brand Thumbnails Section (in Right Column when NO brand is selected) */}
          {!selectedBrand && (
            <div className="mb-8 p-5 sm:p-6 bg-gray-50/80 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f58220]"></span>
                เลือกแบรนด์สินค้า / Select Brand
              </h3>
              {renderBrandThumbnails("large")}
            </div>
          )}

          {/* Size Selector (only when brand is selected) */}
          {selectedBrand && (
            <div className="mb-8 space-y-4">
              {/* MALE Sizes */}
              {selectedBrand.maleSizes && selectedBrand.maleSizes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full uppercase tracking-wider">
                      MALE
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand.maleSizes.map((sizeItem, idx) => {
                      const sizeText = getSizeText(sizeItem);
                      const isActive = selectedSizeObj?.gender === "MALE" && selectedSizeObj?.size === sizeText;
                      return (
                        <button
                          key={`male-${sizeText}-${idx}`}
                          type="button"
                          onClick={() => handleSizeClick("MALE", sizeItem)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#f58220] text-white shadow-md font-bold"
                              : "bg-white text-gray-700 border border-gray-300 hover:border-[#f58220] hover:text-[#f58220]"
                          }`}
                        >
                          {sizeText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FEMALE Sizes */}
              {selectedBrand.femaleSizes && selectedBrand.femaleSizes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-pink-500 rounded-full uppercase tracking-wider">
                      FEMALE
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand.femaleSizes.map((sizeItem, idx) => {
                      const sizeText = getSizeText(sizeItem);
                      const isActive = selectedSizeObj?.gender === "FEMALE" && selectedSizeObj?.size === sizeText;
                      return (
                        <button
                          key={`female-${sizeText}-${idx}`}
                          type="button"
                          onClick={() => handleSizeClick("FEMALE", sizeItem)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#f58220] text-white shadow-md font-bold"
                              : "bg-white text-gray-700 border border-gray-300 hover:border-[#f58220] hover:text-[#f58220]"
                          }`}
                        >
                          {sizeText}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specifications (แสดงเฉพาะเมื่อมีการเลือกแบรนด์แล้วเท่านั้น) */}
          {selectedBrand && (
            <div className="product-specifications-container">
              <h3 className="specifications-title">ข้อมูลเฉพาะทางเทคนิค / Specifications</h3>
              <div className="specifications-table">
                {selectedBrand.packingSize && (
                  <div className="specifications-row">
                    <div className="specifications-label">
                      <span className="label-th">ขนาดบรรจุ</span>
                      <span className="label-en">Packing Size</span>
                    </div>
                    <div className="specifications-value">{selectedBrand.packingSize}</div>
                  </div>
                )}
                {selectedSizeObj && (
                  <div className="specifications-row">
                    <div className="specifications-label">
                      <span className="label-th">ไซส์</span>
                      <span className="label-en">Size</span>
                    </div>
                    <div className="specifications-value">
                      {selectedSizeObj.gender} ({selectedSizeObj.size})
                    </div>
                  </div>
                )}
                {selectedBrand.brandName && (
                  <div className="specifications-row">
                    <div className="specifications-label">
                      <span className="label-th">แบรนด์</span>
                      <span className="label-en">Brand</span>
                    </div>
                    <div className="specifications-value">{selectedBrand.brandName}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProductsNode && (
        <section className="mt-12">
          {relatedProductsNode}
        </section>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Legacy View (no brandOptions — original behavior)
   ────────────────────────────────────────────────────────────────── */

function LegacyProductView({
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
    <div className="content-grid relative z-10 py-8">
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

/* ──────────────────────────────────────────────────────────────────
   Main Entry — switches between Brand Selector and Legacy
   ────────────────────────────────────────────────────────────────── */

export default function ProductClientView(props: ProductClientViewProps) {
  const { productLineData } = props;
  const hasBrandOptions = Array.isArray(productLineData?.brandOptions) && productLineData.brandOptions.length > 0;

  if (hasBrandOptions) {
    return <BrandSelectorView {...props} />;
  }

  return <LegacyProductView {...props} />;
}
