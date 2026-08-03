"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Category } from "@/types";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";

interface CategoryCardsGridProps {
  categories: Category[];
}

export function CategoryCardsGrid({ categories }: CategoryCardsGridProps) {
  return (
    <StaggerGroup className="home-category-cards-grid">
      {categories.map((cat) => (
        <motion.div key={cat.id} variants={staggerItem}>
          <a
            href={`/products#${cat.slug}`}
            className="home-category-card"
            aria-label={`หมวดหมู่ ${cat.thai} / ${cat.english}`}
          >
            <div className="home-category-photo-container">
              <Image
                src={cat.coverImage.src}
                alt={cat.coverImage.alt}
                title={cat.coverImage.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={90}
                className="home-category-img"
                priority={cat.slug === "crabs" || cat.slug === "squid"}
              />
              {/* Hover state: solid navy bar sliding up */}
              <div className="home-category-hover-overlay">
                <span className="home-category-overlay-title">
                  {cat.thai} / {cat.english}
                </span>
              </div>
            </div>
          </a>
        </motion.div>
      ))}
    </StaggerGroup>
  );
}
