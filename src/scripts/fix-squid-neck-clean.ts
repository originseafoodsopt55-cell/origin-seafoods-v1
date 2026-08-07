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

async function fixSquidNeckClean() {
  console.log('Initializing Payload for clean squid-neck fix...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const newImagePath = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Squid\\คอหมึก2.png';
  if (!fs.existsSync(newImagePath)) {
    console.error('File คอหมึก2.png not found at Desktop path!');
    return;
  }

  const fileBuffer = fs.readFileSync(newImagePath);

  // 1. Copy files cleanly to public/images/products and public/media
  const targets = [
    'public/images/products/squid-neck.png',
    'public/images/products/squid-neck-er.png',
    'public/media/squid-neck.png',
    'public/media/squid-neck-er.png',
  ];

  for (const relPath of targets) {
    const fullPath = path.resolve(process.cwd(), relPath);
    fs.writeFileSync(fullPath, fileBuffer);
    console.log(`Wrote clean file: ${relPath}`);
  }

  // 2. Remove any stray -1 files from public/media
  const strayFiles = [
    'public/media/squid-neck-1.png',
    'public/media/squid-neck-er-1.png',
  ];
  for (const relPath of strayFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted stray file: ${relPath}`);
    }
  }

  // 3. Update Media collection entries in Neon DB directly
  const mediaItems = [
    { id: 140, filename: 'squid-neck.png', url: '/api/media/file/squid-neck.png' },
    { id: 146, filename: 'squid-neck-er.png', url: '/api/media/file/squid-neck-er.png' },
  ];

  for (const item of mediaItems) {
    try {
      await payload.update({
        collection: 'media',
        id: item.id,
        data: {
          alt: 'Squid neck frozen seafood product',
          filename: item.filename,
          url: item.url,
          filesize: fileBuffer.length,
          mimeType: 'image/png',
          width: 1200,
          height: 900,
        },
      });
      console.log(`Successfully updated Media DB ID ${item.id} -> ${item.filename}`);
    } catch (err) {
      console.error(`Error updating Media ID ${item.id}:`, err);
    }
  }

  // 4. Also check if any other media docs reference squid-neck-1 or squid-neck-er-1
  const strayMediaDocs = await payload.find({
    collection: 'media',
    where: {
      filename: {
        contains: 'squid-neck',
      },
    },
  });

  for (const doc of strayMediaDocs.docs) {
    console.log(`Found Media Doc ID: ${doc.id}, filename: ${doc.filename}, url: ${doc.url}`);
    if (doc.filename && (doc.filename.includes('-1') || doc.filename.includes('-2'))) {
      const cleanName = doc.filename.includes('squid-neck-er') ? 'squid-neck-er.png' : 'squid-neck.png';
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          filename: cleanName,
          url: `/api/media/file/${cleanName}`,
          filesize: fileBuffer.length,
        },
      });
      console.log(`Cleaned up Media Doc ID ${doc.id} filename to ${cleanName}`);
    }
  }

  console.log('Squid neck clean fix completed!');
  process.exit(0);
}

fixSquidNeckClean().catch((err) => {
  console.error('Error in fixSquidNeckClean:', err);
  process.exit(1);
});
