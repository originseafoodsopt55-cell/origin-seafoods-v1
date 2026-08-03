"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface CatalogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CatalogError({ error, reset }: CatalogErrorProps) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error("Catalog Error boundary caught error:", error);
  }, [error]);

  return (
    <div style={{ padding: "120px 0", minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <Container compact className="text-center">
        <div 
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "40px",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border-soft)",
            borderRadius: "16px",
            boxShadow: "var(--shadow-lg)"
          }}
        >
          {/* Branded error graphic wrapper */}
          <div 
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(245, 130, 32, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px"
            }}
          >
            <span style={{ fontSize: "28px", color: "var(--color-accent)", fontWeight: "bold" }}>!</span>
          </div>

          <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "var(--color-text-primary)", marginBottom: "8px" }}>
            เกิดข้อผิดพลาดในการโหลดข้อมูล
          </h1>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "var(--color-primary)", marginBottom: "16px" }}>
            Unable to load catalog content
          </h2>
          
          <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: "1.5", marginBottom: "28px" }}>
            ขออภัยในความไม่สะดวก ระบบตรวจพบความผิดพลาดทางเทคนิค กรุณากดปุ่มด้านล่างเพื่อลองใหม่อีกครั้ง
            <br />
            We apologize for the inconvenience. A technical error has occurred. Please press retry to refresh the page.
          </p>

          <Button variant="outline" onClick={() => reset()} className="w-full">
            ลองใหม่อีกครั้ง / Retry
          </Button>
        </div>
      </Container>
    </div>
  );
}
