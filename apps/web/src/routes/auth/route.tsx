import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <main className="h-[calc(100vh-4rem)] max-md:px-8 flex items-center justify-center ">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </main>
  );
}
