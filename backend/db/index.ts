import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
export { eq, lt, gte, ne, sql } from 'drizzle-orm';

import * as schema from './schema';

const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);

export { schema };
