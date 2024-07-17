import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", async (context) => {
  try {
    return new Response(JSON.stringify("Bookaburra 0.1"));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});