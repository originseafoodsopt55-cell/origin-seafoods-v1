import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const ContactLinks: CollectionConfig = {
  slug: 'contact-links',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'icon'],
    group: 'การติดต่อและเมนู',
  },
  labels: {
    singular: 'ลิงก์ช่องทางติดต่อหน้าเว็บ',
    plural: 'ลิงก์ช่องทางติดต่อหน้าเว็บ',
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
      label: 'ข้อความแสดงผลปุ่มติดต่อ',
    },
    {
      name: 'icon',
      type: 'text', // String key corresponding to lucide icon names, per Decision 11
      required: true,
      label: 'รหัสสัญลักษณ์ (Icon Key)',
    },
  ],
}
