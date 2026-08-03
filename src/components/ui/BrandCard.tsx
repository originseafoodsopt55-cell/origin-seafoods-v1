import Image from "next/image";
import type { Brand } from "@/types";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const hasLogo = brand.logo && brand.logo.src;

  return (
    <div className="brand-logo" title={brand.name}>
      {hasLogo ? (
        <Image
          src={brand.logo!.src}
          alt={brand.logo!.alt || `${brand.name} logo`}
          width={140}
          height={50}
          className="brand-logo-image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="brand-logo-fallback">
          <span className="brand-fallback-name">{brand.name}</span>
          {brand.sub && <span className="brand-fallback-sub">{brand.sub}</span>}
        </div>
      )}
    </div>
  );
}
