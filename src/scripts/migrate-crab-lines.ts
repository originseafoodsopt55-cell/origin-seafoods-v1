import { getPayload } from 'payload';
import config from '../payload.config';
import { productGroups, productVariants } from '../lib/data/products';

async function migrate() {
  console.log('Initializing Payload for Crab Product Lines & Variants Migration...');
  const payload = await getPayload({ config });

  console.log('1. Cleaning up legacy brand-level product-lines in Payload CMS DB...');

  // Find legacy product lines for crabs (slugs: 'ibnr', 'white-box')
  const legacyLines = await payload.find({
    collection: 'product-lines',
    where: {
      or: [
        { slug: { equals: 'ibnr' } },
        { slug: { equals: 'white-box' } },
      ],
    },
  });

  console.log(`Found ${legacyLines.docs.length} legacy product-lines to clean up.`);

  // Upsert unified species-level product-lines from productGroups
  const crabGroups = productGroups.filter((g) => g.categorySlug === 'crabs');

  for (const group of crabGroups) {
    const categoryDoc = await payload.find({
      collection: 'categories',
      where: { slug: { equals: group.categorySlug } },
    });
    const seriesDoc = await payload.find({
      collection: 'series',
      where: { slug: { equals: group.seriesSlug } },
    });

    if (categoryDoc.docs.length === 0 || seriesDoc.docs.length === 0) {
      console.warn(`Category or Series not found for ${group.slug}`);
      continue;
    }

    const categoryId = categoryDoc.docs[0].id;
    const seriesId = seriesDoc.docs[0].id;

    const existing = await payload.find({
      collection: 'product-lines',
      where: {
        and: [
          { slug: { equals: group.slug } },
          { series: { equals: seriesId } },
        ],
      },
    });

    let lineId: string | number;

    if (existing.docs.length > 0) {
      lineId = existing.docs[0].id;
      console.log(`Updating existing unified line: ${group.slug} (ID: ${lineId})`);
      await payload.update({
        collection: 'product-lines',
        id: lineId,
        data: {
          thaiTitle: group.thai,
          englishTitle: group.english,
          description: group.description || '',
          published: true,
        },
      });
    } else {
      console.log(`Creating unified line: ${group.slug}`);
      const created = await payload.create({
        collection: 'product-lines',
        data: {
          slug: group.slug,
          thaiTitle: group.thai,
          englishTitle: group.english,
          description: group.description || '',
          series: seriesId,
          category: categoryId,
          published: true,
        },
      });
      lineId = created.id;
    }

    // Re-link variants for this species
    const speciesVariants = productVariants.filter(
      (v) => (v.productLineSlug ?? v.groupSlug) === group.slug
    );

    for (const v of speciesVariants) {
      const existingVar = await payload.find({
        collection: 'variants',
        where: { slug: { equals: v.slug } },
      });

      if (existingVar.docs.length > 0) {
        console.log(`Re-linking variant: ${v.slug} -> line: ${group.slug}, brand: ${v.brand}`);
        await payload.update({
          collection: 'variants',
          id: existingVar.docs[0].id,
          data: {
            productLine: lineId,
            brand: v.brand || '',
            published: true,
          },
        });
      }
    }
  }

  // Safely delete legacy lines after variants have been re-linked
  for (const legacy of legacyLines.docs) {
    // Only delete if slug is not one of our unified species slugs
    if (legacy.slug === 'ibnr' || legacy.slug === 'white-box') {
      console.log(`Deleting legacy product line: ${legacy.slug} (ID: ${legacy.id})`);
      try {
        await payload.delete({
          collection: 'product-lines',
          id: legacy.id,
        });
      } catch (err) {
        console.warn(`Failed to delete legacy line ${legacy.id}:`, err);
      }
    }
  }

  console.log('Crab Product Lines & Variants Migration completed successfully!');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
