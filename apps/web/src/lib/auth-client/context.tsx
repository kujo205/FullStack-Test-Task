import { useRouter } from "@tanstack/react-router";
import { createAuthClient } from "better-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
});

interface Session {
  user?: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  session: Session | null;
  signInEmail: typeof authClient.signIn.email;
  signUpEmail: typeof authClient.signUp.email;
  signOut: typeof authClient.signOut;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, isPending } = authClient.useSession();

  const isLoggedIn = !!session;

  const router = useRouter();

  const signInEmail: typeof authClient.signIn.email = async (data, options) => {
    const result = await authClient.signIn.email(data, options);

    // Manual navigation if needed, though session state will update automatically
    if (!result?.error) {
      // @ts-ignore-next-line
      router.navigate({ to: "/" });
    }
    return result;
  };

  const signUpEmail: typeof authClient.signUp.email = async (data, options) => {
    const result = await authClient.signUp.email(data, options);
    if (!result?.error) {
      // @ts-ignore-next-line
      router.navigate({ to: "/" });
    }
    return result;
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    // No need to manually set isLoggedIn(false),
    // authClient.useSession() will update on the next tick.
    router.navigate({ to: "/login" });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        session: session || null,
        signInEmail,
        signUpEmail,
        signOut: handleSignOut,
        isLoading: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
