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
  // TODO: fix incorrect login state detection when page reloads
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const signInEmail: typeof authClient.signIn.email = async (data, options) => {
    const result = await authClient.signIn.email(data, options);

    setIsLoggedIn(!!result.data);

    if (!result?.error) {
      router.navigate({
        to: "/",
      });
    }

    return result;
  };

  const signUpEmail: typeof authClient.signUp.email = async (data, options) => {
    const result = await authClient.signUp.email(data, options);

    setIsLoggedIn(!!result.data);

    if (!result?.error) {
      router.navigate({
        to: "/",
      });
    }

    return result;
  };

  const handleSignOut = async () => {
    const result = await authClient.signOut();
    setIsLoggedIn(false);
    return result;
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
