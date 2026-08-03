import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'href'],
    group: 'การติดต่อและเมนู',
  },
  labels: {
    singular: 'เมนูนำทางหลัก (Navigation Menu)',
    plural: 'เมนูนำทางหลัก (Navigation Menu)',
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
      label: 'ชื่อแสดงผลบนปุ่มเมนู',
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      unique: true,
      label: 'จุดเชื่อมโยงลิงก์เมนู (เช่น #about, #products)',
    },
  ],
}
