/* eslint-disable */
import http from 'http';

const urls = [
  'http://127.0.0.1:3000/media/cuttlefish.png',
  'http://127.0.0.1:3000/media/squid-roe.png',
  'http://127.0.0.1:3000/media/squid-rings.png',
  'http://127.0.0.1:3000/images/products/cuttlefish.png',
  'http://127.0.0.1:3000/images/products/squid-roe.png',
  'http://127.0.0.1:3000/images/products/squid-rings.png',
];

async function checkUrl(urlStr: string) {
  return new Promise((resolve) => {
    http.get(urlStr, (res) => {
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
