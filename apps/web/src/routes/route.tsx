import { Repo } from "@api/core/entities/Repo.ts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { RepoCard, RepoCardSkeleton } from "@/features/repos/components/repo-card";
import { rpc } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-client";
import { PaginationContainer } from "@/shared/custom-ui/pagination-container";

// Zod schema for search params validation
const searchParamsSchema = z.object({
  page: z.number().min(1).catch(1),
  perPage: z.number().min(1).max(100).catch(10),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return searchParamsSchema.parse({
      page: Number(search?.page) || 1,
      perPage: Number(search?.perPage) || 10,
    });
  },
  component: App,
});

function App() {
  const { isLoggedIn, isLoading: isLoadingAuthStatus } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();
  const { page, perPage } = Route.useSearch();

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["repos", page, perPage],
    queryFn: async () => {
      const resp = await rpc.repos.$get({
        query: {
          page,
          perPage,
        },
      });
      return resp.json();
    },
    staleTime: 5 * 60 * 1000,
    enabled: !isLoadingAuthStatus,
  });

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handlePageSizeChange = (newSize: number) => {
    navigate({
      search: (prev) => ({ ...prev, perPage: newSize, page: 1 }),
    });
  };

  if (!isLoggedIn && !isLoadingAuthStatus) {
    router.navigate({
      to: "/auth/login",
    });
    return null;
  }

  // Extract items and totalPages from your API response
  const repos = rawData?.data?.repos ?? [];
  const totalPages = rawData?.data.meta.pages || 1;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Repositories</h1>

      <PaginationContainer
        items={repos}
        totalPages={totalPages}
        currentPage={page}
        pageSize={perPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading || isLoadingAuthStatus}
        renderItem={(repo: Repo) => <RepoCard key={repo.id} repo={repo} />}
        emptyState={
          <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-stone-300 rounded-lg">
            <p className="text-stone-500 text-lg font-handwriting">No repositories found</p>
            <p className="text-stone-400 text-sm mt-2 font-handwriting">
              Create your first repository to get started
            </p>
          </div>
        }
        loadingState={
          <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RepoCardSkeleton />
            <RepoCardSkeleton />
            <RepoCardSkeleton />
            <RepoCardSkeleton />
          </div>
        }
      />
    </div>
  );
}
