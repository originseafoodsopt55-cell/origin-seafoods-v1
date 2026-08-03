/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SourcingRegion } from "@/types";

export function mapCMSSourcingRegion(doc: any): SourcingRegion {
  return {
    id: String(doc.id ?? doc.slug),
    regionName: String(doc.regionName ?? ""),
    slug: String(doc.slug ?? ""),
    isBase: Boolean(doc.isBase ?? false),
    xPercent: Number(doc.xPercent ?? 50),
    yPercent: Number(doc.yPercent ?? 50),
    speciesSourced: String(doc.speciesSourced ?? ""),
    partnerName: String(doc.partnerName ?? ""),
    trustMarker: String(doc.trustMarker ?? ""),
    order: Number(doc.order ?? 1),
  };
}
