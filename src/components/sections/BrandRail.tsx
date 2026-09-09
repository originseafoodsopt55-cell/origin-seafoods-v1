"use client";

import { motion } from "framer-motion";
import type { Brand } from "@/types";
import { BrandCard } from "@/components/ui/BrandCard";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";

interface BrandRailProps {
  brands: Brand[];
}

export function BrandRail({ brands }: BrandRailProps) {
  return (
    <StaggerGroup
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 w-full max-w-full"
      fast={true}
    >
      {brands.map((brand) => (
        <motion.div key={brand.name} variants={staggerItem} className="w-full min-w-0">
          <BrandCard brand={brand} />
        </motion.div>
      ))}
    </StaggerGroup>
  );
}
