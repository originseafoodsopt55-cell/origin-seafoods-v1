import { ArrowRight } from "lucide-react";
import type { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/Button";

interface ProductInformationProps {
  product: Product;
  categoryName: string;
  seriesName: string;
  variants?: ProductVariant[];
}

export function ProductInformation({ product, variants = [] }: ProductInformationProps) {
  return (
    <div className="product-detail-info-block">
      <h1 className="product-detail-thai-name">{product.thai}</h1>
      <p className="product-detail-eng-name">{product.english}</p>
      
      <div className="product-quick-specs" style={{ marginBottom: "24px" }}>
        {product.brand && (
          <div className="quick-spec-pill">
            <span className="pill-lbl">แบรนด์:</span>
            <span className="pill-val">{product.brand}</span>
          </div>
        )}
        {product.size && (
          <div className="quick-spec-pill">
            <span className="pill-lbl">ไซส์:</span>
            <span className="pill-val">{product.size}</span>
          </div>
        )}
        {product.country && (
          <div className="quick-spec-pill">
            <span className="pill-lbl">แหล่งผลิต:</span>
            <span className="pill-val">{product.country}</span>
          </div>
        )}
      </div>

      {/* Size Selector (Navy Pills style) */}
      {variants.length > 1 && (
        <div className="product-detail-sizes-selector" style={{ marginBottom: "24px" }}>
          <span className="chips-label" style={{ display: "flex", alignItems: "center", fontSize: "12px", fontWeight: "600", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "6px", width: "16px", height: "16px", stroke: "var(--color-text-secondary)" }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Available Sizes
          </span>
          <div className="chips-container" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {variants.map((v) => {
              const href = `/products/${product.categorySlug}/${product.seriesSlug}/${product.productLineSlug || product.groupSlug}/${v.slug}`;
              const isActive = v.slug === product.slug;
              const displayName = v.size || v.thai || "Standard";
              return (
                <a
                  key={v.id}
                  href={href}
                  className={`variant-chip ${isActive ? "active" : ""}`}
                  title={`ดูรายละเอียดขนาด ${displayName}`}
                >
                  {displayName} <span className="chip-arrow">→</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <div className="product-inquiry-action" style={{ marginTop: "20px" }}>
        <Button
          variant="hero-orange"
          href="/#contact"
          className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-center font-bold text-white shadow-md hover:shadow-lg transition-all"
        >
          <span>สนใจติดต่อ / สั่งซื้อ</span>
          <ArrowRight size={18} className="text-white" />
        </Button>
      </div>
    </div>
  );
}
