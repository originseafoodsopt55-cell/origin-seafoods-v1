import { z } from "zod";
import { ImageAssetSchema } from "./shared";

export const BrandSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sub: z.string().optional(),
  logo: ImageAssetSchema.optional(),
  country: z.string(),
  website: z.string(),
  description: z.string(),
});

export const GalleryItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  image: ImageAssetSchema,
});
