import { execSync } from 'child_process';

console.log('Checking status of files on git:');
const check1 = execSync('git ls-files public/media/210726-01.png').toString().trim();
const check2 = execSync('git ls-files public/media/blood-cockle-blood-cockle.png').toString().trim();
const check3 = execSync('git ls-files public/media/silkworm-1.png').toString().trim();

console.log(`210726-01.png in git: "${check1}"`);
console.log(`blood-cockle-blood-cockle.png in git: "${check2}"`);
console.log(`silkworm-1.png in git: "${check3}"`);
