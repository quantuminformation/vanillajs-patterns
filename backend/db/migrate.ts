import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from '.';
debugger;
migrate(db, { migrationsFolder: './drizzle' });
