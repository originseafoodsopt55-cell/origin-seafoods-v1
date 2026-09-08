import { z } from "zod";
import { ImageAssetSchema, SEOSchema } from "./shared";
import type { ProductLine } from "@/types";

const BrandSizeOptionSchema = z.object({
  sizeText: z.string(),
  sizeImage: ImageAssetSchema.optional(),
});

const BrandOptionSchema = z.object({
  brandName: z.string().min(1),
  boxImage: ImageAssetSchema.optional(),
  gallery: z.array(ImageAssetSchema).optional(),
  packingSize: z.string().optional(),
  sizes: z.array(z.union([z.string(), BrandSizeOptionSchema])).optional(),
  maleSizes: z.array(z.union([z.string(), BrandSizeOptionSchema])).optional(),
  femaleSizes: z.array(z.union([z.string(), BrandSizeOptionSchema])).optional(),
});

export const ProductLineSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  seriesSlug: z.string().min(1),
  categorySlug: z.string().optional(),
  thai: z.string().min(1),
  english: z.string().min(1),
  description: z.string().optional(),
  brand: z.string().optional(),
  coverImage: ImageAssetSchema.optional(),
  gallery: z.array(ImageAssetSchema).optional(),
  status: z.enum(["published", "draft", "archived"]).optional(),
  published: z.boolean().optional(),
  seo: SEOSchema,
  brandOptions: z.array(BrandOptionSchema).optional(),
});

export function validateProductLine(data: unknown): ProductLine {
  const result = ProductLineSchema.safeParse(data);
  if (!result.success) {
    console.warn("ProductLine validation failed:", result.error.format());
    return data as ProductLine;
  }
  return result.data as ProductLine;
}
