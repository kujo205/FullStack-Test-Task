import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils/cn.ts";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <span className="sr-only">GithubPM.</span>
        </a>
        <h1 className="text-xl font-bold">Welcome to GithubPM</h1>

        <FieldDescription>
          Don't have an account?{" "}
          <Link to="/auth/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </FieldDescription>
      </div>
      <form className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input id="password" type="password" required />
          </Field>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
      </FieldDescription>
    </div>
  );
}
