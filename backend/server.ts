import { user } from 'db/schema';
import { db, schema } from './db';

const fo = await db.select().from(user);
debugger;
console.log(fo);
//console.log(`Listening on port ${server.port}...`, fo);
