// /backend/main.ts

import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { DB } from 'https://deno.land/x/sqlite/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

// Open a database
const db = new DB('my_database.db');

// Run a simple query
db.query('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

// Insert some data
let res = db.query('INSERT INTO people (name) VALUES (:name)', { name: 'Nikos' });

// Create a router
const router = new Router();

router.get('/users', async (ctx) => {
  const results = [];
  for (const row of db.query('SELECT * FROM people')) {
    const record = {};
    const columnNames = ['id', 'name'];
    for (let i = 0; i < columnNames.length; i++) {
      record[columnNames[i]] = row[i];
    }
    results.push(record);
  }
  ctx.response.body = results;
});

router.post('/users', async (ctx) => {
  const {
    value: { name },
  } = await ctx.request.body();
  db.query('INSERT INTO people (name) VALUES (:name)', { name });
  ctx.response.status = 201; // Created
});

router.put('/users/:id', async (ctx) => {
  const {
    value: { name },
  } = await ctx.request.body();
  const { id } = ctx.params;
  db.query('UPDATE people SET name = :name WHERE id = :id', { name, id });
  ctx.response.status = 204; // No Content
});

const app = new Application();
app.use(oakCors());

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`HTTP webserver running. Access it at:  http://localhost:8000/`);
await app.listen({ port: 8000 });
