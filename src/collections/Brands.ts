import { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from './Users'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sub', 'country'],
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  labels: {
    singular: 'แบรนด์สินค้านำเข้า (Brands)',
    plural: 'แบรนด์สินค้านำเข้า (Brands)',
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
      label: 'ชื่อแบรนด์',
    },
    {
      name: 'sub',
      type: 'text',
      label: 'ชื่อขยายแบรนด์ย่อย',
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      label: 'รูปภาพโลโก้แบรนด์',
    },
    {
      name: 'country',
      type: 'text',
      label: 'ประเทศต้นกำเนิด',
    },
    {
      name: 'website',
      type: 'text',
      label: 'ลิงก์เว็บไซต์ทางการ',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'ประวัติหรือรายละเอียดของแบรนด์',
    },
  ],
}
