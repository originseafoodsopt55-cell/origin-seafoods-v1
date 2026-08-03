import { getCompany } from "@/lib/data";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { HeroButtons } from "@/components/sections/hero/HeroButtons";
import { HeroContent } from "@/components/sections/hero/HeroContent";
import { HeroOverlay } from "@/components/sections/hero/HeroOverlay";
import { HeroProducts } from "@/components/sections/hero/HeroProducts";
import { ScrollIndicator } from "@/components/sections/hero/ScrollIndicator";

export async function Hero() {
  const company = await getCompany();
  return (
    <section className="hero-approved" aria-labelledby="hero-title">
      <HeroBackground />
      <HeroOverlay />
      <HeroContent content={company.hero}>
        <HeroButtons primary={company.hero.primaryButton} secondary={company.hero.secondaryButton} />
      </HeroContent>
      <HeroProducts />
      <ScrollIndicator />
    </section>
  );
}
