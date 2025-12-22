import { Repo } from "@api/core/entities/Repo";
import { AlertCircle, ArrowUpIcon, GitFork, MoreVertical, Star, Trash2 } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";

interface RepoCardProps {
  repo: Repo;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function RepoCard({ repo, onUpdate, onDelete }: RepoCardProps) {
  const formatDate = (time: number) => {
    const date = new Date(time);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status.toLowerCase()) {
      case "ready":
        return "default";
      case "pending":
        return "secondary";
      case "error":
        return "destructive";
      default:
    }
  };

  const repoProperties = [
    {
      count: repo.stars,
      icon: Star,
      text: "stars",
    },
    {
      count: repo.issues,
      icon: AlertCircle,
      text: "issues",
    },
    {
      count: repo.forks,
      icon: GitFork,
      text: "forks",
    },
  ];

  return (
    <Card className="group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <a target="_blank" href={`https://github.com/${repo.owner}/${repo.name}`}>
            <div className="group flex-1 min-w-0 space-y-1">
              <CardTitle className="text-xl group-hover:underline underline-offset-3 truncate">
                {repo.name}
              </CardTitle>
              <CardDescription>{repo.owner}</CardDescription>
            </div>
          </a>
          <div className="flex items-center gap-2 ml-4">
            <Badge variant={getStatusVariant(repo.status)}>{repo.status}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onUpdate?.(repo.id)}>
                  <ArrowUpIcon className="mr-2 h-4 w-4" />
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete?.(repo.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between gap-4">
          {repoProperties.map((prop, key) => (
            <div key={key} className="flex items-center gap-2">
              <prop.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{prop.count}</span>
              <span className="text-sm text-muted-foreground">{prop.text}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex items-center justify-end text-sm">
          {repo.createdAtUtc && (
            <span className="text-muted-foreground">
              created {formatDate(Number(repo.createdAtUtc))}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function RepoCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
