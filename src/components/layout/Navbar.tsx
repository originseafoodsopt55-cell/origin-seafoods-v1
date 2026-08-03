"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { assets } from "@/lib/assets";
import { Button } from "@/components/ui/Button";
import type { NavigationItem } from "@/types";

interface NavbarProps {
  navItems: NavigationItem[];
}

const NAV_ORDER_MAP: Record<string, number> = {
  home: 1,
  about: 2,
  products: 3,
  brands: 4,
  news: 5,
  contact: 6,
};

function getNavOrder(href: string): number {
  const clean = href.replace(/^[/#]+/, "").toLowerCase();
  return NAV_ORDER_MAP[clean] ?? 99;
}

export function Navbar({ navItems }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const orderedNavItems = [...navItems].sort(
    (a, b) => getNavOrder(a.href) - getNavOrder(b.href)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);
    handleScroll();
    if (typeof window !== "undefined") {
      setActiveHash(window.location.hash);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const getIsActive = (item: NavigationItem) => {
    const cleanItemHref = item.href.replace(/^#/, "");
    if (pathname === "/") {
      if (activeHash) {
        return activeHash === `#${cleanItemHref}`;
      }
      return cleanItemHref === "home" || item.href === "/" || item.href === "#home";
    }
    return pathname.startsWith(item.href) && item.href !== "/";
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        const toggleBtn = headerRef.current?.querySelector(".mobile-menu-button") as HTMLElement;
        toggleBtn?.focus();
        return;
      }
      if (e.key === "Tab") {
        const focusableSelectors = 'a[href], button:not([disabled])';
        const focusableElements = Array.from(
          headerRef.current?.querySelectorAll(focusableSelectors) || []
        ).filter(el => el.clientWidth > 0 || el.clientHeight > 0) as HTMLElement[];

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="header-logo" aria-label="Origin Seafoods home">
          <Image src={assets.logos.originLogo.src} alt={assets.logos.originLogo.alt} title={assets.logos.originLogo.title} width={154} height={62} priority />
        </Link>

        <div className="desktop-menu flex flex-row items-center gap-8">
          {orderedNavItems.map((item) => {
            const navHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
            const isActive = getIsActive(item);
            return (
              <a
                key={item.href}
                href={navHref}
                className={isActive ? "is-active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="header-actions">
          <button className="language-pill" aria-label="Language switcher">
            TH <ChevronDown size={15} />
          </button>
          <Button variant="header" href="/#contact">
            ติดต่อเรา
          </Button>
        </div>

        <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {orderedNavItems.map((item) => {
            const navHref = item.href.startsWith("#") ? `/${item.href}` : item.href;
            return (
              <a key={item.href} href={navHref} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
