"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import type { ImageAsset } from "@/types";

interface ProductGalleryProps {
  primaryImage: ImageAsset;
  galleryImages?: ImageAsset[];
  productName: string;
}

export function ProductGallery({ primaryImage, galleryImages = [], productName }: ProductGalleryProps) {
  // Combine primary and gallery images, filtering out duplicates if any
  const allImages = [primaryImage, ...galleryImages].reduce<ImageAsset[]>((acc, current) => {
    if (!acc.some((img) => img.src === current.src)) {
      acc.push(current);
    }
    return acc;
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] || primaryImage;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const nextIndex = (index - 1 + allImages.length) % allImages.length;
      setActiveIndex(nextIndex);
      // Optional: focus the next button if ref is available
      const btn = event.currentTarget.parentElement?.children[nextIndex] as HTMLButtonElement;
      btn?.focus();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = (index + 1) % allImages.length;
      setActiveIndex(nextIndex);
      const btn = event.currentTarget.parentElement?.children[nextIndex] as HTMLButtonElement;
      btn?.focus();
    }
  };

  if (allImages.length <= 1) {
    return (
      <div className="product-gallery-single">
        <div className="product-gallery-main-wrapper">
          <SafeImage
            src={primaryImage.src}
            alt={primaryImage.alt || productName}
            title={primaryImage.title || productName}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            priority
            className="product-gallery-main-image"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="product-gallery-container">
      {/* Main Image View */}
      <div className="product-gallery-main-wrapper" aria-live="polite">
        <SafeImage
          src={activeImage.src}
          alt={activeImage.alt || productName}
          title={activeImage.title || productName}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          priority
          className="product-gallery-main-image"
        />
      </div>

      {/* Thumbnails Row */}
      <div className="product-gallery-thumbnails" role="group" aria-label="Product image gallery">
        {allImages.map((img, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              className={`product-gallery-thumbnail-btn ${isActive ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`View image ${index + 1} of ${allImages.length}`}
              aria-current={isActive ? "true" : "false"}
            >
              <SafeImage
                src={img.src}
                alt={img.alt || `${productName} thumbnail ${index + 1}`}
                title={img.title || `${productName} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="product-gallery-thumbnail-img"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
