import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { findOrder, orderTotal, BUYER_ORDERS } from "@/lib/orders";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/orders/$id")({
  head: () => ({
    meta: [
      { title: "Order details — JengaHub" },
      {
        name: "description",
        content: "Order summary, delivery tracking and escrow status for your JengaHub purchase.",
      },
      { property: "og:title", content: "Order details — JengaHub" },
      { property: "og:description", content: "Delivery tracking and escrow status." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderDetailPage,
});

const STEPS = ["Order placed", "Payment in escrow", "In transit", "Delivered"];

function OrderDetailPage() {
  const { id } = Route.useParams();
  const order = findOrder(id) ?? BUYER_ORDERS[0]!;
  const stepIndex = order.status === "Delivered" ? 3 : order.status === "In transit" ? 2 : 1;
  const subtotal = order.items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <MainLayout>
      <Container className="py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl">Order {order.id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Placed {order.date} · {order.payment}
            </p>
          </div>
          <StatusPill tone={toneForStatus(order.status)}>{order.status}</StatusPill>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="panel p-6">
              <h2 className="text-lg">Delivery progress</h2>
              <ol className="mt-4 space-y-3">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 text-sm">
                    <CheckCircle2
                      className={`h-5 w-5 ${i <= stepIndex ? "text-primary" : "text-muted-foreground/40"}`}
                    />
                    <span className={i <= stepIndex ? "font-medium" : "text-muted-foreground"}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" /> Delivering to {order.address},{" "}
                {order.region}
              </p>
            </section>

            <section className="panel p-6">
              <h2 className="text-lg">Items</h2>
              <ul className="mt-4 divide-y divide-border text-sm">
                {order.items.map((item) => (
                  <li key={item.name} className="flex flex-wrap justify-between gap-2 py-3">
                    <span>
                      {item.name}
                      <span className="text-muted-foreground">
                        {" "}
                        × {item.qty} {item.unit}
                      </span>
                    </span>
                    <span className="font-semibold">{formatTZS(item.qty * item.price)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="panel p-6 text-sm">
              <h2 className="text-lg">Payment summary</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatTZS(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{formatTZS(order.delivery)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span>{formatTZS(orderTotal(order))}</span>
                </div>
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-md bg-muted p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {order.escrow}. Funds reach the supplier only after you confirm delivery.
              </p>
            </div>

            <div className="panel space-y-3 p-6 text-sm">
              <Link
                to="/supplier/$id"
                params={{ id: order.sellerId }}
                className="block rounded-md bg-primary px-4 py-2 text-center font-semibold text-primary-foreground"
              >
                Contact supplier
              </Link>
              <Link
                to="/orders"
                className="block rounded-md border border-border px-4 py-2 text-center font-semibold"
              >
                Back to my orders
              </Link>
              <Link
                to="/help"
                className="block rounded-md border border-border px-4 py-2 text-center font-semibold"
              >
                Report a problem
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </MainLayout>
  );
}
