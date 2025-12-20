import "dotenv/config";

import { serve } from "@hono/node-server";

console.log("Starting server...", process.env.DATABASE_URL);

import corsMiddleware from "@infra/http/middlewares/cors";
import authRouter from "@infra/http/routers/auth.router";
import reposRouter from "@infra/http/routers/repos.router";

import { Hono } from "hono";

const app = new Hono();

app.use("*", corsMiddleware);

app.route("/repos", reposRouter);
app.route("/api/", authRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
