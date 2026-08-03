/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductLine } from "@/types";
import { resolveMediaUrl } from "../media";
import { validateProductLine } from "@/lib/validation";

export function mapCMSProductLine(payload: any): ProductLine {
  if (!payload) throw new Error("ProductLineMapper: payload is required");
  
  const id = payload.id ? String(payload.id) : "";

  const seriesSlug = typeof payload.series === "object" && payload.series !== null
    ? payload.series.slug
    : (payload.seriesSlug ?? "");

  const categorySlug = typeof payload.category === "object" && payload.category !== null
    ? payload.category.slug
    : (payload.categorySlug ?? "");

  const coverImage = payload.coverImage ? {
    src: resolveMediaUrl(payload.coverImage.url ?? payload.coverImage.src ?? ""),
    alt: payload.coverImage.alt ?? payload.englishTitle ?? payload.english ?? "",
    title: payload.coverImage.title ?? "",
  } : undefined;

  const seo = payload.seo ? {
    metaTitle: payload.seo.metaTitle ?? "",
    metaDescription: payload.seo.metaDescription ?? "",
    canonical: payload.seo.canonical ?? "",
    ogImage: resolveMediaUrl(payload.seo.ogImage?.url ?? payload.seo.ogImageSrc ?? ""),
  } : undefined;

  const mapped = {
    id,
    slug: payload.slug ?? "",
    seriesSlug,
    categorySlug,
    thai: payload.thaiTitle ?? payload.thai ?? "",
    english: payload.englishTitle ?? payload.english ?? "",
    description: payload.description,
    brand: payload.brand,
    coverImage,
    status: payload.status,
    published: payload.published,
    seo,
  };

  return validateProductLine(mapped);
}
