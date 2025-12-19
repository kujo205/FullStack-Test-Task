import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div>
      hello this is me
      <Outlet />
    </div>
  );
}
