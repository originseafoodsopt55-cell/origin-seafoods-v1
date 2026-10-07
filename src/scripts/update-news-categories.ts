import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function main() {
  console.log('=== UPDATING NEWS CATEGORIES ===');
  const payload = await getPayload({ config: configPromise });
  const allNews = await payload.find({ collection: 'news', limit: 100 });
  console.log(`Found ${allNews.docs.length} news articles`);

  const categoryMap: Record<string, string> = {
    'thaifex-anuga-asia-2025': 'งานแสดงสินค้า',
    'thaifex-anuga-asia-2023': 'งานแสดงสินค้า',
    'thaifex-anuga-asia-2022': 'งานแสดงสินค้า',
    'origin-seafoods-china-fisheries-seafood-expo-cfse-2023': 'งานแสดงสินค้า',
    'origin-seafoods-flood-relief-donation-2024': 'CSR เพื่อสังคม',
    'origin-seafoods-online-marketing-internal-training-2024': 'การพัฒนาบุคลากร',
    'origin-seafoods-company-trip-team-building-2023-2026': 'กิจกรรมองค์กร',
  };

  for (const doc of allNews.docs) {
    const cat = categoryMap[doc.slug] || 'ข่าวสารองค์กร';
    await payload.update({
      collection: 'news',
      id: doc.id,
      data: {
        category: cat,
      },
    });
    console.log(`Updated doc ID ${doc.id} (${doc.slug}) -> category: "${cat}"`);
  }

  console.log('=== DONE UPDATING NEWS CATEGORIES ===');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
