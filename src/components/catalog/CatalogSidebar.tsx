'use client';

import { sortCategories } from '@/lib/categoryOrder';
import type { Category } from '@/types';
import { useEffect, useState } from 'react';

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
  const sorted = sortCategories(categories);
  const [currentActive, setCurrentActive] = useState<string>(
    activeSlug ?? sorted[0]?.slug ?? ''
  );

  // Sync activeSlug prop changes (such as on category pages)
  useEffect(() => {
    if (activeSlug) {
      setCurrentActive(activeSlug);
    }
  }, [activeSlug]);

  // Read-only IntersectionObserver for scroll spy (only on hub page)
  useEffect(() => {
    if (mode !== 'hub') return;

    const sections = sorted
      .map((cat) => document.getElementById(cat.slug))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-120px 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
