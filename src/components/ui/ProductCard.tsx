"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article className="product-card" whileHover={shouldReduceMotion ? undefined : { y: -4 }}>
      <div className="product-photo">
        <Image src={product.image.src} alt={product.image.alt} title={product.image.title} fill sizes="(max-width: 700px) 48vw, (max-width: 1100px) 30vw, 190px" quality={90} loading="lazy" decoding="async" />
      </div>
      <h3>{product.thai}</h3>
      <p>{product.english}</p>
    </motion.article>
  );
}
