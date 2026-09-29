"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface ReelItem {
  id: string;
  title: string;
  category: "arrival" | "kitchen";
  reelUrl: string;
  thumbnail: string;
}

// Mock Data เริ่มต้น 4 รายการ (อิงจากคลิปจริงของ Origin Seafoods)
export const DEFAULT_REELS: ReelItem[] = [
  {
    id: '1',
    title: 'หอยหลอดย่างเนย-ย่างชีส 🧈',
    category: 'kitchen',
    reelUrl: 'https://www.facebook.com/reel/1410816437148571',
    thumbnail: '/images/reels/reel-1.jpg',
  },
  {
    id: '2',
    title: 'หมึกดำย่างหมาล่า 🦑',
    category: 'kitchen',
    reelUrl: 'https://www.facebook.com/reel/1223669059964766',
    thumbnail: '/images/reels/reel-2.png',
  },
  {
    id: '3',
    title: 'หมึกอาร์เจนชุบแป้งทอด แบบผ่า - ทั้งตัว 🦑✨',
    category: 'kitchen',
    reelUrl: 'https://www.facebook.com/reel/1688202829096998',
    thumbnail: '/images/reels/reel-3.jpg',
  },
  {
    id: '4',
    title: 'หมึกดำผัดพริกแกงใต้ 🦑',
    category: 'kitchen',
    reelUrl: 'https://www.facebook.com/reel/1798535037829134',
    thumbnail: '/images/reels/reel-4.png',
  },
];

function ReelCard({
  reel,
  onSelect,
}: {
  reel: ReelItem;
  onSelect: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onSelect}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-[#072a58] border border-slate-200/60"
    >
      {/* 1. รูปปกภาพ Thumbnail หรือ Fallback เมื่อยังไม่มีรูปในเครื่อง */}
      {!hasError && reel.thumbnail ? (
        <Image
          src={reel.thumbnail}
          alt={reel.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setHasError(true)}
        />
      ) : (
        /* Fallback Placeholder สี Navy สวยงามเมื่อยังไม่มีรูป */
        <div className="absolute inset-0 bg-gradient-to-br from-[#072a58] via-[#0b3d7a] to-[#041935] p-5 flex flex-col justify-between select-none">
          <div className="w-full flex justify-end">
            <span className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
              {reel.category === "arrival" ? "🚢" : "🍳"}
            </span>
          </div>
          <div className="space-y-2">
            <span className="inline-block text-[10px] font-bold text-[#f57e2a] tracking-widest uppercase">
              ORIGIN REELS
            </span>
            <p className="text-white text-xs sm:text-sm font-semibold line-clamp-3 leading-snug">
              {reel.title}
            </p>
          </div>
        </div>
      )}

      {/* 2. Gradient บางๆ ด้านล่าง เพื่อไม่บังรูปปกจริงที่มีตัวหนังสืออยู่แล้ว */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* 3. ป้าย Category Badge ด้านบนซ้าย */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full text-white tracking-wide shadow-sm ${
            reel.category === "arrival" ? "bg-[#f57e2a]" : "bg-[#0e76bc]"
          }`}
        >
          {reel.category === "arrival" ? "NEW ARRIVAL" : "ORIGIN RECIPE"}
        </span>
      </div>

      {/* 4. ปุ่ม Play Glassmorphism ที่มุมบนขวา เพื่อไม่บังจุดเด่นตรงกลางภาพ */}
      <div className="absolute top-3 right-3 z-10">
        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#f57e2a] group-hover:border-[#f57e2a] transition-all duration-300 shadow-md">
          <svg
            className="w-3.5 h-3.5 ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* 5. ชื่อคลิปด้านล่าง (กรณีมีรูปภาพปกจริง) */}
      {!hasError && (
        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10">
          <h3 className="text-white text-xs sm:text-sm font-medium line-clamp-2 leading-snug drop-shadow-sm group-hover:text-[#5bb5e6] transition-colors">
            {reel.title}
          </h3>
        </div>
      )}
    </div>
  );
}

export function SocialReels({ items = DEFAULT_REELS }: { items?: ReelItem[] }) {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  // แปลง Reel URL เป็น Facebook Embed URL
  const getEmbedUrl = (url: string) => {
    // ป้องกันกรณี URL มี Markdown syntax [text](url) หรือช่องว่าง
    const cleanUrl = url.replace(/\[.*?\]\((.*?)\)/, "$1").trim();
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}&show_text=false&t=0`;
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-[#f8fbfe] border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* [แทรกใหม่] แบนเนอร์ Facebook Community แบบพรีเมียม (Background Image) */}
        <div
          className="mb-12 relative w-full overflow-hidden rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 gap-8 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/reels/origins-kitchen-cover.jpg')" }}
        >
          {/* Gradient Overlay: สีเทาเข้มฝั่งซ้าย ค่อยๆ จางหายไปทางขวาเพื่อโชว์รูป */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/60 to-transparent pointer-events-none" />

          {/* ฝั่งซ้าย: ข้อความเชิญชวน (ตัวหนังสือสีขาว) */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold tracking-wider mb-4 border border-white/20 backdrop-blur-md shadow-sm">
              <svg className="w-4 h-4 text-[#f57e2a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              JOIN OUR COMMUNITY
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
              ติดตามเพจ <span className="text-[#f57e2a]">Origin&apos;s Kitchen</span>
            </h3>
            <p className="text-gray-200 text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed drop-shadow-md">
              อัปเดตวัตถุดิบเข้าใหม่ ไอเดียเมนูอาหารทะเลสดๆ และโปรโมชั่นพิเศษก่อนใคร ร่วมกับผู้ติดตามกว่า 7,000 คน
            </p>
          </div>

          {/* ฝั่งขวา: Facebook Page Plugin (ปรับขนาดและปิด adapt_container_width) */}
          <div className="relative z-10 shrink-0 bg-white rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/20 backdrop-blur-sm">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOriginseafoods&tabs=&width=340&height=150&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId"
              width="340"
              height="150"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Origin Seafoods Facebook Page"
            />
          </div>
        </div>

        {/* Header ส่วนหัวข้อ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#f57e2a] uppercase mb-2">
              ORIGIN KITCHEN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#072a58] tracking-tight">
              รีวิวเมนูเด็ดจากครัวออริจิน
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              ชมการรังสรรค์เมนูอาหารทะเลจากวัตถุดิบคุณภาพ พร้อมไอเดียความอร่อยในแบบฉบับออริจิน
            </p>
          </div>

          <a
            href="https://www.facebook.com/Originseafoods/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#0e76bc] hover:text-[#072a58] transition-colors"
          >
            <span>ดู Reels ทั้งหมดบน Facebook</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        {/* ตารางการ์ด Reels 4 คลิป (Aspect 9:16) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {items.slice(0, 4).map((reel) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              onSelect={() => setActiveReel(reel)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal สำหรับเล่นคลิป Facebook Reel */}
      {activeReel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeReel.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative w-full max-w-[360px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ปุ่มปิด Modal */}
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="ปิดวิดีโอ"
            >
              ✕
            </button>

            {/* iFrame Facebook Player */}
            <iframe
              src={getEmbedUrl(activeReel.reelUrl)}
              className="w-full h-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default SocialReels;
