'use client';

import { useEffect, useRef, useState } from 'react';
import type { Category } from '@/types';
import { CATEGORY_ORDER, sortCategories } from '@/lib/categoryOrder';

export { CATEGORY_ORDER, sortCategories };

interface CategoryNavBarProps {
  categories: Pick<Category, 'slug' | 'thai' | 'english'>[];
  /**
   * 'hub'      — /products page. Buttons are anchor links (#slug).
   *              Scroll-spy auto-updates activeSlug.
   * 'category' — /products/[category] page. Buttons link to /products#slug.
   *              activeSlug is static (determined by the current route).
   */
  mode: 'hub' | 'category';
  /** Pass the current category slug when mode='category' */
  initialActiveSlug?: string;
}

export function CategoryNavBar({ categories, mode, initialActiveSlug }: CategoryNavBarProps) {
  const [activeSlug, setActiveSlug] = useState<string>(
    initialActiveSlug ?? categories[0]?.slug ?? ''
  );
  const navRef = useRef<HTMLElement>(null);
  const sorted = sortCategories(categories);

  // Scroll-spy: only active in hub mode (passive visibility detection)
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
            setActiveSlug(entry.target.id);
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

  // Auto-scroll the active pill into view inside the nav bar container without triggering window scroll
  useEffect(() => {
    if (!navRef.current) return;
    const container = navRef.current.querySelector<HTMLElement>('.category-sticky-nav-inner') || navRef.current;
    const activePill = container.querySelector<HTMLElement>(
      `.category-nav-pill[data-slug="${activeSlug}"]`
    );
    if (activePill) {
      const pillLeft = activePill.offsetLeft;
      const pillWidth = activePill.offsetWidth;
      const containerWidth = container.clientWidth;
      container.scrollTo({
        left: pillLeft - (containerWidth / 2) + (pillWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeSlug]);

  function handlePillClick(e: React.MouseEvent<HTMLAnchorElement>, slug: string) {
    if (mode === 'hub') {
      // Let browser perform its native smooth anchor jump to `#slug`
      console.log(`[CategoryNavBar] Pill clicked: ${slug}. Navigating via native anchor.`);
      setActiveSlug(slug);
    }
    // In 'category' mode: let the browser navigate normally to /products#slug
  }

  return (
    <nav
      ref={navRef}
      className="category-sticky-nav"
      aria-label="หมวดหมู่สินค้า / Product Categories"
    >
      <div className="category-sticky-nav-inner">
        {sorted.map((cat) => {
          const isActive = cat.slug === activeSlug;
          const href =
            mode === 'hub' ? `#${cat.slug}` : `/products#${cat.slug}`;

          return (
            <a
              key={cat.slug}
              href={href}
              data-slug={cat.slug}
              className={`category-nav-pill${isActive ? ' active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={(e) => handlePillClick(e, cat.slug)}
            >
              <span className="pill-thai">{cat.thai}</span>
              <span className="pill-en">{cat.english}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
