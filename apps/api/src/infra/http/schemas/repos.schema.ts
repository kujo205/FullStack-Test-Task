import { z } from "zod";

export type TRepo = { owner: string; name: string };

export const CreateRepoBodySchema = z.object({
  repository: z
    .string()
    .trim()
    .min(1)
    .regex(/^[^/\s]+\/[^/\s]+$/, {
      message: "Repository path must be in the format 'owner/name'",
    }),
});

export const RepoPathSchema = CreateRepoBodySchema.transform((path) => {
  const [owner, name] = path.repository.split("/");
  return { owner, name } as TRepo;
});

export type RepoPath = z.infer<typeof RepoPathSchema>;
