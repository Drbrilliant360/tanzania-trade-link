import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Receipt, Truck, Wallet } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { SALES_TREND, SELLER_ORDERS } from "@/lib/data";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Seller dashboard — JengaHub" },
      {
        name: "description",
        content: "Track sales, orders, rentals and payouts for your JengaHub storefront.",
      },
      { property: "og:title", content: "Seller dashboard — JengaHub" },
      { property: "og:description", content: "Your JengaHub sales and order overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SellerDashboardPage,
});

function SellerDashboardPage() {
  const max = Math.max(...SALES_TREND.map((d) => d.value ?? 0), 1);

  return (
    <DashboardLayout
      title="Overview"
      subtitle="Your storefront performance this week"
      actions={
        <Link
          to="/dashboard/products/new"
          className="flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Add product
        </Link>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (7 days)" value="TZS 12.3M" delta="+18%" icon={Wallet} />
        <StatCard label="Orders" value="42" delta="+6" icon={Receipt} />
        <StatCard label="Active listings" value="18" icon={Package} />
        <StatCard label="Rentals out" value="2" icon={Truck} />
      </div>

      <section className="mt-8 panel p-6">
        <h2 className="text-lg">Sales trend (TZS millions)</h2>
        <div className="mt-6 flex h-48 items-end gap-4">
          {SALES_TREND.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-primary/80"
                style={{ height: `${((d.value ?? 0) / max) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 panel overflow-x-auto">
        <h2 className="p-6 pb-0 text-lg">Recent orders</h2>
        <table className="mt-4 w-full min-w-[640px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {SELLER_ORDERS.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-6 py-3 font-mono text-xs">{o.id}</td>
                <td className="px-6 py-3">{o.buyer}</td>
                <td className="px-6 py-3 text-muted-foreground">{o.item}</td>
                <td className="px-6 py-3 price">{formatTZS(o.total)}</td>
                <td className="px-6 py-3">
                  <StatusPill tone={toneForStatus(o.status)}>{o.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardLayout>
  );
}
