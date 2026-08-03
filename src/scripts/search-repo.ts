import fs from 'fs';
import path from 'path';

function searchFile(filePath: string, term: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.toLowerCase().includes(term.toLowerCase())) {
    console.log(`Found "${term}" in: ${path.relative(process.cwd(), filePath)}`);
  }
}

function walk(dir: string, term: string) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        walk(fullPath, term);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json')) {
      searchFile(fullPath, term);
    }
  });
}

console.log('=== SEARCHING FOR "catalog" IN src/ ===');
walk(path.resolve(process.cwd(), 'src'), 'catalog');
