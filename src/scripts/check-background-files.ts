/* eslint-disable */
import fs from 'fs';
import path from 'path';

const heroDir = path.resolve(process.cwd(), 'public/images/hero');
const files = fs.readdirSync(heroDir);

console.log('=== FILES IN public/images/hero ===');
files.forEach((f) => {
  const stat = fs.statSync(path.join(heroDir, f));
  console.log(`${f} (${stat.size} bytes)`);
});
