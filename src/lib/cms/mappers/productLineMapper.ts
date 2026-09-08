/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductLine, BrandOption } from "@/types";
import { resolveMediaUrl } from "../media";
import { validateProductLine } from "@/lib/validation";

function mapBrandOption(raw: any): BrandOption {
  const boxImage = raw.boxImage ? {
    src: resolveMediaUrl(raw.boxImage.url ?? raw.boxImage.src ?? ""),
    alt: raw.boxImage.alt ?? raw.brandName ?? "",
    title: raw.boxImage.title ?? "",
  } : undefined;

  const galleryItems = Array.isArray(raw.gallery)
    ? raw.gallery
        .map((g: any) => {
          const img = g.image ?? g;
          if (!img) return null;
          return {
            src: resolveMediaUrl(img.url ?? img.src ?? ""),
            alt: img.alt ?? raw.brandName ?? "",
            title: img.title ?? "",
          };
        })
        .filter(Boolean)
    : undefined;

  const mapSizeItem = (s: any) => {
    if (typeof s === "string") {
      return { sizeText: s };
    }
    if (!s || typeof s !== "object") return null;
    const sizeText = s.sizeText ?? s.size ?? "";
    const sizeImgRaw = s.sizeImage ?? s.image;
    const sizeImage = sizeImgRaw ? {
      src: resolveMediaUrl(sizeImgRaw.url ?? sizeImgRaw.src ?? ""),
      alt: sizeImgRaw.alt ?? sizeText ?? "",
      title: sizeImgRaw.title ?? "",
    } : undefined;
    return {
      sizeText,
      sizeImage,
    };
  };

  return {
    brandName: raw.brandName ?? "",
    boxImage,
    gallery: galleryItems && galleryItems.length > 0 ? galleryItems : undefined,
    packingSize: raw.packingSize ?? undefined,
    sizes: Array.isArray(raw.sizes)
      ? raw.sizes.map(mapSizeItem).filter((s: any) => Boolean(s && s.sizeText))
      : undefined,
    maleSizes: Array.isArray(raw.maleSizes)
      ? raw.maleSizes.map(mapSizeItem).filter((s: any) => Boolean(s && s.sizeText))
      : undefined,
    femaleSizes: Array.isArray(raw.femaleSizes)
      ? raw.femaleSizes.map(mapSizeItem).filter((s: any) => Boolean(s && s.sizeText))
      : undefined,
  };
}

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

  const mainGalleryItems = Array.isArray(payload.gallery)
    ? payload.gallery
        .map((g: any) => {
          const img = g.image ?? g;
          if (!img) return null;
          return {
            src: resolveMediaUrl(img.url ?? img.src ?? ""),
            alt: img.alt ?? payload.englishTitle ?? payload.english ?? "",
            title: img.title ?? "",
          };
        })
        .filter(Boolean)
    : undefined;

  const seo = payload.seo ? {
    metaTitle: payload.seo.metaTitle ?? "",
    metaDescription: payload.seo.metaDescription ?? "",
    canonical: payload.seo.canonical ?? "",
    ogImage: resolveMediaUrl(payload.seo.ogImage?.url ?? payload.seo.ogImageSrc ?? ""),
  } : undefined;

  const brandOptions = Array.isArray(payload.brandOptions) && payload.brandOptions.length > 0
    ? payload.brandOptions.map(mapBrandOption)
    : undefined;

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
    gallery: mainGalleryItems && mainGalleryItems.length > 0 ? mainGalleryItems : undefined,
    status: payload.status,
    published: payload.published,
    seo,
    brandOptions,
  };

  return validateProductLine(mapped);
}

