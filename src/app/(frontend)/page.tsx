import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { BrandValues } from "@/components/sections/BrandValues";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { SocialReels } from "@/components/sections/SocialReels";
import { GlobalSupply } from "@/components/sections/GlobalSupply";
import { Brands } from "@/components/sections/Brands";
import { NewsSection } from "@/components/sections/NewsSection";
import { Contact } from "@/components/sections/Contact";
import { getNavigation, getFeaturedNews, getContactLinks, getContact, getSourcingRegions } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [navItems, featuredNews, contactLinks, contact, sourcingRegions] = await Promise.all([
    getNavigation(),
    getFeaturedNews(3),
    getContactLinks(),
    getContact(),
    getSourcingRegions(),
  ]);

  return (
    <main id="home" className="site-shell">
      <Navbar navItems={navItems} />
      <div id="main-content" tabIndex={-1} />
      <Hero />
      <AboutPreview />
      <ProductCategories />
      <SocialReels />
      <Brands />
      <GlobalSupply regions={sourcingRegions} />
      <BrandValues />
      <NewsSection news={featuredNews} />
      <Contact contactLinks={contactLinks} />
      <Footer navItems={navItems} contact={contact} />
    </main>
  );
}
