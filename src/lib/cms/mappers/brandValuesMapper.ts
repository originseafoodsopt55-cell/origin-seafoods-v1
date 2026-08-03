/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BrandValueItem } from "@/types";

export function mapCMSBrandValue(doc: any): BrandValueItem {
  return {
    id: String(doc.id || doc._id || `value-${doc.order || 1}`),
    order: Number(doc.order || 1),
    title: String(doc.title || ""),
    bgImage: doc.bgImage && typeof doc.bgImage === "object" && doc.bgImage.url
      ? {
          src: doc.bgImage.url,
          alt: doc.bgImage.alt || doc.title || "Brand Value Background",
          title: doc.bgImage.title || doc.title || "",
        }
      : undefined,
  };
}
