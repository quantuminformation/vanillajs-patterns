import { db } from './db';
import { user } from 'db/schema';

debugger;
const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const result = await db.select().from(user);
    return new Response(JSON.stringify(result));
  },
});

console.log(`Listening on port ${server.port}...`);
