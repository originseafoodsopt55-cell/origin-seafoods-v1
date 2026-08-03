import Image from "next/image";
import { assets } from "@/lib/assets";
import type { ReactNode } from "react";
import type { HeroContent as HeroContentData } from "@/types";

interface HeroContentProps {
  content: HeroContentData;
  children: ReactNode;
}

export function HeroContent({ content, children }: HeroContentProps) {
  return (
    <div className="hero-content">
      <Image
        src={assets.company.logo.src}
        alt="Origin Seafoods Logo"
        width={520}
        height={180}
        priority
        className="hero-logo-image"
      />
      <h1 id="hero-title">{content.title}</h1>
      <p className="hero-thai">{content.description}</p>
      <p className="hero-subtitle">{content.subtitle}</p>
      <p className="hero-accent">{content.accent}</p>
      {children}
    </div>
  );
}
