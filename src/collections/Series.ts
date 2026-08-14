/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Series: CollectionConfig = {
  slug: 'series',
  admin: {
    useAsTitle: 'englishTitle',
    defaultColumns: ['englishTitle', 'thaiTitle', 'category', 'published'],
    group: 'จัดการสินค้า',
  },
  labels: {
    singular: 'ซีรีส์สินค้า',
    plural: 'ซีรีส์สินค้า',
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
      unique: true,
      index: true,
      label: 'สลัก (URL)',
      admin: {
        description: '⚠️ มีผลต่อ URL หน้าเว็บโดยตรง ไม่ควรแก้ไขหลังจากที่เผยแพร่แล้ว เพื่อหลีกเลี่ยงลิงก์เสีย (Broken Link)',
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
      label: 'ชื่อซีรีส์ภาษาไทย',
    },
    {
      name: 'englishTitle',
      type: 'text',
      required: true,
      label: 'ชื่อซีรีส์ภาษาอังกฤษ',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'คำอธิบายซีรีส์',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'หมวดหมู่สินค้าหลัก',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      label: 'ไอคอนซีรีส์',
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'รูปภาพหน้าปกซีรีส์',
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
