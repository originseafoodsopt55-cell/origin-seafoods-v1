import { notFound, redirect } from "next/navigation";
import { getProductVariantsByProductLine } from "@/lib/data";

interface ProductLinePageProps {
  params: Promise<{
    category: string;
    series: string;
    productLine: string;
  }>;
}

export default async function ProductLinePage({ params }: ProductLinePageProps) {
  const { category, series, productLine } = await params;
  const variantsList = await getProductVariantsByProductLine(category, series, productLine);

  if (!variantsList || variantsList.length === 0) {
    notFound();
  }

  // Redirect to the first variant detail page
  redirect(`/products/${category}/${series}/${productLine}/${variantsList[0].slug}`);
}
