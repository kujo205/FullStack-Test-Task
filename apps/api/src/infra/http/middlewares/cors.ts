import { cors } from "hono/cors";

const corsMiddleware = cors({
  // TODO: allow this only in development
  origin: "http://localhost:3000",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

export default corsMiddleware;
