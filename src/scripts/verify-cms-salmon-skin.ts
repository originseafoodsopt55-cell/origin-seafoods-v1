import fs from 'fs'
import path from 'path'

try {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8')
    envConfig.split('\n').forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let value = match[2] || ''
        if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1)
        }
        process.env[key] = value.trim()
      }
    })
  }
} catch (e) {
  console.warn('Could not load .env.local', e)
}

process.env.NEXT_PUBLIC_CMS_ENDPOINT = 'http://localhost:3000/api'
process.env.NEXT_PUBLIC_CMS_PROVIDER = 'cms'

import { CMSContentProvider } from '../lib/providers/cms/CMSContentProvider'

async function verifyDAL() {
  console.log('Testing CMSContentProvider DAL...')
  const provider = new CMSContentProvider()

  const productLine = await provider.getProductLineBySlug('fish', 'salmon-skin')
  console.log('getProductLineBySlug result:', JSON.stringify(productLine, null, 2))

  if (!productLine) {
    console.error('ERROR: productLine is undefined!')
    process.exit(1)
  }

  if (productLine.slug !== 'salmon-skin' || productLine.thai !== 'หนังปลาแซลมอน') {
    console.error('ERROR: productLine data mismatch!', productLine)
    process.exit(1)
  }

  const variants = await provider.getProductVariantsByProductLine('fish', 'salmon-skin')
  console.log(`getProductVariantsByProductLine count: ${variants.length}`)

  console.log('DAL Verification PASSED 100%!')
  process.exit(0)
}

verifyDAL().catch((err) => {
  console.error(err)
  process.exit(1)
})
