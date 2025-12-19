import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils/cn";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    // Handle form submission here
    console.log("Form submitted successfully");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link to="." className="flex flex-col items-center gap-2 font-medium">
              <span className="sr-only">GithubPM</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to GithubPM</h1>
            <FieldDescription>
              Already have an account? <Link to="/auth/login">Sign in</Link>
            </FieldDescription>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </Field>

          {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

          <Field>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
      </FieldDescription>
    </div>
  );
}
