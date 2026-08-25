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

async function seedThreeSpotBrandOptions() {
  console.log('Initializing Payload for seeding three-spot-swimming-crab brand options...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  // 1. Find ProductLine for three-spot-swimming-crab
  const lineResult = await payload.find({
    collection: 'product-lines',
    where: {
      slug: {
        equals: 'three-spot-swimming-crab',
      },
    },
  });

  if (lineResult.docs.length === 0) {
    console.error('Error: three-spot-swimming-crab ProductLine not found in database!');
    process.exit(1);
  }

  const lineDoc = lineResult.docs[0];
  console.log(`Found three-spot-swimming-crab line (ID: ${lineDoc.id})`);

  // Upload/get media IDs for root ProductLine gallery (Product photos for Default Autoplay State)
  const mainPhoto1 = await uploadMedia(payload, 'images/products/three-spot-swimming-crab.png', 'ปูจุด Three-Spot Swimming Crab Main Photo 1');
  const mainPhoto2 = await uploadMedia(payload, 'images/products/three-spot-swimming-crab.jpg', 'ปูจุด Three-Spot Swimming Crab Main Photo 2');
  const mainPhoto3 = await uploadMedia(payload, 'images/products/three-spot-swimming-crab-ibnr.png', 'ปูจุด Three-Spot Swimming Crab Main Photo 3');

  // Upload/get media IDs for IBNE Brand Box and Gallery
  const ibneBox = await uploadMedia(payload, 'media/IBNE.png', 'IBNE Brand Box Package');
  const ibneGallery1 = await uploadMedia(payload, 'media/IBNE-1.png', 'IBNE Three-Spot Crab Photo 1');
  const ibneGallery2 = await uploadMedia(payload, 'media/IBNE-2.png', 'IBNE Three-Spot Crab Photo 2');
  const ibneGallery3 = await uploadMedia(payload, 'media/IBNE-3.png', 'IBNE Three-Spot Crab Photo 3');

  // Upload/get media IDs for IBNE Size Images
  const ibne4060f = await uploadMedia(payload, 'media/IBNE-40-60F.png', 'IBNE Female Size 40/60');
  const ibne6080f = await uploadMedia(payload, 'media/IBNE-60-80F.png', 'IBNE Female Size 60/80');
  const ibne6080m = await uploadMedia(payload, 'media/IBNE-60-80M.png', 'IBNE Male Size 60/80');
  const ibne80100f = await uploadMedia(payload, 'media/IBNE-80-100F.png', 'IBNE Female Size 80/100');
  const ibne80100m = await uploadMedia(payload, 'media/IBNE-80-100M.png', 'IBNE Male Size 80/100');
  const ibne100150f = await uploadMedia(payload, 'media/IBNE-100-150F.png', 'IBNE Female Size 100/150');
  const ibne100150m = await uploadMedia(payload, 'media/IBNE-100-150M.png', 'IBNE Male Size 100/150');
  const ibne150200f = await uploadMedia(payload, 'media/IBNE-150-200F.png', 'IBNE Female Size 150/200');
  const ibne150200m = await uploadMedia(payload, 'media/IBNE-150-200M.png', 'IBNE Male Size 150/200');
  const ibne200upm = await uploadMedia(payload, 'media/IBNE-200UPM.png', 'IBNE Male Size 200UP');
  const ibne300upm = await uploadMedia(payload, 'media/IBNE-300UPM.png', 'IBNE Male Size 300UP');

  // Define IBNE Brand Option
  const brandOptionsData = [
    {
      brandName: 'IBNE',
      boxImage: ibneBox || mainPhoto3 || mainPhoto1,
      gallery: [
        ...(ibneBox ? [{ image: ibneBox }] : []),
        ...(ibneGallery1 ? [{ image: ibneGallery1 }] : []),
        ...(ibneGallery2 ? [{ image: ibneGallery2 }] : []),
        ...(ibneGallery3 ? [{ image: ibneGallery3 }] : []),
      ],
      packingSize: 'ลังละ 10 Kg.',
      maleSizes: [
        { sizeText: '60/80', sizeImage: ibne6080m || ibneBox },
        { sizeText: '80/100', sizeImage: ibne80100m || ibneBox },
        { sizeText: '100/150', sizeImage: ibne100150m || ibneBox },
        { sizeText: '150/200', sizeImage: ibne150200m || ibneBox },
        { sizeText: '200UP', sizeImage: ibne200upm || ibneBox },
        { sizeText: '300UP', sizeImage: ibne300upm || ibneBox },
      ],
      femaleSizes: [
        { sizeText: '40/60', sizeImage: ibne4060f || ibneBox },
        { sizeText: '60/80', sizeImage: ibne6080f || ibneBox },
        { sizeText: '80/100', sizeImage: ibne80100f || ibneBox },
        { sizeText: '100/150', sizeImage: ibne100150f || ibneBox },
        { sizeText: '150/200', sizeImage: ibne150200f || ibneBox },
      ],
    },
  ];

  // Root Gallery for Default State Autoplay
  const rootGalleryData = [
    ...(mainPhoto1 ? [{ image: mainPhoto1 }] : []),
    ...(mainPhoto2 ? [{ image: mainPhoto2 }] : []),
    ...(mainPhoto3 ? [{ image: mainPhoto3 }] : []),
    ...(ibneGallery1 ? [{ image: ibneGallery1 }] : []),
  ];

  console.log('Updating three-spot-swimming-crab with brandOptions and root gallery...');
  await payload.update({
    collection: 'product-lines',
    id: lineDoc.id,
    context: { allowSlugUpdate: true },
    data: {
      brandOptions: brandOptionsData,
      gallery: rootGalleryData,
    },
  });

  console.log('Successfully seeded brandOptions for three-spot-swimming-crab!');
  process.exit(0);
}

seedThreeSpotBrandOptions().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
