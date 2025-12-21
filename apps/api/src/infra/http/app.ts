import corsMiddleware from "@infra/http/middlewares/cors.middleware";
import sessionMiddleware from "@infra/http/middlewares/session.middleware";
import { authRouter, indexRouter, reposRouter } from "@infra/http/routers";

import { Hono } from "hono";

// const routes = [reposRouter, authRouter, indexRouter] as const;

const app = new Hono()
  .use("*", corsMiddleware)
  .use("/repos/*", sessionMiddleware)
  .route("/", indexRouter)
  .route("/", authRouter)
  .route("/", reposRouter);

console.log("Registered routes:");

app.routes.forEach((route) => {
  console.log(`${route.method} ${route.path}`);
});

export type AppType = typeof app;

export { app };
