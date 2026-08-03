/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NewsArticle } from "@/types";
import { resolveMediaUrl } from "../media";
import { NewsArticleSchema } from "@/lib/validation";

/**
 * Recursively processes Lexical AST nodes to resolve any embedded media upload URLs.
 */
function processLexicalAST(node: any): any {
  if (!node || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map(processLexicalAST);

  const updated = { ...node };
  if (updated.type === "upload" || updated.type === "image") {
    if (updated.value && typeof updated.value === "object") {
      if (updated.value.url) updated.value.url = resolveMediaUrl(updated.value.url);
      if (updated.value.src) updated.value.src = resolveMediaUrl(updated.value.src);
    }
    if (updated.fields?.doc?.value && typeof updated.fields.doc.value === "object") {
      if (updated.fields.doc.value.url) {
        updated.fields.doc.value.url = resolveMediaUrl(updated.fields.doc.value.url);
      }
      if (updated.fields.doc.value.src) {
        updated.fields.doc.value.src = resolveMediaUrl(updated.fields.doc.value.src);
      }
    }
  }

  for (const key of Object.keys(updated)) {
    if (key !== "value" && typeof updated[key] === "object") {
      updated[key] = processLexicalAST(updated[key]);
    }
  }
  return updated;
}

export function mapCMSNewsArticle(payload: any): NewsArticle {
  if (!payload) throw new Error("NewsArticleMapper: payload is required");

  const mapped = {
    id: payload.id ? String(payload.id) : "",
    title: payload.title ?? "",
    slug: payload.slug ?? "",
    coverImage: {
      src: resolveMediaUrl(payload.coverImage?.url ?? payload.coverImage?.src ?? ""),
      alt: payload.coverImage?.alt ?? payload.title ?? "",
      title: payload.coverImage?.title ?? payload.title ?? "",
    },
    summary: payload.summary ?? "",
    richText: processLexicalAST(payload.richText ?? {}),
    galleryImages: Array.isArray(payload.galleryImages)
      ? payload.galleryImages
          .map((img: any) => ({
            src: resolveMediaUrl(img?.url ?? img?.src ?? ""),
            alt: img?.alt ?? img?.filename ?? "",
            title: img?.title ?? img?.filename ?? "",
          }))
          .filter((img: any) => img.src !== resolveMediaUrl(payload.coverImage?.url ?? payload.coverImage?.src ?? ""))
      : undefined,
    publishedDate: payload.publishedDate
      ? new Date(payload.publishedDate).toISOString()
      : new Date().toISOString(),
    featured: Boolean(payload.featured),
    seo: payload.seo
      ? {
          metaTitle: payload.seo.title || payload.seo.metaTitle || undefined,
          metaDescription: payload.seo.description || payload.seo.metaDescription || undefined,
        }
      : undefined,
  };

  return NewsArticleSchema.parse(mapped);
}
