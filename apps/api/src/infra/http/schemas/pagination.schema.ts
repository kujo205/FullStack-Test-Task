import { z } from "zod";

const ALLOWED_PAGE_SIZES = [10, 20, 50, 100] as const;

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),

  pageSize: z.coerce
    .number()
    .int()
    .refine((v) => ALLOWED_PAGE_SIZES.includes(v as (typeof ALLOWED_PAGE_SIZES)[number]))
    .catch(20),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export type TPagination = {
  page: number;
  pageSize: number;
  limit: number;
  offset: number;
};

export function parsePagination(input: PaginationQuery): TPagination {
  const { page, pageSize } = input;
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  return { page, pageSize, limit, offset };
}
