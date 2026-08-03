import Image from "next/image";
import { assets } from "@/lib/assets";

export function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <Image
        src={assets.hero.background.src}
        alt=""
        title={assets.hero.background.title}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="hero-background-image"
        style={{ objectFit: "cover", objectPosition: "center center" }}
      />
    </div>
  );
}
