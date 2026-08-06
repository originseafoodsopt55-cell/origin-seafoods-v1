import fs from 'fs';
import path from 'path';

// 1. Load .env.local variables into process.env BEFORE importing payload config
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value.trim();
      }
    });
  }
} catch (e) {
  console.warn('Could not load .env.local', e);
}

import { getPayload } from 'payload';
import { productGroups, productVariants } from '../lib/data/products';

async function migrate() {
  console.log('Initializing Payload for Full Product Lines & Variants Migration...');
  console.log(`Connecting to Database URI: ${process.env.DATABASE_URI ? 'FOUND (Neon Postgres)' : 'NOT FOUND'}`);

  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  console.log('1. Processing unified species-level product-lines in Payload CMS DB...');

  for (const group of productGroups) {
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
        console.log(`Re-linking variant: ${v.slug} -> line: ${group.slug} (ID: ${lineId}), brand: ${v.brand}`);
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

  // 2. Clean up legacy brand-slug lines that are no longer in productGroups
  const currentSlugs = new Set(productGroups.map((g) => g.slug));
  const allLinesDoc = await payload.find({
    collection: 'product-lines',
    limit: 500,
  });

  for (const line of allLinesDoc.docs) {
    if (!currentSlugs.has(line.slug)) {
      console.log(`Deleting legacy product line: ${line.slug} (ID: ${line.id})`);
      try {
        await payload.delete({
          collection: 'product-lines',
          id: line.id,
        });
        console.log(`Successfully deleted legacy line ${line.slug} (ID: ${line.id})`);
      } catch (err) {
        console.warn(`Failed to delete legacy line ${line.slug} (${line.id}):`, err);
      }
    }
  }

  console.log('Full Product Lines & Variants Migration completed successfully!');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
