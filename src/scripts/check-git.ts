import { execSync } from 'child_process';

const files = [
  'blood-cockle-blood-cockle.png',
  'japanese-scallop-half-shell.png',
  'whelk-whelk.png',
  'razor-clam-razor-clam.png',
  'salmon-skin-2.png',
  'cannonball-jellyfish-2.png',
  'tiger-stripe-jellyfish-2.png',
  'quartered-jellyfish-2.png',
  'angel-wing-jellyfish-3.png',
  'silkworm-1.png',
  'blue-swimming-crab-ibnr.png',
  'three-spot-swimming-crab-ibnr.png',
  'argentine-squid-argentine.png',
  'pakistani-squid-white-box.png',
  'black-squid-xing-bang.png',
  'squid-neck-er.png',
  'squid-tail-squid-tail.png',
  'squid-head-squid-head.png',
];

console.log('Checking git tracking for all product line cover images:');
for (const f of files) {
  const inMedia = execSync(`git ls-files "public/media/${f}"`).toString().trim();
  const inImages = execSync(`git ls-files "public/images/products/${f}"`).toString().trim();
  console.log(`${f}: media=${inMedia ? 'YES' : 'NO'}, images=${inImages ? 'YES' : 'NO'}`);
}
