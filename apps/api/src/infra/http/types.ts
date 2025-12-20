import { auth } from "@infra/auth/better-auth";

export type AppVars = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  };
};
