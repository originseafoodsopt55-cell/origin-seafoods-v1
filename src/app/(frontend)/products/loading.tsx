import { Container } from "@/components/ui/Container";

export default function CatalogLoading() {
  return (
    <div className="products-catalog-page animate-pulse" aria-hidden="true">
      {/* Skeleton Hero Banner */}
      <div 
        style={{
          background: "linear-gradient(180deg, var(--color-surface-soft) 0%, var(--color-background) 100%)",
          padding: "60px 0 40px",
          borderBottom: "1px solid var(--color-border-soft)"
        }}
      >
        <Container compact>
          <div style={{ height: "12px", width: "150px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "4px", marginBottom: "20px" }} />
          <div style={{ height: "36px", width: "350px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "6px", marginBottom: "16px" }} />
          <div style={{ height: "18px", width: "100%", maxWidth: "600px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "4px" }} />
        </Container>
      </div>

      {/* Skeleton Card Grid */}
      <section style={{ padding: "40px 0" }}>
        <Container compact>
          <div style={{ height: "24px", width: "200px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "4px", marginBottom: "32px" }} />
          
          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px"
            }}
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <div 
                key={idx}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border-soft)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "320px"
                }}
              >
                {/* Photo Placeholder */}
                <div style={{ height: "180px", background: "rgba(8, 43, 89, 0.04)" }} />
                {/* Content Placeholder */}
                <div style={{ padding: "16px" }}>
                  <div style={{ height: "10px", width: "60px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "4px", marginBottom: "12px" }} />
                  <div style={{ height: "18px", width: "140px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "4px", marginBottom: "8px" }} />
                  <div style={{ height: "12px", width: "180px", background: "rgba(8, 43, 89, 0.08)", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
