import { Hono } from "hono";

export function createIndexRouter() {
  const router = new Hono();

  router.get("/", (c) => {
    return c.text("Welcome to the API!");
  });

  return router;
}
