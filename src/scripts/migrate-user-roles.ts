import { getPayload } from 'payload';
import config from '../payload.config';

async function migrate() {
  console.log('Initializing Payload for user role migration...');
  const payload = await getPayload({ config });

  console.log('Finding all existing users...');
  const users = await payload.find({
    collection: 'users',
    limit: 100,
  });

  console.log(`Found ${users.docs.length} users. Migrating to admin role...`);
  for (const user of users.docs) {
    console.log(`Upgrading user: ${user.email}`);
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        roles: ['admin'],
      },
    });
  }
  console.log('Migration completed successfully.');
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
