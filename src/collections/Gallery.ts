import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'image'],
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  labels: {
    singular: 'รูปภาพแกลเลอรี่',
    plural: 'รูปภาพแกลเลอรี่',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      unique: true,
      label: 'คำบรรยายภาพแกลเลอรี่',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      label: 'รูปภาพแสดงผล',
    },
  ],
}
