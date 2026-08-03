import type { ImageAsset, CMSMetadata } from "./index";

export interface Category extends CMSMetadata {
  id: string;
  slug: string;
  thai: string;
  english: string;
  description: string;
  coverImage: ImageAsset;
}
