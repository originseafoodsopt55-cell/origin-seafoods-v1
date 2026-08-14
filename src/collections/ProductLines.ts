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
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      label: 'สถานะการเผยแพร่',
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
