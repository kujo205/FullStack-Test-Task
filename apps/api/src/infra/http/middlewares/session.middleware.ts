import type { Context, Next } from "hono";
import { auth } from "@/infra/auth/better-auth";
import { type AppVars } from "@/infra/http/types";

async function sessionMiddleware(c: Context<AppVars>, next: Next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
}

export default sessionMiddleware;
