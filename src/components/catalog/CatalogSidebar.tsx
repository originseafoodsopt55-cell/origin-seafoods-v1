'use client';

import { sortCategories } from '@/lib/categoryOrder';
import type { Category } from '@/types';
import { useEffect, useState, useMemo, useRef } from 'react';

interface CatalogSidebarProps {
  categories: Pick<Category, 'slug' | 'thai' | 'english'>[];
  /**
   * 'hub'      — /products: anchor links (#slug)
   * 'category' — /products/[category]: links to /products#slug
   */
  mode: 'hub' | 'category';
  /** Current active category slug for highlight */
  activeSlug?: string;
}

export function CatalogSidebar({ categories, mode, activeSlug }: CatalogSidebarProps) {
  const sorted = useMemo(() => sortCategories(categories), [categories]);
  const hasInitialScrolled = useRef(false);

  const [currentActive, setCurrentActive] = useState<string>(
    activeSlug ?? sorted[0]?.slug ?? ''
  );

  // Sync activeSlug prop changes (such as on category pages)
  useEffect(() => {
    if (activeSlug) {
      setCurrentActive(activeSlug);
    }
  }, [activeSlug]);

  // Hash detection and smooth scroll to targeted section on mount (Run once)
  useEffect(() => {
    if (mode !== 'hub' || typeof window === 'undefined' || hasInitialScrolled.current) return;

    const hash = window.location.hash.replace('#', '');
    if (hash && sorted.some((cat) => cat.slug === hash)) {
      setCurrentActive(hash);
      const target = document.getElementById(hash);
      if (target) {
        hasInitialScrolled.current = true;
        // Delay slightly to let layout stabilize
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [mode, sorted]);

  // ScrollSpy คำนวณตำแหน่งหมวดหมู่ที่ Active แม่นยำตามแนวการอ่าน (Bounding Rect Scroll Listener)
  useEffect(() => {
    if (mode !== 'hub' || typeof window === 'undefined') return;

    const handleScrollSpy = () => {
      const headerOffset = 160; // ระยะเผื่อแนว Header + Sticky Bar
      const sectionElements = sorted
        .map((cat) => ({ slug: cat.slug, el: document.getElementById(cat.slug) }))
        .filter((item): item is { slug: string; el: HTMLElement } => item.el !== null);

      if (sectionElements.length === 0) return;

      // หาหมวดหมู่ที่อยู่ตำแหน่งบนสุดของพื้นที่แสดงผลปัจจุบัน
      let currentSlug = sectionElements[0].slug;
      for (const { slug, el } of sectionElements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerOffset) {
          currentSlug = slug;
        } else {
          break;
        }
      }

      setCurrentActive(currentSlug);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [mode, sorted]);

  function handleLinkClick(slug: string) {
    if (mode === 'hub') {
      setCurrentActive(slug);
    }
  }

  return (
    <nav className="catalog-sidebar" aria-label="หมวดหมู่สินค้า / Product Categories">
      <div className="catalog-sidebar-header">
        <span className="catalog-sidebar-label">หมวดหมู่ / Categories</span>
      </div>
      <ul className="catalog-sidebar-list" role="list">
        {sorted.map((cat) => {
          const href = mode === 'hub' ? `#${cat.slug}` : `/products#${cat.slug}`;
          const isActive = cat.slug === currentActive;

          return (
            <li key={cat.slug} className="catalog-sidebar-item">
              <a
                href={href}
                data-slug={cat.slug}
                className={`catalog-sidebar-link${isActive ? ' active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleLinkClick(cat.slug)}
              >
                <span className="sidebar-link-thai">{cat.thai}</span>
                <span className="sidebar-link-en">{cat.english}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
