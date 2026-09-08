/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const ProductLines: CollectionConfig = {
  slug: 'product-lines',
  admin: {
    useAsTitle: 'englishTitle',
    defaultColumns: ['englishTitle', 'thaiTitle', 'series', 'published'],
    group: 'จัดการสินค้า',
  },
  labels: {
    singular: 'กลุ่มสินค้า / ไลน์สินค้า',
    plural: 'กลุ่มสินค้า / ไลน์สินค้า',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      label: 'สลัก (URL)',
      admin: {
        description: '⚠️ มีผลต่อ URL หน้าเว็บโดยตรง (/products/[category]/[productLine]) ห้ามซ้ำกันภายใน Category เดียวกัน และไม่ควรแก้ไขหลังจากเผยแพร่แล้ว',
      },
      validate: (value: any, { operation, previousValue, req }: any) => {
        if (req?.context?.allowSlugUpdate) return true;
        if (operation === 'update' && value !== previousValue) {
          return 'ไม่สามารถแก้ไข slug ได้หลังจากสร้างแล้ว เพื่อป้องกันลิงก์เสีย';
        }
        return true;
      },
    },
    {
      name: 'thaiTitle',
      type: 'text',
      required: true,
      label: 'ชื่อภาษาไทย',
    },
    {
      name: 'englishTitle',
      type: 'text',
      required: true,
      label: 'ชื่อภาษาอังกฤษ',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'คำอธิบายกลุ่มสินค้า',
    },
    {
      name: 'brand',
      type: 'text',
      label: 'ชื่อแบรนด์สินค้า',
    },
    {
      name: 'series',
      type: 'relationship',
      relationTo: 'series',
      required: true,
      label: 'ซีรีส์หลัก',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'หมวดหมู่หลัก',
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'รูปภาพหน้าปกกลุ่มสินค้า',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'แกลเลอรีรูปภาพสินค้าหลัก (ProductLine Gallery)',
      admin: {
        description: 'รูปภาพสินค้าหลักถ่ายจริง สำหรับแสดงในสไลด์ Carousel หน้าสินค้า (แสดงเมื่อยังไม่ได้เลือกแบรนด์)',
      },
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          label: 'รูปภาพ',
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'สถานะการเผยแพร่',
    },
    {
      name: 'brandOptions',
      type: 'array',
      label: 'ตัวเลือกแบรนด์ (Brand Options)',
      admin: {
        description: 'ใส่ข้อมูลแบรนด์ที่มีสำหรับสินค้านี้ (ไม่บังคับ) — ถ้าว่างจะแสดงหน้าสินค้าแบบปกติ',
      },
      fields: [
        {
          name: 'brandName',
          type: 'text',
          required: true,
          label: 'ชื่อแบรนด์',
          admin: {
            description: 'เช่น JARADAH FISH, PHOOMA MAHACHAI',
          },
        },
        {
          name: 'boxImage',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          label: 'รูปกล่องแบรนด์ (ใช้เป็น thumbnail เลือกแบรนด์)',
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'รูปภาพแกลเลอรี (carousel เมื่อเลือกแบรนด์นี้)',
          fields: [
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
              required: true,
              label: 'รูปภาพ',
            },
          ],
        },
        {
          name: 'packingSize',
          type: 'text',
          label: 'ขนาดบรรจุ (เช่น ลังละ 8 Kg.)',
        },
        {
          name: 'sizes',
          type: 'array',
          label: 'ไซส์สินค้า / ขนาดทั่วไป (Sizes - สำหรับสินค้าไม่แยกเพศ เช่น หมึก, ปลา)',
          admin: {
            description: 'ใส่ขนาดไซส์สินค้าทั่วไป เช่น 200/300, 10-20, M, L (หากกรอกช่องนี้ ระบบจะไม่แสดง Badge ชาย/หญิง)',
          },
          fields: [
            {
              name: 'sizeText',
              type: 'text',
              required: true,
              label: 'ไซส์ (เช่น 200/300, M, L)',
            },
            {
              name: 'sizeImage',
              type: 'relationship',
              relationTo: 'media',
              label: 'ภาพสินค้าสำหรับไซส์นี้ (เลือกผูกจาก Media หรืออัปโหลดใหม่)',
            },
          ],
        },
        {
          name: 'maleSizes',
          type: 'array',
          label: 'ไซส์ตัวผู้ (MALE)',
          fields: [
            {
              name: 'sizeText',
              type: 'text',
              required: true,
              label: 'ไซส์ (เช่น 30/50)',
            },
            {
              name: 'sizeImage',
              type: 'relationship',
              relationTo: 'media',
              label: 'ภาพสินค้าสำหรับไซส์นี้ (เลือกผูกจาก Media หรืออัปโหลดใหม่)',
            },
          ],
        },
        {
          name: 'femaleSizes',
          type: 'array',
          label: 'ไซส์ตัวเมีย (FEMALE)',
          fields: [
            {
              name: 'sizeText',
              type: 'text',
              required: true,
              label: 'ไซส์ (เช่น 30/50)',
            },
            {
              name: 'sizeImage',
              type: 'relationship',
              relationTo: 'media',
              label: 'ภาพสินค้าสำหรับไซส์นี้ (เลือกผูกจาก Media หรืออัปโหลดใหม่)',
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'การตั้งค่า SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'canonical',
          type: 'text',
          label: 'Canonical URL',
        },
        {
          name: 'ogImage',
          type: 'relationship',
          relationTo: 'media',
          label: 'OG Image',
        },
      ],
    },
  ],
}
