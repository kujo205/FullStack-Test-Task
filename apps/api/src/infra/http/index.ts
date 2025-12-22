import "dotenv/config";

import { serve } from "@hono/node-server";
import { app } from "@infra/http/app";

serve(
  {
    fetch: app.fetch,
    port: process.env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
