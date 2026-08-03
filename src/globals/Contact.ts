import { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../collections/Users'

export const Contact: GlobalConfig = {
  slug: 'contact',
  admin: {
    group: 'การติดต่อและเมนู',
  },
  label: 'ข้อมูลติดต่อหลัก (Contact Info)',
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      label: 'เบอร์โทรศัพท์สำนักงานใหญ่',
    },
    {
      name: 'mobile',
      type: 'text',
      label: 'เบอร์โทรศัพท์มือถือหลัก / สายด่วน',
    },
    {
      name: 'email',
      type: 'text',
      label: 'อีเมลติดต่อทางการ',
    },
    {
      name: 'facebook',
      type: 'text',
      label: 'ลิงก์หรือชื่อเพจ Facebook',
    },
    {
      name: 'line',
      type: 'text',
      label: 'ไอดี LINE สำหรับบริการลูกค้า',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'ที่อยู่สำนักงานอย่างเป็นทางการ',
    },
  ],
}
