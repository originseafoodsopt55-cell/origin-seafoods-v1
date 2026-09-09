import Image from "next/image";
import type { Brand } from "@/types";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const hasLogo = brand.logo && brand.logo.src;

  return (
    <div
      className="brand-logo group flex items-center justify-center h-20 sm:h-24 w-full rounded-xl sm:rounded-2xl border border-gray-200/80 bg-white p-3 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      title={brand.name}
    >
      {hasLogo ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={brand.logo!.src}
            alt={brand.logo!.alt || `${brand.name} logo`}
            width={140}
            height={50}
            className="brand-logo-image max-h-10 sm:max-h-12 w-auto max-w-[85%] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="brand-logo-fallback flex flex-col items-center justify-center text-center p-1 w-full overflow-hidden">
          <span className="brand-fallback-name text-xs sm:text-sm font-bold text-gray-800 truncate max-w-full">
            {brand.name}
          </span>
          {brand.sub && (
            <span className="brand-fallback-sub text-[10px] sm:text-xs text-gray-500 truncate max-w-full">
              {brand.sub}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
