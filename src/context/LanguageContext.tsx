'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    home: 'หน้าแรก',
    about: 'เกี่ยวกับเรา',
    products: 'สินค้า',
    brands: 'แบรนด์ที่นำเข้า',
    news: 'ข่าวสาร',
    contact: 'ติดต่อเรา',
    contactUs: 'ติดต่อเรา',
    orderNow: 'สนใจติดต่อ / สั่งซื้อ',
    viewProducts: 'ดูสินค้า',
    selectBrand: 'เลือกแบรนด์สินค้า',
    specifications: 'ข้อมูลเฉพาะทางเทคนิค',
    packingSize: 'ขนาดบรรจุ',
    size: 'ไซส์',
    brand: 'แบรนด์',
    back: 'ย้อนกลับ',
    callSales: 'โทร 061-770-1888',
    close: 'ปิด',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    products: 'Products',
    brands: 'Brands',
    news: 'News',
    contact: 'Contact Us',
    contactUs: 'Contact Us',
    orderNow: 'Contact / Order',
    viewProducts: 'View Products',
    selectBrand: 'Select Brand',
    specifications: 'Specifications',
    packingSize: 'Packing Size',
    size: 'Size',
    brand: 'Brand',
    back: 'Back',
    callSales: 'Call 061-770-1888',
    close: 'Close',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('th');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('site_lang') as Language;
      if (saved === 'th' || saved === 'en') {
        setLangState(saved);
      }
    } catch {
      // localStorage may not be available in some private browsing modes
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('site_lang', newLang);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
