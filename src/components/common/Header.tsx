import { Link, useNavigate } from "@tanstack/react-router";
import { HardHat, Search, ShoppingCart, Bell, MessageSquare, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate({ to: "/search", search: { q: q || "cement" } });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="mx-auto grid h-16 max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 md:gap-4 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HardHat className="h-5 w-5" />
            </span>
            <span className="truncate font-display text-lg font-bold tracking-tight text-ink sm:text-xl">
              JengaHub
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-6 text-sm font-medium lg:flex">
            <Link to="/category/$slug" params={{ slug: "cement" }} className="hover:text-primary">
              Materials
            </Link>
            <Link to="/equipment" className="hover:text-primary">
              Equipment
            </Link>
            <Link to="/professionals" className="hover:text-primary">
              Professionals
            </Link>
          </nav>
        </div>

        <form className="relative hidden min-w-0 md:block" onSubmit={submit}>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search materials, equipment..."
            className="h-10 w-full rounded-lg bg-muted pl-10 pr-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
          />
        </form>
        <div className="md:hidden" />

        <div className="flex shrink-0 items-center gap-1">
          <button className="hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted lg:flex">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="relative hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted lg:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/login"
            className="flex h-9 items-center gap-2 rounded-md px-2 text-sm font-medium hover:text-primary sm:ml-2 sm:border-l sm:border-border sm:pl-3"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
          <form className="relative" onSubmit={submit}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search materials, equipment..."
              className="h-11 w-full rounded-lg bg-muted pl-10 pr-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
            />
          </form>
          <nav className="mt-3 flex flex-col text-sm font-medium">
            <Link
              to="/category/$slug"
              params={{ slug: "cement" }}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-3 hover:bg-muted"
            >
              Materials
            </Link>
            <Link to="/equipment" onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-3 hover:bg-muted">
              Equipment
            </Link>
            <Link
              to="/professionals"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-3 hover:bg-muted"
            >
              Professionals
            </Link>
            <Link
              to="/sell/onboarding"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-3 hover:bg-muted"
            >
              Sell on JengaHub
            </Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-md px-2 py-3 hover:bg-muted">
              Seller dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
