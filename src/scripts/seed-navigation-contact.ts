import { getPayload } from 'payload';
import config from '../payload.config';

const contactData = {
  phone: "061-770-1888",
  mobile: "061-770-1888",
  email: "info@originseafoods.com",
  facebook: "Origin Seafoods",
  line: "@originseafoods",
  address: "48/191 หมู่ที่ 4 ตำบลนาดี อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000"
};

const navigationData = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#about", label: "เกี่ยวกับเรา" },
  { href: "/products", label: "สินค้า" },
  { href: "#brands", label: "แบรนด์ที่นำเข้า" },
  { href: "#gallery", label: "แกลเลอรี่" },
  { href: "#contact", label: "ติดต่อเรา" }
];

const contactLinksData = [
  { label: "061-770-1888", icon: "phone" },
  { label: "info@originseafoods.com", icon: "mail" },
  { label: "@originseafoods", icon: "messagecircle" },
  { label: "Origin Seafoods", icon: "facebook" },
  { label: "48/191 หมู่ที่ 4 ตำบลนาดี อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000", icon: "mappin" }
];

async function seed() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  // 1. Seed Contact Global
  console.log('Seeding Contact Global...');
  await payload.updateGlobal({
    slug: 'contact',
    data: contactData,
  });
  console.log('Successfully seeded Contact Global.');

  // 2. Seed Navigation Collection
  console.log('Seeding Navigation Items...');
  for (const item of navigationData) {
    const existing = await payload.find({
      collection: 'navigation',
      where: {
        href: {
          equals: item.href,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Updating navigation item: ${item.label}`);
      await payload.update({
        collection: 'navigation',
        id: existing.docs[0].id,
        data: item,
      });
    } else {
      console.log(`Creating navigation item: ${item.label}`);
      await payload.create({
        collection: 'navigation',
        data: item,
      });
    }
  }
  console.log('Successfully seeded Navigation Items.');

  // 3. Seed ContactLinks Collection
  console.log('Seeding ContactLinks Items...');
  for (const item of contactLinksData) {
    const existing = await payload.find({
      collection: 'contact-links',
      where: {
        label: {
          equals: item.label,
        },
      },
    });

    const docData = {
      label: item.label,
      icon: item.icon,
    };

    if (existing.docs.length > 0) {
      console.log(`Updating contact link: ${item.label}`);
      await payload.update({
        collection: 'contact-links',
        id: existing.docs[0].id,
        data: docData,
      });
    } else {
      console.log(`Creating contact link: ${item.label}`);
      await payload.create({
        collection: 'contact-links',
        data: docData,
      });
    }
  }
  console.log('Successfully seeded ContactLinks Items.');

  console.log('Seed operations completed successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
