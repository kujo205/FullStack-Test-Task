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

  async fetchAllUserRepos(userId: string, pagination: TPagination): Promise<Repo[]> {
    return this.repo.fetchAllUserRepos(userId, pagination);
  }
}
