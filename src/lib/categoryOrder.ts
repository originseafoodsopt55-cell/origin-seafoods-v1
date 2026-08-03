/**
 * Canonical category display order.
 * This constant is the single source of truth for category ordering
 * in both the hub page (Server Component) and CategoryNavBar (Client Component).
 */
export const CATEGORY_ORDER = [
  'crabs',
  'squid',
  'shellfish',
  'fish',
  'jellyfish',
  'silkworm',
] as const;

export type CategorySlug = typeof CATEGORY_ORDER[number];

/**
 * Sort any array of objects with a `slug` field by CATEGORY_ORDER.
 * Items with slugs not in the list are sorted to the end.
 * Pure utility — no 'use client' directive, safe to import in Server Components.
 */
export function sortCategories<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.slug as CategorySlug);
    const bi = CATEGORY_ORDER.indexOf(b.slug as CategorySlug);
    const aIdx = ai === -1 ? CATEGORY_ORDER.length : ai;
    const bIdx = bi === -1 ? CATEGORY_ORDER.length : bi;
    return aIdx - bIdx;
  });
}
