import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'],
    group: 'ตั้งค่าระบบ',
  },
  labels: {
    singular: 'คลังสื่อและรูปภาพ (Media)',
    plural: 'คลังสื่อและรูปภาพ (Media)',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
    adminThumbnail: ({ doc }) =>
      (doc?.url as string) || (doc?.filename ? `/api/media/file/${doc.filename}` : null),
    displayPreview: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'คำอธิบายภาพสำหรับช่วยการเข้าถึง (Alt Text)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'หัวข้อรูปภาพ',
    },
  ],
}
