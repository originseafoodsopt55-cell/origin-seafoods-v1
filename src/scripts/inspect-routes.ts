import fs from 'fs';
import path from 'path';

function walk(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const appDir = path.resolve(process.cwd(), 'src/app');
console.log('=== ALL FILES UNDER src/app ===');
const files = walk(appDir);
files.forEach((f) => console.log(path.relative(process.cwd(), f)));
