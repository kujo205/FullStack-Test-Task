import { Repo } from "@api/core/entities/Repo.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { RepoCard, RepoCardSkeleton } from "@/features/repos/components/repo-card";
import { rpc } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-client";
import { PaginationContainer } from "@/shared/custom-ui/pagination-container";

const searchParamsSchema = z.object({
  page: z.number().min(1).catch(1),
  pageSize: z.number().min(1).max(100).catch(10),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return searchParamsSchema.parse({
      page: Number(search?.page) || 1,
      pageSize: Number(search?.pageSize) || 10,
    });
  },
  component: App,
});

function App() {
  const { isLoggedIn, isLoading: isLoadingAuthStatus } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();
  const { page, pageSize } = Route.useSearch();
  const ctx = Route.useRouteContext();

  const { data: rawData, isLoading } = useQuery({
    queryKey: ["repos", page, pageSize],
    queryFn: async () => {
      const resp = await rpc.repos.$get({
        query: {
          page,
          pageSize,
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
      search: (prev) => ({ ...prev, pageSize: newSize, page: 1 }),
    });
  };

  if (!isLoggedIn && !isLoadingAuthStatus) {
    router.navigate({
      to: "/auth/login",
    });
    return null;
  }

  const repos = rawData?.data?.repos ?? [];
  const totalPages = rawData?.data.meta.pages || 1;

  async function handleDeleteRepo(repoId: string) {
    const res = await rpc.repos[":repoId"]
      .$delete({
        param: { repoId },
      })
      .then((res) => res.json());

    if (res.success) {
      toast.success("Repository deleted successfully");
      await ctx.queryClient.invalidateQueries(["repos"]);
    } else {
      toast.error("Failed to delete repository");
    }
  }

  async function handleUpdateRepo(repoId: string) {
    const res = await rpc.repos[":repoId"].update
      .$get({
        param: { repoId },
      })
      .then((res) => res.json());

    if (res.success) {
      toast.info(
        "Repository is being updated, if you dont see changes soon, try refreshing the page",
      );
      await ctx.queryClient.invalidateQueries(["repos"]);
    } else {
      toast.error("Failed to update repository");
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Repositories</h1>

      <PaginationContainer
        items={repos}
        totalPages={totalPages}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading || isLoadingAuthStatus}
        renderItem={(repo: Repo) => (
          <RepoCard
            onDelete={handleDeleteRepo}
            onUpdate={handleUpdateRepo}
            key={repo.id}
            repo={repo}
          />
        )}
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
