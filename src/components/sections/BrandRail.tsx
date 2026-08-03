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
    <StaggerGroup className="brand-rail" fast={true}>
      {brands.map((brand) => (
        <motion.div key={brand.name} variants={staggerItem}>
          <BrandCard brand={brand} />
        </motion.div>
      ))}
    </StaggerGroup>
  );
}
