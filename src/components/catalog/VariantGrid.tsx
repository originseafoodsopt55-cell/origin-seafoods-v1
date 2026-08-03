import type { Product } from "@/types";
import { CatalogProductCard } from "@/components/ui/CatalogProductCard";

interface VariantGridProps {
  variants: Product[];
}

export function VariantGrid({ variants }: VariantGridProps) {
  return (
    <div className="catalog-products-grid">
      {variants.map((variant) => (
        <CatalogProductCard key={variant.id} product={variant} />
      ))}
    </div>
  );
}
