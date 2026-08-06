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

import { getPayload, Payload } from 'payload';
import { productSeries } from '../lib/data/products';

async function uploadMedia(payload: Payload, imageAsset: { src: string; alt?: string }) {
  if (!imageAsset || !imageAsset.src) return null;

  const relativePath = imageAsset.src.replace(/^\//, '');
  const filePath = path.resolve('public', relativePath);

  if (fs.existsSync(filePath)) {
    const filename = path.basename(filePath);
    
    // Check if media already exists
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
    });

    if (existingMedia.docs.length > 0) {
      const mediaId = existingMedia.docs[0].id;
      console.log(`Media already exists: ${filename} (ID: ${mediaId})`);
      return mediaId;
    } else {
      // Upload new media
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const mimetype = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'image/webp';
      
      console.log(`Uploading media: ${filename}...`);
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: imageAsset.alt || filename,
        },
        file: {
          data: fileBuffer,
          name: filename,
          size: fileBuffer.length,
          mimetype: mimetype,
        },
      });
      console.log(`Uploaded media: ${filename} (ID: ${mediaDoc.id})`);
      return mediaDoc.id;
    }
  } else {
    console.warn(`Media file not found: ${filePath}`);
    return null;
  }
}

async function seed() {
  console.log('Initializing Payload for series seeding...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  console.log('Starting seed series...');

  for (const item of productSeries) {
    console.log(`Processing series: ${item.slug}...`);

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

    // 2. Upload main image
    const imageId = await uploadMedia(payload, item.image);
    if (!imageId) {
      console.error(`Error: Image upload failed for series ${item.slug}`);
      continue;
    }

    const seriesData = {
      slug: item.slug,
      thaiTitle: item.thai,
      englishTitle: item.english,
      description: item.description || '',
      category: categoryId,
      coverImage: imageId,
      image: imageId,
      published: true,
      seo: {
        metaTitle: `${item.english} | Origin Seafoods`,
        metaDescription: item.description || '',
        canonical: `https://originseafoods.co.th/products/${item.categorySlug}/${item.slug}`,
        ogImage: imageId,
      },
    };

    // 3. Create or update series document by slug
    const existingSeries = await payload.find({
      collection: 'series',
      where: {
        slug: {
          equals: item.slug,
        },
      },
    });

    if (existingSeries.docs.length > 0) {
      console.log(`Updating existing series: ${item.slug} (ID: ${existingSeries.docs[0].id})...`);
      await payload.update({
        collection: 'series',
        id: existingSeries.docs[0].id,
        data: seriesData,
      });
      console.log(`Successfully updated series: ${item.slug}`);
    } else {
      console.log(`Creating new series: ${item.slug}...`);
      await payload.create({
        collection: 'series',
        data: seriesData,
      });
      console.log(`Successfully created series: ${item.slug}`);
    }
  }

  console.log('Seed series completed!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
