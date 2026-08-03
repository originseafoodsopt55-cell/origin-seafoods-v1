import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'flag'],
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  labels: {
    singular: 'ประเทศนำเข้า (Import Sources)',
    plural: 'ประเทศนำเข้า (Import Sources)',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'ชื่อประเทศ',
    },
    {
      name: 'flag',
      type: 'text',
      required: true,
      label: 'สัญลักษณ์ธงชาติ (Emoji Flag)',
    },
    {
      name: 'x',
      type: 'number',
      required: true,
      label: 'พิกัดตำแหน่งแผนที่แนวนอน X (%)',
    },
    {
      name: 'y',
      type: 'number',
      required: true,
      label: 'พิกัดตำแหน่งแผนที่แนวตั้ง Y (%)',
    },
  ],
}
