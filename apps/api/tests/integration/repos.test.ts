import { describe, expect, it } from "vitest";
import { app } from "@/infra/http/app";
import { loginTestUser } from "./auth-helper";

// TODO: ideally run docker compose up when running the tests with proper seed and teardown after tests, but for local tests this is sufficient
describe("repos route", async () => {
  const cookie = await loginTestUser(app);

  describe("POST /repos", () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify({ repository: "kujo205/git-copy" }),
    };

    it("should create user's repo", async () => {
      const res = await app.request("/repos", options);

      expect(res.status).toBe(200);
    });

    it("shouldn't accept full repo paths", async () => {
      const res = await app.request("/repos", {
        ...options,
        body: JSON.stringify({ repository: "https://github.com/kujo205/git-copy" }),
      });

      expect(res.status).toBe(400);
    });

    it("should throw 400 if incorrect body", async () => {
      const res = await app.request("/repos", {
        ...options,
        body: JSON.stringify({ repositoryl: "kujo205/git-copy" }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /repos?page=&pageSize=, gets all repos", async () => {
    it("should fetch all user repos", async () => {
      const res = await app.request("/repos?page=1&pageSize=50", {
        method: "GET",
        headers: {
          Cookie: cookie,
        },
      });

      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toBeTypeOf("object");
    });

    it("should fetch user repos even without specifying page and size", async () => {
      const res = await app.request("/repos", {
        headers: {
          Cookie: cookie,
        },
      });

      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toBeTypeOf("object");
    });
  });

  describe("DELETE /repos/:repoId", ({ skip }) => {
    skip("WIP");
    // it("should delete user's repo", async () => {
    //
    // }
  });

  describe("GET /repos/:repoId/update, update the repo", ({ skip }) => {
    skip("WIP");
    // it("should update user's repo", async () => {
  });
});
