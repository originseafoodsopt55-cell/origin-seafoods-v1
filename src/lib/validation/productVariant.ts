import { z } from "zod";
import { ImageAssetSchema, SEOSchema } from "./shared";
import type { ProductVariant } from "@/types";

export const ProductVariantSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  productLineSlug: z.string().optional(),
  groupSlug: z.string(),
  seriesSlug: z.string().min(1),
  categorySlug: z.string().min(1),
  thai: z.string().min(1),
  english: z.string().min(1),
  image: ImageAssetSchema,
  images: z.array(ImageAssetSchema).optional(),
  size: z.string().optional(),
  package: z.string().optional(),
  packing: z.string().optional(),
  storage: z.string().optional(),
  scientificName: z.string().optional(),
  description: z.string().optional(),
  brand: z.string().optional(),
  country: z.string().optional(),
  variant: z.string().optional(),
  features: z.array(z.string()).optional(),
  gallery: z.array(ImageAssetSchema).optional(),
  status: z.enum(["published", "draft", "archived"]).optional(),
  published: z.boolean().optional(),
  seo: SEOSchema,
});

export function validateProductVariant(data: unknown): ProductVariant {
  const result = ProductVariantSchema.safeParse(data);
  if (!result.success) {
    console.warn("ProductVariant validation failed:", result.error.format());
    return data as ProductVariant;
  }
  return result.data as ProductVariant;
}
