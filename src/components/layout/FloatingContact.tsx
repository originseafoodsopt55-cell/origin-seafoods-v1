'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function FloatingContact() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ปิดเมนูเมื่อคลิกนอกพื้นที่ หรือกด Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-transform duration-300 ${
        !isOpen ? 'animate-smooth-bounce' : ''
      }`}
    >
      {/* เมนูช่องทางติดต่อที่คลี่ขึ้นด้านบน (Speed Dial Items) */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ease-out origin-bottom ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-4 pointer-events-none scale-90'
        }`}
      >
        {/* 1. LINE Official */}
        <a
          href="https://lin.ee/5qZek9J"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:bg-[#06C755] transition-all duration-200"
        >
          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-white transition-colors">
            LINE Official
          </span>
          <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center text-white shadow-sm">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 10.3c0-4.6-4.9-8.3-10.9-8.3S2.2 5.7 2.2 10.3c0 4.1 3.6 7.5 8.5 8.2.3.1.8.2.9.6 0 .3-.1 1-.2 1.6-.2.8-.8 3.1.7 1.7 1.5-1.4 4.1-3.6 5.6-4.9 3.8-.5 6.3-3.6 6.3-7.2z" />
            </svg>
          </div>
        </a>

        {/* 2. ฝ่ายขาย / เบอร์โทรศัพท์ */}
        <a
          href="tel:0617701888"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:bg-[#007AFF] transition-all duration-200"
        >
          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-white transition-colors">
            {t('callSales')}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white shadow-sm">
            <Phone className="w-4 h-4 text-white" />
          </div>
        </a>

        {/* 3. Facebook Messenger */}
        <a
          href="https://m.me/originseafoods"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:bg-[#0084FF] transition-all duration-200"
        >
          <span className="text-xs sm:text-sm font-bold text-gray-700 group-hover:text-white transition-colors">
            Facebook Messenger
          </span>
          <div className="w-8 h-8 rounded-full bg-[#0084FF] flex items-center justify-center text-white shadow-sm">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.4 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2.2.2.3.5.3.7l-.3 2.3c-.1.5.4.9.8.7l2.6-1.1c.2-.1.5-.1.7 0 7.2 2 12-2.1 12-7.2C22 6.1 17.6 2 12 2z" />
            </svg>
          </div>
        </a>
      </div>

      {/* ปุ่มหลักแบบดั้งเดิม (ป้ายแคปซูลขาว + วงกลมส้มแยกชัดเจน) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? t('close') : t('contactUs')}
        className="group flex items-center gap-2.5 cursor-pointer select-none focus:outline-none"
      >
        {/* ป้ายข้อความ "ติดต่อเรา" ฝั่งซ้าย */}
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-100/80 transition-transform duration-200 group-hover:-translate-x-0.5">
          <span className="text-xs sm:text-sm font-bold text-[#1e293b] whitespace-nowrap">
            {isOpen ? t('close') : t('contactUs')}
          </span>
        </div>

        {/* ปุ่มวงกลมสีส้มฝั่งขวา พร้อมไอคอนเส้นสีเข้มตามต้นฉบับ */}
        <div
          className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isOpen
              ? 'bg-gray-700 text-white rotate-90 shadow-gray-500/20'
              : 'bg-[#f58220] text-[#1e293b] hover:bg-[#e07318] shadow-orange-500/30 group-hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            /* ไอคอนแชท Speech Bubble จุด 3 จุด เส้นโครงสีเข้มคมชัด */
            <svg
              className="w-6 h-6 stroke-[#1e293b] stroke-[2.2] fill-none"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <circle cx="8.5" cy="11.5" r="0.8" fill="#1e293b" stroke="none" />
              <circle cx="12" cy="11.5" r="0.8" fill="#1e293b" stroke="none" />
              <circle cx="15.5" cy="11.5" r="0.8" fill="#1e293b" stroke="none" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
