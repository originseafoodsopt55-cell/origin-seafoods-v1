import type { ImageAsset, CMSMetadata } from "./index";

export interface ProductSeries extends CMSMetadata {
  id: string;
  slug: string;
  categorySlug: string;
  thai: string;
  english: string;
  image: ImageAsset;
  coverImage?: ImageAsset;
  description?: string;
}

export interface ProductGroup extends CMSMetadata {
  id: string;
  slug: string;
  seriesSlug: string;
  categorySlug: string;
  thai: string;
  english: string;
  brand?: string;
  image: ImageAsset;
  coverImage?: ImageAsset;
  description?: string;
}

export interface ProductVariant extends CMSMetadata {
  id: string;
  slug: string;
  productLineSlug?: string;
  groupSlug: string;
  seriesSlug: string;
  categorySlug: string;
  thai: string;
  english: string;
  image: ImageAsset;
  images?: ImageAsset[];
  size?: string;
  package?: string;
  packing?: string;
  storage?: string;
  scientificName?: string;
  description?: string;
  brand?: string;
  country?: string;
  variant?: string;
  features?: string[];
  gallery?: ImageAsset[];
}

// Keep Product alias to ProductVariant for backward compatibility where needed
export type Product = ProductVariant;
