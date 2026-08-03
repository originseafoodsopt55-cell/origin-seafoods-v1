import type { ImageAsset, CMSMetadata } from "./index";

export interface ProductLine extends CMSMetadata {
  id: string;
  slug: string;
  seriesSlug: string;
  categorySlug?: string;
  thai: string;
  english: string;
  description?: string;
  brand?: string;
  coverImage?: ImageAsset;
}
