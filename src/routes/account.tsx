import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Package, Store, ShieldCheck, User as UserIcon } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My account — JengaHub" },
      {
        name: "description",
        content: "Manage your JengaHub profile, delivery details, orders and seller tools.",
      },
      { property: "og:title", content: "My account — JengaHub" },
      { property: "og:description", content: "Profile, orders and seller tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();

  if (ready && !user) {
    return (
      <MainLayout>
        <Container className="py-16 text-center">
          <h1 className="text-2xl sm:text-3xl">You are signed out</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to view your orders, saved suppliers and seller tools.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Sign in
            </Link>
            <Link to="/signup" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold">
              Create account
            </Link>
          </div>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container className="py-8">
        <div className="panel flex flex-wrap items-center gap-4 p-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UserIcon className="h-6 w-6" />
          </span>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl">{user?.name ?? "Member"}</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email} · {user?.role} account
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/orders" className="panel p-6 hover:border-primary">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-base">My orders</h2>
            <p className="mt-1 text-sm text-muted-foreground">Track deliveries and escrow status.</p>
          </Link>
          <Link to="/dashboard" className="panel p-6 hover:border-primary">
            <Store className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-base">Seller dashboard</h2>
            <p className="mt-1 text-sm text-muted-foreground">Products, orders, rentals and wallet.</p>
          </Link>
          <Link to="/sell/onboarding" className="panel p-6 hover:border-primary">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-base">Get verified</h2>
            <p className="mt-1 text-sm text-muted-foreground">Submit TBS, CRB and TIN documents.</p>
          </Link>
        </div>

        <section className="panel mt-6 p-6">
          <h2 className="text-lg">Delivery details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              Full name
              <input
                defaultValue={user?.name ?? ""}
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
              />
            </label>
            <label className="text-sm">
              Phone number
              <input
                placeholder="+255 7xx xxx xxx"
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              Default delivery address
              <input
                placeholder="Street, ward, city"
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
              />
            </label>
          </div>
        </section>
      </Container>
    </MainLayout>
  );
}
