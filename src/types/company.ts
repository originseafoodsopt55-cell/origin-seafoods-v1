import type { LucideIcon } from "lucide-react";
import type { ImageAsset } from "./index";

export interface HeroButtonContent {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface HeroContent {
  title: string;
  description: string;
  subtitle: string;
  accent: string;
  primaryButton: HeroButtonContent;
  secondaryButton: HeroButtonContent;
}

export interface Feature {
  title: string;
  subtitle: string;
  icon: string | LucideIcon;
}

export interface Country {
  name: string;
  flag: string;
  x: number;
  y: number;
}

export interface Company {
  name: string;
  hero: HeroContent;
  description: string;
  heroSubtitle: string;
  assets: {
    factory: ImageAsset;
    warehouse: ImageAsset;
  };
}
