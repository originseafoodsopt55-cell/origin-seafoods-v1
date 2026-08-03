import { z } from "zod";
import { ImageAssetSchema, SEOSchema } from "./shared";

export const NewsArticleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: ImageAssetSchema,
  summary: z.string().min(1),
  richText: z.any(),
  galleryImages: z.array(ImageAssetSchema).optional(),
  publishedDate: z.string().min(1),
  featured: z.boolean(),
  seo: SEOSchema,
});
