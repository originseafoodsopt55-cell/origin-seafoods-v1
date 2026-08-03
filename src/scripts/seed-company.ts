/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload';
import config from '../payload.config';
import fs from 'fs';
import path from 'path';

const companyData = {
  name: "ORIGIN SEAFOODS CO., LTD.",
  heroSubtitle: "International Seafood Importer & Exporter",
  description: "ผู้นำเข้าและจัดจำหน่ายอาหารทะเลแช่แข็ง จากแหล่งผลิตชั้นนำทั่วโลก คัดสรรสินค้าคุณภาพ ได้มาตรฐานสากล เพื่อส่งมอบความสดใหม่และความพึงพอใจสูงสุดให้กับลูกค้า",
  hero: {
    title: "ORIGIN SEAFOODS CO., LTD.",
    description: "บริษัทนำเข้าและส่งออกอาหารทะเลแช่แข็งทั่วโลก",
    subtitleText: "INTERNATIONAL SEAFOODS",
    accent: "IMPORTER-EXPORTER",
    primaryButton: {
      label: "ดูสินค้า",
      href: "#products",
      ariaLabel: "View Origin Seafoods product categories"
    },
    secondaryButton: {
      label: "ติดต่อเรา",
      href: "#contact",
      ariaLabel: "Contact Origin Seafoods"
    }
  },
  assets: {
    factory: {
      src: "/images/company/factory.webp",
      alt: "Origin Seafoods factory exterior",
      title: "Origin Seafoods factory"
    },
    warehouse: {
      src: "/images/company/warehouse.png",
      alt: "Origin Seafoods Co., Ltd. headquarters and warehouse",
      title: "Origin Seafoods headquarters and warehouse"
    }
  }
};

const featuresData = [
  { title: "จัดหาสินค้า", subtitle: "จากทั่วโลก", icon: "truck" },
  { title: "ควบคุมอุณหภูมิ", subtitle: "ได้มาตรฐาน", icon: "snowflake" },
  { title: "คัดสรรคุณภาพ", subtitle: "เกรดพรีเมียม", icon: "shieldcheck" },
  { title: "บริการลูกค้า", subtitle: "แบบมืออาชีพ", icon: "usersround" }
];

const countriesData = [
  { name: "PERU", flag: "PE", x: 28, y: 58 },
  { name: "INDIA", flag: "IN", x: 66, y: 52 },
  { name: "CHINA", flag: "CN", x: 76, y: 38 },
  { name: "VIETNAM", flag: "VN", x: 78, y: 52 },
  { name: "INDONESIA", flag: "ID", x: 79, y: 66 },
  { name: "ARGENTINA", flag: "AR", x: 34, y: 73 },
  { name: "CHILE", flag: "CL", x: 30, y: 75 }
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

  // 1. Seed Company Profile (Global)
  console.log('Seeding Company Profile Global...');
  const factoryImageId = await uploadMediaIfMissing(payload, companyData.assets.factory);
  const warehouseImageId = await uploadMediaIfMissing(payload, companyData.assets.warehouse);

  await payload.updateGlobal({
    slug: 'company-profile',
    data: {
      name: companyData.name,
      heroSubtitle: companyData.heroSubtitle,
      description: companyData.description,
      hero: companyData.hero,
      assets: {
        factory: factoryImageId,
        warehouse: warehouseImageId,
      }
    }
  });
  console.log('Successfully seeded Company Profile Global.');

  // 2. Seed Features (Collection)
  console.log('Seeding Features...');
  for (const item of featuresData) {
    const existing = await payload.find({
      collection: 'features',
      where: {
        title: {
          equals: item.title,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Updating feature: ${item.title}`);
      await payload.update({
        collection: 'features',
        id: existing.docs[0].id,
        data: item,
      });
    } else {
      console.log(`Creating feature: ${item.title}`);
      await payload.create({
        collection: 'features',
        data: item,
      });
    }
  }
  console.log('Successfully seeded Features.');

  // 3. Seed Countries (Collection)
  console.log('Seeding Countries...');
  for (const item of countriesData) {
    const existing = await payload.find({
      collection: 'countries',
      where: {
        name: {
          equals: item.name,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Updating country: ${item.name}`);
      await payload.update({
        collection: 'countries',
        id: existing.docs[0].id,
        data: item,
      });
    } else {
      console.log(`Creating country: ${item.name}`);
      await payload.create({
        collection: 'countries',
        data: item,
      });
    }
  }
  console.log('Successfully seeded Countries.');

  console.log('All seed operations completed successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
