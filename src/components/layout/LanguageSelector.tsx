'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage, type Language } from '@/context/LanguageContext';

export function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ปิดเมนูเมื่อคลิกนอกพื้นที่ หรือกด Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'th', label: 'TH' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      {/* ปุ่มหลัก: แคปซูลขาว เงาสะอาดตา อักษรน้ำเงินเข้มตัวหนาตามแบบ */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="เปลี่ยนภาษา / Select Language"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none"
      >
        <span className="text-sm font-extrabold text-[#0B192C] tracking-wide">
          {lang.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#0B192C] stroke-[2.5] transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* เมนู Dropdown สไตล์มินิมอล สะอาดตา */}
      <div
        className={`absolute right-0 mt-2 w-28 rounded-2xl bg-white shadow-xl border border-gray-100/80 p-1.5 z-50 origin-top-right transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1">
          {languages.map((item) => {
            const isSelected = lang === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLang(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-orange-50 text-[#f58220]'
                    : 'text-[#0B192C] hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#f58220] stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
