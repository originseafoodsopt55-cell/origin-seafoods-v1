import { getPayload } from 'payload';
import config from '../payload.config';

async function verify() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  console.log('\n--- FETCHING BRANDS ---');
  const brands = await payload.find({
    collection: 'brands',
    limit: 100,
  });

  const brandLogos = brands.docs.map(b => {
    const logo = typeof b.logo === 'object' ? b.logo : null;
    return {
      brandName: b.name,
      logoId: logo?.id,
      filename: logo?.filename,
      filesize: logo?.filesize,
      width: logo?.width,
      height: logo?.height,
      mimeType: logo?.mimeType,
    };
  });
  console.log(JSON.stringify(brandLogos, null, 2));

  console.log('\n--- FETCHING GALLERY ---');
  const gallery = await payload.find({
    collection: 'gallery',
    limit: 100,
  });

  const galleryImages = gallery.docs.map(g => {
    const img = typeof g.image === 'object' ? g.image : null;
    return {
      galleryLabel: g.label,
      imageId: img?.id,
      filename: img?.filename,
      filesize: img?.filesize,
      width: img?.width,
      height: img?.height,
      mimeType: img?.mimeType,
    };
  });
  console.log(JSON.stringify(galleryImages, null, 2));

  console.log('\n--- DUPLICATE / MISMATCH CHECK ---');
  let errors = 0;
  for (const brand of brandLogos) {
    for (const gal of galleryImages) {
      if (brand.filesize === gal.filesize) {
        console.error(`[ERROR] Filesize match: Brand '${brand.brandName}' logo size (${brand.filesize}) matches Gallery '${gal.galleryLabel}' image size (${gal.filesize})!`);
        errors++;
      }
    }
  }

  if (errors === 0) {
    console.log('[SUCCESS] No filesizes match between brand logos and gallery images.');
  } else {
    console.warn(`[WARNING] Found ${errors} matching sizes.`);
  }

  process.exit(0);
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
