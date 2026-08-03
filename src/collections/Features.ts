import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subtitle', 'icon'],
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  labels: {
    singular: 'จุดเด่นและบริการ (Features)',
    plural: 'จุดเด่นและบริการ (Features)',
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
      unique: true,
      label: 'หัวข้อจุดเด่น',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'คำอธิบายจุดเด่นย่อย',
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'รหัสสัญลักษณ์ (Icon Key)',
    },
  ],
}
