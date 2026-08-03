import { z } from "zod";

export const ImageAssetSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
  title: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const SEOSchema = z.object({
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
}).optional();
