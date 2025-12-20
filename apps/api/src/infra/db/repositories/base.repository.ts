import { DB as DBTypes } from "@infra/db";
import { type Kysely } from "kysely";

export type DB = Kysely<DBTypes>;

export class BaseRepository {
  constructor(protected db: DB) {}
}
