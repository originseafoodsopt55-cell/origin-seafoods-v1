/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Variants: CollectionConfig = {
  slug: 'variants',
  admin: {
    useAsTitle: 'englishTitle',
    defaultColumns: ['englishTitle', 'size', 'productLine', 'published'],
    group: 'จัดการสินค้า',
  },
  labels: {
    singular: 'ขนาดสินค้า (Variants)',
    plural: 'ขนาดสินค้า (Variants)',
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
        description: '⚠️ มีผลต่อ URL หน้าเว็บโดยตรง ไม่ควรแก้ไขหลังจากที่เผยแพร่แล้ว เพื่อหลีกเลี่ยงลิงก์เสีย (Broken Link)',
      },
      validate: (value: any, { operation, previousValue }: any) => {
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
      name: 'size',
      type: 'text',
      label: 'ขนาด / ไซส์',
    },
    {
      name: 'package',
      type: 'text',
      label: 'รูปแบบบรรจุภัณฑ์',
    },
    {
      name: 'packing',
      type: 'text',
      label: 'ขนาดบรรจุ (Packing)',
    },
    {
      name: 'storage',
      type: 'text',
      label: 'การเก็บรักษา',
    },
    {
      name: 'scientificName',
      type: 'text',
      label: 'ชื่อวิทยาศาสตร์',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'รายละเอียดสินค้า',
    },
    {
      name: 'brand',
      type: 'text',
      label: 'แบรนด์สินค้า',
    },
    {
      name: 'country',
      type: 'text',
      label: 'ประเทศแหล่งกำเนิด',
    },
    {
      name: 'variant',
      type: 'text',
      label: 'รูปแบบย่อย',
    },
    {
      name: 'features',
      type: 'array',
      label: 'จุดเด่นพิเศษ',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'จุดเด่น',
        },
      ],
    },
    {
      name: 'productLine',
      type: 'relationship',
      relationTo: 'product-lines',
      required: true,
      label: 'กลุ่มสินค้าหลัก',
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
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      label: 'รูปภาพขนาดสินค้า',
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
