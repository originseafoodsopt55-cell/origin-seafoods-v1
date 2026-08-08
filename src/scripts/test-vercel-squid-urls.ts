/* eslint-disable */
import https from 'https';

const urls = [
  'https://origin-seafoods-v1.vercel.app/media/cuttlefish.png',
  'https://origin-seafoods-v1.vercel.app/media/squid-roe.png',
  'https://origin-seafoods-v1.vercel.app/media/squid-rings.png',
  'https://origin-seafoods-v1.vercel.app/images/products/cuttlefish.png',
  'https://origin-seafoods-v1.vercel.app/images/products/squid-roe.png',
  'https://origin-seafoods-v1.vercel.app/images/products/squid-rings.png',
];

async function checkUrl(urlStr: string) {
  return new Promise((resolve) => {
    https.get(urlStr, (res) => {
      console.log(`${urlStr} -> ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`${urlStr} -> ERROR: ${err.message}`);
      resolve(0);
    });
  });
}

async function main() {
  for (const url of urls) {
    await checkUrl(url);
  }
}

main();
