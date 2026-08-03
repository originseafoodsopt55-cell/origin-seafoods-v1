import Image from "next/image";
import type { ProductLine, ProductVariant } from "@/types";

interface ProductLineWithVariants {
  productLine: ProductLine;
  variants: ProductVariant[];
}

interface ProductLineGridProps {
  linesWithVariants: ProductLineWithVariants[];
}

export function ProductLineGrid({ linesWithVariants }: ProductLineGridProps) {
  return (
    <div className="catalog-products-grid">
      {linesWithVariants.map(({ productLine }) => {
        if (!productLine.coverImage) return null;

        // Path to the ProductLine page (which redirects to the first variant)
        const productLineHref = `/products/${productLine.categorySlug}/${productLine.seriesSlug}/${productLine.slug}`;

        return (
          <article key={productLine.id} className="catalog-product-card product-line-card">
            {/* Main link wrapping image and titles */}
            <a href={productLineHref} className="product-card-link">
              <div className="product-photo-container">
                <Image
                  src={productLine.coverImage.src}
                  alt={productLine.coverImage.alt}
                  title={productLine.coverImage.title}
                  fill
                  sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 240px"
                  className="product-card-image"
                  loading="lazy"
                />
              </div>
              <div className="product-card-content">
                <h4 className="product-card-title">{productLine.thai}</h4>
                <p className="product-card-subtitle">{productLine.english}</p>
                {productLine.brand && (
                  <span className="product-card-brand">{productLine.brand}</span>
                )}
              </div>
            </a>

            {/* View Details action button */}
            <div className="product-card-action">
              <a href={productLineHref} className="product-view-details-btn">
                ดูรายละเอียด
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
