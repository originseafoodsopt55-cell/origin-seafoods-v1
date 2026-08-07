/* eslint-disable */
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

import { getPayload } from 'payload';

async function auditMedia() {
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const lines = await payload.find({
    collection: 'product-lines',
    limit: 100,
  });

  console.log(`Auditing ${lines.docs.length} product lines...`);
  const missingFiles: string[] = [];

  for (const line of lines.docs) {
    const cover = line.coverImage as any;
    if (cover && cover.filename) {
      const filename = cover.filename;
      const mediaPath = path.resolve(process.cwd(), 'public/media', filename);
      const imgPath = path.resolve(process.cwd(), 'public/images/products', filename);
      const existsInMedia = fs.existsSync(mediaPath);
      const existsInImages = fs.existsSync(imgPath);

      console.log(`[Line: ${line.slug}] cover filename: "${filename}" -> public/media: ${existsInMedia ? 'OK' : 'MISSING'}, public/images/products: ${existsInImages ? 'OK' : 'MISSING'}`);
      
      if (!existsInMedia) missingFiles.push(`public/media/${filename}`);
      if (!existsInImages) missingFiles.push(`public/images/products/${filename}`);
    } else {
      console.log(`[Line: ${line.slug}] HAS NO COVER IMAGE!`);
    }
  }

  // Also check series coverImages
  const series = await payload.find({
    collection: 'series',
    limit: 100,
  });
  console.log(`\nAuditing ${series.docs.length} series...`);
  for (const s of series.docs) {
    const cover = s.coverImage as any;
    if (cover && cover.filename) {
      const filename = cover.filename;
      const mediaPath = path.resolve(process.cwd(), 'public/media', filename);
      const imgPath = path.resolve(process.cwd(), 'public/images/products', filename);
      const existsInMedia = fs.existsSync(mediaPath);
      const existsInImages = fs.existsSync(imgPath);

      console.log(`[Series: ${s.slug}] cover filename: "${filename}" -> public/media: ${existsInMedia ? 'OK' : 'MISSING'}, public/images/products: ${existsInImages ? 'OK' : 'MISSING'}`);

      if (!existsInMedia) missingFiles.push(`public/media/${filename}`);
      if (!existsInImages) missingFiles.push(`public/images/products/${filename}`);
    }
  }

  console.log(`\nMissing files total: ${missingFiles.length}`);
  if (missingFiles.length > 0) {
    console.log('List of missing files:');
    missingFiles.forEach(f => console.log(' - ' + f));
  }

  process.exit(0);
}

auditMedia().catch(err => {
  console.error(err);
  process.exit(1);
});
