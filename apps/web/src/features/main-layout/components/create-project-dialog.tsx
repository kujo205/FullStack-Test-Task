import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Github } from "lucide-react";
import { useState } from "react";
import { rpc } from "@/lib/api-client";
import { useDialog } from "@/shared/custom-ui/dialog-window";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function CreateProjectDialog() {
  const { close } = useDialog();
  const [repoUrl, setRepoUrl] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      console.log("Creating new repo");

      return rpc.repos.$post({
        json: {
          repository: repoUrl,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["repos"],
      });
    },
  });

  const isValidRepo = /^[^/\s]+\/[^/\s]+$/.test(repoUrl);

  const handleCreate = () => {
    if (!isValidRepo) return;

    mutate();

    close();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="repo">GitHub repo name</Label>
        <div className="relative">
          <Github className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="repo"
            placeholder="user/repo"
            className="pl-9"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={close}>
          Cancel
        </Button>
        <Button disabled={!isValidRepo} onClick={handleCreate}>
          Create
        </Button>
      </div>
    </div>
  );
}
