interface CatalogHeaderProps {
  title: string;
}

export function CatalogHeader({ title }: CatalogHeaderProps) {
  return (
    <div className="products-grid-header">
      <h2 className="products-grid-title">{title}</h2>
    </div>
  );
}
