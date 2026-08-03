import type { IContentProvider, ProductQueryParams, PaginatedProducts, NewsQueryParams, PaginatedNews } from "../interfaces/IContentProvider";
import { company, features, countries } from "@/lib/data/company";
import { productSeries, productGroups, productVariants } from "@/lib/data/products";
import { series } from "@/lib/data/series";
import { productLines } from "@/lib/data/productLines";
import { brands } from "@/lib/data/brands";
import { gallery } from "@/lib/data/gallery";
import { navItems } from "@/lib/data/navigation";
import { contact, contactLinks } from "@/lib/data/contact";
import { categories } from "@/lib/data/categories";
import { mockSourcingRegions } from "@/lib/data/sourcing";
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

export class MockContentProvider implements IContentProvider {
  async getCompany(): Promise<Company> {
    return company;
  }

  async getFeatures(): Promise<Feature[]> {
    return features;
  }

  async getCountries(): Promise<Country[]> {
    return countries;
  }

  async getProducts(): Promise<ProductVariant[]> {
    return productVariants;
  }

  async queryProducts(params?: ProductQueryParams): Promise<PaginatedProducts> {
    let filtered = [...productVariants];

    if (params) {
      const { categorySlug, seriesSlug, productLineSlug, status } = params;
      if (categorySlug) {
        filtered = filtered.filter((p) => p.categorySlug === categorySlug);
      }
      if (seriesSlug) {
        filtered = filtered.filter((p) => p.seriesSlug === seriesSlug);
      }
      if (productLineSlug) {
        filtered = filtered.filter((p) => (p.productLineSlug ?? p.groupSlug) === productLineSlug);
      }
      if (status) {
        filtered = filtered.filter((p) => p.status === status);
      }
    }

    const total = filtered.length;
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const pageSize = limit;
    
    const startIndex = (page - 1) * limit;
    const items = filtered.slice(startIndex, startIndex + limit);
    const hasNextPage = startIndex + limit < total;

    return {
      items,
      total,
      page,
      pageSize,
      hasNextPage
    };
  }


  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getBrands(): Promise<Brand[]> {
    return brands;
  }

  async getGallery(): Promise<GalleryItem[]> {
    return gallery;
  }

  async getNavigation(): Promise<NavigationItem[]> {
    return navItems;
  }

  async getContact(): Promise<ContactInformation> {
    return contact;
  }

  async getContactLinks(): Promise<ContactLink[]> {
    return contactLinks;
  }

  // Corporate Newsroom Stubs
  async getFeaturedNews(_limit = 3): Promise<NewsArticle[]> {
    return [];
  }

  async getAllNews(params?: NewsQueryParams): Promise<PaginatedNews> {
    return { items: [], total: 0, page: 1, pageSize: params?.limit ?? 9, hasNextPage: false };
  }

  async getNewsBySlug(_slug: string): Promise<NewsArticle | undefined> {
    return undefined;
  }

  async getRelatedNews(_currentSlug: string, _limit = 3): Promise<NewsArticle[]> {
    return [];
  }

  // B2B Catalog Dynamic Queries
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return categories.find((c) => c.slug === slug);
  }

  async getSeries(): Promise<Series[]> {
    return series;
  }

  async getProductLines(): Promise<ProductLine[]> {
    return productLines;
  }

  async getProductSeriesByCategory(categorySlug: string): Promise<ProductSeries[]> {
    return productSeries.filter((s) => s.categorySlug === categorySlug);
  }

  async getProductSeriesBySlug(categorySlug: string, seriesSlug: string): Promise<ProductSeries | undefined> {
    return productSeries.find((s) => s.categorySlug === categorySlug && s.slug === seriesSlug);
  }

  async getProductGroupsBySeries(categorySlug: string, seriesSlug: string): Promise<ProductGroup[]> {
    return productGroups.filter((g) => g.categorySlug === categorySlug && g.seriesSlug === seriesSlug);
  }

  async getProductLinesBySeries(categorySlug: string, seriesSlug: string): Promise<ProductLine[]> {
    return productLines.filter((line) => line.categorySlug === categorySlug && line.seriesSlug === seriesSlug);
  }

  async getProductGroupBySlug(categorySlug: string, seriesSlug: string, groupSlug: string): Promise<ProductGroup | undefined> {
    return productGroups.find(
      (g) => g.categorySlug === categorySlug && g.seriesSlug === seriesSlug && g.slug === groupSlug
    );
  }

  async getProductLineBySlug(categorySlug: string, seriesSlug: string, productLineSlug: string): Promise<ProductLine | undefined> {
    return productLines.find(
      (line) => line.categorySlug === categorySlug && line.seriesSlug === seriesSlug && line.slug === productLineSlug
    );
  }

  async getProductVariantsByGroup(categorySlug: string, seriesSlug: string, groupSlug: string): Promise<ProductVariant[]> {
    return productVariants.filter(
      (v) => v.categorySlug === categorySlug && v.seriesSlug === seriesSlug && v.groupSlug === groupSlug
    );
  }

  async getProductVariantsByProductLine(categorySlug: string, seriesSlug: string, productLineSlug: string): Promise<ProductVariant[]> {
    return productVariants.filter(
      (v) =>
        v.categorySlug === categorySlug &&
        v.seriesSlug === seriesSlug &&
        (v.productLineSlug ?? v.groupSlug) === productLineSlug
    );
  }

  async getProductVariantBySlug(
    categorySlug: string,
    seriesSlug: string,
    productLineSlug: string,
    variantSlug: string
  ): Promise<ProductVariant | undefined> {
    return productVariants.find(
      (v) =>
        v.categorySlug === categorySlug &&
        v.seriesSlug === seriesSlug &&
        (v.productLineSlug ?? v.groupSlug) === productLineSlug &&
        v.slug === variantSlug
    );
  }

  async getSourcingRegions(): Promise<SourcingRegion[]> {
    return mockSourcingRegions;
  }
}
