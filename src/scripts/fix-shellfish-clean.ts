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

async function fixShellfishClean() {
  console.log('Initializing Payload for clean shellfish fix...');
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const shellfishMap = [
    { slug: 'blood-cockle', desktopName: 'หอยแครง.png', cleanName: 'blood-cockle.png', cleanGroup: 'blood-cockle-blood-cockle.png', seriesId: 45, lineId: 36, mediaSeriesId: 147, mediaLineId: 151 },
    { slug: 'whelk', desktopName: 'หอยหวาน.png', cleanName: 'whelk.png', cleanGroup: 'whelk-whelk.png', seriesId: 43, lineId: 33, mediaSeriesId: 148, mediaLineId: 152 },
    { slug: 'japanese-scallop', desktopName: 'หอยเชลล์.png', cleanName: 'japanese-scallop.png', cleanGroup: 'japanese-scallop-half-shell.png', seriesId: 44, lineId: 35, mediaSeriesId: 149, mediaLineId: 153 },
    { slug: 'razor-clam', desktopName: 'หอยหลอด.png', cleanName: 'razor-clam.png', cleanGroup: 'razor-clam-razor-clam.png', seriesId: 42, lineId: 32, mediaSeriesId: 150, mediaLineId: 154 },
  ];

  const desktopDir = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\products\\Shellfish';

  for (const item of shellfishMap) {
    const srcPath = path.join(desktopDir, item.desktopName);
    if (!fs.existsSync(srcPath)) {
      console.error(`File ${item.desktopName} not found!`);
      continue;
    }
    const fileBuffer = fs.readFileSync(srcPath);

    // Copy to clean paths
    const paths = [
      `public/images/products/${item.cleanName}`,
      `public/images/products/${item.cleanGroup}`,
      `public/media/${item.cleanName}`,
      `public/media/${item.cleanGroup}`,
    ];
    for (const relPath of paths) {
      const fullPath = path.resolve(process.cwd(), relPath);
      fs.writeFileSync(fullPath, fileBuffer);
    }

    // Clean DB entries for Media
    try {
      await payload.update({
        collection: 'media',
        id: item.mediaSeriesId,
        data: {
          filename: item.cleanName,
          url: `/api/media/file/${item.cleanName}`,
          filesize: fileBuffer.length,
          mimeType: 'image/png',
        },
      });
      console.log(`Updated Media Series ID ${item.mediaSeriesId} -> ${item.cleanName}`);

      await payload.update({
        collection: 'media',
        id: item.mediaLineId,
        data: {
          filename: item.cleanGroup,
          url: `/api/media/file/${item.cleanGroup}`,
          filesize: fileBuffer.length,
          mimeType: 'image/png',
        },
      });
      console.log(`Updated Media Line ID ${item.mediaLineId} -> ${item.cleanGroup}`);
    } catch (err) {
      console.error(`Error updating media DB for ${item.slug}:`, err);
    }
  }

  // Delete stray -1 files in public/media
  const filesInMedia = fs.readdirSync(path.resolve(process.cwd(), 'public/media'));
  for (const file of filesInMedia) {
    if ((file.includes('blood-cockle') || file.includes('whelk') || file.includes('japanese-scallop') || file.includes('razor-clam')) && (file.includes('-1') || file.includes('-2'))) {
      const filePath = path.resolve(process.cwd(), 'public/media', file);
      fs.unlinkSync(filePath);
      console.log(`Deleted stray file: ${file}`);
    }
  }

  console.log('Shellfish clean fix completed!');
  process.exit(0);
}

fixShellfishClean().catch((err) => {
  console.error('Error in fixShellfishClean:', err);
  process.exit(1);
});
