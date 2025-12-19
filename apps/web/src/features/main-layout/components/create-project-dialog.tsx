import { Github } from "lucide-react";
import { useState } from "react";
import { useDialog } from "@/shared/custom-ui/dialog-window";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export function CreateProjectDialog() {
  const { close } = useDialog();
  const [repoUrl, setRepoUrl] = useState("");

  const isValidRepo = /^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(repoUrl);

  const handleCreate = () => {
    if (!isValidRepo) return;

    // TODO: call API / mutation
    console.log("Create project from:", repoUrl);

    close();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="repo">GitHub Repository URL</Label>
        <div className="relative">
          <Github className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="repo"
            placeholder="https://github.com/user/repo"
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
