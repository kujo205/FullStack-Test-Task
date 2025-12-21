import { GithubService } from "@core/services/github.service";
import { RepoService } from "@core/services/repo.service";
import { TPagination } from "@infra/http/schemas/pagination.schema";
import { RepoPath } from "@infra/http/schemas/repos.schema";

export class RepoController {
  constructor(private repoService: RepoService) {}

  async createUserRepo(userId: string, repoPath: RepoPath) {
    const repoId = await this.repoService.createPendingRepo(userId, repoPath);

    // schedule background fetch so the HTTP response returns immediately
    setImmediate(() => {
      (async () => {
        const ghData = await GithubService.fetchRepo(repoPath);

        await this.repoService.upsertGithubRepo(repoId, ghData);
      })();
    });

    return repoId;
  }

  async getUserRepos(userId: string, pagination: TPagination) {
    return this.repoService.fetchAllUserRepos(userId, pagination);
  }

  async deleteRepo(userId: string, repoId: string) {
    return this.repoService.deleteUserRepo(userId, repoId);
  }

  async updateUserRepo(repoId: string) {
    const [repo] = await Promise.all([
      this.repoService.getRepoById(repoId),
      this.repoService.updateRepoStatus(repoId, "pending"),
    ]);

    setImmediate(() => {
      (async () => {
        const ghData = await GithubService.fetchRepo({
          owner: repo.owner,
          name: repo.name,
        });

        await this.repoService.upsertGithubRepo(repoId, ghData);
      })();
    });
  }
}
