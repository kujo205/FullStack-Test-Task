import { createRouter } from "@tanstack/react-router";
import { createQueryClient } from "@/lib/api-client/react-query.ts";
import { routeTree } from "./routeTree.gen";

export const getRouter = async () => {
  const queryClient = createQueryClient();

  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
