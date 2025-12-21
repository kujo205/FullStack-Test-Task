import { RepoService } from "@core/services/repo.service";
import { DB } from "@infra/db";
import { RepoRepository } from "@infra/db/repositories/repo.repository";
import { RepoController } from "@infra/http/controllers/repo.controller";
import zodValidatorMiddleware from "@infra/http/middlewares/zodValidator.middleware";
import { PaginationQuerySchema, parsePagination } from "@infra/http/schemas/pagination.schema";
import { AppVars } from "@infra/http/types";
import { Hono } from "hono";
import { Kysely } from "kysely";
import { CreateRepoBodySchema, RepoPathSchema } from "@/infra/http/schemas/repos.schema";

export function createReposRouter(db: Kysely<DB>) {
  const repoController = new RepoController(new RepoService(new RepoRepository(db)));

  const app = new Hono<AppVars>()
    .post("/", zodValidatorMiddleware("json", CreateRepoBodySchema), async (c) => {
      const body = c.req.valid("json");

      const user = c.get("user");

      const repoData = RepoPathSchema.parse(body);

      const repoId = await repoController.createUserRepo(user.id, repoData);

      return c.json({
        success: true,
        repoId,
      });
    })
    .get("/", zodValidatorMiddleware("query", PaginationQuerySchema), async (c) => {
      const query = c.req.valid("query");

      const user = c.get("user");

      const pagination = parsePagination(query);

      const resp = await repoController.getUserRepos(user.id, pagination);

      return c.json({
        success: true,
        data: resp,
      });
    })
    .delete(":repoId", async (c) => {
      const { repoId } = c.req.param();

      const user = c.get("user");

      await repoController.deleteRepo(user.id, repoId);

      return c.json({
        success: true,
      });
    })
    .get(":repoId/update", async (c) => {
      const { repoId } = c.req.param();

      await repoController.updateUserRepo(repoId);

      return c.json({
        success: true,
      });
    });

  return app;
}
