import { productSeries, productGroups, productVariants } from '../lib/data/products'

async function testAllUrls() {
  console.log('Testing routing verification...')

  const results: any[] = []

  // 1. Test New 3-level ProductLine URLs (Expect HTTP 200 OK)
  console.log('\n--- 1. Testing New 3-level ProductLine URLs (200 OK) ---')
  for (const pg of productGroups) {
    const newUrlPath = `/products/${pg.categorySlug}/${pg.slug}`
    try {
      const res = await fetch(`http://127.0.0.1:3000${newUrlPath}`, { redirect: 'manual' })
      results.push({
        category: pg.categorySlug,
        productLine: pg.slug,
        testType: 'New 3-Level URL',
        targetUrl: newUrlPath,
        httpStatus: res.status,
        expectedStatus: 200,
        pass: res.status === 200
      })
    } catch (e: any) {
      results.push({
        category: pg.categorySlug,
        productLine: pg.slug,
        testType: 'New 3-Level URL',
        targetUrl: newUrlPath,
        httpStatus: e.message,
        expectedStatus: 200,
        pass: false
      })
    }
  }

  // 2. Test Old 4-level ProductLine URLs (Expect HTTP 308 Redirect to 3-level URL)
  console.log('\n--- 2. Testing Old 4-level ProductLine URLs (308 Redirect) ---')
  for (const pg of productGroups) {
    const oldUrlPath = `/products/${pg.categorySlug}/${pg.seriesSlug}/${pg.slug}`
    const expectedLocation = `/products/${pg.categorySlug}/${pg.slug}`
    try {
      const res = await fetch(`http://127.0.0.1:3000${oldUrlPath}`, { redirect: 'manual' })
      const loc = res.headers.get('location')
      results.push({
        category: pg.categorySlug,
        productLine: pg.slug,
        testType: 'Old 4-Level URL Redirect',
        targetUrl: oldUrlPath,
        httpStatus: `${res.status} -> ${loc}`,
        expectedStatus: `308 -> ${expectedLocation}`,
        pass: res.status === 308 && loc === expectedLocation
      })
    } catch (e: any) {
      results.push({
        category: pg.categorySlug,
        productLine: pg.slug,
        testType: 'Old 4-Level URL Redirect',
        targetUrl: oldUrlPath,
        httpStatus: e.message,
        expectedStatus: `308 -> ${expectedLocation}`,
        pass: false
      })
    }
  }

  // 3. Test Orphaned Series URL (mussel -> 308 redirect to /products/shellfish)
  console.log('\n--- 3. Testing Orphaned Series URL (mussel) ---')
  try {
    const res = await fetch(`http://127.0.0.1:3000/products/shellfish/mussel`, { redirect: 'manual' })
    const loc = res.headers.get('location')
    results.push({
      category: 'shellfish',
      productLine: 'mussel (Series)',
      testType: 'Orphaned Series Redirect',
      targetUrl: '/products/shellfish/mussel',
      httpStatus: `${res.status} -> ${loc}`,
      expectedStatus: '308 -> /products/shellfish',
      pass: res.status === 308 && loc === '/products/shellfish'
    })
  } catch (e: any) {
    results.push({
      category: 'shellfish',
      productLine: 'mussel (Series)',
      testType: 'Orphaned Series Redirect',
      targetUrl: '/products/shellfish/mussel',
      httpStatus: e.message,
      expectedStatus: '308 -> /products/shellfish',
      pass: false
    })
  }

  // 4. Test Old dolly-fish Redirects
  console.log('\n--- 4. Testing Old dolly-fish Redirects ---')
  const dollyTests = [
    { url: '/products/fish/dolly-fish', expected: '/products/fish/salmon-skin' },
    { url: '/products/fish/dolly-fish/dolly-fish', expected: '/products/fish/salmon-skin' }
  ]
  for (const t of dollyTests) {
    try {
      const res = await fetch(`http://127.0.0.1:3000${t.url}`, { redirect: 'manual' })
      const loc = res.headers.get('location')
      results.push({
        category: 'fish',
        productLine: 'dolly-fish (Legacy Redirect)',
        testType: 'Legacy Slug Redirect',
        targetUrl: t.url,
        httpStatus: `${res.status} -> ${loc}`,
        expectedStatus: `308 -> ${t.expected}`,
        pass: res.status === 308 && loc === t.expected
      })
    } catch (e: any) {
      results.push({
        category: 'fish',
        productLine: 'dolly-fish (Legacy Redirect)',
        testType: 'Legacy Slug Redirect',
        targetUrl: t.url,
        httpStatus: e.message,
        expectedStatus: `308 -> ${t.expected}`,
        pass: false
      })
    }
  }

  console.log('\n=== COMPLETE ROUTING TEST RESULTS ===')
  console.table(results)

  const failedCount = results.filter(r => !r.pass).length
  console.log(`Total test cases: ${results.length}, Passed: ${results.length - failedCount}, Failed: ${failedCount}`)
  
  process.exit(failedCount === 0 ? 0 : 1)
}

testAllUrls().catch(err => {
  console.error(err)
  process.exit(1)
})
