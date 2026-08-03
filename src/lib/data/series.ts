import { productSeries } from "@/lib/data/products";
import type { Series } from "@/types";

export const series: Series[] = productSeries.map((item) => ({
  id: item.id,
  slug: item.slug,
  categorySlug: item.categorySlug,
  thai: item.thai,
  english: item.english,
  description: item.description,
  coverImage: item.coverImage ?? item.image
}));
