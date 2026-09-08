import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  HardHat,
  LayoutDashboard,
  Package,
  Receipt,
  Truck,
  Wallet,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

const SELLER_NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/products", label: "Products", icon: Package },
  { to: "/dashboard/orders", label: "Orders", icon: Receipt },
  { to: "/dashboard/rentals", label: "Rentals", icon: Truck },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
] as const;

const ADMIN_NAV = [
  { to: "/admin", label: "Admin overview", icon: ShieldCheck },
  { to: "/admin/verification", label: "Verification", icon: ClipboardList },
  { to: "/admin/orders", label: "All orders", icon: Receipt },
] as const;

export function DashboardLayout({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <Link to="/" className="flex h-16 items-center gap-2 border-b border-border px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <HardHat className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold text-ink">JengaHub</span>
        </Link>

        <nav className="flex-1 space-y-1 p-4">
          <p className="eyebrow px-3 pb-2">Seller</p>
          {SELLER_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/dashboard" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          <p className="eyebrow px-3 pb-2 pt-5">Admin</p>
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/admin" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-border bg-surface px-4 py-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex gap-3">{actions}</div>}
          </div>
        </div>
        <div className="flex-1 p-4 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
