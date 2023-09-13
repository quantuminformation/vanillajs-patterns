import { db, schema } from '.';
import bcrypt from 'bcryptjs';

const users = await db
  .insert(schema.user)
  .values([
    {
      name: 'Nikos',
      email: 'nikos@test.com',
      passwordHash: await bcrypt.hash('password', 10),
      emailVerified: true,
    },
    {
      name: 'John',
      email: 'John@test.com',
      passwordHash: await bcrypt.hash('password', 10),
      emailVerified: true,
    },
  ])
  .returning();

console.log('Seed complete!');
