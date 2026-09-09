'use client';

import React, { useRef, useState, useEffect } from 'react';

const BRAND_VALUES = [
  {
    id: 'bv-1',
    prefix: 'GOOD',
    highlight: 'LEARNING',
    desc: 'เปิดรับความรู้ใหม่ พัฒนาทักษะและมาตรฐานอย่างไม่หยุดยั้ง',
  },
  {
    id: 'bv-2',
    prefix: 'GOOD',
    highlight: 'GOAL',
    desc: 'เป้าหมายชัดเจน มุ่งมั่นขับเคลื่อนธุรกิจสู่ความสำเร็จร่วมกัน',
  },
  {
    id: 'bv-3',
    prefix: 'GOOD',
    highlight: 'TEAM',
    desc: 'ผสานพลังทีมงานมืออาชีพ ร่วมแรงร่วมใจเพื่อผลลัพธ์ที่ดีที่สุด',
  },
  {
    id: 'bv-4',
    prefix: 'GOOD',
    highlight: 'JOB',
    desc: 'ส่งมอบคุณภาพและความเป็นเลิศระดับสากลในทุกคำสั่งซื้อ',
  },
];

export function BrandValues({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = containerRef.current.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
              const currentScroll = -rect.top;
              const p = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const count = BRAND_VALUES.length;
  const activePosition = progress * (count - 1);
  const currentIndex = Math.min(Math.round(activePosition), count - 1);

  return (
    <section ref={containerRef} className={`relative h-[300vh] bg-white ${className}`.trim()}>
      {/* Sticky Viewport ล็อกกลางจอ */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
        
        {/* Badge หัวข้อด้านบน */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-50/80 border border-orange-200/90 shadow-sm mb-6 sm:mb-10 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f58220] animate-pulse" />
          <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-[#082b59] uppercase">
            Our Core Values
          </span>
        </div>

        {/* Stage ข้อความใหญ่พิเศษ (กว้าง 95vw เต็มตา) */}
        <div className="relative h-[280px] sm:h-[340px] md:h-[380px] w-full max-w-[95vw] flex items-center justify-center">
          {BRAND_VALUES.map((item, index) => {
            const diff = index - activePosition;
            const distance = Math.abs(diff);

            const translateY = diff * 130;
            const opacity = Math.max(1 - distance * 1.35, 0);
            const scale = Math.max(1 - distance * 0.08, 0.92);
            const blurValue = Math.min(distance * 6, 8);

            return (
              <div
                key={item.id}
                style={{
                  transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                  opacity: opacity,
                  filter: `blur(${blurValue}px)`,
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out',
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center select-none will-change-transform"
              >
                {/* หัวข้อหลักตัวยักษ์ บังคับขนาดด้วย Inline Style clamp() */}
                <h2 
                  style={{
                    fontSize: 'clamp(2.4rem, 7.2vw, 8.5rem)',
                    lineHeight: 1.05,
                  }}
                  className="font-black tracking-tight flex items-center justify-center gap-3 sm:gap-6 md:gap-8 whitespace-nowrap"
                >
                  <span className="text-[#082b59] drop-shadow-sm">{item.prefix}</span>
                  <span className="bg-gradient-to-r from-[#f58220] via-[#ea580c] to-[#c2410c] bg-clip-text text-transparent drop-shadow-sm">
                    {item.highlight}
                  </span>
                </h2>

                {/* คำอธิบายภาษาไทยใต้ข้อความ */}
                <p className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-xl md:text-2xl font-bold text-slate-600 max-w-3xl leading-relaxed px-4">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* แถบเส้นขีดบอกสถานะ 4 ขีด */}
        <div className="flex items-center gap-2.5 mt-8 sm:mt-12 select-none">
          {BRAND_VALUES.map((_, i) => {
            const isActive = currentIndex === i;
            return (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-12 bg-[#f58220]' : 'w-3.5 bg-slate-200'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default BrandValues;
