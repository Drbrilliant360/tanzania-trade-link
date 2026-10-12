import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "buyer" | "seller" | "professional" | "admin";
export type User = { id: string; name: string; email: string; role: Role; roles: Role[] };

type AuthValue = {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  /** Returns true when the user is signed in immediately, false when email confirmation is needed. */
  register: (name: string, email: string, password: string, role?: Role) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);
const ROLE_PRIORITY: Role[] = ["admin", "seller", "professional", "buyer"];

async function loadUser(session: Session | null): Promise<User | null> {
  if (!session) return null;
  const u = session.user;
  const [{ data: profile }, { data: roleRows }] = await Promise.all([
    supabase.from("profiles").select("full_name, email").eq("id", u.id).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", u.id),
  ]);
  const roles = (roleRows ?? []).map((r) => r.role as Role);
  const role = ROLE_PRIORITY.find((r) => roles.includes(r)) ?? "buyer";
  return {
    id: u.id,
    name: profile?.full_name || (u.email ?? "Member").split("@")[0] || "Member",
    email: profile?.email || u.email || "",
    role,
    roles,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") return;
      // defer DB calls out of the auth callback
      setTimeout(() => {
        void loadUser(session).then((next) => {
          if (!active) return;
          setUser(next);
          setReady(true);
          if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
            if (event === "SIGNED_OUT") queryClient.clear();
            else void queryClient.invalidateQueries();
          }
        });
      }, 0);
    });
    void supabase.auth.getSession().then(({ data }) =>
      loadUser(data.session).then((next) => {
        if (!active) return;
        setUser(next);
        setReady(true);
      }),
    );
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [queryClient]);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, role: Role = "buyer") => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: name, role },
        },
      });
      if (error) throw new Error(error.message);
      return Boolean(data.session);
    },
    [],
  );

  const logout = useCallback(async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }, [queryClient]);

  const value = useMemo<AuthValue>(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
