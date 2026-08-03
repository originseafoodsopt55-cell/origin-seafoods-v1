import Image from "next/image";
import { assets } from "@/lib/assets";

const HERO_PRODUCTS = [
  { id: 1, name: "Blue Swimming Crab", asset: assets.hero.products.blueSwimmingCrab },
  { id: 2, name: "Three Spot Swimming Crab", asset: assets.hero.products.threeSpotSwimmingCrab },
  { id: 3, name: "Squid", asset: assets.hero.products.squid },
  { id: 4, name: "Jellyfish", asset: assets.hero.products.jellyfish },
  { id: 5, name: "Sea Snail", asset: assets.hero.products.seaSnail },
  { id: 6, name: "Blood Cockle", asset: assets.hero.products.bloodCockle },
  { id: 7, name: "Half Shell Scallop", asset: assets.hero.products.halfShellScallop }
];

export function HeroProducts() {
  return (
    <div className="hero-products" aria-hidden="true">
      {HERO_PRODUCTS.map((product) => (
        <div key={product.id} className={`hero-product hero-product-${product.id}`}>
          <Image
            src={product.asset.src}
            alt={product.asset.alt}
            fill
            sizes="(max-width: 700px) 34vw, 220px"
            quality={90}
            className="hero-product-img"
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </div>
  );
}
