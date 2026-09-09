"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import { ArrowRight } from "lucide-react";
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
  gender: "MALE" | "FEMALE" | null;
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
    if (brand && brand.sizes && brand.sizes.length > 0) {
      setSelectedSizeObj({ gender: null, size: getSizeText(brand.sizes[0]) });
    } else if (brand && brand.maleSizes && brand.maleSizes.length > 0) {
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
      const allSizes = [
        ...(selectedBrand.sizes || []),
        ...(selectedBrand.maleSizes || []),
        ...(selectedBrand.femaleSizes || []),
      ];
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

  // Handle Size selection & Carousel sync
  const handleSizeClick = useCallback((gender: "MALE" | "FEMALE" | null, sizeItem: any) => {
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
  }, [galleryImages]);

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

  // Targeted Category Navigation on Back Click
  const handleBack = useCallback(() => {
    const categorySlug = productLineData?.categorySlug || _categoryData?.slug;
    if (categorySlug) {
      router.push(`/products#${categorySlug}`);
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/products");
    }
  }, [productLineData?.categorySlug, _categoryData?.slug, router]);

  // ฟังก์ชันสั่งซื้อผ่าน LINE Official Account พร้อมคัดลอกสเปกสินค้าลง Clipboard
  const handleLineOrder = (e: React.MouseEvent) => {
    e.preventDefault();

    // สร้างข้อความสรุปรายการสินค้าที่เลือก
    const brandTitle = selectedBrand?.brandName ? ` แบรนด์: ${selectedBrand.brandName}` : "";
    const sizeTitle = selectedSizeObj?.size
      ? ` ไซส์: ${selectedSizeObj.gender ? `${selectedSizeObj.gender} (${selectedSizeObj.size})` : selectedSizeObj.size}`
      : "";
    const packingTitle = selectedBrand?.packingSize ? ` ขนาดบรรจุ: ${selectedBrand.packingSize}` : "";

    const summaryText = `สนใจติดต่อ / สั่งซื้อ: ${thaiName} (${englishName})${brandTitle}${sizeTitle}${packingTitle}`;

    // พยายามคัดลอกข้อมูลสรุปสเปกลง Clipboard ก่อนเปิด LINE
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(summaryText).catch(() => {});
    }

    // เปิดลิงก์ LINE ในแท็บใหม่
    window.open("https://lin.ee/5qZek9J", "_blank", "noopener,noreferrer");
  };

  // Render Brand Thumbnails row (supports 'large' for initial brand selector and 'compact' for carousel thumbnail strip)
  const renderBrandThumbnails = (variant: "large" | "compact" = "large") => {
    if (!brandOptions || brandOptions.length === 0) return null;

    const isCompact = variant === "compact";

    return (
      <div
        className={
          isCompact
            ? "flex gap-2.5 sm:gap-3 overflow-x-auto p-1 scrollbar-thin max-w-full"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-1"
        }
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
              className={`group flex flex-col items-center transition-all duration-300 ease-in-out cursor-pointer ${
                isCompact ? "flex-shrink-0 gap-1.5" : "w-full gap-2"
              } ${
                isSelected ? "-translate-y-1" : "hover:-translate-y-0.5"
              }`}
            >
              {/* กล่องรูปภาพสินค้า */}
              <div
                className={`relative rounded-xl sm:rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden bg-white ${
                  isCompact
                    ? "w-16 h-16 sm:w-20 sm:h-20 p-2"
                    : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 p-2.5"
                } ${
                  isSelected
                    ? "ring-2.5 ring-[#f58220] ring-offset-1 shadow-md shadow-orange-500/20 bg-orange-50/50 opacity-100"
                    : "ring-1 ring-gray-200 opacity-85 group-hover:opacity-100 group-hover:ring-1.5 group-hover:ring-orange-300 group-hover:shadow-sm"
                }`}
              >
                {brand.boxImage?.src ? (
                  <SafeImage
                    src={brand.boxImage.src}
                    alt={brand.boxImage.alt || brand.brandName}
                    title={brand.brandName}
                    fill
                    sizes={isCompact ? "80px" : "112px"}
                    className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-400">
                    {brand.brandName}
                  </div>
                )}
              </div>

              {/* ชื่อแบรนด์สินค้า */}
              <span
                className={`text-center leading-tight transition-colors duration-300 line-clamp-2 ${
                  isCompact
                    ? "text-[11px] sm:text-xs max-w-[68px] sm:max-w-[80px]"
                    : "text-xs md:text-[13px] font-semibold max-w-[100px] sm:max-w-[112px]"
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
        onClick={handleBack}
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
        </div>

        {/* Right Column (7 cols): Info, Brand Thumbnails (when no brand selected), Size Selector, Specs */}
        <div className="lg:col-span-7 w-full pl-0 lg:pl-4">
          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1 mb-1">{displayTitle}</h1>
          <p className="text-lg text-gray-500 mb-6">{englishName}</p>

          {/* CTA Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={handleLineOrder}
              className="w-fit flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#f58220] hover:bg-[#e07318] text-white font-bold text-base shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span>สนใจติดต่อ / สั่งซื้อ</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Brand Thumbnails Section (in Right Column when NO brand is selected and brandOptions exist) */}
          {!selectedBrand && brandOptions.length > 0 && (
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
              {/* Generic Sizes (สำหรับสินค้าที่ไม่มีเพศ เช่น หมึก, ปลา) */}
              {selectedBrand.sizes && selectedBrand.sizes.length > 0 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand.sizes.map((sizeItem, idx) => {
                      const sizeText = getSizeText(sizeItem);
                      const isActive = selectedSizeObj?.gender === null && selectedSizeObj?.size === sizeText;
                      return (
                        <button
                          key={`size-${sizeText}-${idx}`}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSizeClick(null, sizeItem);
                          }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSizeClick("MALE", sizeItem);
                          }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSizeClick("FEMALE", sizeItem);
                          }}
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
                      {selectedSizeObj.gender ? `${selectedSizeObj.gender} (${selectedSizeObj.size})` : selectedSizeObj.size}
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

          {/* Product Description & Features (when available on ProductLine) */}
          {(productLineData.description || (productLineData.features && productLineData.features.length > 0)) && (
            <div className="mt-6 mb-8 pt-6 border-t border-gray-100">
              {productLineData.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">รายละเอียดสินค้า / Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{productLineData.description}</p>
                </div>
              )}
              {productLineData.features && productLineData.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-2">คุณลักษณะเด่น / Key Features</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {productLineData.features.map((feat: string, index: number) => (
                      <li key={index}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. แถวล่างเต็มหน้าจอ: แถบเลือกแบรนด์สินค้ายาวเต็มพื้นที่ (12 ส่วน) */}
        {selectedBrand && (
          <div className="lg:col-span-12 w-full pt-6 mt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f58220]"></span>
              <span className="text-xs sm:text-sm font-bold text-gray-700">
                เลือกแบรนด์สินค้า / Select Brand:
              </span>
            </div>
            <div className="w-full">
              {renderBrandThumbnails("compact")}
            </div>
          </div>
        )}
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
   Main Entry — Standard Brand Selector Product View
   ────────────────────────────────────────────────────────────────── */

export default function ProductClientView(props: ProductClientViewProps) {
  return <BrandSelectorView {...props} />;
}
