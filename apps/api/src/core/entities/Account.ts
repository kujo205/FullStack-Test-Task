import { type Selectable } from "kysely";
import { type DB } from "@/infra/db/types.js";

// better auth managed entities, in real app this should be replaced with the actual models
export type Account = Selectable<DB["account"]>;
