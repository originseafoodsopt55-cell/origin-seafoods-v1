import fs from 'fs';
import path from 'path';

// 1. Load .env.local variables into process.env BEFORE importing payload config
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
import { productGroups, productVariants } from '../lib/data/products';

async function cleanup() {
  console.log('Initializing Payload for Legacy DB Cleanup...');
  console.log(`Connecting to Database URI: ${process.env.DATABASE_URI ? 'FOUND (Neon Postgres)' : 'NOT FOUND'}`);

  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  // Valid unified productLine slugs from productGroups
  const validLineSlugs = new Set(productGroups.map((g) => g.slug));

  // 1. Fetch all product lines
  const allLines = await payload.find({
    collection: 'product-lines',
    limit: 500,
  });

  const validLineMap = new Map<string, number>(); // slug -> line ID
  const legacyLineIds: number[] = [];

  for (const line of allLines.docs) {
    const numId = Number(line.id);
    if (validLineSlugs.has(line.slug)) {
      validLineMap.set(line.slug, numId);
    } else {
      legacyLineIds.push(numId);
      console.log(`Identified legacy product-line: ${line.slug} (ID: ${line.id})`);
    }
  }

  console.log(`Found ${legacyLineIds.length} legacy product-lines to clean up.`);

  // 2. Fetch ALL variants in DB
  const allVariantsDoc = await payload.find({
    collection: 'variants',
    limit: 500,
  });

  console.log(`Total variants in DB: ${allVariantsDoc.docs.length}`);

  for (const vDoc of allVariantsDoc.docs) {
    const currentLineSlug = typeof vDoc.productLine === 'object' && vDoc.productLine !== null
      ? (vDoc.productLine as { slug?: string }).slug
      : '';

    // If variant is linked to a legacy line, re-link it to the correct unified line
    if (!currentLineSlug || !validLineSlugs.has(currentLineSlug)) {
      // Find matching item in productVariants dataset by slug
      const matchedData = productVariants.find((pv) => pv.slug === vDoc.slug);
      const targetLineSlug = matchedData ? (matchedData.productLineSlug || matchedData.groupSlug) : null;
      const targetLineId = targetLineSlug ? validLineMap.get(targetLineSlug) : null;

      if (targetLineId) {
        console.log(`Re-linking variant ${vDoc.slug} (ID: ${vDoc.id}) to valid line ${targetLineSlug} (ID: ${targetLineId})`);
        await payload.update({
          collection: 'variants',
          id: vDoc.id,
          data: {
            productLine: targetLineId,
            brand: matchedData?.brand || vDoc.brand || '',
          },
        });
      } else {
        // If variant cannot be matched to any valid species line, delete orphaned variant
        console.log(`Deleting orphaned variant: ${vDoc.slug} (ID: ${vDoc.id})`);
        await payload.delete({
          collection: 'variants',
          id: vDoc.id,
        });
      }
    }
  }

  // 3. Now delete legacy product lines (no foreign key constraint errors)
  for (const legacyId of legacyLineIds) {
    console.log(`Deleting legacy product line ID: ${legacyId}`);
    try {
      await payload.delete({
        collection: 'product-lines',
        id: legacyId,
      });
      console.log(`Successfully deleted legacy product line ID: ${legacyId}`);
    } catch (err) {
      console.error(`Failed to delete legacy product line ID ${legacyId}:`, err);
    }
  }

  console.log('Legacy DB Cleanup finished successfully!');
  process.exit(0);
}

cleanup().catch((err) => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
