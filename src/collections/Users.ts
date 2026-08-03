/* eslint-disable @typescript-eslint/no-explicit-any */
import { CollectionConfig } from 'payload'

export const isAdmin = ({ req: { user } }: { req: { user: any } }) => 
  Boolean(user && user.roles?.includes('admin'));

export const isAdminOrSelf = ({ req: { user } }: { req: { user: any } }) => {
  if (!user) return false;
  if (user.roles?.includes('admin')) return true;
  return { id: { equals: user.id } };
};

export const isAdminOrEditor = ({ req: { user } }: { req: { user: any } }) => 
  Boolean(user && (user.roles?.includes('admin') || user.roles?.includes('editor')));

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles'],
    group: 'ตั้งค่าระบบ',
  },
  labels: {
    singular: 'ผู้ดูแลระบบ / ผู้ใช้งาน',
    plural: 'ผู้ดูแลระบบ / ผู้ใช้งาน',
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          const existing = await req.payload.count({ collection: 'users' });
          if (existing.totalDocs === 0) {
            data.roles = ['admin'];
          }
        }
        return data;
      }
    ]
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      required: true,
      options: [
        { label: 'ผู้ดูแลระบบ (Admin)', value: 'admin' },
        { label: 'ผู้แก้ไขเนื้อหา (Editor)', value: 'editor' },
      ],
      label: 'บทบาทสิทธิ์การใช้งาน',
    },
  ],
}
