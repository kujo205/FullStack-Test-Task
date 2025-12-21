import corsMiddleware from "@infra/http/middlewares/cors.middleware";
import sessionMiddleware from "@infra/http/middlewares/session.middleware";
import { authRouter, reposRouter } from "@infra/http/routers";

import { Hono } from "hono";

const app = new Hono()
  .use("*", corsMiddleware)
  .use("/repos/*", sessionMiddleware)
  .route("/repos", reposRouter)
  .route("/api", authRouter) // Note: removed trailing slash for cleaner RPC paths
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });

console.log("Registered routes:");

app.routes.forEach((route) => {
  console.log(`${route.method} ${route.path}`);
});

export type AppType = typeof app;

export { app };
