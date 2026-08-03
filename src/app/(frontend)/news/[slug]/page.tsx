import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsRichText } from "@/components/news/NewsRichText";
import { getNavigation, getContact, getNewsBySlug, getRelatedNews } from "@/lib/data";

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

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [navItems, contact, news, relatedNews] = await Promise.all([
    getNavigation(),
    getContact(),
    getNewsBySlug(slug),
    getRelatedNews(slug, 3),
  ]);

  if (!news) {
    notFound();
  }

  return (
    <main className="site-shell">
      <Navbar navItems={navItems} />

      <article className="news-detail-container">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center text-sm font-semibold text-[#082b59] hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" aria-hidden="true" />
            ย้อนกลับไปหน้าข่าวสารทั้งหมด / Back to News
          </Link>
        </div>

        {/* Hero Header */}
        <header className="news-detail-hero">
          <div className="news-detail-date">
            <Calendar size={14} aria-hidden="true" />
            <span>{formatDate(news.publishedDate)}</span>
          </div>
          <h1 className="news-detail-title">{news.title}</h1>
        </header>

        {/* Cover Image */}
        <div className="news-detail-cover">
          <Image
            src={news.coverImage.src}
            alt={news.coverImage.alt}
            title={news.coverImage.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            quality={90}
            priority
            className="object-cover"
          />
        </div>

        {/* Article Summary Callout */}
        {news.summary && (
          <div className="bg-[#f0f4f9] border-l-4 border-[#082b59] p-5 rounded-r-lg mb-8 text-gray-800 text-lg font-medium leading-relaxed">
            {news.summary}
          </div>
        )}

        {/* Article Body (Lexical Rich Text) */}
        <NewsRichText data={news.richText} />

        {/* Event Gallery Images Section */}
        {news.galleryImages && news.galleryImages.length > 0 && (
          <section className="news-gallery-section">
            <h2 className="text-xl font-bold text-[#082b59] mb-4">
              ภาพบรรยากาศเพิ่มเติม / Event Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {news.galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    title={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 450px"
                    quality={88}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related News Section (Gracefully hides when relatedNews is empty) */}
        {relatedNews && relatedNews.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#082b59] mb-6">
              ข่าวสารอื่นที่คุณอาจสนใจ / Related News
            </h2>
            <div className="news-grid">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="news-card"
                >
                  <div className="news-card-photo-container">
                    <Image
                      src={item.coverImage.src}
                      alt={item.coverImage.alt}
                      fill
                      sizes="300px"
                      className="news-card-img"
                    />
                  </div>
                  <div className="news-card-content">
                    <h3 className="news-card-title">{item.title}</h3>
                    <div className="news-card-footer">
                      <span>อ่านรายละเอียด</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer navItems={navItems} contact={contact} />
    </main>
  );
}
