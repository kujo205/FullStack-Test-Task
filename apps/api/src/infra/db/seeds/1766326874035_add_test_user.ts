import type { Kysely } from "kysely";
import { auth } from "../../auth/better-auth";

export const testUser = {
  email: "test@user.com",
  password: "TestPassword123!",
  name: "Test User",
};

export async function seed(db: Kysely<never>): Promise<void> {
  await auth.api.signUpEmail({
    body: {
      email: testUser.email,
      password: testUser.password,
      name: testUser.name,
    },
  });
}
