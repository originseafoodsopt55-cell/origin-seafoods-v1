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

async function seedJellyfishRefactor() {
  console.log('Initializing Payload for Jellyfish refactoring...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  // 1. Fetch category 'jellyfish' ID
  const catRes = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: 'jellyfish',
      },
    },
  });
  if (catRes.docs.length === 0) {
    console.error('Category jellyfish not found!');
    return;
  }
  const categoryId = catRes.docs[0].id;

  // 2. Define the 4 items
  const items = [
    {
      slug: 'angel-wing-jellyfish',
      thaiTitle: 'แมงกะพรุนปีกนางฟ้า',
      englishTitle: 'Angel Wing Jellyfish',
      desktopName: 'แมงกะพรุนปีกนางฟ้า.png',
      cleanName: 'angel-wing-jellyfish.png',
      description: 'แมงกะพรุนปีกนางฟ้านำเข้าเกรดพรีเมียม สดสะอาด กรอบเด้ง',
    },
    {
      slug: 'quartered-jellyfish',
      thaiTitle: 'แมงกะพรุนผ่าสี่',
      englishTitle: 'Quartered Jellyfish',
      desktopName: 'แมงกะพรุนผ่าสี่.png',
      cleanName: 'quartered-jellyfish.png',
      description: 'แมงกะพรุนผ่าสี่เกรดคุณภาพ คัดไซส์สม่ำเสมอ เนื้อกรอบอร่อย',
    },
    {
      slug: 'tiger-stripe-jellyfish',
      thaiTitle: 'แมงกะพรุนลายเสือ',
      englishTitle: 'Tiger Stripe Jellyfish',
      desktopName: 'แมงกะพรุนลายเสือ.png',
      cleanName: 'tiger-stripe-jellyfish.png',
      description: 'แมงกะพรุนลายเสือสดสะอาด นำเข้าตรงจากแหล่งผลิตชั้นดี',
    },
    {
      slug: 'cannonball-jellyfish',
      thaiTitle: 'แมงกะพรุนหัวกระสุน',
      englishTitle: 'Cannonball Jellyfish',
      desktopName: 'แมงกะพรุนหัวกระสุน.png',
      cleanName: 'cannonball-jellyfish.png',
      description: 'แมงกะพรุนหัวกระสุนเนื้อแน่นหนา กรุบกรอบพิเศษ',
    },
  ];

  const desktopDir = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Jellyfish';

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

    // Relink variants
    let variantFilter = '';
    if (item.slug === 'angel-wing-jellyfish') variantFilter = 'fairy-wing';
    else if (item.slug === 'tiger-stripe-jellyfish') variantFilter = 'tiger-stripe';
    else if (item.slug === 'cannonball-jellyfish') variantFilter = 'bullet-head';
    else if (item.slug === 'quartered-jellyfish') variantFilter = 'thai-stock';

    if (variantFilter) {
      const varDocs = await payload.find({
        collection: 'variants',
        where: {
          slug: {
            contains: variantFilter,
          },
        },
      });
      for (const v of varDocs.docs) {
        await payload.update({
          collection: 'variants',
          id: v.id,
          data: {
            series: seriesId,
            productLine: lineId,
            seriesSlug: item.slug,
            productLineSlug: item.slug,
          },
        });
        console.log(`Relinked Variant ID ${v.id} (${v.slug}) to Series/Line ${item.slug}`);
      }
    }
  }

  // 3. Delete old 'jellyfish' product line FIRST, then old 'jellyfish' series
  const oldLine = await payload.find({
    collection: 'product-lines',
    where: {
      slug: {
        equals: 'jellyfish',
      },
    },
  });
  for (const l of oldLine.docs) {
    await payload.delete({
      collection: 'product-lines',
      id: l.id,
    });
    console.log(`Deleted old ProductLine ID ${l.id} (slug: jellyfish)`);
  }

  const oldSeries = await payload.find({
    collection: 'series',
    where: {
      slug: {
        equals: 'jellyfish',
      },
    },
  });
  for (const s of oldSeries.docs) {
    await payload.delete({
      collection: 'series',
      id: s.id,
    });
    console.log(`Deleted old Series ID ${s.id} (slug: jellyfish)`);
  }

  console.log('Jellyfish refactoring completed successfully!');
  process.exit(0);
}

seedJellyfishRefactor().catch((err) => {
  console.error('Error in seedJellyfishRefactor:', err);
  process.exit(1);
});
