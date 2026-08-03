import { getPayload } from 'payload';
import config from '../payload.config';
import { categories } from '../lib/data/categories';
import fs from 'fs';
import path from 'path';

async function seed() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  console.log('Starting seed categories...');

  for (const cat of categories) {
    let mediaId: number | null = null;

    if (cat.coverImage && cat.coverImage.src) {
      // Clean path to locate file
      // e.g. /images/categories/PNG Crabs.png -> public/images/categories/PNG Crabs.png
      const relativePath = cat.coverImage.src.replace(/^\//, '');
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
          mediaId = existingMedia.docs[0].id as number;
          console.log(`Media already exists: ${filename} (ID: ${mediaId})`);
        } else {
          // Upload new media
          const fileBuffer = fs.readFileSync(filePath);
          const ext = path.extname(filePath).toLowerCase();
          const mimetype = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp';
          
          console.log(`Uploading media: ${filename}...`);
          const mediaDoc = await payload.create({
            collection: 'media',
            data: {
              alt: cat.coverImage.alt || cat.english,
            },
            file: {
              data: fileBuffer,
              name: filename,
              size: fileBuffer.length,
              mimetype: mimetype,
            },
          });
          mediaId = mediaDoc.id as number;
          console.log(`Uploaded media: ${filename} (ID: ${mediaId})`);
        }
      } else {
        console.warn(`Cover image file not found: ${filePath}`);
      }
    }

    const categoryData = {
      thaiTitle: cat.thai,
      englishTitle: cat.english,
      slug: cat.slug,
      description: cat.description,
      coverImage: mediaId,
      published: true,
      seo: {
        metaTitle: `${cat.english} | Origin Seafoods`,
        metaDescription: cat.description,
        canonical: `https://originseafoods.co.th/categories/${cat.slug}`,
        ogImage: mediaId,
      },
    };

    // Check if category already exists by slug
    const existingCategory = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: cat.slug,
        },
      },
    });

    if (existingCategory.docs.length > 0) {
      console.log(`Updating existing category: ${cat.slug}...`);
      await payload.update({
        collection: 'categories',
        id: existingCategory.docs[0].id,
        data: categoryData,
      });
      console.log(`Successfully updated category: ${cat.slug}`);
    } else {
      console.log(`Creating new category: ${cat.slug}...`);
      await payload.create({
        collection: 'categories',
        data: categoryData,
      });
      console.log(`Successfully created category: ${cat.slug}`);
    }
  }

  console.log('Seed categories completed!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
