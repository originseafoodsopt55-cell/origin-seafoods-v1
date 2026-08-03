import type { ImageAsset } from "./index";

export interface Brand {
  id: string;
  name: string;
  sub?: string;
  logo?: ImageAsset;
  country: string;
  website: string;
  description: string;
}
