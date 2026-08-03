import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getNavigation, getContact, getAllNews } from "@/lib/data";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function NewsListingPage() {
  const [navItems, contact, newsData] = await Promise.all([
    getNavigation(),
    getContact(),
    getAllNews({ page: 1, limit: 9 }),
  ]);

  return (
    <main className="site-shell">
      <Navbar navItems={navItems} />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="section-label">CORPORATE NEWSROOM</span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#082b59] mt-2 mb-4">
            ข่าวสารและกิจกรรมองค์กร
          </h1>
          <p className="text-gray-600 text-base">
            ติดตามข่าวสารความเคลื่อนไหว กิจกรรมออกบูทแสดงสินค้า และรายงานอัปเดตจาก ออริจิน ซีฟู้ดส์
          </p>
        </div>

        {newsData.items.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            ยังไม่มีข่าวสารในขณะนี้ / No news available at the moment.
          </div>
        ) : (
          <div className="news-grid">
            {newsData.items.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="news-card"
                aria-label={`อ่านข่าวสาร ${item.title}`}
              >
                <div className="news-card-photo-container">
                  <Image
                    src={item.coverImage.src}
                    alt={item.coverImage.alt}
                    title={item.coverImage.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={90}
                    className="news-card-img"
                  />
                  <div className="news-card-date-badge">
                    <Calendar size={13} aria-hidden="true" />
                    <span>{formatDate(item.publishedDate)}</span>
                  </div>
                </div>

                <div className="news-card-content">
                  <h2 className="news-card-title">{item.title}</h2>
                  <p className="news-card-summary">{item.summary}</p>
                  <div className="news-card-footer">
                    <span className="news-card-link-text">อ่านรายละเอียด / Read More</span>
                    <ArrowRight size={15} className="news-card-arrow" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer navItems={navItems} contact={contact} />
    </main>
  );
}
