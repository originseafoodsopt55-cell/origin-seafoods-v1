import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/data";
import { sortCategories } from "@/lib/categoryOrder";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CategoryCardsGrid } from "@/components/sections/CategoryCardsGrid";

export async function ProductCategories() {
  const categories = await getCategories();
  const sortedCategories = sortCategories(categories);
  return (
    <section id="products" className="products-section" aria-labelledby="products-title">
      <Container compact>
        <ScrollReveal className="section-header-wrapper">
          <SectionTitle id="products-title" eyebrow="PRODUCT CATEGORIES" title="หมวดหมู่สินค้า" center />
        </ScrollReveal>

        <CategoryCardsGrid categories={sortedCategories} />

        <div className="home-category-action-row">
          <Button variant="outline" href="/products">
            ดูสินค้าทั้งหมด <ArrowRight size={17} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
