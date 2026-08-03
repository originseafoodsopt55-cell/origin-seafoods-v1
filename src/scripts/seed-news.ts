/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload';
import configPromise from '../payload.config';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('=== STARTING SEED NEWS SCRIPT ===');
  const payload = await getPayload({ config: configPromise });

  const imageDir = 'C:\\Users\\AVS_KTB\\Desktop\\Sprint\\THAIFEX';
  const img1Path = path.join(imageDir, 'THAIFEX-01.jpg');
  const img2Path = path.join(imageDir, 'THAIFEX-02.jpg');

  // Helper to ensure media exists in Payload
  async function ensureMedia(filePath: string, altText: string) {
    const filename = path.basename(filePath);
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Media found: ${filename} (ID: ${existing.docs[0].id})`);
      return existing.docs[0];
    }

    console.log(`Uploading new media: ${filename}...`);
    const fileBuffer = fs.readFileSync(filePath);
    const created = await payload.create({
      collection: 'media',
      data: {
        alt: altText,
      },
      file: {
        data: fileBuffer,
        name: filename,
        mimetype: 'image/jpeg',
        size: fileBuffer.length,
      },
    });

    console.log(`Uploaded media ${filename} (ID: ${created.id})`);
    return created;
  }

  const media1 = await ensureMedia(img1Path, 'ออริจิน ซีฟู้ดส์ ร่วมออกบูท THAIFEX 2025');
  const media2 = await ensureMedia(img2Path, 'บรรยากาศบูทจัดแสดงสินค้า THAIFEX 2025');

  const p1Text = "บริษัท ออริจิน ซีฟู้ดส์ จำกัด ผู้นำเข้าและส่งออกอาหารทะเลแช่แข็งคุณภาพสูง เข้าร่วมงาน THAIFEX – ANUGA ASIA 2025 งานแสดงสินค้าอาหารและเครื่องดื่มระดับนานาชาติ ระหว่างวันที่ 27–31 พฤษภาคม 2568 ณ Challenger Hall 3 โซนอาหารทะเลแช่แข็ง บูท L54";
  const p2Text = "ในครั้งนี้ ออริจิน ซีฟู้ดส์ร่วมออกบูทกับพันธมิตรทางธุรกิจระดับนานาชาติ ได้แก่ P.K.N. Foods Imp & Exp Co., Ltd. (เวียดนาม) และ Mardon Ltd. (สหราชอาณาจักร) ภายใต้แนวคิด Global Trading Network สะท้อนเครือข่ายการค้าอาหารทะเลที่เชื่อมโยงตลาดไทย เวียดนาม จีน และสหราชอาณาจักรเข้าด้วยกัน";
  const p3Text = "ภายในบูทจัดแสดงผลิตภัณฑ์อาหารทะเลแช่แข็งคุณภาพพรีเมียมหลากหลายชนิด อาทิ ปูม้า ปูจุด หอยนางรม หอยแมลงภู่ หอยลาย หอยแครง หอยหวาน หอยเชลล์ญี่ปุ่น หอยหลอด และหนวดปลาหมึกยักษ์ พร้อมป้ายชื่อสินค้าภาษาไทย-อังกฤษที่จัดวางอย่างพิถีพิถัน เพื่อให้ผู้ซื้อจากนานาประเทศเข้าใจสินค้าได้ง่ายและเห็นภาพคุณภาพที่แท้จริง";
  const p4Text = "การเข้าร่วมงานในครั้งนี้เปิดโอกาสให้ออริจิน ซีฟู้ดส์ได้พบปะพูดคุยกับผู้ประกอบการนำเข้า-ส่งออก ผู้จัดจำหน่าย และคู่ค้าที่สนใจสร้างเครือข่ายทางธุรกิจร่วมกัน สอดคล้องกับพันธกิจของบริษัทที่มุ่งขยายพันธมิตรทางการค้าและสร้างโอกาสการเติบโตไปด้วยกันในระดับสากล";

  const lexicalAST = {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: p1Text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: p2Text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
        {
          type: 'upload',
          relationTo: 'media',
          value: media2.id,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: p3Text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: p4Text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  };

  const newsSlug = 'thaifex-anuga-asia-2025';
  const existingNews = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: newsSlug,
      },
    },
  });

  const newsData: any = {
    title: 'ออริจิน ซีฟู้ดส์ ร่วมงาน THAIFEX – ANUGA ASIA 2025 ตอกย้ำศักยภาพผู้นำเข้า-ส่งออกอาหารทะเลแช่แข็งระดับสากล',
    slug: newsSlug,
    coverImage: media1.id,
    summary: 'ออริจิน ซีฟู้ดส์ ร่วมออกบูทในงาน THAIFEX – ANUGA ASIA 2025 ณ Challenger Hall 3 บูท L54 ร่วมกับพันธมิตร P.K.N. Foods (เวียดนาม) และ Mardon (สหราชอาณาจักร) นำเสนออาหารทะเลแช่แข็งคุณภาพพรีเมียมสู่ตลาดสากล',
    richText: lexicalAST,
    galleryImages: [media1.id, media2.id],
    publishedDate: '2025-05-27',
    featured: true,
    seo: {
      title: 'Origin Seafoods ร่วมงาน THAIFEX – ANUGA ASIA 2025 | Booth L54',
      description: 'ออริจิน ซีฟู้ดส์ ร่วมออกบูท THAIFEX – ANUGA ASIA 2025 ที่ Challenger Hall 3 บูท L54 นำเสนออาหารทะเลแช่แข็งคุณภาพพรีเมียมร่วมกับพันธมิตรระดับสากล',
    },
  };

  if (existingNews.docs.length > 0) {
    console.log(`News article exists (ID: ${existingNews.docs[0].id}). Updating...`);
    const updated = await payload.update({
      collection: 'news',
      id: existingNews.docs[0].id,
      data: newsData,
    });
    console.log(`Updated news article ID: ${updated.id}`);
  } else {
    console.log(`Creating new news article...`);
    const created = await payload.create({
      collection: 'news',
      data: newsData,
    });
    console.log(`Created news article ID: ${created.id}`);
  }

  console.log('=== SEED NEWS SCRIPT COMPLETED SUCCESSFULLY ===');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed news script failed:', err);
  process.exit(1);
});
