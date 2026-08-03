import { z } from "zod";
import { ImageAssetSchema, SEOSchema } from "./shared";
import type { Category } from "@/types";

export const CategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  thai: z.string().min(1),
  english: z.string().min(1),
  description: z.string(),
  coverImage: ImageAssetSchema,
  status: z.enum(["published", "draft", "archived"]).optional(),
  published: z.boolean().optional(),
  seo: SEOSchema,
});

export function validateCategory(data: unknown): Category {
  const result = CategorySchema.safeParse(data);
  if (!result.success) {
    console.warn("Category validation failed:", result.error.format());
    // Return typed fallback to prevent UI crashes in production
    return data as Category;
  }
  return result.data as Category;
}
