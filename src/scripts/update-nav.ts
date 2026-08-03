/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function main() {
  const payload = await getPayload({ config: configPromise });
  const navDocs = await payload.find({
    collection: 'navigation',
    limit: 100,
  });

  console.log('--- Current Navigation Collection Docs ---');
  console.log(JSON.stringify(navDocs.docs, null, 2));

  // Find doc with href '#gallery' or label 'แกลเลอรี่'
  for (const doc of navDocs.docs) {
    if (doc.href === '#gallery' || doc.label === 'แกลเลอรี่' || doc.label?.includes('แกลเลอรี่')) {
      console.log(`Found matching doc ID: ${doc.id}, updating to label: "ข่าวสาร", href: "#news"...`);
      const updated = await payload.update({
        collection: 'navigation',
        id: doc.id,
        data: {
          label: 'ข่าวสาร',
          href: '#news',
        } as any,
      });
      console.log(`Successfully updated nav item ID ${updated.id} -> label: "ข่าวสาร", href: "#news"`);
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
