import fs from 'fs';
import path from 'path';

// Load .env.local variables into process.env BEFORE importing payload config
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
import { productVariants } from '../lib/data/products';

async function seed() {
  console.log('Initializing Payload for product variants seeding...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  console.log('Starting seed product variants...');
  console.log(`Total variants to process: ${productVariants.length}`);

  for (const item of productVariants) {
    const productLineSlug = item.productLineSlug || item.groupSlug;
    console.log(`Processing variant: ${item.slug} under line ${productLineSlug}...`);

    // 1. Find category document
    const categoryDoc = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: item.categorySlug,
        },
      },
    });

    if (categoryDoc.docs.length === 0) {
      console.error(`Error: Category with slug "${item.categorySlug}" not found in DB! Seed categories first.`);
      continue;
    }
    const categoryId = categoryDoc.docs[0].id;

    // 2. Find series document
    const seriesDoc = await payload.find({
      collection: 'series',
      where: {
        slug: {
          equals: item.seriesSlug,
        },
      },
    });

    if (seriesDoc.docs.length === 0) {
      console.error(`Error: Series with slug "${item.seriesSlug}" not found in DB! Seed series first.`);
      continue;
    }
    const seriesId = seriesDoc.docs[0].id;

    // 3. Find parent product-line document by slug AND series relationship (compound)
    const productLineDoc = await payload.find({
      collection: 'product-lines',
      where: {
        and: [
          {
            slug: {
              equals: productLineSlug,
            },
          },
          {
            series: {
              equals: seriesId,
            },
          },
        ],
      },
    });

    if (productLineDoc.docs.length === 0) {
      console.error(`Error: ProductLine with slug "${productLineSlug}" under series "${item.seriesSlug}" not found in DB! Seed product-lines first.`);
      continue;
    }
    const productLineDbDoc = productLineDoc.docs[0];
    const productLineId = productLineDbDoc.id;

    // 4. Resolve parent ProductLine's coverImage ID to use as variant's image relationship
    const coverImageId = typeof productLineDbDoc.coverImage === 'object' && productLineDbDoc.coverImage !== null
      ? (productLineDbDoc.coverImage as { id: number }).id
      : (productLineDbDoc.coverImage as number);

    if (!coverImageId) {
      console.error(`Error: Parent product-line "${productLineSlug}" has no coverImage configured!`);
      continue;
    }

    // Format features array to Payload schema structure
    const featuresData = Array.isArray(item.features)
      ? item.features.map(f => ({ feature: f }))
      : [];

    const variantData = {
      slug: item.slug,
      thaiTitle: item.thai,
      englishTitle: item.english,
      size: item.size || '',
      package: item.package || '',
      packing: item.packing || '',
      storage: item.storage || '',
      scientificName: item.scientificName || '',
      description: item.description || '',
      brand: item.brand || '',
      country: item.country || '',
      variant: item.variant || '',
      features: featuresData,
      productLine: productLineId,
      series: seriesId,
      category: categoryId,
      image: coverImageId,
      published: true, // Idempotent seed forces published: true
      seo: {
        metaTitle: `${item.english} | Origin Seafoods`,
        metaDescription: item.description || '',
        canonical: `https://originseafoods.co.th/products/${item.categorySlug}/${item.seriesSlug}/${productLineSlug}/${item.slug}`,
        ogImage: coverImageId,
      },
    };

    // 5. Create or update variant document
    const existingVariant = await payload.find({
      collection: 'variants',
      where: {
        and: [
          {
            slug: {
              equals: item.slug,
            },
          },
          {
            productLine: {
              equals: productLineId,
            },
          },
        ],
      },
    });

    if (existingVariant.docs.length > 0) {
      console.log(`Updating existing variant: ${item.slug} (ID: ${existingVariant.docs[0].id})...`);
      await payload.update({
        collection: 'variants',
        id: existingVariant.docs[0].id,
        data: variantData,
      });
      console.log(`Successfully updated variant: ${item.slug}`);
    } else {
      console.log(`Creating new variant: ${item.slug}...`);
      await payload.create({
        collection: 'variants',
        data: variantData,
      });
      console.log(`Successfully created variant: ${item.slug}`);
    }
  }

  console.log('Seed product variants completed!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
