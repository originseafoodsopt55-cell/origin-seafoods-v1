/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IContentProvider, ProductQueryParams, PaginatedProducts, NewsQueryParams, PaginatedNews } from "../interfaces/IContentProvider";
import { cmsClient } from "../../cms/client";
import { MockContentProvider } from "../mock/MockContentProvider";
import {
  mapCMSCategory,
  mapCMSSeries,
  mapCMSProductSeries,
  mapCMSProductVariant,
  mapCMSCompany,
  mapCMSFeature,
  mapCMSCountry,
  mapCMSBrand,
  mapCMSGalleryItem,
  mapCMSNavigationItem,
  mapCMSContact,
  mapCMSContactLink,
  mapCMSProductGroup,
  mapCMSProductLine,
  mapCMSNewsArticle,
  mapCMSSourcingRegion,
} from "../../cms/mappers";
import type {
  Company,
  ProductVariant,
  Category,
  Brand,
  GalleryItem,
  NavigationItem,
  ContactInformation,
  ContactLink,
  Feature,
  Country,
  ProductSeries,
  ProductGroup,
  Series,
  ProductLine,
  NewsArticle,
  SourcingRegion,
} from "@/types";

export class CMSContentProvider implements IContentProvider {
  private mockProvider = new MockContentProvider();

  async getCompany(): Promise<Company> {
    const raw = await cmsClient.get<any>("/globals/company-profile");
    return mapCMSCompany(raw);
  }

