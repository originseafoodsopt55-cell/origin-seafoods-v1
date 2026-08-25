import fs from 'fs';
import path from 'path';

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

async function uploadMedia(payload: Payload, imagePathStr: string, altText: string) {
  const relativePath = imagePathStr.replace(/^\//, '');
  const filePath = path.resolve('public', relativePath);

  if (!fs.existsSync(filePath)) {
    console.warn(`Media file not found: ${filePath}`);
    return null;
  }

  const filename = path.basename(filePath);
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
  });

  if (existingMedia.docs.length > 0) {
    console.log(`Media exists: ${filename} (ID: ${existingMedia.docs[0].id})`);
    return existingMedia.docs[0].id;
  }

  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimetype = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp';

  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      alt: altText || filename,
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

async function seedBrandOptions() {
  console.log('Initializing Payload for seeding brand options...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  // 1. Find ProductLine for blue-swimming-crab
  const lineResult = await payload.find({
    collection: 'product-lines',
    where: {
      slug: {
        equals: 'blue-swimming-crab',
      },
    },
  });

  if (lineResult.docs.length === 0) {
    console.error('Error: blue-swimming-crab ProductLine not found in database!');
    process.exit(1);
  }

  const lineDoc = lineResult.docs[0];
  console.log(`Found blue-swimming-crab line (ID: ${lineDoc.id})`);

  // Upload/get media IDs
  const img1 = await uploadMedia(payload, '/images/products/blue-swimming-crab.png', 'PHOOMA MAHACHAI Box');
  const img2 = await uploadMedia(payload, '/images/products/blue-swimming-crab-ibnr.png', 'JARADAH FISH Box');
  const img3 = await uploadMedia(payload, '/images/products/blue-swimming-crab-white-box.jpg', 'IBNE Box');
  const img4 = await uploadMedia(payload, '/images/products/three-spot-swimming-crab.png', 'WHITE BOX');

  const brandOptionsData = [
    {
      brandName: 'PHOOMA MAHACHAI',
      boxImage: img1,
      gallery: img1 ? [{ image: img1 }, ...(img2 ? [{ image: img2 }] : [])] : [],
      packingSize: 'ลังละ 10 Kg.',
      maleSizes: [
        { sizeText: '20/30', sizeImage: img1 },
        { sizeText: '30/50', sizeImage: img2 },
        { sizeText: '50/80', sizeImage: img3 },
      ],
      femaleSizes: [
        { sizeText: '20/30', sizeImage: img1 },
        { sizeText: '30/50', sizeImage: img4 },
      ],
    },
    {
      brandName: 'JARADAH FISH',
      boxImage: img2,
      gallery: img2 ? [{ image: img2 }, ...(img3 ? [{ image: img3 }] : [])] : [],
      packingSize: 'ลังละ 8 Kg.',
      maleSizes: [
        { sizeText: '30/50', sizeImage: img2 },
        { sizeText: '50/80', sizeImage: img3 },
        { sizeText: '80/100', sizeImage: img1 },
        { sizeText: '100/150' },
        { sizeText: '150/200' },
        { sizeText: '200UP' },
      ],
      femaleSizes: [
        { sizeText: '30/50', sizeImage: img2 },
        { sizeText: '50/80', sizeImage: img4 },
        { sizeText: '80/100' },
        { sizeText: '100/150' },
        { sizeText: '150/200' },
        { sizeText: '200UP' },
      ],
    },
    {
      brandName: 'IBNE',
      boxImage: img3,
      gallery: img3 ? [{ image: img3 }, ...(img1 ? [{ image: img1 }] : [])] : [],
      packingSize: 'ลังละ 12 Kg.',
      maleSizes: [
        { sizeText: '50/80', sizeImage: img3 },
        { sizeText: '80/100', sizeImage: img1 },
        { sizeText: '100/150' },
      ],
      femaleSizes: [
        { sizeText: '50/80', sizeImage: img3 },
        { sizeText: '80/100', sizeImage: img2 },
      ],
    },
    {
      brandName: 'WHITE BOX',
      boxImage: img4,
      gallery: img4 ? [{ image: img4 }, ...(img2 ? [{ image: img2 }] : [])] : [],
      packingSize: 'ลังละ 10 Kg.',
      maleSizes: [
        { sizeText: '30/50', sizeImage: img4 },
        { sizeText: '50/80', sizeImage: img2 },
        { sizeText: '80/100', sizeImage: img3 },
      ],
      femaleSizes: [
        { sizeText: '30/50', sizeImage: img4 },
        { sizeText: '50/80', sizeImage: img1 },
      ],
    },
  ];

  console.log('Updating blue-swimming-crab with brandOptions...');
  await payload.update({
    collection: 'product-lines',
    id: lineDoc.id,
    context: { allowSlugUpdate: true },
    data: {
      brandOptions: brandOptionsData,
    },
  });

  console.log('Successfully seeded brandOptions for blue-swimming-crab!');
  process.exit(0);
}

seedBrandOptions().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
