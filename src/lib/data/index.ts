import { getContentProvider } from "../providers/factory";
import type { ProductQueryParams, PaginatedProducts, NewsQueryParams } from "../providers/interfaces/IContentProvider";
import {
  validateCategory,
  validateSeries,
  validateProductSeries,
  validateProductLine,
  validateProductVariant
} from "@/lib/validation";

const provider = getContentProvider();

export async function getCompany() {
  const comp = await provider.getCompany();
  const feats = await provider.getFeatures();
  const countrs = await provider.getCountries();
  return {
    ...comp,
    features: feats,
    countries: countrs
  };
}

// Legacy compatibility API
export async function getProducts() {
  const products = await provider.getProducts();
  return products.map(validateProductVariant);
}

// New Paginated and filtered query API
export async function queryProducts(params?: ProductQueryParams): Promise<PaginatedProducts> {
  const result = await provider.queryProducts(params);
  return {
    ...result,
    items: result.items.map(validateProductVariant)
  };
}

export async function getBrands() {
  return await provider.getBrands();
}

export async function getGallery() {
  return await provider.getGallery();
}

// Corporate Newsroom
export async function getFeaturedNews(limit?: number) {
  return await provider.getFeaturedNews(limit);
}

export async function getAllNews(params?: NewsQueryParams) {
  return await provider.getAllNews(params);
}

export async function getNewsBySlug(slug: string) {
  return await provider.getNewsBySlug(slug);
}

export async function getRelatedNews(currentSlug: string, limit?: number) {
  return await provider.getRelatedNews(currentSlug, limit);
}

// Global Supply Network
export async function getSourcingRegions() {
  return await provider.getSourcingRegions();
}

export async function getNavigation() {
  return await provider.getNavigation();
}

export async function getContact() {
  return await provider.getContact();
}

export async function getContactLinks() {
  return await provider.getContactLinks();
}

export async function getCategories() {
  const cats = await provider.getCategories();
  return cats.map(validateCategory);
}

// B2B Catalog dynamic queries
export async function getSeries() {
  const seriesList = await provider.getSeries();
  return seriesList.map(validateSeries);
}

export async function getProductLines() {
  const linesList = await provider.getProductLines();
  return linesList.map(validateProductLine);
}

export async function getCategoryBySlug(slug: string) {
  const cat = await provider.getCategoryBySlug(slug);
  return cat ? validateCategory(cat) : undefined;
}

export async function getProductSeriesByCategory(categorySlug: string) {
  const list = await provider.getProductSeriesByCategory(categorySlug);
  return list.map(validateProductSeries);
}

export async function getProductSeriesBySlug(categorySlug: string, seriesSlug: string) {
  const item = await provider.getProductSeriesBySlug(categorySlug, seriesSlug);
  return item ? validateProductSeries(item) : undefined;
}

export async function getProductGroupsBySeries(categorySlug: string, seriesSlug: string) {
  return await provider.getProductGroupsBySeries(categorySlug, seriesSlug);
}

export async function getProductLinesBySeries(categorySlug: string, seriesSlug: string) {
  const list = await provider.getProductLinesBySeries(categorySlug, seriesSlug);
  return list.map(validateProductLine);
}

export async function getProductGroupBySlug(categorySlug: string, seriesSlug: string, groupSlug: string) {
  return await provider.getProductGroupBySlug(categorySlug, seriesSlug, groupSlug);
}

export async function getProductLineBySlug(categorySlug: string, seriesSlug: string, productLineSlug: string) {
  const item = await provider.getProductLineBySlug(categorySlug, seriesSlug, productLineSlug);
  return item ? validateProductLine(item) : undefined;
}

export async function getProductVariantsByGroup(categorySlug: string, seriesSlug: string, groupSlug: string) {
  const list = await provider.getProductVariantsByGroup(categorySlug, seriesSlug, groupSlug);
  return list.map(validateProductVariant);
}

export async function getProductVariantsByProductLine(categorySlug: string, seriesSlug: string, productLineSlug: string) {
  const list = await provider.getProductVariantsByProductLine(categorySlug, seriesSlug, productLineSlug);
  return list.map(validateProductVariant);
}

export async function getProductVariantBySlug(
  categorySlug: string,
  seriesSlug: string,
  productLineSlug: string,
  variantSlug: string
) {
  const item = await provider.getProductVariantBySlug(categorySlug, seriesSlug, productLineSlug, variantSlug);
  return item ? validateProductVariant(item) : undefined;
}

export type { ProductQueryParams, PaginatedProducts };
