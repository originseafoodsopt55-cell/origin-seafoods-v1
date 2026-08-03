/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ImageAsset, SEOData } from "./index";

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
  seo?: SEOData;
}
