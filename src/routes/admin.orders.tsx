import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { SELLER_ORDERS } from "@/lib/data";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "All marketplace orders — JengaHub admin" },
      {
        name: "description",
        content: "Monitor every order placed on JengaHub, its escrow status and delivery progress.",
      },
      { property: "og:title", content: "All marketplace orders — JengaHub admin" },
      { property: "og:description", content: "Monitor orders and escrow status platform-wide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminOrdersPage,
});

function AdminOrdersPage() {
  return (
    <DashboardLayout title="All orders" subtitle="Every transaction across the marketplace">
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Date</th>
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
                <td className="px-6 py-3 text-muted-foreground">{o.date}</td>
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
      </div>
    </DashboardLayout>
  );
}
