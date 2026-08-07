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

async function fixSilkwormClean() {
  console.log('Initializing Payload for clean silkworm update...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const desktopPath = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Silkworm\\หนอนไหม.png';
  if (!fs.existsSync(desktopPath)) {
    console.error('File หนอนไหม.png not found!');
    return;
  }
  const fileBuffer = fs.readFileSync(desktopPath);

  // 1. Write clean image files
  const cleanFiles = [
    'public/images/products/silkworm.png',
    'public/images/products/silkworm-silkworm.png',
    'public/media/silkworm.png',
    'public/media/silkworm-silkworm.png',
  ];
  for (const relPath of cleanFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    fs.writeFileSync(fullPath, fileBuffer);
  }

  // 2. Upload/Create or Update Media document for silkworm
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: 'silkworm.png',
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
        alt: 'Frozen silkworm chrysalis seafood product',
        filename: 'silkworm.png',
        url: '/api/media/file/silkworm.png',
        filesize: fileBuffer.length,
        mimeType: 'image/png',
      },
    });
    console.log(`Updated Media doc ID ${mediaId} -> silkworm.png`);
  } else {
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        alt: 'Frozen silkworm chrysalis seafood product',
      },
      file: {
        data: fileBuffer,
        name: 'silkworm.png',
        size: fileBuffer.length,
        mimetype: 'image/png',
      },
    });
    mediaId = mediaDoc.id;
    console.log(`Created Media doc ID ${mediaId} -> silkworm.png`);
  }

  // 3. Update Series 'silkworm' (ID: 48)
  const seriesDoc = await payload.find({
    collection: 'series',
    where: {
      slug: {
        equals: 'silkworm',
      },
    },
  });
  if (seriesDoc.docs.length > 0) {
    const sId = seriesDoc.docs[0].id;
    await payload.update({
      collection: 'series',
      id: sId,
      data: {
        thaiTitle: 'หนอนไหม',
        englishTitle: 'Frozen Silkworm Chrysalis',
        image: mediaId,
        coverImage: mediaId,
        description: 'หนอนไหมแช่แข็งเกรดคัดสรรพิเศษ อวบอ้วนสะอาด ปลอดภัย',
      },
    });
    console.log(`Updated Series DB ID ${sId} -> หนอนไหม / Frozen Silkworm Chrysalis`);
  }

  // 4. Update ProductLines 'silkworm' (ID: 40)
  const lineDoc = await payload.find({
    collection: 'product-lines',
    where: {
      slug: {
        equals: 'silkworm',
      },
    },
  });
  if (lineDoc.docs.length > 0) {
    const lId = lineDoc.docs[0].id;
    await payload.update({
      collection: 'product-lines',
      id: lId,
      data: {
        thaiTitle: 'หนอนไหม',
        englishTitle: 'Frozen Silkworm Chrysalis',
        coverImage: mediaId,
        description: 'หนอนไหมแช่แข็งเกรดดีที่สุด ตัวเหลืองอวบอ้วนสะอาด ไม่หักไม่แตก',
      },
    });
    console.log(`Updated ProductLine DB ID ${lId} -> หนอนไหม / Frozen Silkworm Chrysalis`);
  }

  // 5. Update Variants under silkworm category
  const varDoc = await payload.find({
    collection: 'variants',
    where: {
      'category.slug': {
        equals: 'silkworm',
      },
    },
  });
  for (const v of varDoc.docs) {
    await payload.update({
      collection: 'variants',
      id: v.id,
      data: {
        thaiTitle: 'หนอนไหม 10 Kg (AAAAA)',
        englishTitle: 'Frozen Silkworm Chrysalis 10 Kg (AAAAA)',
        description: 'หนอนไหมเกรด 5A คัดพิเศษอวบแน่น ตัวสีเหลืองสวย เหมาะสำหรับคั่ว ทอด ปรุงรสตามต้องการ',
      },
    });
    console.log(`Updated Variant DB ID ${v.id} -> หนอนไหม / Frozen Silkworm Chrysalis`);
  }

  console.log('Silkworm clean fix completed successfully!');
  process.exit(0);
}

fixSilkwormClean().catch((err) => {
  console.error('Error in fixSilkwormClean:', err);
  process.exit(1);
});
