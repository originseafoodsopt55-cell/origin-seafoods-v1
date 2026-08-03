/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload';
import config from '../payload.config';
import fs from 'fs';
import path from 'path';

const brandsData = [
  {
    name: "ALTAMAR",
    sub: "FOODS PERU",
    logo: {
      src: "/images/brands/altamar.svg",
      alt: "ALTAMAR Foods Peru logo",
      title: "ALTAMAR Foods Peru"
    },
    country: "Peru",
    website: "",
    description: "Imported frozen seafood brand prepared for catalog and CMS integration."
  },
  {
    name: "DEEP BLUE",
    sub: "SEAFOODS",
    logo: {
      src: "/images/brands/deepblue.svg",
      alt: "DEEP BLUE Seafoods logo",
      title: "DEEP BLUE Seafoods"
    },
    country: "International",
    website: "",
    description: "Imported frozen seafood brand prepared for catalog and CMS integration."
  },
  {
    name: "AQUAFROST",
    sub: "",
    logo: {
      src: "/images/brands/aquafrost.svg",
      alt: "AQUAFROST logo",
      title: "AQUAFROST"
    },
    country: "International",
    website: "",
    description: "Imported frozen seafood brand prepared for catalog and CMS integration."
  },
  {
    name: "INTERATLANTIC",
    sub: "",
    logo: {
      src: "/images/brands/interatlantic.svg",
      alt: "INTERATLANTIC logo",
      title: "INTERATLANTIC"
    },
    country: "International",
    website: "",
    description: "Imported frozen seafood brand prepared for catalog and CMS integration."
  },
  {
    name: "SANTA",
    sub: "SEAFOOD",
    logo: {
      src: "/images/brands/santa.svg",
      alt: "SANTA Seafood logo",
      title: "SANTA Seafood"
    },
    country: "International",
    website: "",
    description: "Imported frozen seafood brand prepared for catalog and CMS integration."
  },
  {
    name: "COSTA",
    sub: "SEAFOOD",
    logo: {
      src: "/images/brands/costa.svg",
      alt: "COSTA Seafood logo",
      title: "COSTA Seafood"
    },
    country: "International",
    website: "",
    description: "Imported frozen seafood brand prepared for catalog and CMS integration."
  }
];

const galleryData = [
  { 
    label: "Container Logistics", 
    image: {
      src: "/images/gallery/container/container-logistics.webp",
      alt: "Container logistics for frozen seafood imports",
      title: "Container Logistics"
    }
  },
  { 
    label: "Cold Storage Warehouse", 
    image: {
      src: "/images/gallery/warehouse/cold-storage-warehouse.webp",
      alt: "Cold storage warehouse for frozen seafood",
      title: "Cold Storage Warehouse"
    }
  },
  { 
    label: "Frozen Seafood Packaging", 
    image: {
      src: "/images/gallery/packing/frozen-seafood-packaging.webp",
      alt: "Frozen seafood packaging",
      title: "Frozen Seafood Packaging"
    }
  },
  { 
    label: "Staff Operations", 
    image: {
      src: "/images/gallery/staff/staff-operations.webp",
      alt: "Staff operations for seafood handling",
      title: "Staff Operations"
    }
  },
  { 
    label: "Warehouse Inventory", 
    image: {
      src: "/images/gallery/warehouse/warehouse-inventory.webp",
      alt: "Warehouse inventory of frozen seafood cartons",
      title: "Warehouse Inventory"
    }
  },
  { 
    label: "Seafood Products", 
    image: {
      src: "/images/gallery/products/seafood-products.webp",
      alt: "Frozen seafood products",
      title: "Seafood Products"
    }
  }
];

async function uploadMediaIfMissing(payload: any, asset: { src: string, alt: string, title: string }): Promise<number | null> {
  const relativePath = asset.src.replace(/^\//, '');
  const filePath = path.resolve('public', relativePath);

  if (!fs.existsSync(filePath)) {
    console.warn(`File not found at path: ${filePath}`);
    return null;
  }

  const filename = path.basename(filePath);

  // Check if media already exists
  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: filename,
      },
    },
  });

  if (existingMedia.docs.length > 0) {
    console.log(`Media already exists: ${filename} (ID: ${existingMedia.docs[0].id})`);
    return existingMedia.docs[0].id as number;
  }

  // Upload new media
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let mimetype = 'image/webp';
  if (ext === '.png') mimetype = 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') mimetype = 'image/jpeg';
  if (ext === '.svg') mimetype = 'image/svg+xml';

  console.log(`Uploading media: ${filename}...`);
  const mediaDoc = await payload.create({
    collection: 'media',
    data: {
      alt: asset.alt,
    },
    file: {
      data: fileBuffer,
      name: filename,
      size: fileBuffer.length,
      mimetype: mimetype,
    },
  });

  console.log(`Uploaded media: ${filename} (ID: ${mediaDoc.id})`);
  return mediaDoc.id as number;
}

async function seed() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  // 1. Seed Brands
  console.log('Seeding Brands...');
  for (const item of brandsData) {
    const logoId = await uploadMediaIfMissing(payload, item.logo);
    if (!logoId) {
      console.warn(`Skipping brand ${item.name} due to missing logo file.`);
      continue;
    }

    const brandPayload = {
      name: item.name,
      sub: item.sub,
      logo: logoId,
      country: item.country,
      website: item.website,
      description: item.description,
    };

    const existing = await payload.find({
      collection: 'brands',
      where: {
        name: {
          equals: item.name,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Updating brand: ${item.name}`);
      await payload.update({
        collection: 'brands',
        id: existing.docs[0].id,
        data: brandPayload,
      });
    } else {
      console.log(`Creating brand: ${item.name}`);
      await payload.create({
        collection: 'brands',
        data: brandPayload,
      });
    }
  }
  console.log('Successfully seeded Brands.');

  // 2. Seed Gallery
  console.log('Seeding Gallery...');
  for (const item of galleryData) {
    const imageId = await uploadMediaIfMissing(payload, item.image);
    if (!imageId) {
      console.warn(`Skipping gallery item ${item.label} due to missing image file.`);
      continue;
    }

    const galleryPayload = {
      label: item.label,
      image: imageId,
    };

    const existing = await payload.find({
      collection: 'gallery',
      where: {
        label: {
          equals: item.label,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Updating gallery item: ${item.label}`);
      await payload.update({
        collection: 'gallery',
        id: existing.docs[0].id,
        data: galleryPayload,
      });
    } else {
      console.log(`Creating gallery item: ${item.label}`);
      await payload.create({
        collection: 'gallery',
        data: galleryPayload,
      });
    }
  }
  console.log('Successfully seeded Gallery.');

  console.log('Seed operations completed successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
