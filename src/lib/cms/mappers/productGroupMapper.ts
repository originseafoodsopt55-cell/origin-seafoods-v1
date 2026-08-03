/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductGroup } from "@/types";
import { resolveMediaUrl } from "../media";

export function mapCMSProductGroup(payload: any): ProductGroup {
  if (!payload) throw new Error("ProductGroupMapper: payload is required");
  return {
    id: payload.id ?? "",
    slug: payload.slug ?? "",
    seriesSlug: payload.seriesSlug ?? "",
    categorySlug: payload.categorySlug ?? "",
    thai: payload.thaiTitle ?? payload.thai ?? "",
    english: payload.englishTitle ?? payload.english ?? "",
    description: payload.description,
    image: {
      src: resolveMediaUrl(payload.imageSrc ?? payload.image?.src ?? ""),
      alt: payload.imageAlt ?? payload.image?.alt ?? "",
      title: payload.imageTitle ?? payload.image?.title ?? "",
    },
    coverImage: payload.coverImage ? {
      src: resolveMediaUrl(payload.coverImage.src),
      alt: payload.coverImage.alt,
      title: payload.coverImage.title,
    } : undefined,
    status: payload.status,
    published: payload.published,
    seo: payload.seo
  };
}
