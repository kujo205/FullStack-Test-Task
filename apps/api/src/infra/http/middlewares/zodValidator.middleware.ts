import { zValidator } from "@hono/zod-validator";
import type { ZodSchema } from "zod";

function prettyValidator<T extends ZodSchema>(target: "json" | "query" | "param", schema: T) {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join(".") || target,
            message: issue.message,
          })),
        },
        400,
      );
    }
  });
}

export default prettyValidator;
