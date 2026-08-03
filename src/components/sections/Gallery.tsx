"use client";

import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { GalleryItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function Gallery({ gallery }: { gallery: GalleryItem[] }) {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activeImage) {
      lastActiveElement.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        const closeBtn = document.querySelector(".lightbox-close") as HTMLElement;
        closeBtn?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      lastActiveElement.current?.focus();
    }
  }, [activeImage]);

  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
        return;
      }
      if (e.key === "Tab") {
        const closeBtn = document.querySelector(".lightbox-close") as HTMLElement;
        if (document.activeElement !== closeBtn) {
          closeBtn?.focus();
          e.preventDefault();
        } else {
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <ScrollReveal id="gallery" direction="right" className="gallery-panel" delay={0.15}>
      <p className="section-label">GALLERY</p>
      <h2>แกลเลอรี่</h2>
      <div className="gallery-grid">
        {gallery.map((item) => (
          <button key={item.label} className="gallery-card" onClick={() => setActiveImage(item)} aria-label={`View ${item.label}`}>
            <Image src={item.image.src} alt={item.image.alt} title={item.image.title} fill sizes="(max-width: 760px) 50vw, 280px" quality={88} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
      <Button variant="outline" className="gallery-action" type="button">
        ดูแกลเลอรี่ทั้งหมด <ArrowRight size={17} />
      </Button>

      {activeImage && (
        <div className="lightbox" onClick={() => setActiveImage(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={() => setActiveImage(null)} aria-label="Close gallery">
            <X size={24} />
          </button>
          <div className="lightbox-frame">
            <Image src={activeImage.image.src} alt={activeImage.image.alt} title={activeImage.image.title} fill sizes="90vw" quality={92} decoding="async" />
          </div>
        </div>
      )}
    </ScrollReveal>
  );
}
