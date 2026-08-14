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

async function fixFishClean() {
  console.log('Initializing Payload for clean fish update...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const desktopPath = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Fish\\หนังปลาแซลมอน.png';
  if (!fs.existsSync(desktopPath)) {
    console.error('File หนังปลาแซลมอน.png not found!');
    return;
  }
  const fileBuffer = fs.readFileSync(desktopPath);

  // 1. Write clean image files
  const cleanFiles = [
    'public/images/products/salmon-skin.png',
    'public/images/products/dolly-fish-dolly-fish.png',
    'public/media/salmon-skin.png',
    'public/media/dolly-fish-dolly-fish.png',
  ];
  for (const relPath of cleanFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    fs.writeFileSync(fullPath, fileBuffer);
  }

  // 2. Upload/Create or Update Media document for salmon-skin
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'salmon-skin.png',
      },
    },
  });

  let mediaId: number;
  if (existingMedia.docs.length > 0) {
    mediaId = existingMedia.docs[0].id;
    await payload.update({
      collection: 'media',
      id: mediaId,
      data: {
        alt: 'Salmon skin frozen seafood product',
        filename: 'salmon-skin.png',
        url: '/api/media/file/salmon-skin.png',
        filesize: fileBuffer.length,
        mimeType: 'image/png',
      },
    });
    console.log(`Updated Media doc ID ${mediaId} -> salmon-skin.png`);
  } else {
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: 'Salmon skin frozen seafood product',
      },
      file: {
        data: fileBuffer,
        name: 'salmon-skin.png',
        size: fileBuffer.length,
        mimetype: 'image/png',
      },
    });
    mediaId = mediaDoc.id;
    console.log(`Created Media doc ID ${mediaId} -> salmon-skin.png`);
  }

  // 3. Update Series 'dolly-fish' (ID: 47) -> 'salmon-skin'
  const seriesDoc = await payload.find({
    collection: 'series',
    where: {
      slug: {
        equals: 'dolly-fish',
      },
    },
  });
  if (seriesDoc.docs.length > 0) {
    const sId = seriesDoc.docs[0].id;
    await payload.update({
      collection: 'series',
      id: sId,
      data: {
        slug: 'salmon-skin',
        thaiTitle: 'หนังปลาแซลมอน',
        englishTitle: 'Salmon Skin',
        coverImage: mediaId,
        description: 'หนังปลาแซลมอนแช่แข็งคุณภาพเยี่ยม สดใหม่ กรอบอร่อย',
      },
    });
    console.log(`Updated Series DB ID ${sId} -> slug: salmon-skin, หนังปลาแซลมอน / Salmon Skin`);
  }

  // 4. Update ProductLines 'dolly-fish' (ID: 39) -> 'salmon-skin'
  const lineDoc = await payload.find({
    collection: 'product-lines',
    where: {
      slug: {
        equals: 'dolly-fish',
      },
    },
  });
  if (lineDoc.docs.length > 0) {
    const lId = lineDoc.docs[0].id;
    await payload.update({
      collection: 'product-lines',
      id: lId,
      data: {
        slug: 'salmon-skin',
        thaiTitle: 'หนังปลาแซลมอน',
        englishTitle: 'Salmon Skin',
        coverImage: mediaId,
        description: 'หนังปลาแซลมอนแช่แข็งคัดคุณภาพ สดสะอาด เหมาะสำหรับประกอบอาหารและแปรรูป',
      },
    });
    console.log(`Updated ProductLine DB ID ${lId} -> slug: salmon-skin, หนังปลาแซลมอน / Salmon Skin`);
  }

  // 5. Update Variants under fish category
  const varDoc = await payload.find({
    collection: 'variants',
    where: {
      'category.slug': {
        equals: 'fish',
      },
    },
  });
  for (const v of varDoc.docs) {
    await payload.update({
      collection: 'variants',
      id: v.id,
      data: {
        thaiTitle: 'หนังปลาแซลมอน',
        englishTitle: 'Salmon skin',
        description: 'หนังปลาแซลมอนแช่แข็งคัดพิเศษ สดสะอาด รสชาติดีเยี่ยม',
      },
    });
    console.log(`Updated Variant DB ID ${v.id} -> หนังปลาแซลมอน / Salmon skin`);
  }

  console.log('Fish clean fix completed successfully!');
  process.exit(0);
}

fixFishClean().catch((err) => {
  console.error('Error in fixFishClean:', err);
  process.exit(1);
});
