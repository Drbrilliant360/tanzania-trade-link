import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { BUYER_ORDERS, orderTotal } from "@/lib/orders";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "My orders — JengaHub" },
      {
        name: "description",
        content:
          "Track your JengaHub material and equipment orders, delivery status and escrow payments.",
      },
      { property: "og:title", content: "My orders — JengaHub" },
      { property: "og:description", content: "Track deliveries and escrow payments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <MainLayout>
      <Container className="py-8">
        <h1 className="text-2xl sm:text-3xl">My orders</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {BUYER_ORDERS.length} orders placed with verified JengaHub suppliers.
        </p>

        <div className="mt-6 space-y-4">
          {BUYER_ORDERS.map((order) => (
            <div key={order.id} className="panel flex flex-wrap items-center gap-4 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-muted text-primary">
                <Package className="h-5 w-5" />
              </span>
              <div className="min-w-[180px] flex-1">
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date} · {order.seller}
                </p>
              </div>
              <div className="text-sm">
                <p className="font-semibold">{formatTZS(orderTotal(order))}</p>
                <p className="text-muted-foreground">{order.escrow}</p>
              </div>
              <StatusPill tone={toneForStatus(order.status)}>{order.status}</StatusPill>
              <Link
                to="/orders/$id"
                params={{ id: order.id }}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                View order
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/category/$slug"
            params={{ slug: "cement" }}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            Continue shopping
          </Link>
          <Link to="/help" className="rounded-md border border-border px-4 py-2 text-sm font-semibold">
            Order help
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
}
