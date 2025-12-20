import { Hono } from "hono";

const app = new Hono();

app.get("/:id", (c) => {
  const id = c.req.param("id");

  return c.json(`list repos ${id}`);
});

export default app;
