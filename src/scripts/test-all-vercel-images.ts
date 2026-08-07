import https from 'https';

const testPaths = [
  '/media/210726-01.png',
  '/media/blood-cockle.png',
  '/media/blood-cockle-blood-cockle.png',
  '/images/products/blood-cockle.png',
  '/images/products/blood-cockle-blood-cockle.png',
  '/images/products/salmon-skin.png',
  '/images/products/angel-wing-jellyfish.png',
  '/images/products/silkworm.png',
  '/images/company/origin-logo.png',
];

for (const path of testPaths) {
  const url = `https://origin-seafoods-v1.vercel.app${path}`;
  https.get(url, (res) => {
    console.log(`${path} -> ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`${path} -> ERROR: ${err.message}`);
  });
}
