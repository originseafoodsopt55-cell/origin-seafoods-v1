import { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../collections/Users'

export const CompanyProfile: GlobalConfig = {
  slug: 'company-profile',
  admin: {
    group: 'เนื้อหาหลักหน้าเว็บ',
  },
  label: 'ข้อมูลบริษัท (Company Profile)',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'ชื่อบริษัท / ชื่อองค์กร',
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'ข้อความย่อยส่วนต้อนรับ (Hero Subtitle)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'ประวัติความเป็นมาและคำอธิบายสั้นของบริษัท',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'เนื้อหาส่วนวิดเจ็ตต้อนรับ (Hero Section)',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'หัวข้อหลักต้อนรับ',
        },
        {
          name: 'description',
          type: 'text',
          label: 'คำอธิบายส่วนต้อนรับ',
        },
        {
          name: 'subtitleText',
          type: 'text',
          label: 'ข้อความย่อยต้อนรับ',
        },
        {
          name: 'accent',
          type: 'text',
          label: 'ข้อความเน้นสีเด่น',
        },
        {
          name: 'primaryButton',
          type: 'group',
          label: 'ปุ่มหลัก (Primary Button)',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'ข้อความบนปุ่ม',
            },
            {
              name: 'href',
              type: 'text',
              label: 'ลิงก์ปลายทาง',
            },
            {
              name: 'ariaLabel',
              type: 'text',
              label: 'คำอธิบายปุ่มเพื่อช่วยการเข้าถึง (Aria Label)',
            },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          label: 'ปุ่มรอง (Secondary Button)',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'ข้อความบนปุ่ม',
            },
            {
              name: 'href',
              type: 'text',
              label: 'ลิงก์ปลายทาง',
            },
            {
              name: 'ariaLabel',
              type: 'text',
              label: 'คำอธิบายปุ่มเพื่อช่วยการเข้าถึง (Aria Label)',
            },
          ],
        },
      ],
    },
    {
      name: 'assets',
      type: 'group',
      label: 'รูปภาพภาพลักษณ์บริษัท',
      fields: [
        {
          name: 'factory',
          type: 'relationship',
          relationTo: 'media',
          label: 'รูปภาพโรงงานผลิต',
        },
        {
          name: 'warehouse',
          type: 'relationship',
          relationTo: 'media',
          label: 'รูปภาพคลังสินค้าและสำนักงาน',
        },
      ],
    },
  ],
}
