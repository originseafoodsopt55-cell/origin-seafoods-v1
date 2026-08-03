export interface ImageAsset {
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  canonical?: string;
  ogImage?: string;
}

export type CMSStatus = "published" | "draft" | "archived";

export interface CMSMetadata {
  status?: CMSStatus;
  published?: boolean;
  seo?: SEOData;
}


export * from "./company";
export * from "./category";
export * from "./series";
export * from "./productLine";
export * from "./product";
export * from "./brand";
export * from "./gallery";
export * from "./news";
export * from "./sourcing";

export * from "./navigation";
export * from "./contact";
export * from "./brandValues";
