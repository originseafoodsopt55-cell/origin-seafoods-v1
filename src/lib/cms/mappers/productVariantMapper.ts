/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductVariant } from "@/types";
import { resolveMediaUrl } from "../media";
import { validateProductVariant } from "@/lib/validation";

export function mapCMSProductVariant(payload: any): ProductVariant {
  if (!payload) throw new Error("ProductVariantMapper: payload is required");

  const id = payload.id ? String(payload.id) : "";

  const productLineSlug = typeof payload.productLine === "object" && payload.productLine !== null
    ? payload.productLine.slug
    : (payload.productLineSlug ?? payload.groupSlug ?? "");

  const groupSlug = productLineSlug; // Both groupSlug and productLineSlug map from productLine.slug

  const seriesSlug = typeof payload.series === "object" && payload.series !== null
    ? payload.series.slug
    : (payload.seriesSlug ?? "");

  const categorySlug = typeof payload.category === "object" && payload.category !== null
    ? payload.category.slug
    : (payload.categorySlug ?? "");

  const image = payload.image ? {
    src: resolveMediaUrl(payload.image.url ?? payload.image.src ?? ""),
    alt: payload.image.alt ?? payload.englishTitle ?? payload.english ?? "",
    title: payload.image.title ?? "",
  } : { src: "", alt: "" };

  const images = Array.isArray(payload.images) ? payload.images.map((img: any) => ({
    src: resolveMediaUrl(img.url ?? img.src ?? ""),
    alt: img.alt ?? "",
    title: img.title ?? "",
  })) : undefined;

  const gallery = Array.isArray(payload.gallery) ? payload.gallery.map((img: any) => ({
    src: resolveMediaUrl(img.url ?? img.src ?? ""),
    alt: img.alt ?? "",
    title: img.title ?? "",
  })) : undefined;

  const features = Array.isArray(payload.features) ? payload.features.map((f: any) => {
    return typeof f === "object" && f !== null && "feature" in f ? f.feature : String(f);
  }) : undefined;

  const seo = payload.seo ? {
    metaTitle: payload.seo.metaTitle ?? "",
    metaDescription: payload.seo.metaDescription ?? "",
    canonical: payload.seo.canonical ?? "",
    ogImage: resolveMediaUrl(payload.seo.ogImage?.url ?? payload.seo.ogImageSrc ?? ""),
  } : {
    metaTitle: "",
    metaDescription: "",
    canonical: "",
    ogImage: "",
  };

  const mapped = {
    id,
    slug: payload.slug ?? "",
    productLineSlug,
    groupSlug,
    seriesSlug,
    categorySlug,
    thai: payload.thaiTitle ?? payload.thai ?? "",
    english: payload.englishTitle ?? payload.english ?? "",
    image,
    images,
    size: payload.size,
    package: payload.package,
    packing: payload.packing,
    storage: payload.storage,
    scientificName: payload.scientificName,
    description: payload.description,
    brand: payload.brand,
    country: payload.country,
    variant: payload.variant,
    features,
    gallery,
    status: payload.status,
    published: payload.published,
    seo,
  };

  return validateProductVariant(mapped);
}

export type { ProductVariant };
