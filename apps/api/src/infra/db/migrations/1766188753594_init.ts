import type { Kysely } from "kysely";
import { sql } from "kysely";

/**
 * this is better auth schema if
 * need to find out more visit
 * @see  https://www.better-auth.com/docs/concepts/database#core-schema
 */

export async function up(db: Kysely<never>): Promise<void> {
  await sql`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" text NOT NULL PRIMARY KEY,
        "name" text NOT NULL,
        "email" text NOT NULL UNIQUE,
        "emailVerified" boolean NOT NULL,
        "image" text,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
  `.execute(db);

  await sql`
      CREATE TABLE IF NOT EXISTS "session" (
        "id" text NOT NULL PRIMARY KEY,
        "expiresAt" timestamptz NOT NULL,
        "token" text NOT NULL UNIQUE,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamptz NOT NULL,
        "ipAddress" text,
        "userAgent" text,
        "userId" text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
      );
  `.execute(db);

  await sql`
      CREATE TABLE IF NOT EXISTS "account" (
        "id" text NOT NULL PRIMARY KEY,
        "accountId" text NOT NULL,
        "providerId" text NOT NULL,
        "userId" text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
        "accessToken" text,
        "refreshToken" text,
        "idToken" text,
        "accessTokenExpiresAt" timestamptz,
        "refreshTokenExpiresAt" timestamptz,
        "scope" text,
        "password" text,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamptz NOT NULL
      );
  `.execute(db);

  await sql`
      CREATE TABLE IF NOT EXISTS "verification" (
        "id" text NOT NULL PRIMARY KEY,
        "identifier" text NOT NULL,
        "value" text NOT NULL,
        "expiresAt" timestamptz NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
       "updatedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
  `.execute(db);

  await sql`CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session" ("userId");`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account" ("userId");`.execute(db);
  await sql`CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification" ("identifier");`.execute(
    db,
  );
}
