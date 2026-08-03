import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const BrandValuesCollection: CollectionConfig = {
  slug: 'brand-values',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title'],
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  labels: {
    singular: 'ค่านิยมองค์กร (Brand Value)',
    plural: 'ค่านิยมองค์กร (Brand Values)',
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
      label: 'ข้อความค่านิยม (Brand Value Statement)',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      label: 'ลำดับการแสดงผล (Order)',
      defaultValue: 1,
    },
    {
      name: 'bgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'ภาพพื้นหลัง (Background Image - Optional)',
    },
  ],
}
