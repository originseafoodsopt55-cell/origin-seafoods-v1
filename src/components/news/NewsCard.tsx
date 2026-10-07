import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsArticle } from "@/types";

interface NewsCardProps {
  news: NewsArticle;
  categoryLabel?: string;
  aspectRatio?: "4/3" | "video";
}

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

/**
 * ดึงชื่อหมวดหมู่ของข่าวแบบไดนามิกจาก field category หรือ categories (array)
 * หากไม่ได้กำหนด ให้ใช้ค่า fallback เช่น "ข่าวสารทั่วไป"
 */
export function getCategoryBadgeLabel(
  news: NewsArticle,
  fallbackLabel = "ข่าวสารทั่วไป"
): string {
  // 1. ตรวจสอบ field category (string)
  if (news.category && typeof news.category === "string" && news.category.trim()) {
    return news.category.trim();
  }

  // 2. ตรวจสอบ field categories (array ของ object หรือ string)
  if (Array.isArray(news.categories) && news.categories.length > 0) {
    const firstCat = news.categories[0];
    if (typeof firstCat === "string" && firstCat.trim()) {
      return firstCat.trim();
    }
    if (firstCat && typeof firstCat === "object") {
      const label =
        firstCat.thaiTitle ||
        firstCat.title ||
        firstCat.englishTitle ||
        firstCat.name;
      if (label && typeof label === "string" && label.trim()) {
        return label.trim();
      }
    }
  }

  return fallbackLabel;
}

export function NewsCard({
  news,
  categoryLabel,
  aspectRatio = "4/3",
}: NewsCardProps) {
  const aspectClass = aspectRatio === "video" ? "aspect-video" : "aspect-[4/3]";
  const resolvedCategory = categoryLabel || getCategoryBadgeLabel(news, "ข่าวสารทั่วไป");

  return (
    <Link
      href={`/news/${news.slug}`}
      className="group flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100"
      aria-label={`อ่านข่าวสาร ${news.title}`}
    >
      {/* 1. Image Section */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-slate-100`}>
        <Image
          src={news.coverImage.src}
          alt={news.coverImage.alt || news.title}
          title={news.coverImage.title || news.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge หมวดหมู่แบบไดนามิก (มุมขวาบน พื้นหลังสีส้มแบรนด์ ตัวหนังสือสีขาว) */}
        {resolvedCategory && (
          <div className="absolute top-3 right-3 z-10 inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-[#f57e2a] rounded-full shadow-md tracking-wide">
            {resolvedCategory}
          </div>
        )}
      </div>

      {/* 2. Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* วันที่เผยแพร่ */}
        {news.publishedDate && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5 font-medium">
            <Calendar size={13} aria-hidden="true" />
            <span>{formatDate(news.publishedDate)}</span>
          </div>
        )}

        {/* หัวข้อข่าว (จำกัดความยาว 2 บรรทัด) */}
        <h3 className="text-lg md:text-xl font-bold text-[#072a58] mb-3 line-clamp-2 leading-snug group-hover:text-[#f57e2a] transition-colors">
          {news.title}
        </h3>

        {/* เนื้อหาเกริ่นนำ (จำกัดความยาว 3 บรรทัด) */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {news.summary}
        </p>

        {/* ปุ่ม "อ่านต่อ" (ชิดขอบล่างซ้ายเสมอ สไตล์สีส้มพร้อมลูกศร) */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[#f57e2a] font-bold text-sm group-hover:text-[#e06917] transition-colors">
          <span className="inline-flex items-center gap-1.5">
            อ่านต่อ <span className="text-xs font-normal text-slate-400">/ Read More</span>
          </span>
          <ArrowRight
            size={16}
            className="transform group-hover:translate-x-1.5 transition-transform duration-300"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
