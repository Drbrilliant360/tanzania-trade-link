import { Link, useNavigate } from "@tanstack/react-router";
import { HardHat, Search, ShoppingCart, Bell, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <HardHat className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">JengaHub</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
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

        <form
          className="relative hidden flex-1 md:block"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: q || "cement" } });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search materials, equipment..."
            className="h-10 w-full rounded-lg bg-muted pl-10 pr-4 text-sm outline-none ring-ring/40 placeholder:text-muted-foreground focus:ring-2"
          />
        </form>

        <div className="ml-auto flex items-center gap-1">
          <button className="hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted sm:flex">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="relative hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted sm:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <Link
            to="/cart"
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
            className="ml-2 flex items-center gap-2 border-l border-border pl-3 text-sm font-medium hover:text-primary"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
