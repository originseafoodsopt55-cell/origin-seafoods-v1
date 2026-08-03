import { z } from "zod";
import { ImageAssetSchema, SEOSchema } from "./shared";
import type { ProductLine } from "@/types";

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
  status: z.enum(["published", "draft", "archived"]).optional(),
  published: z.boolean().optional(),
  seo: SEOSchema,
});

export function validateProductLine(data: unknown): ProductLine {
  const result = ProductLineSchema.safeParse(data);
  if (!result.success) {
    console.warn("ProductLine validation failed:", result.error.format());
    return data as ProductLine;
  }
  return result.data as ProductLine;
}
