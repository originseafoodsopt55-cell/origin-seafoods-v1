import Image from "next/image";
import type { ImageAsset } from "@/types";

interface ProductCardProps {
  href: string;
  image: ImageAsset;
  thai: string;
  english: string;
  brand?: string;
  description?: string;
  priority?: boolean;
}

export function ProductCard({ href, image, thai, english, brand, description, priority = false }: ProductCardProps) {
  return (
    <article className="catalog-product-card">
      <a href={href} className="product-card-link">
        <div className="product-photo-container">
          <Image
            src={image.src}
            alt={image.alt}
            title={image.title}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 240px"
            className="product-card-image"
            priority={priority}
          />
        </div>
        <div className="product-card-content">
          <h3 className="product-card-title">{thai}</h3>
          <p className="product-card-subtitle">{english}</p>
          {brand && <span className="product-card-brand">{brand}</span>}
          {description && <p className="cat-desc" style={{ fontSize: "12px", marginTop: "4px" }}>{description}</p>}
        </div>
      </a>
    </article>
  );
}
