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

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  categorySlug?: string;
  seriesSlug?: string;
  productLineSlug?: string;
  status?: string;
}

export interface PaginatedProducts {
  items: ProductVariant[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface NewsQueryParams {
  page?: number;
  limit?: number;
  featuredOnly?: boolean;
}

export interface PaginatedNews {
  items: NewsArticle[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface IContentProvider {
  getCompany(): Promise<Company>;
  getFeatures(): Promise<Feature[]>;
  getCountries(): Promise<Country[]>;
  getProducts(): Promise<ProductVariant[]>;
  queryProducts(params?: ProductQueryParams): Promise<PaginatedProducts>;
  getCategories(): Promise<Category[]>;
  getBrands(): Promise<Brand[]>;
  getGallery(): Promise<GalleryItem[]>;
  getNavigation(): Promise<NavigationItem[]>;
  getContact(): Promise<ContactInformation>;
  getContactLinks(): Promise<ContactLink[]>;

  // Corporate Newsroom
  getFeaturedNews(limit?: number): Promise<NewsArticle[]>;
  getAllNews(params?: NewsQueryParams): Promise<PaginatedNews>;
  getNewsBySlug(slug: string): Promise<NewsArticle | undefined>;
  getRelatedNews(currentSlug: string, limit?: number): Promise<NewsArticle[]>;

  // Global Supply Network
  getSourcingRegions(): Promise<SourcingRegion[]>;

  // B2B Catalog dynamic queries
  getSeries(): Promise<Series[]>;
  getProductLines(): Promise<ProductLine[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getProductSeriesByCategory(categorySlug: string): Promise<ProductSeries[]>;
  getProductSeriesBySlug(categorySlug: string, seriesSlug: string): Promise<ProductSeries | undefined>;
  getProductLinesBySeries(categorySlug: string, seriesSlug: string): Promise<ProductLine[]>;
  getProductLineBySlug(categorySlug: string, seriesSlug: string, productLineSlug: string): Promise<ProductLine | undefined>;
  getProductVariantsByProductLine(categorySlug: string, seriesSlug: string, productLineSlug: string): Promise<ProductVariant[]>;
  getProductGroupsBySeries(categorySlug: string, seriesSlug: string): Promise<ProductGroup[]>;
  getProductGroupBySlug(categorySlug: string, seriesSlug: string, groupSlug: string): Promise<ProductGroup | undefined>;
  getProductVariantsByGroup(categorySlug: string, seriesSlug: string, groupSlug: string): Promise<ProductVariant[]>;
  getProductVariantBySlug(categorySlug: string, seriesSlug: string, productLineSlug: string, variantSlug: string): Promise<ProductVariant | undefined>;
}
