"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import type { KeyboardEvent } from "react";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 3600,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true
    })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: false, duration: 42 }, [autoplay.current]);
  const carouselProducts = [...products, ...products];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!emblaApi) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    },
    [emblaApi]
  );

  return (
    <div className="product-carousel" role="region" aria-roledescription="carousel" aria-label="Product categories">
      <div className="product-carousel__viewport" ref={emblaRef} tabIndex={0} onKeyDown={handleKeyDown}>
        <div className="product-carousel__track">
          {carouselProducts.map((product, index) => {
            const isDuplicate = index >= products.length;

            return (
              <div className="product-carousel__slide" key={`${product.english}-${index}`} aria-hidden={isDuplicate}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
