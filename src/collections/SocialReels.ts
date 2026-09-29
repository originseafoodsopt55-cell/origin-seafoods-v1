import { CollectionConfig } from 'payload';

export const SocialReels: CollectionConfig = {
  slug: 'social-reels',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'ชื่อคลิป / เมนู',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'หมวดหมู่วิดีโอ',
      type: 'select',
      required: true,
      defaultValue: 'arrival',
      options: [
        { label: 'เปิดตู้สินค้าเข้าใหม่ (New Arrival)', value: 'arrival' },
        { label: 'สูตรอาหารและไอเดียเมนู (Origin Kitchen)', value: 'kitchen' },
      ],
    },
    {
      name: 'reelUrl',
      label: 'ลิงก์ Facebook Reel (URL)',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      label: 'รูปภาพหน้าปก (แนวตั้ง 9:16)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'customThumbnailUrl',
      label: 'หรือ ลิงก์รูปปกสำรอง (URL)',
      type: 'text',
    },
    {
      name: 'order',
      label: 'ลำดับการแสดงผล (น้อยไปมาก)',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      label: 'แสดงบนหน้าแรก',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};
