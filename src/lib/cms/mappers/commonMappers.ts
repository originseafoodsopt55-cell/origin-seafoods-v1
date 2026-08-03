/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Brand, Company, Feature, Country, GalleryItem, NavigationItem, ContactInformation, ContactLink } from "@/types";
import { resolveMediaUrl } from "../media";
import { CompanySchema, FeatureSchema, CountrySchema, BrandSchema, GalleryItemSchema, NavigationItemSchema, ContactInformationSchema, ContactLinkSchema } from "@/lib/validation";

export function mapCMSBrand(payload: any): Brand {
  if (!payload) throw new Error("BrandMapper: payload is required");
  const mapped = {
    id: payload.id ? String(payload.id) : "",
    name: payload.name ?? "",
    sub: payload.sub || undefined,
    logo: (payload.logo && (payload.logo.url || payload.logo.src)) ? {
      src: resolveMediaUrl(payload.logo.url ?? payload.logo.src ?? ""),
      alt: payload.logo.alt ?? "",
      title: payload.logo.title ?? "",
    } : undefined,
    country: payload.country ?? "",
    website: payload.website ?? "",
    description: payload.description ?? "",
  };
  return BrandSchema.parse(mapped);
}

export function mapCMSCompany(payload: any): Company {
  if (!payload) throw new Error("CompanyMapper: payload is required");
  const mapped = {
    name: payload.name ?? "",
    hero: {
      title: payload.hero?.title ?? "",
      description: payload.hero?.description ?? "",
      subtitle: payload.hero?.subtitleText ?? "",
      accent: payload.hero?.accent ?? "",
      primaryButton: {
        label: payload.hero?.primaryButton?.label ?? "",
        href: payload.hero?.primaryButton?.href ?? "",
        ariaLabel: payload.hero?.primaryButton?.ariaLabel ?? "",
      },
      secondaryButton: {
        label: payload.hero?.secondaryButton?.label ?? "",
        href: payload.hero?.secondaryButton?.href ?? "",
        ariaLabel: payload.hero?.secondaryButton?.ariaLabel ?? "",
      },
    },
    description: payload.description ?? "",
    heroSubtitle: payload.heroSubtitle ?? "",
    assets: {
      factory: {
        src: resolveMediaUrl(payload.assets?.factory?.url ?? payload.assets?.factory?.src ?? ""),
        alt: payload.assets?.factory?.alt ?? "",
        title: payload.assets?.factory?.title ?? "",
      },
      warehouse: {
        src: resolveMediaUrl(payload.assets?.warehouse?.url ?? payload.assets?.warehouse?.src ?? ""),
        alt: payload.assets?.warehouse?.alt ?? "",
        title: payload.assets?.warehouse?.title ?? "",
      },
    },
  };
  return CompanySchema.parse(mapped);
}

export function mapCMSFeature(payload: any): Feature {
  if (!payload) throw new Error("FeatureMapper: payload is required");
  const mapped = {
    title: payload.title ?? "",
    subtitle: payload.subtitle ?? "",
    icon: payload.icon ?? "",
  };
  return FeatureSchema.parse(mapped);
}

export function mapCMSCountry(payload: any): Country {
  if (!payload) throw new Error("CountryMapper: payload is required");
  const mapped = {
    name: payload.name ?? "",
    flag: payload.flag ?? "",
    x: payload.x ?? 0,
    y: payload.y ?? 0,
  };
  return CountrySchema.parse(mapped);
}

export function mapCMSGalleryItem(payload: any): GalleryItem {
  if (!payload) throw new Error("GalleryItemMapper: payload is required");
  const mapped = {
    id: payload.id ? String(payload.id) : "",
    label: payload.label ?? "",
    image: {
      src: resolveMediaUrl(payload.image?.url ?? payload.image?.src ?? ""),
      alt: payload.image?.alt ?? "",
      title: payload.image?.title ?? "",
    },
  };
  return GalleryItemSchema.parse(mapped);
}

export function mapCMSNavigationItem(payload: any): NavigationItem {
  if (!payload) throw new Error("NavigationItemMapper: payload is required");
  const mapped = {
    href: payload.href ?? "",
    label: payload.label ?? "",
  };
  return NavigationItemSchema.parse(mapped);
}

export function mapCMSContact(payload: any): ContactInformation {
  if (!payload) throw new Error("ContactMapper: payload is required");
  const mapped = {
    phone: payload.phone ?? "",
    mobile: payload.mobile ?? "",
    email: payload.email ?? "",
    facebook: payload.facebook ?? "",
    line: payload.line ?? "",
    address: payload.address ?? "",
  };
  return ContactInformationSchema.parse(mapped);
}

export function mapCMSContactLink(payload: any): ContactLink {
  if (!payload) throw new Error("ContactLinkMapper: payload is required");
  const mapped = {
    label: payload.label ?? "",
    icon: payload.icon ?? "",
  };
  return ContactLinkSchema.parse(mapped);
}
