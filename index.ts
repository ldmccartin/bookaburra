import { Elysia } from "elysia";
import { rateLimit } from 'elysia-rate-limit'

const app = new Elysia().use(rateLimit());

app.get("/", async () => {
  try {
    return new Response(JSON.stringify("Bookaburra 0.1"));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});