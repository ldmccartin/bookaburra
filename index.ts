import { Elysia } from "elysia";
import { rateLimit } from 'elysia-rate-limit'
import { cors } from '@elysiajs/cors'
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { getAll, save, remove } from './src/db/resource';
type resourcePost = { body: { url: string } };
type resourceDelete = { params: { _id: string } };

dotenv.config();

await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qwzopp0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

const app = new Elysia();
app.use(cors());

app.get('/', async () => {
  try {
    return new Response('Bookaburra is live...');
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
});
app.get('/all', async () => await getAll());
app.post('/resource', async ({ body: { url } }: resourcePost) => await save(url)).use(rateLimit());
app.delete('/resource/:_id', async ({ params: { _id }}: resourceDelete) => await remove(_id)).use(rateLimit());

app.listen(3000, () => {
  console.log('Server running...');
}).onStop(async () => {
  console.log('Server shutting down...')
  await mongoose.disconnect();
  console.log('Server stopped.')
});
