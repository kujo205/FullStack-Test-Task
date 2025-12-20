import { describe, expect, it } from "vitest";
import { GithubService } from "./github.service";

const testRepo = {
  owner: "kujo205",
  name: "git-copy",
};

describe("githubService", () => {
  it("should fetch correct repo data for kujo205/git-copy", async () => {
    const result = await GithubService.fetchRepo(testRepo);

    expect(result).toBeDefined();
    expect(result.owner).toBe("kujo205");
    expect(result.name).toBe("git-copy");
    expect(typeof result.stars).toBe("number");
    expect(result.stars).toBeGreaterThan(0);
    expect(typeof result.forks).toBe("number");
    expect(typeof result.issues).toBe("number");
    expect(result.createdAtUtc).toBeDefined();
    expect(result.status).toBe("ready");
  });

  it("should throw error for non-existent repository", async () => {
    await expect(
      GithubService.fetchRepo({
        owner: "nonexistentuser12345",
        name: "nonexistentrepo12345",
      }),
    ).rejects.toThrow();
  });

  it("should return valid timestamp for createdAtUtc", async () => {
    const result = await GithubService.fetchRepo(testRepo);

    const timestamp = Number(result.createdAtUtc);
    expect(timestamp).toBeGreaterThan(0);
    expect(new Date(timestamp).getTime()).toBe(timestamp);
  });
});
