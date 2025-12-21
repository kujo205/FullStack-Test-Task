import type { AppType } from "@api/infra/http/app";

import { hc } from "hono/client";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;
  return import.meta.env.VITE_API_URL ?? "http://localhost:3000";
};

export const rpc = hc<AppType>(getBaseUrl());
