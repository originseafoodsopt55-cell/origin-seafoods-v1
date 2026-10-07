import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { getNavigation, getContact, getAllNews } from "@/lib/data";

export const dynamic = "force-dynamic";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsData.items.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>

      <Footer navItems={navItems} contact={contact} />
    </main>
  );
}
