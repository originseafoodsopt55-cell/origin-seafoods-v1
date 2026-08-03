import { queryProducts } from "@/lib/data";
import { CatalogProductCard } from "../ui/CatalogProductCard";
import { SectionTitle } from "../ui/SectionTitle";

interface RelatedProductsProps {
  categorySlug: string;
  seriesSlug?: string;
  productLineSlug?: string;
  excludeProductId: string;
}

export async function RelatedProducts({ categorySlug, seriesSlug, productLineSlug, excludeProductId }: RelatedProductsProps) {
  const result = await queryProducts({ limit: 1000 });
  const allProducts = result.items;
  const candidates = allProducts.filter((p) => p.categorySlug === categorySlug && p.id !== excludeProductId);

  const seen = new Set<string>();

  const takeUnique = (items: typeof candidates) =>
    items.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });

  const sameProductLine = productLineSlug
    ? candidates.filter((p) => (p.productLineSlug ?? p.groupSlug) === productLineSlug)
    : [];
  const sameSeries = seriesSlug ? candidates.filter((p) => p.seriesSlug === seriesSlug) : [];

  const relatedList = [
    ...takeUnique(sameProductLine),
    ...takeUnique(sameSeries),
    ...takeUnique(candidates)
  ].slice(0, 4);

  if (relatedList.length === 0) {
    return null;
  }

  return (
    <div className="related-products-wrapper">
      <SectionTitle
        eyebrow="RELATED PRODUCTS"
        title="สินค้าที่เกี่ยวข้อง"
        center={false}
        labelClassName="related-eyebrow"
      />
      <div className="related-products-grid">
        {relatedList.map((prod) => (
          <CatalogProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}
