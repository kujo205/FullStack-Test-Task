import { Repo } from "@core/entities/Repo";
import { HTTPException } from "hono/http-exception";

export type RepoFromGh = Omit<Repo, "createdAt" | "updatedAt" | "userId" | "id">;

export class GithubService {
  static async fetchRepo(params: { owner: string; name: string }): Promise<RepoFromGh> {
    const { owner, name } = params;
    const url = `https://api.github.com/repos/${encodeURIComponent(
      owner as string,
    )}/${encodeURIComponent(name)}`;

    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "repo-service",
      },
    });

    if (res.status === 404) {
      throw new HTTPException(404, { message: "Repository not found" });
    }
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub API error ${res.status}: ${body}`);
    }

    const data = await res.json();

    return {
      owner,
      name,
      stars: Number(data.stargazers_count ?? 0),
      forks: Number(data.forks_count ?? 0),
      issues: Number(data.open_issues_count ?? 0),
      createdAtUtc: String(new Date(data.created_at).getTime()),
      status: "ready",
    } satisfies RepoFromGh;
  }
}
