import corsMiddleware from "@infra/http/middlewares/cors.middleware";
import sessionMiddleware from "@infra/http/middlewares/session.middleware";

import { authRouter, reposRouter } from "@infra/http/routers";

import { Hono } from "hono";

const app = new Hono();

app.use("*", corsMiddleware);

app.use("/repos/*", sessionMiddleware);

app.route("/repos", reposRouter);

app.route("/api/", authRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

console.log("Registered routes:");

app.routes.forEach((route) => {
  console.log(`${route.method} ${route.path}`);
});

export { app };
