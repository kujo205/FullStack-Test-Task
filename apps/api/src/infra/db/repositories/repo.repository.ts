import { Repo } from "@core/entities/Repo";
import { RepoFromGh } from "@core/services/github.service";
import { BaseRepository, type DB } from "@infra/db/repositories/base.repository";
import { TPagination } from "@infra/http/schemas/pagination.schema";

export class RepoRepository extends BaseRepository {
  constructor(db: DB) {
    super(db);
  }

  async fetchAllUserRepos(userId: string, paginationOps: TPagination) {
    return this.db
      .selectFrom("repo")
      .select([
        "repo.id",
        "repo.owner",
        "repo.name",
        "repo.stars",
        "repo.forks",
        "repo.issues",
        "repo.createdAtUtc",
        "repo.status",
        "repo.userId",
        "repo.createdAt",
        "repo.updatedAt",
      ])
      .where("repo.userId", "=", userId)
      .limit(paginationOps.limit)
      .offset(paginationOps.offset)
      .execute();
  }

  async upsertGithubRepo(repoId: string, repo: RepoFromGh) {
    return this.db.transaction().execute(async (tx) => {
      tx.updateTable("repo")
        .set({
          owner: repo.owner,
          name: repo.name,
          stars: repo.stars,
          forks: repo.forks,
          issues: repo.issues,
          createdAtUtc: repo.createdAtUtc,
          status: "ready",
          updatedAt: new Date(),
        })
        .where("id", "=", repoId)
        .executeTakeFirst();
    });
  }

  async createPendingRepo(userId: string, repo: Pick<Repo, "name" | "owner">) {
    const id = crypto.randomUUID();
    const now = new Date();

    const result = await this.db
      .insertInto("repo")
      .values({
        id,
        owner: repo.owner,
        name: repo.name,
        status: "pending",
        userId,
        createdAt: now,
        updatedAt: now,
      })
      .onConflict((oc) =>
        oc.columns(["userId", "owner", "name"]).doUpdateSet({
          updatedAt: new Date(),
          status: "pending", // Reset status to pending on conflict
        }),
      )
      .returningAll()
      .executeTakeFirstOrThrow();

    return result.id;
  }

  async deleteUserRepo(userId: string, repoId: string) {
    return this.db
      .deleteFrom("repo")
      .where("id", "=", repoId)
      .where("userId", "=", userId)
      .executeTakeFirst();
  }

  async getRepoById(repoId: string) {
    return this.db
      .selectFrom("repo")
      .select([
        "repo.id",
        "repo.owner",
        "repo.name",
        "repo.stars",
        "repo.forks",
        "repo.issues",
        "repo.createdAtUtc",
        "repo.status",
        "repo.userId",
        "repo.createdAt",
        "repo.updatedAt",
      ])
      .where("repo.id", "=", repoId)
      .executeTakeFirstOrThrow();
  }

  async updateRepoStatus(repoId: string, status: Repo["status"]) {
    return this.db
      .updateTable("repo")
      .set({
        status,
        updatedAt: new Date(),
      })
      .where("id", "=", repoId)
      .executeTakeFirst();
  }
}
