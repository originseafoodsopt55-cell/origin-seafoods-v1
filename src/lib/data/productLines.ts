import { productGroups } from "@/lib/data/products";
import type { ProductLine } from "@/types";

export const productLines: ProductLine[] = productGroups.map((item) => ({
  id: item.id.replace(/^group-/, "line-"),
  slug: item.slug,
  seriesSlug: item.seriesSlug,
  categorySlug: item.categorySlug,
  thai: item.thai,
  english: item.english,
  description: item.description,
  brand: item.brand,
  coverImage: item.coverImage ?? item.image
}));
