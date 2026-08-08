/* eslint-disable */
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

async function seedSquidExpansion() {
  console.log('Initializing Payload for 3 new Squid items seeding...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  // 1. Fetch category 'squid' ID
  const catRes = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: 'squid',
      },
    },
  });
  if (catRes.docs.length === 0) {
    console.error('Category squid not found!');
    return;
  }
  const categoryId = catRes.docs[0].id;

  // 2. Define the 3 new items
  const items = [
    {
      slug: 'cuttlefish',
      variantSlug: 'cuttlefish-standard',
      thaiTitle: 'หมึกกระดอง',
      englishTitle: 'Cuttlefish',
      variantThai: 'หมึกกระดอง (Cuttlefish)',
      variantEnglish: 'Frozen Cuttlefish',
      desktopName: 'หมึกกระดอง.png',
      cleanName: 'cuttlefish.png',
      description: 'หมึกกระดองแช่แข็งเกรดพรีเมียม สดสะอาด เนื้อหนานุ่มเด้ง คัดไซส์สม่ำเสมอ',
    },
    {
      slug: 'squid-roe',
      variantSlug: 'squid-roe-standard',
      thaiTitle: 'ไข่หมึก',
      englishTitle: 'Squid Roe',
      variantThai: 'ไข่หมึก (Squid Roe)',
      variantEnglish: 'Frozen Squid Roe',
      desktopName: 'ไข่หมึก.png',
      cleanName: 'squid-roe.png',
      description: 'ไข่หมึกคัดพิเศษ สดใหม่ เนื้อแน่นมันอร่อย ปลอดภัย เหมาะสำหรับย่าง ทอด ผัด',
    },
    {
      slug: 'squid-rings',
      variantSlug: 'squid-rings-standard',
      thaiTitle: 'หมึกวง',
      englishTitle: 'Squid Rings',
      variantThai: 'หมึกวง (Squid Rings)',
      variantEnglish: 'Frozen Squid Rings',
      desktopName: 'หมึกวง.png',
      cleanName: 'squid-rings.png',
      description: 'หมึกวงแช่แข็ง ตัดหั่นสม่ำเสมอ สดสะอาด เหมาะสำหรับทอดและผัดประกอบอาหาร',
    },
  ];

  const desktopDir = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Squid';

  for (const item of items) {
    const srcPath = path.join(desktopDir, item.desktopName);
    if (!fs.existsSync(srcPath)) {
      console.error(`File ${item.desktopName} not found!`);
      continue;
    }
    const fileBuffer = fs.readFileSync(srcPath);

    // Copy to static & media dirs
    const relPaths = [
      `public/images/products/${item.cleanName}`,
      `public/media/${item.cleanName}`,
    ];
    for (const relPath of relPaths) {
      const fullPath = path.resolve(process.cwd(), relPath);
      fs.writeFileSync(fullPath, fileBuffer);
    }

    // Media doc in Payload
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: item.cleanName,
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
          alt: `${item.englishTitle} frozen seafood product`,
          filename: item.cleanName,
          url: `/api/media/file/${item.cleanName}`,
          filesize: fileBuffer.length,
          mimeType: 'image/png',
        },
      });
      console.log(`Updated Media ID ${mediaId} -> ${item.cleanName}`);
    } else {
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: `${item.englishTitle} frozen seafood product`,
        },
        file: {
          data: fileBuffer,
          name: item.cleanName,
          size: fileBuffer.length,
          mimetype: 'image/png',
        },
      });
      mediaId = mediaDoc.id;
      console.log(`Created Media ID ${mediaId} -> ${item.cleanName}`);
    }

    // Create or Update Series
    const existingSeries = await payload.find({
      collection: 'series',
      where: {
        slug: {
          equals: item.slug,
        },
      },
    });

    let seriesId: number;
    if (existingSeries.docs.length > 0) {
      seriesId = existingSeries.docs[0].id;
      await payload.update({
        collection: 'series',
        id: seriesId,
        data: {
          thaiTitle: item.thaiTitle,
          englishTitle: item.englishTitle,
          category: categoryId,
          image: mediaId,
          coverImage: mediaId,
          description: item.description,
        },
      });
      console.log(`Updated Series ID ${seriesId} -> ${item.thaiTitle}`);
    } else {
      const seriesDoc = await payload.create({
        collection: 'series',
        data: {
          slug: item.slug,
          thaiTitle: item.thaiTitle,
          englishTitle: item.englishTitle,
          category: categoryId,
          image: mediaId,
          coverImage: mediaId,
          description: item.description,
        },
      });
      seriesId = seriesDoc.id;
      console.log(`Created Series ID ${seriesId} -> ${item.thaiTitle}`);
    }

    // Create or Update ProductLine
    const existingLine = await payload.find({
      collection: 'product-lines',
      where: {
        slug: {
          equals: item.slug,
        },
      },
    });

    let lineId: number;
    if (existingLine.docs.length > 0) {
      lineId = existingLine.docs[0].id;
      await payload.update({
        collection: 'product-lines',
        id: lineId,
        data: {
          thaiTitle: item.thaiTitle,
          englishTitle: item.englishTitle,
          category: categoryId,
          series: seriesId,
          coverImage: mediaId,
          description: item.description,
        },
      });
      console.log(`Updated ProductLine ID ${lineId} -> ${item.thaiTitle}`);
    } else {
      const lineDoc = await payload.create({
        collection: 'product-lines',
        data: {
          slug: item.slug,
          thaiTitle: item.thaiTitle,
          englishTitle: item.englishTitle,
          category: categoryId,
          series: seriesId,
          coverImage: mediaId,
          description: item.description,
        },
      });
      lineId = lineDoc.id;
      console.log(`Created ProductLine ID ${lineId} -> ${item.thaiTitle}`);
    }

    // Create or Update Variant
    const existingVariant = await payload.find({
      collection: 'variants',
      where: {
        slug: {
          equals: item.variantSlug,
        },
      },
    });

    if (existingVariant.docs.length > 0) {
      await payload.update({
        collection: 'variants',
        id: existingVariant.docs[0].id,
        data: {
          thaiTitle: item.variantThai,
          englishTitle: item.variantEnglish,
          category: categoryId,
          series: seriesId,
          productLine: lineId,
          image: mediaId,
          packing: 'ลังละ 10 kg.',
          description: item.description,
        } as any,
      });
      console.log(`Updated Variant ID ${existingVariant.docs[0].id} -> ${item.variantThai}`);
    } else {
      const varDoc = await payload.create({
        collection: 'variants',
        data: {
          slug: item.variantSlug,
          thaiTitle: item.variantThai,
          englishTitle: item.variantEnglish,
          category: categoryId,
          series: seriesId,
          productLine: lineId,
          image: mediaId,
          packing: 'ลังละ 10 kg.',
          description: item.description,
        } as any,
      });
      console.log(`Created Variant ID ${varDoc.id} -> ${item.variantThai}`);
    }
  }

  console.log('Squid 3 new items seeding completed successfully!');
  process.exit(0);
}

seedSquidExpansion().catch((err) => {
  console.error('Error in seedSquidExpansion:', err);
  process.exit(1);
});
