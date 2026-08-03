import type { ImageAsset } from "./index";

export interface BrandValueItem {
  id: string;
  order: number;
  title: string;
  bgImage?: ImageAsset;
}

export interface BrandValuesData {
  eyebrow?: string;
  sectionTitle?: string;
  items: BrandValueItem[];
}

export interface BrandValuesProps {
  data?: BrandValuesData;
  className?: string;
}
