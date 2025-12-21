import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // to avoid queries refetching immediately on the client hydration
        staleTime: 1000 * 60,
      },
    },
  });
}
