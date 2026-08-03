"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import type { SourcingRegion } from "@/types";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface GlobalSupplyProps {
  regions: SourcingRegion[];
}

// Key sourcing locations for visual dots on the globe [lat, lng, size]
const GLOBE_MARKERS: { location: [number, number]; size: number }[] = [
  // Thailand (Samut Sakhon) — HQ
  { location: [13.55, 100.27], size: 0.028 },
  // North Atlantic / Norway / Iceland
  { location: [64.15, -21.95], size: 0.018 },
  { location: [62.0, 6.0], size: 0.018 },
  // Canada / North America
  { location: [49.0, -63.0], size: 0.018 },
  { location: [44.6, -63.57], size: 0.015 },
  // South America / Chile / Argentina
  { location: [-33.45, -70.66], size: 0.018 },
  { location: [-45.0, -65.0], size: 0.015 },
  // West Africa / Mauritania / Senegal
  { location: [14.7, -17.47], size: 0.015 },
  { location: [18.1, -15.95], size: 0.015 },
  // India / Sri Lanka
  { location: [9.0, 76.5], size: 0.015 },
  { location: [7.87, 80.77], size: 0.015 },
  // Vietnam / Indonesia
  { location: [10.82, 106.63], size: 0.015 },
  { location: [-6.2, 106.85], size: 0.015 },
  // China / Japan / Korea
  { location: [36.07, 120.38], size: 0.015 },
  { location: [35.0, 136.0], size: 0.015 },
  { location: [35.18, 129.08], size: 0.015 },
  // Australia / New Zealand
  { location: [-33.87, 151.21], size: 0.015 },
  { location: [-41.29, 174.78], size: 0.015 },
];

const MouseRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let ripples: { x: number; y: number; radius: number; alpha: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        alpha: 1,
      });
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.forEach((ripple) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 136, 0, ${ripple.alpha})`;
        ctx.lineWidth = 1.7;
        ctx.stroke();

        ripple.radius += 2.5;
        ripple.alpha -= 0.012;
      });

      ripples = ripples.filter((ripple) => ripple.alpha > 0);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (parent) parent.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export function GlobalSupply({ regions }: GlobalSupplyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(1.8);
  const widthRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  // Keep regions prop to avoid TS unused warning — data drives the markers above
  void regions;

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 2, 2) : 2;
    const size = widthRef.current * dpr;

    globeRef.current = createGlobe(canvasEl, {
      devicePixelRatio: dpr,
      width: size,
      height: size,
      phi: phiRef.current,
      theta: 0.25,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 24000,
      mapBrightness: 4.5,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [1, 0.53, 0],
      glowColor: [0.2, 0.2, 0.3],
      markers: GLOBE_MARKERS,
    });

    // Auto-rotation loop
    let animFrame: number;
    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.003;
      }

      const currentPhi = phiRef.current + pointerInteractionMovement.current;
      const currentDpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 2, 2) : 2;
      const currentSize = widthRef.current * currentDpr;

      globeRef.current?.update({
        phi: currentPhi,
        width: currentSize,
        height: currentSize,
      });

      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      globeRef.current?.destroy();
      globeRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return (
    <section
      id="global-supply"
      className="global-supply-section"
      aria-labelledby="global-supply-heading"
    >
      <MouseRipple />
      <div className="global-supply-container">
        {/* Text Column */}
        <ScrollReveal className="global-supply-text">
          <p className="global-supply-eyebrow">GLOBAL SOURCING</p>
          <h2 id="global-supply-heading" className="global-supply-title">
            เรานำเข้าสินค้า
            <br />
            จากทั่วโลก
          </h2>
          <p className="global-supply-subtitle">
            We import products from around the world
          </p>
        </ScrollReveal>

        {/* Globe Column */}
        <div className="global-supply-globe-wrapper">
          <canvas
            ref={canvasRef}
            className="global-supply-globe-canvas"
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
              }
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta / 120;
              }
            }}
            onTouchMove={(e) => {
              if (pointerInteracting.current !== null && e.touches[0]) {
                const delta =
                  e.touches[0].clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta / 120;
              }
            }}
          />
          {/* Multi-layer Parallax Orbiting Starfield */}
          <div className="stars-container" aria-hidden="true">
            <div className="stars-layer stars-small" />
            <div className="stars-layer stars-medium" />
            <div className="stars-layer stars-large" />
          </div>
          {/* Atmospheric glow ring behind the globe */}
          <div className="global-supply-globe-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
