export interface SourcingRegion {
  id: string;
  regionName: string;
  slug: string;
  isBase?: boolean;
  xPercent: number;
  yPercent: number;
  speciesSourced: string;
  partnerName: string;
  trustMarker: string;
  order: number;
}
