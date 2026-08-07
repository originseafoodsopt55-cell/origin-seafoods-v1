import https from 'https';

const urls = [
  'https://origin-seafoods-v1.vercel.app/media/blood-cockle-blood-cockle.png',
  'https://origin-seafoods-v1.vercel.app/images/products/blood-cockle-blood-cockle.png',
  'https://origin-seafoods-v1.vercel.app/images/products/blood-cockle.png',
  'https://origin-seafoods-v1.vercel.app/media/210726-01.png',
  'https://origin-seafoods-v1.vercel.app/media/silkworm-1.png',
  'https://origin-seafoods-v1.vercel.app/images/products/silkworm-1.png',
];

for (const url of urls) {
  https.get(url, (res) => {
    console.log(`${url} -> ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`${url} -> ERROR: ${err.message}`);
  });
}
