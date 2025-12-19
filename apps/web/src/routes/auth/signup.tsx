import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/features/auth/components/signup-form.tsx";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignupForm />;
}
