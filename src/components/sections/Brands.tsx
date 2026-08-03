import { getBrands } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BrandRail } from "@/components/sections/BrandRail";

export async function Brands() {
  const brands = await getBrands();
  return (
    <section id="brands" className="brands-section" aria-labelledby="brands-title">
      <ScrollReveal className="section-header-wrapper">
        <SectionTitle id="brands-title" eyebrow="BRANDS WE IMPORT" title="แบรนด์ที่เรานำเข้า" center />
      </ScrollReveal>
      <BrandRail brands={brands} />
    </section>
  );
}
