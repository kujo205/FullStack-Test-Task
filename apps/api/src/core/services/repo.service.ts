import { RepoRepository } from "@infra/db/repositories/repo.repository";
import { TPagination } from "@infra/http/schemas/pagination.schema";
import { Repo } from "@/core/entities/Repo";
import { RepoFromGh } from "@/core/services/github.service";

export class RepoService {
  constructor(private repo: RepoRepository) {}

  async createPendingRepo(userId: string, repo: Pick<Repo, "name" | "owner">) {
    return this.repo.createPendingRepo(userId, repo);
  }

  async upsertGithubRepo(repoId: string, repo: RepoFromGh) {
    return this.repo.upsertGithubRepo(repoId, repo);
  }

  async fetchAllUserRepos(userId: string, pagination: TPagination) {
    const [allRepos, paginationMeta] = await Promise.all([
      this.repo.fetchAllUserRepos(userId, pagination),
      this.repo.getTotalUserReposGapes(userId, pagination),
    ]);

    return {
      repos: allRepos,
      meta: paginationMeta,
    };
  }

  async deleteUserRepo(userId: string, repoId: string) {
    return this.repo.deleteUserRepo(userId, repoId);
  }

  async getRepoById(repoId: string) {
    return this.repo.getRepoById(repoId);
  }

  async updateRepoStatus(repoId: string, status: Repo["status"]) {
    return this.repo.updateRepoStatus(repoId, status);
  }
}
