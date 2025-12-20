import { type Selectable } from "kysely";
import { type DB } from "@/infra/db/types.js";

export type Repo = Selectable<DB["repo"]>;
