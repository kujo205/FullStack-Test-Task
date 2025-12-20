import { db } from "@infra/db";

import { createAuthRouter } from "@infra/http/routers/auth.router";
import { createReposRouter } from "@infra/http/routers/repos.router";

export const authRouter = createAuthRouter();
export const reposRouter = createReposRouter(db);
