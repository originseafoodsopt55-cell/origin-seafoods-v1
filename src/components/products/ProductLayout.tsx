import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

interface ProductLayoutProps {
  breadcrumb: ReactNode;
  gallery: ReactNode;
  info: ReactNode;
  description?: ReactNode;
  specifications?: ReactNode;
  relatedProducts?: ReactNode;
}

export function ProductLayout({
  breadcrumb,
  gallery,
  info,
  description,
  specifications,
  relatedProducts
}: ProductLayoutProps) {
  return (
    <article className="product-detail-layout">
      {/* Breadcrumb section */}
      <div className="product-breadcrumb-wrapper">
        <Container compact>
          {breadcrumb}
        </Container>
      </div>

      {/* Main product showcase grid */}
      <Container compact className="product-showcase-container">
        <div className="product-showcase-grid">
          {/* Left column: Image Gallery */}
          <div className="product-showcase-left">
            {gallery}
          </div>

          {/* Right column: Info & Specifications */}
          <div className="product-showcase-right">
            {info}
            {description}
            {specifications}
          </div>
        </div>
      </Container>

      {/* Related Products Section */}
      {relatedProducts && (
        <section className="product-related-section">
          <Container compact>
            {relatedProducts}
          </Container>
        </section>
      )}
    </article>
  );
}
