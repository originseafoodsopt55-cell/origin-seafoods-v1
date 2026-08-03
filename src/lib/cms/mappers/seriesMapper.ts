/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Series, ProductSeries } from "@/types";
import { resolveMediaUrl } from "../media";
import { validateSeries, validateProductSeries } from "@/lib/validation";

export function mapCMSSeries(payload: any): Series {
  if (!payload) throw new Error("SeriesMapper: payload is required");

  // Determine media assets with fallback
  const rawImage = payload.image;
  const rawCoverImage = payload.coverImage ?? rawImage;

  const coverImage = {
    src: resolveMediaUrl(rawCoverImage?.url ?? rawCoverImage?.src ?? ""),
    alt: rawCoverImage?.alt ?? payload.englishTitle ?? payload.english ?? "",
    title: rawCoverImage?.title ?? "",
  };

  const rawThai = payload.thaiTitle ?? payload.thai ?? "";
  const thaiParts = rawThai.split("/").map((s: any) => s.trim()).filter(Boolean);
  const thai = Array.from(new Set(thaiParts)).join(" / ");

  const mapped = {
    id: String(payload.id ?? ""),
    slug: payload.slug ?? "",
    categorySlug: typeof payload.category === "object" && payload.category !== null
      ? payload.category.slug
      : (payload.categorySlug ?? ""),
    thai,
    english: payload.englishTitle ?? payload.english ?? "",
    description: payload.description,
    coverImage,
    status: payload.status,
    published: payload.published,
    seo: payload.seo ? {
      metaTitle: payload.seo.metaTitle ?? "",
      metaDescription: payload.seo.metaDescription ?? "",
      canonical: payload.seo.canonical ?? "",
      ogImage: resolveMediaUrl(payload.seo.ogImage?.url ?? payload.seo.ogImageSrc ?? ""),
    } : undefined,
  };

  return validateSeries(mapped);
}

export function mapCMSProductSeries(payload: any): ProductSeries {
  if (!payload) throw new Error("SeriesMapper: payload is required");

  const rawImage = payload.image;
  const rawCoverImage = payload.coverImage ?? rawImage;

  const image = {
    src: resolveMediaUrl(rawImage?.url ?? rawImage?.src ?? ""),
    alt: rawImage?.alt ?? payload.englishTitle ?? payload.english ?? "",
    title: rawImage?.title ?? "",
  };

  const coverImage = rawCoverImage ? {
    src: resolveMediaUrl(rawCoverImage.url ?? rawCoverImage.src ?? ""),
    alt: rawCoverImage.alt ?? payload.englishTitle ?? payload.english ?? "",
    title: rawCoverImage.title ?? "",
  } : undefined;

  const rawThai = payload.thaiTitle ?? payload.thai ?? "";
  const thaiParts = rawThai.split("/").map((s: any) => s.trim()).filter(Boolean);
  const thai = Array.from(new Set(thaiParts)).join(" / ");

  const mapped = {
    id: String(payload.id ?? ""),
    slug: payload.slug ?? "",
    categorySlug: typeof payload.category === "object" && payload.category !== null
      ? payload.category.slug
      : (payload.categorySlug ?? ""),
    thai,
    english: payload.englishTitle ?? payload.english ?? "",
    description: payload.description,
    image,
    coverImage,
    status: payload.status,
    published: payload.published,
    seo: payload.seo ? {
      metaTitle: payload.seo.metaTitle ?? "",
      metaDescription: payload.seo.metaDescription ?? "",
      canonical: payload.seo.canonical ?? "",
      ogImage: resolveMediaUrl(payload.seo.ogImage?.url ?? payload.seo.ogImageSrc ?? ""),
    } : undefined,
  };

  return validateProductSeries(mapped);
}
