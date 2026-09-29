import React from "react";
import type { SourcingRegion } from "@/types";

export interface GlobalSupplyProps {
  regions?: SourcingRegion[];
}

export function GlobalSupply({ regions }: GlobalSupplyProps = {}) {
  void regions; // Retain prop compatibility

  return (
    // 1. ปรับความสูงให้เต็มหน้าจอพอดี (หักลบความสูง Header/Navbar ~76px) เพื่อให้สัดส่วน 16:9 แสดงผลได้ครบ
    <section
      id="global-supply"
      className="relative w-full h-[calc(100vh-76px)] min-h-[640px] max-h-[1080px] overflow-hidden flex items-center bg-[#072a58]"
    >
      {/* 2. Video Background: ผลักตำแหน่งไปฝั่งขวาเล็กน้อย (object-[70%_center] หรือ lg:object-[65%_center])
             เพื่อให้เรือและลูกโลกอยู่ฝั่งขวา และเปิดพื้นที่โล่งฝั่งซ้ายให้ตัวหนังสือ */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] lg:object-[65%_center] pointer-events-none"
      >
        <source src="/videos/global-sourcing-loop.mp4" type="video/mp4" />
      </video>

      {/* 3. Gradient Overlay บังฝั่งซ้ายเพื่อความคมชัดของข้อความ */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 via-35% to-transparent lg:w-[55%] pointer-events-none z-[1]" />

      {/* 4. Text & Content Layer ฝั่งซ้าย */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 lg:py-12">
        <div className="max-w-xl">
          {/* Tag หมวดหมู่ */}
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-[#f57e2a] uppercase mb-3">
            GLOBAL SOURCING
          </span>

          {/* พาดหัวหลัก */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072a58] leading-tight mb-5">
            เรานำเข้าสินค้า
            <br className="hidden sm:inline" />
            จากทั่วโลก
          </h2>

          {/* ข้อความบรรยายทางการ (Company Narrative) */}
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal mb-8 text-balance">
            Origin is a global frozen seafood importer, exporter and distributor with extensive experience and a global network of partners. We operate according to international standards, selecting the highest-quality raw materials from the best sources, and using modern storage and logistics systems to provide customers with a fresh ocean experience.
          </p>

          {/* เส้นคั่นและไอคอน 3 รายการ */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-300/80">
            <div className="space-y-1">
              <span className="text-2xl">🌐</span>
              <p className="text-[11px] sm:text-xs font-bold text-[#072a58] uppercase">
                Global Sourcing
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl">⚓</span>
              <p className="text-[11px] sm:text-xs font-bold text-[#072a58] uppercase">
                Reliable Logistics
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl">❄️</span>
              <p className="text-[11px] sm:text-xs font-bold text-[#072a58] uppercase">
                Cold Chain Excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalSupply;
