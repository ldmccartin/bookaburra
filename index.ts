import { Elysia } from "elysia";
import { rateLimit } from 'elysia-rate-limit'
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

import { getAll } from './src/db/resource';

await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qwzopp0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

const allResources = await getAll();

console.log('all resources', allResources);

await mongoose.disconnect();

const app = new Elysia().use(rateLimit());

app.get("/", async () => {
  try {
    return new Response(JSON.stringify(allResources));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});