"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import type { Company, Feature } from "@/types";
import { mapIcon } from "@/lib/iconMapper";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";

interface AboutProps {
  company: Company & {
    features: Feature[];
  };
}

export function About({ company }: AboutProps) {
  const { features } = company;

  return (
    <section id="about" className="about-section">
      <Container className="about-grid">
        <ScrollReveal className="about-copy">
          <p className="section-label">ABOUT US</p>
          <h2>เกี่ยวกับเรา</h2>
          <strong>Origin Seafoods Co., Ltd.</strong>
          <p>{company.description}</p>
          <StaggerGroup className="feature-row">
            {features.map((feature) => {
              const Icon = mapIcon(feature.icon);
              return (
                <motion.div key={feature.title} className="feature-tile" variants={staggerItem}>
                  <Icon size={32} />
                  <span>{feature.title}</span>
                  <small>{feature.subtitle}</small>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </ScrollReveal>
        <ScrollReveal className="about-image" y={40} delay={0.15}>
          <Image
            src={company.assets.warehouse.src}
            alt={company.assets.warehouse.alt}
            title={company.assets.warehouse.title}
            fill
            sizes="(max-width: 900px) 100vw, 760px"
            quality={88}
            loading="lazy"
            decoding="async"
          />
        </ScrollReveal>
      </Container>
    </section>
  );
}
