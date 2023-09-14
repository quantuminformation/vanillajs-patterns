import { db } from './db';
import { user } from 'db/schema';

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    debugger;
    const url = new URL(req.url);

    const responseInit: ResponseInit = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
    if (url.pathname === '/users') {
      const result = await db.select().from(user);
      return new Response(JSON.stringify(result), responseInit);
    }
    return new Response('404!');
  },
});

console.log(`Listening on port ${server.port}...`);