  async getFeatures(): Promise<Feature[]> {
    const raw = await cmsClient.get<any>("/features");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSFeature);
  }

  async getCountries(): Promise<Country[]> {
    const raw = await cmsClient.get<any>("/countries");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSCountry);
  }

  async getProducts(): Promise<ProductVariant[]> {
    const raw = await cmsClient.get<any>("/variants?limit=100");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductVariant);
  }

  async queryProducts(params?: ProductQueryParams): Promise<PaginatedProducts> {
    let path = "/variants?";
    if (params) {
      const queryParts: string[] = [];
      if (params.page) queryParts.push(`page=${params.page}`);
      
      // If limit is not explicitly provided in params, default to 100
      const limit = params.limit ?? 100;
      queryParts.push(`limit=${limit}`);
      
      if (params.categorySlug) queryParts.push(`where[category.slug][equals]=${params.categorySlug}`);
      if (params.seriesSlug) queryParts.push(`where[series.slug][equals]=${params.seriesSlug}`);
      if (params.productLineSlug) queryParts.push(`where[productLine.slug][equals]=${params.productLineSlug}`);
      if (params.status) queryParts.push(`where[status][equals]=${params.status}`);
      path += queryParts.join("&");
    } else {
      path += "limit=100";
    }

    const raw = await cmsClient.get<any>(path);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    const items = docs.map(mapCMSProductVariant);
    
    return {
      items,
      total: raw?.totalDocs ?? items.length,
      page: raw?.page ?? params?.page ?? 1,
      pageSize: raw?.limit ?? params?.limit ?? 10,
      hasNextPage: raw?.hasNextPage ?? false
    };
  }

  async getCategories(): Promise<Category[]> {
    const raw = await cmsClient.get<any>("/categories");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSCategory);
  }

  async getBrands(): Promise<Brand[]> {
    const raw = await cmsClient.get<any>("/brands");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSBrand);
  }

  async getGallery(): Promise<GalleryItem[]> {
    const raw = await cmsClient.get<any>("/gallery");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSGalleryItem);
  }

  async getNavigation(): Promise<NavigationItem[]> {
    const raw = await cmsClient.get<any>("/navigation?sort=createdAt");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSNavigationItem);
  }

  async getContact(): Promise<ContactInformation> {
    const raw = await cmsClient.get<any>("/globals/contact");
    return mapCMSContact(raw);
  }

  async getContactLinks(): Promise<ContactLink[]> {
    const raw = await cmsClient.get<any>("/contact-links");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSContactLink);
  }

  // Corporate Newsroom
  async getFeaturedNews(limit = 3): Promise<NewsArticle[]> {
    const raw = await cmsClient.get<any>(`/news?where[featured][equals]=true&sort=-publishedDate&limit=${limit}&depth=2`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSNewsArticle);
  }

  async getAllNews(params?: NewsQueryParams): Promise<PaginatedNews> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 9;
    let path = `/news?sort=-publishedDate&page=${page}&limit=${limit}&depth=2`;
    if (params?.featuredOnly) {
      path += `&where[featured][equals]=true`;
    }
    const raw = await cmsClient.get<any>(path);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    const items = docs.map(mapCMSNewsArticle);
    return {
      items,
      total: raw?.totalDocs ?? items.length,
      page: raw?.page ?? page,
      pageSize: raw?.limit ?? limit,
      hasNextPage: raw?.hasNextPage ?? false,
    };
  }

  async getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const raw = await cmsClient.get<any>(`/news?where[slug][equals]=${slug}&depth=2`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.length > 0 ? mapCMSNewsArticle(docs[0]) : undefined;
  }

  async getRelatedNews(currentSlug: string, limit = 3): Promise<NewsArticle[]> {
    const raw = await cmsClient.get<any>(`/news?where[slug][not_equals]=${currentSlug}&sort=-publishedDate&limit=${limit}&depth=2`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSNewsArticle);
  }

  // B2B Catalog Dynamic Queries (Async Permitted)
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const raw = await cmsClient.get<any>(`/categories?where[slug][equals]=${slug}`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.length > 0 ? mapCMSCategory(docs[0]) : undefined;
  }

  async getProductSeriesByCategory(categorySlug: string): Promise<ProductSeries[]> {
    const raw = await cmsClient.get<any>(`/series?where[category.slug][equals]=${categorySlug}&limit=100`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductSeries);
  }

  async getProductSeriesBySlug(categorySlug: string, seriesSlug: string): Promise<ProductSeries | undefined> {
    const raw = await cmsClient.get<any>(`/series?where[category.slug][equals]=${categorySlug}&where[slug][equals]=${seriesSlug}`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.length > 0 ? mapCMSProductSeries(docs[0]) : undefined;
  }

  async getProductGroupsBySeries(categorySlug: string, seriesSlug: string): Promise<ProductGroup[]> {
    const raw = await cmsClient.get<any>(`/product-groups?where[categorySlug][equals]=${categorySlug}&where[seriesSlug][equals]=${seriesSlug}`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductGroup);
  }

  async getProductGroupBySlug(categorySlug: string, seriesSlug: string, groupSlug: string): Promise<ProductGroup | undefined> {
    const raw = await cmsClient.get<any>(`/product-groups?where[categorySlug][equals]=${categorySlug}&where[seriesSlug][equals]=${seriesSlug}&where[slug][equals]=${groupSlug}`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.length > 0 ? mapCMSProductGroup(docs[0]) : undefined;
  }

  async getProductVariantsByGroup(categorySlug: string, seriesSlug: string, groupSlug: string): Promise<ProductVariant[]> {
    const raw = await cmsClient.get<any>(`/variants?where[category.slug][equals]=${categorySlug}&where[series.slug][equals]=${seriesSlug}&where[productLine.slug][equals]=${groupSlug}&limit=100`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductVariant);
  }

  async getProductVariantBySlug(
    categorySlug: string,
    seriesSlug: string,
    productLineSlug: string,
    variantSlug: string
  ): Promise<ProductVariant | undefined> {
    const raw = await cmsClient.get<any>(`/variants?where[category.slug][equals]=${categorySlug}&where[series.slug][equals]=${seriesSlug}&where[productLine.slug][equals]=${productLineSlug}&where[slug][equals]=${variantSlug}`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.length > 0 ? mapCMSProductVariant(docs[0]) : undefined;
  }

  // Purely Synchronous Methods (Delegated to mockProvider to avoid runtime throw errors)
  async getSeries(): Promise<Series[]> {
    const raw = await cmsClient.get<any>("/series?limit=100");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSSeries);
  }

  async getProductLines(): Promise<ProductLine[]> {
    const raw = await cmsClient.get<any>("/product-lines?limit=100");
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductLine);
  }

  async getProductLinesBySeries(categorySlug: string, seriesSlug: string): Promise<ProductLine[]> {
    const raw = await cmsClient.get<any>(`/product-lines?where[category.slug][equals]=${categorySlug}&where[series.slug][equals]=${seriesSlug}&limit=100`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductLine);
  }

  async getProductLineBySlug(categorySlug: string, seriesSlug: string, productLineSlug: string): Promise<ProductLine | undefined> {
    const raw = await cmsClient.get<any>(`/product-lines?where[category.slug][equals]=${categorySlug}&where[series.slug][equals]=${seriesSlug}&where[slug][equals]=${productLineSlug}`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.length > 0 ? mapCMSProductLine(docs[0]) : undefined;
  }

  async getProductVariantsByProductLine(categorySlug: string, seriesSlug: string, productLineSlug: string): Promise<ProductVariant[]> {
    const raw = await cmsClient.get<any>(`/variants?where[category.slug][equals]=${categorySlug}&where[series.slug][equals]=${seriesSlug}&where[productLine.slug][equals]=${productLineSlug}&limit=100`);
    const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
    return docs.map(mapCMSProductVariant);
  }

  async getSourcingRegions(): Promise<SourcingRegion[]> {
    try {
      const raw = await cmsClient.get<any>("/sourcing-regions?sort=order&limit=100");
      const docs = Array.isArray(raw) ? raw : (raw?.docs ?? []);
      if (docs.length === 0) {
        return this.mockProvider.getSourcingRegions();
      }
      return docs.map(mapCMSSourcingRegion);
    } catch {
      return this.mockProvider.getSourcingRegions();
    }
  }
}
