import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — JengaHub" },
      {
        name: "description",
        content: "Sign in to manage your JengaHub orders, listings, rentals and wallet.",
      },
      { property: "og:title", content: "Sign in — JengaHub" },
      { property: "og:description", content: "Access your JengaHub marketplace account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your JengaHub account">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          login(email);
          toast.success("Signed in");
          navigate({ to: "/dashboard" });
        }}
      >
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
          Password
          <input
            required
            type="password"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        <button className="h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110">
          Sign in
        </button>
      </form>

      <p className="mt-5 text-sm text-muted-foreground">
        New to JengaHub?{" "}
        <Link to="/signup" className="font-semibold text-primary">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
