import type { Product } from "@/types";

interface ProductSpecificationProps {
  product: Product;
}

export function ProductSpecification({ product }: ProductSpecificationProps) {
  const specs = [
    { labelTh: "แบรนด์", labelEn: "Brand", value: product.brand },
    { labelTh: "ประเทศผู้ผลิต", labelEn: "Country of Origin", value: product.country },
    { labelTh: "ขนาดบรรจุ", labelEn: "Packing Size", value: product.packing },
    { labelTh: "อุณหภูมิการจัดเก็บ", labelEn: "Storage conditions", value: product.storage },
    { labelTh: "ชื่อทางวิทยาศาสตร์", labelEn: "Scientific Name", value: product.scientificName },
    { labelTh: "ชนิดย่อย / แบรนด์ภายใน", labelEn: "Variant", value: product.variant },
    { labelTh: "ไซส์", labelEn: "Size", value: product.size },
  ].filter((spec) => Boolean(spec.value)); // Automatically filter out specs that don't have a value

  if (specs.length === 0) {
    return (
      <div className="product-specifications-container">
        <h3 className="specifications-title">ข้อมูลเฉพาะทางเทคนิค / Specifications</h3>
        <div className="specifications-empty-state" style={{ padding: "20px", border: "1px dashed rgba(8, 43, 89, 0.12)", borderRadius: "8px", textAlign: "center" }}>
          <p className="specifications-empty-text" style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
            ไม่มีข้อมูลเฉพาะสำหรับสินค้านี้ / No specifications available for this product.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-specifications-container">
      <h3 className="specifications-title">ข้อมูลเฉพาะทางเทคนิค / Specifications</h3>
      <div className="specifications-table">
        {specs.map((spec, index) => (
          <div key={index} className="specifications-row">
            <div className="specifications-label">
              <span className="label-th">{spec.labelTh}</span>
              <span className="label-en">{spec.labelEn}</span>
            </div>
            <div className="specifications-value">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
