/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedDate', 'featured'],
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  labels: {
    singular: 'ข่าวสารและกิจกรรม',
    plural: 'ข่าวสารและกิจกรรม',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'หัวข้อข่าว',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'สลัก (URL)',
      admin: {
        description: '⚠️ มีผลต่อ URL หน้าข่าวสารโดยตรง ไม่ควรแก้ไขหลังจากที่สร้างแล้ว เพื่อหลีกเลี่ยงลิงก์เสีย (Broken Link)',
      },
      validate: (value: any, { operation, previousValue }: any) => {
        if (operation === 'update' && value !== previousValue) {
          return 'ไม่สามารถแก้ไข slug ได้หลังจากสร้างแล้ว เพื่อป้องกันลิงก์เสีย';
        }
        return true;
      },
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      label: 'รูปภาพหน้าปกข่าว',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'บทย่อข่าว (สำหรับแสดงบนการ์ด preview)',
    },
    {
      name: 'richText',
      type: 'richText',
      required: true,
      label: 'เนื้อหาข่าวเต็ม (Rich Text)',
    },
    {
      name: 'galleryImages',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'รูปภาพเพิ่มเติมในแกลเลอรี่ภาพบรรยากาศ',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'วันที่เผยแพร่ข่าว',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'แสดงเป็นข่าวเด่นบนหน้าแรก (Featured)',
      defaultValue: false,
      index: true,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'ข้อมูล SEO สำหรับค้นหา',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
  ],
}
