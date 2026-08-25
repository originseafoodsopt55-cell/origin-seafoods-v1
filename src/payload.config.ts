import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Series } from './collections/Series'
import { ProductLines } from './collections/ProductLines'
import { Variants } from './collections/Variants'
import { Features } from './collections/Features'
import { Countries } from './collections/Countries'
import { CompanyProfile } from './globals/Company'
import { Brands } from './collections/Brands'
import { Gallery } from './collections/Gallery'
import { News } from './collections/News'
import { SourcingRegions } from './collections/SourcingRegions'
import { Navigation } from './collections/Navigation'
import { ContactLinks } from './collections/ContactLinks'
import { Contact } from './globals/Contact'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Categories,
    Media,
    Series,
    ProductLines,
    Variants,
    Features,
    Countries,
    Brands,
    Gallery,
    News,
    SourcingRegions,
    Navigation,
    ContactLinks,
  ],
  globals: [
    CompanyProfile,
    Contact,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'a-very-secure-secret-key-1234',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false,
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
