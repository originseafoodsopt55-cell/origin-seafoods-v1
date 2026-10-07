/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ImageAsset, SEOData } from "./index";

export interface NewsCategory {
  id?: string;
  title?: string;
  thaiTitle?: string;
  englishTitle?: string;
  name?: string;
  slug?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  coverImage: ImageAsset;
  summary: string;
  richText: any; // Payload Lexical AST JSON
  galleryImages?: ImageAsset[];
  publishedDate: string; // ISO Date string
  featured: boolean;
  category?: string;
  categories?: (NewsCategory | string)[];
  seo?: SEOData;
}
