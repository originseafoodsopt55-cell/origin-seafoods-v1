/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload';
import configPromise from '../payload.config';
import { mapCMSNewsArticle } from '../lib/cms/mappers/newsMapper';
import fs from 'fs';

async function main() {
  console.log('=== STARTING MILESTONE 1 VERIFICATION ===');
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: 'thaifex-anuga-asia-2025',
      },
    },
    depth: 2,
  });

  if (result.docs.length === 0) {
    throw new Error('News article thaifex-anuga-asia-2025 not found in DB!');
  }

  const rawDoc = result.docs[0];

  // Save Raw JSON to file
  const artifactDir = 'C:\\Users\\AVS_KTB\\.gemini\\antigravity\\brain\\29cf395e-72b0-4f87-b570-a587cda5a5ab\\scratch';
  const rawPath = `${artifactDir}\\raw-news-m1.json`;
  fs.writeFileSync(rawPath, JSON.stringify(rawDoc, null, 2), 'utf-8');
  console.log(`Saved raw JSON to ${rawPath}`);

  // Pass rawDoc through mapCMSNewsArticle
  const mapped = mapCMSNewsArticle(rawDoc);
  const mappedPath = `${artifactDir}\\mapped-news-m1.json`;
  fs.writeFileSync(mappedPath, JSON.stringify(mapped, null, 2), 'utf-8');
  console.log(`Saved mapped JSON to ${mappedPath}`);

  console.log('\n--- VERIFICATION STATS ---');
  console.log('Raw Doc ID:', rawDoc.id);
  console.log('Title:', rawDoc.title);
  console.log('Slug:', rawDoc.slug);
  console.log('Cover Image URL (Raw):', (rawDoc.coverImage as any)?.url);
  console.log('Cover Image Resolved (Mapped):', mapped.coverImage.src);
  console.log('Gallery Images Count:', mapped.galleryImages?.length);
  console.log('Gallery Image 0 Resolved:', mapped.galleryImages?.[0]?.src);
  console.log('Gallery Image 1 Resolved:', mapped.galleryImages?.[1]?.src);
  console.log('Published Date (Mapped):', mapped.publishedDate);
  console.log('Featured (Mapped):', mapped.featured);
  console.log('SEO Meta Title (Mapped):', mapped.seo?.metaTitle);
  console.log('SEO Meta Description (Mapped):', mapped.seo?.metaDescription);
  console.log('RichText Paragraphs Count:', (mapped.richText as any)?.root?.children?.length);
  console.log('=== MILESTONE 1 VERIFICATION PASSED SUCCESSFULLY ===');

  process.exit(0);
}

main().catch((err) => {
  console.error('Milestone 1 Verification failed:', err);
  process.exit(1);
});
