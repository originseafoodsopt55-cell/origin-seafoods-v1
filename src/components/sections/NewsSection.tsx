"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";
import { NewsCard } from "@/components/news/NewsCard";

export function NewsSection({ news }: { news: NewsArticle[] }) {
  if (!news || news.length === 0) return null;

  return (
    <section id="news" className="news-section">
      <Container>
        <ScrollReveal className="news-section-header">
          <p className="section-label">CORPORATE NEWSROOM</p>
          <h2>ข่าวสารและกิจกรรมองค์กร</h2>
        </ScrollReveal>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {news.map((item) => (
            <motion.div key={item.id} variants={staggerItem} className="h-full">
              <NewsCard news={item} />
            </motion.div>
          ))}
        </StaggerGroup>

        <div className="news-section-footer mt-8 md:mt-10 flex justify-center">
          <Button
            variant="outline"
            href="/news"
            className="!h-auto px-8 py-3 text-sm md:text-base font-bold rounded-full inline-flex items-center justify-center gap-2"
          >
            <span>ข่าวทั้งหมด / View All News</span>
            <ArrowRight size={18} className="ml-1" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
