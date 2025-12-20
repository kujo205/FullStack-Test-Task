import { type Selectable } from "kysely";
import { type DB } from "@/infra/db/types.js";

export type Verification = Selectable<DB["verification"]>;
