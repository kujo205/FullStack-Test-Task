import { Link } from "@tanstack/react-router";
import { FolderKanban, LogIn, Plus } from "lucide-react";
import { useDialog } from "@/shared/custom-ui/dialog-window";
import { Button } from "@/shared/ui/button";
import { CreateProjectDialog } from "./create-project-dialog";

export function Header() {
  const { open } = useDialog();

  const userLoggedIn = false; // Replace with actual authentication logic

  const openCreateProject = () => {
    open({
      title: "Create project",
      description: "Paste a GitHub repository URL to get started",
      size: "sm",
      content: <CreateProjectDialog />,
    });
  };

  const handleLogin = () => {
    // TODO: Add your login logic or redirect here
    console.log("Login clicked");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FolderKanban className="h-5 w-5" />
          </div>
          {/* @ts-ignore-next-line */}
          <Link to="/">
            <span className="text-lg font-semibold tracking-tight">
              Github<span className="text-primary">PM</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {userLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="." className="cursor-pointer">
                  All Projects
                </Link>
              </Button>

              <Button onClick={openCreateProject}>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </>
          ) : (
            <Link to="/auth/login" className="cursor-pointer">
              <Button asChild onClick={handleLogin}>
                <span>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
