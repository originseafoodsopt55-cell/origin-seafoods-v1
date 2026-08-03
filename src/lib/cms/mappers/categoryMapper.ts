/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Category } from "@/types";
import { resolveMediaUrl } from "../media";

import { CategorySchema } from "@/lib/validation/category";

export function mapCMSCategory(payload: any): Category {
  if (!payload) throw new Error("CategoryMapper: payload is required");
  
  const mapped = {
    id: payload.id ? String(payload.id) : "",
    slug: payload.slug ?? "",
    thai: payload.thaiTitle ?? payload.thai ?? "",
    english: payload.englishTitle ?? payload.english ?? "",
    description: payload.description ?? "",
    coverImage: {
      src: resolveMediaUrl(payload.coverImageSrc ?? payload.coverImage?.url ?? payload.coverImage?.src ?? ""),
      alt: payload.coverImageAlt ?? payload.coverImage?.alt ?? "",
      title: payload.coverImageTitle ?? payload.coverImage?.title ?? "",
    },
    status: payload.status,
    published: payload.published,
    seo: payload.seo ? {
      metaTitle: payload.seo.metaTitle ?? "",
      metaDescription: payload.seo.metaDescription ?? "",
      canonical: payload.seo.canonical ?? "",
      ogImage: resolveMediaUrl(payload.seo.ogImage?.url ?? payload.seo.ogImageSrc ?? ""),
    } : undefined,
  };

  return CategorySchema.parse(mapped);
}
