import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { useCart } from "@/context/CartContext";
import { formatTZS } from "@/lib/format";
import { DELIVERY_TYPES, PAYMENT_METHODS, REGIONS } from "@/lib/constants";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure checkout — JengaHub" },
      {
        name: "description",
        content:
          "Pay with M-Pesa, Mixx by Yas, Airtel Money, HaloPesa or bank transfer. Funds held in escrow until delivery.",
      },
      { property: "og:title", content: "Secure checkout — JengaHub" },
      {
        property: "og:description",
        content: "Mobile money and bank payments protected by JengaHub escrow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState(PAYMENT_METHODS[0]?.id ?? "mpesa");
  const delivery = items.length ? 120000 : 0;

  return (
    <MainLayout>
      <Container className="py-8">
        <h1 className="text-3xl">Secure checkout</h1>

        <form
          className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]"
          onSubmit={(e) => {
            e.preventDefault();
            clear();
            toast.success("Order placed. Payment held in escrow until delivery.");
            navigate({ to: "/" });
          }}
        >
          <div className="space-y-8">
            <section className="panel p-6">
              <h2 className="text-lg">Delivery details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  Full name
                  <input
                    required
                    className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
                  />
                </label>
                <label className="text-sm">
                  Phone number
                  <input
                    required
                    placeholder="+255 7xx xxx xxx"
                    className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
                  />
                </label>
                <label className="text-sm">
                  Region
                  <select className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm">
                    {REGIONS.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm">
                  Delivery type
                  <select className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm">
                    {DELIVERY_TYPES.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm sm:col-span-2">
                  Site address
                  <input
                    required
                    className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
                  />
                </label>
              </div>
            </section>

            <section className="panel p-6">
              <h2 className="text-lg">Payment method</h2>
              <div className="mt-4 space-y-3">
                {PAYMENT_METHODS.map((p) => (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm ${
                      method === p.id ? "border-primary bg-accent" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={p.id}
                      checked={method === p.id}
                      onChange={() => setMethod(p.id)}
                    />
                    <span>
                      <span className="font-semibold">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{p.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <div className="flex items-start gap-3 rounded-xl border border-primary/30 bg-accent p-5 text-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p>
                Escrow protection: JengaHub holds your payment and releases it to the supplier only
                after you confirm delivery on site.
              </p>
            </div>
          </div>

          <aside className="panel h-fit p-6">
            <h2 className="text-lg">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {i.name} × {i.qty}
                  </span>
                  <span className="price shrink-0">{formatTZS(i.price * i.qty)}</span>
                </li>
              ))}
              {items.length === 0 && <li className="text-muted-foreground">No items yet.</li>}
            </ul>

            <label className="mt-5 block text-sm">
              Voucher code
              <input
                placeholder="JENGA10"
                className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
              />
            </label>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="price">{formatTZS(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="price">{formatTZS(delivery)}</dd>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <dt>Total</dt>
                <dd className="price">{formatTZS(subtotal + delivery)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-5 h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Pay securely
            </button>
          </aside>
        </form>
      </Container>
    </MainLayout>
  );
}
