import { getBrands } from "@/lib/data";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { BrandRail } from "@/components/sections/BrandRail";

export async function Brands() {
  const brands = await getBrands();
  return (
    <section id="brands" className="brands-section overflow-hidden w-full max-w-full" aria-labelledby="brands-title">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="section-header-wrapper">
          <SectionTitle id="brands-title" eyebrow="BRANDS WE IMPORT" title="แบรนด์ที่เรานำเข้า" center />
        </ScrollReveal>
        <BrandRail brands={brands} />
      </div>
    </section>
  );
}
