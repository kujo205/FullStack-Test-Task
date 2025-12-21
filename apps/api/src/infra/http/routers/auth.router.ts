import { Hono } from "hono";
import { type AuthType, auth } from "@/infra/auth/better-auth";

export function createAuthRouter() {
  const router = new Hono<{ Bindings: AuthType }>({
    strict: false,
  });

  router.on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });

  return router;
}
