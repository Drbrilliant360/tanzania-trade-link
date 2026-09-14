import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ActionButton } from "@/components/common/ActionButton";
import { wait } from "@/hooks/useTaskRunner";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/context/AuthContext";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — JengaHub" },
      {
        name: "description",
        content:
          "Join JengaHub as a buyer, supplier or construction professional and trade with verified partners.",
      },
      { property: "og:title", content: "Create your account — JengaHub" },
      { property: "og:description", content: "Join Tanzania's construction marketplace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignupPage,
});

const ROLES: Role[] = ["buyer", "seller", "professional"];

function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("buyer");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthLayout title="Create your account" subtitle="Buy, sell or offer services on JengaHub">
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setError(null);
          try {
            await wait(800);
            register(name, email, role);
            toast.success("Account created. Welcome to JengaHub!");
            await navigate({ to: "/" });
          } catch {
            setError("We couldn't create your account. Please try again.");
            toast.error("Sign up failed", { description: "No account was created." });
          } finally {
            setBusy(false);
          }
        }}
      >
        <label className="block text-sm">
          Full name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          I am a
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm capitalize"
          >
            {ROLES.map((r) => (
              <option key={r} value={r} className="capitalize">
                {r}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Password
          <input
            required
            type="password"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        {error && (
          <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <ActionButton
          type="submit"
          loading={busy}
          loadingText="Creating your account…"
          className="w-full"
        >
          Create account
        </ActionButton>
      </form>

      <p className="mt-5 text-sm text-muted-foreground">
        Selling in bulk?{" "}
        <Link to="/sell/onboarding" className="font-semibold text-primary">
          Register as a supplier
        </Link>
      </p>
    </AuthLayout>
  );
}
