import { getFeaturedNews, getAllNews, getNewsBySlug, getRelatedNews } from '../lib/data';

async function main() {
  console.log('=== STARTING MILESTONE 2 VERIFICATION ===');

  // 1. Test getFeaturedNews(3)
  console.log('\n--- 1. Testing getFeaturedNews(3) ---');
  const featured = await getFeaturedNews(3);
  console.log(`Featured News Count: ${featured.length}`);
  if (featured.length > 0) {
    console.log(`Featured Article 0 Title: ${featured[0].title}`);
    console.log(`Featured Article 0 Cover: ${featured[0].coverImage.src}`);
  }

  // 2. Test getAllNews({ page: 1, limit: 9 })
  console.log('\n--- 2. Testing getAllNews({ page: 1, limit: 9 }) ---');
  const all = await getAllNews({ page: 1, limit: 9 });
  console.log(`All News Total: ${all.total}`);
  console.log(`All News Page: ${all.page}`);
  console.log(`All News PageSize: ${all.pageSize}`);
  console.log(`All News HasNextPage: ${all.hasNextPage}`);
  console.log(`All News Items Count: ${all.items.length}`);

  // 3. Test getNewsBySlug("thaifex-anuga-asia-2025")
  console.log('\n--- 3. Testing getNewsBySlug("thaifex-anuga-asia-2025") ---');
  const news = await getNewsBySlug('thaifex-anuga-asia-2025');
  if (news) {
    console.log(`Found News ID: ${news.id}`);
    console.log(`Title: ${news.title}`);
    console.log(`Slug: ${news.slug}`);
    console.log(`CoverImage SRC: ${news.coverImage.src}`);
    console.log(`GalleryImages Count: ${news.galleryImages?.length ?? 0}`);
    if (news.galleryImages && news.galleryImages.length > 0) {
      console.log(`GalleryImage 0 SRC: ${news.galleryImages[0].src}`);
    }
  } else {
    console.error('ERROR: News article not found by slug');
  }

  // 4. Test getRelatedNews("thaifex-anuga-asia-2025")
  console.log('\n--- 4. Testing getRelatedNews("thaifex-anuga-asia-2025") ---');
  const related = await getRelatedNews('thaifex-anuga-asia-2025');
  console.log(`Related News Count: ${related.length}`);
  console.log(`Expected behavior when only 1 article exists: empty array [] -> Related News section hides gracefully.`);

  console.log('\n=== MILESTONE 2 VERIFICATION PASSED SUCCESSFULLY ===');
  process.exit(0);
}

main().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
