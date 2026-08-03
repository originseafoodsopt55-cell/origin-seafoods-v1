"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsArticle } from "@/types";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { StaggerGroup, staggerItem } from "@/components/motion/StaggerGroup";
import { Container } from "@/components/ui/Container";

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function NewsSection({ news }: { news: NewsArticle[] }) {
  if (!news || news.length === 0) return null;

  return (
    <section id="news" className="news-section">
      <Container>
        <ScrollReveal className="news-section-header">
          <p className="section-label">CORPORATE NEWSROOM</p>
          <h2>ข่าวสารและกิจกรรมองค์กร</h2>
        </ScrollReveal>

        <StaggerGroup className={`news-grid news-grid-cols-${Math.min(news.length, 3)}`}>
          {news.map((item, idx) => (
            <motion.div key={item.id} variants={staggerItem}>
              <Link
                href={`/news/${item.slug}`}
                className={`news-card ${idx === 0 ? "news-card-featured" : "news-card-supporting"}`}
                aria-label={`อ่านข่าวสาร ${item.title}`}
              >
                <div className="news-card-photo-container">
                  <Image
                    src={item.coverImage.src}
                    alt={item.coverImage.alt}
                    title={item.coverImage.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    className="news-card-img"
                  />
                  <div className="news-card-date-badge">
                    <Calendar size={13} aria-hidden="true" />
                    <span>{formatDate(item.publishedDate)}</span>
                  </div>
                </div>

                <div className="news-card-content">
                  <h3 className="news-card-title">{item.title}</h3>
                  <p className="news-card-summary">{item.summary}</p>
                  <div className="news-card-footer">
                    <span className="news-card-link-text">อ่านรายละเอียด / Read More</span>
                    <ArrowRight size={15} className="news-card-arrow" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerGroup>

        <div className="news-section-footer">
          <Button variant="outline" href="/news">
            ข่าวทั้งหมด / View All News <ArrowRight size={16} className="ml-1" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
