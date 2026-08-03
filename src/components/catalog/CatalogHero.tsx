import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "./Breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CatalogHeroProps {
  breadcrumbItems: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description?: string;
}

export function CatalogHero({ breadcrumbItems, eyebrow, title, description }: CatalogHeroProps) {
  return (
    <section className="catalog-hero-section">
      <Container compact>
        <Breadcrumb items={breadcrumbItems} />
        <div className="catalog-header-text">
          <SectionTitle eyebrow={eyebrow} title={title} center={false} />
          {description && <p className="catalog-intro-desc">{description}</p>}
        </div>
      </Container>
    </section>
  );
}
