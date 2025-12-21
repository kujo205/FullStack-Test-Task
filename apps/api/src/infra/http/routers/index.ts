import { db } from "@infra/db";
import { createAuthRouter } from "@infra/http/routers/auth.router";
import { createIndexRouter } from "@infra/http/routers/index.route";
import { createReposRouter } from "@infra/http/routers/repos.router";

export const authRouter = createAuthRouter();
export const reposRouter = createReposRouter(db);
export const indexRouter = createIndexRouter();
