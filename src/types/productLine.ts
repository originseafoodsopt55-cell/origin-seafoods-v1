import type { ImageAsset, CMSMetadata } from "./index";

export interface BrandSizeOption {
  sizeText: string;
  sizeImage?: ImageAsset;
}

export interface BrandOption {
  brandName: string;
  boxImage?: ImageAsset;
  gallery?: ImageAsset[];
  packingSize?: string;
  sizes?: (string | BrandSizeOption)[];
  maleSizes?: (string | BrandSizeOption)[];
  femaleSizes?: (string | BrandSizeOption)[];
}

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
  gallery?: ImageAsset[];
  brandOptions?: BrandOption[];
}
