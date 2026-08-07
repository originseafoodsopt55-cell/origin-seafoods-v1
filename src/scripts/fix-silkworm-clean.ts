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
  console.log('Initializing Payload for clean silkworm 2 update...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const desktopPath = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Silkworm\\หนอนไหม2.png';
  if (!fs.existsSync(desktopPath)) {
    console.error('File หนอนไหม2.png not found!');
    return;
  }
  const fileBuffer = fs.readFileSync(desktopPath);

  // 1. Write clean image files
  const cleanFiles = [
    'public/images/products/silkworm.png',
    'public/images/products/silkworm-silkworm.png',
    'public/images/products/silkworm-1.png',
    'public/media/silkworm.png',
    'public/media/silkworm-silkworm.png',
    'public/media/silkworm-1.png',
  ];
  for (const relPath of cleanFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    fs.writeFileSync(fullPath, fileBuffer);
  }

  // 2. Update Media documents for silkworm
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        contains: 'silkworm',
      },
    },
  });

  for (const doc of existingMedia.docs) {
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        alt: 'Frozen silkworm chrysalis seafood product',
        filesize: fileBuffer.length,
        mimeType: 'image/png',
      },
    });
    console.log(`Updated Media doc ID ${doc.id} (${doc.filename}) to new silkworm2 buffer`);
  }

  console.log('Silkworm 2 clean fix completed successfully!');
  process.exit(0);
}

fixSilkwormClean().catch((err) => {
  console.error('Error in fixSilkwormClean:', err);
  process.exit(1);
});
