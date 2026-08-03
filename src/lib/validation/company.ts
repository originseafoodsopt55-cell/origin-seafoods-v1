import { z } from "zod";
import { ImageAssetSchema } from "./shared";

export const FeatureSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string(),
  icon: z.string().min(1),
});

export const CountrySchema = z.object({
  name: z.string().min(1),
  flag: z.string().min(1),
  x: z.number(),
  y: z.number(),
});

export const HeroButtonContentSchema = z.object({
  label: z.string(),
  href: z.string(),
  ariaLabel: z.string(),
});

export const HeroContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  subtitle: z.string(),
  accent: z.string(),
  primaryButton: HeroButtonContentSchema,
  secondaryButton: HeroButtonContentSchema,
});

export const CompanySchema = z.object({
  name: z.string().min(1),
  hero: HeroContentSchema,
  description: z.string(),
  heroSubtitle: z.string(),
  assets: z.object({
    factory: ImageAssetSchema,
    warehouse: ImageAssetSchema,
  }),
});
