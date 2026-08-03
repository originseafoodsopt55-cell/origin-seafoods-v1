import type { ProductSeries } from "@/types";
import { ProductCard } from "./ProductCard";

interface SeriesGridProps {
  categorySlug: string;
  series: ProductSeries[];
}

export function SeriesGrid({ categorySlug, series }: SeriesGridProps) {
  return (
    <div className="catalog-products-grid">
      {series.map((item) => (
        <ProductCard
          key={item.id}
          href={`/products/${categorySlug}/${item.slug}`}
          image={item.coverImage ?? item.image}
          thai={item.thai}
          english={item.english}
          description={item.description}
          priority
        />
      ))}
    </div>
  );
}
