import { z } from "zod";
import { ImageAssetSchema, SEOSchema } from "./shared";
import type { Series, ProductSeries } from "@/types";

export const SeriesSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  categorySlug: z.string().min(1),
  thai: z.string().min(1),
  english: z.string().min(1),
  description: z.string().optional(),
  coverImage: ImageAssetSchema,
  status: z.enum(["published", "draft", "archived"]).optional(),
  published: z.boolean().optional(),
  seo: SEOSchema.optional(),
});

export const ProductSeriesSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  categorySlug: z.string().min(1),
  thai: z.string().min(1),
  english: z.string().min(1),
  image: ImageAssetSchema,
  coverImage: ImageAssetSchema.optional(),
  description: z.string().optional(),
  status: z.enum(["published", "draft", "archived"]).optional(),
  published: z.boolean().optional(),
  seo: SEOSchema.optional(),
});

export function validateSeries(data: unknown): Series {
  const result = SeriesSchema.safeParse(data);
  if (!result.success) {
    console.warn("Series validation failed:", result.error.format());
    return data as Series;
  }
  return result.data as Series;
}

export function validateProductSeries(data: unknown): ProductSeries {
  const result = ProductSeriesSchema.safeParse(data);
  if (!result.success) {
    console.warn("ProductSeries validation failed:", result.error.format());
    return data as ProductSeries;
  }
  return result.data as ProductSeries;
}
