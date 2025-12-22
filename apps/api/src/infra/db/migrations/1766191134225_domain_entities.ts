import { Kysely, sql } from "kysely";

export async function up(db: Kysely<never>): Promise<void> {
  await sql`
      CREATE TABLE repo (
                             "id" TEXT NOT NULL PRIMARY KEY,        

                             "owner" VARCHAR(255) NOT NULL,
                             "name" VARCHAR(255) NOT NULL,

                             "stars" INTEGER NOT NULL DEFAULT 0,
                             "forks" INTEGER NOT NULL DEFAULT 0,
                             "issues" INTEGER NOT NULL DEFAULT 0,

                             "createdAtUtc" BIGINT NULL,

                             "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
                             "userId" TEXT NOT NULL,

                             "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
                             "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),

                             CONSTRAINT "repoStatusCheck"
                                 CHECK ("status" IN ('pending', 'ready', 'error')),

                             CONSTRAINT "uniqueRepoPerUser"
                                 UNIQUE ("userId", "owner", "name"),

                             CONSTRAINT "fkUser"
                                 FOREIGN KEY ("userId") REFERENCES "user"("id")
      );

  `.execute(db);
}
