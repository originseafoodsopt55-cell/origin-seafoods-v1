import type { ImageAsset, CMSMetadata } from "./index";

export interface Series extends CMSMetadata {
  id: string;
  slug: string;
  categorySlug: string;
  thai: string;
  english: string;
  description?: string;
  coverImage: ImageAsset;
}
