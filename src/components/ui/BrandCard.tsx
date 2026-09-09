import Image from "next/image";
import type { Brand } from "@/types";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const hasLogo = brand.logo && brand.logo.src;

  return (
    <div
      className="group flex flex-col items-center justify-center w-full min-h-[90px] md:min-h-[140px] p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      title={brand.name}
    >
      {hasLogo ? (
        <div className="relative w-full h-12 md:h-20 max-w-[130px] md:max-w-[200px] flex items-center justify-center">
          <Image
            src={brand.logo!.src}
            alt={brand.logo!.alt || `${brand.name} logo`}
            width={200}
            height={80}
            className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-200"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-1 w-full overflow-hidden">
          <span className="text-xs sm:text-sm md:text-base font-bold text-gray-800 truncate max-w-full">
            {brand.name}
          </span>
          {brand.sub && (
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate max-w-full mt-0.5">
              {brand.sub}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
