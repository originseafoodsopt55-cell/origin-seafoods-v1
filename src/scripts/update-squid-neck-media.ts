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

async function updateSquidNeck() {
  console.log('Initializing Payload for squid-neck media update...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const newImagePath = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Squid\\คอหมึก2.png';
  if (!fs.existsSync(newImagePath)) {
    console.error('File คอหมึก2.png not found at Desktop path!');
    return;
  }

  const fileBuffer = fs.readFileSync(newImagePath);
  const filenames = ['squid-neck.png', 'squid-neck-er.png'];

  for (const filename of filenames) {
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
    });

    if (existingMedia.docs.length > 0) {
      const mediaDoc = existingMedia.docs[0];
      console.log(`Updating existing media: ${filename} (ID: ${mediaDoc.id})...`);
      await payload.update({
        collection: 'media',
        id: mediaDoc.id,
        file: {
          data: fileBuffer,
          name: filename,
          size: fileBuffer.length,
          mimetype: 'image/png',
        },
      });
      console.log(`Successfully updated media: ${filename}`);
    } else {
      console.log(`Media ${filename} not found in DB, creating...`);
      await payload.create({
        collection: 'media',
        data: {
          alt: 'Squid neck frozen seafood product',
        },
        file: {
          data: fileBuffer,
          name: filename,
          size: fileBuffer.length,
          mimetype: 'image/png',
        },
      });
      console.log(`Successfully created media: ${filename}`);
    }
  }

  console.log('Squid neck media update completed!');
  process.exit(0);
}

updateSquidNeck().catch((err) => {
  console.error('Error updating squid neck media:', err);
  process.exit(1);
});
