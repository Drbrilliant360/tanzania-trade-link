import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { useCart } from "@/context/CartContext";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your procurement list — JengaHub" },
      {
        name: "description",
        content:
          "Review the materials and equipment in your JengaHub procurement list before checkout.",
      },
      { property: "og:title", content: "Your procurement list — JengaHub" },
      {
        property: "og:description",
        content: "Review materials and equipment before checkout on JengaHub.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQty, subtotal, clear } = useCart();
  const delivery = items.length ? 120000 : 0;

  return (
    <MainLayout>
      <Container className="py-8">
        <h1 className="text-3xl">Procurement list</h1>

        {items.length === 0 ? (
          <div className="mt-8 panel p-10 text-center">
            <p className="text-muted-foreground">Your list is empty.</p>
            <Link
              to="/category/$slug"
              params={{ slug: "cement" }}
              className="mt-5 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Browse materials
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.id} className="panel flex gap-4 p-4">
                  <img
                    src={i.image}
                    alt={i.name}
                    loading="lazy"
                    className="h-24 w-24 shrink-0 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base leading-snug">{i.name}</h2>
                    <p className="text-xs text-muted-foreground">{i.seller}</p>
                    <p className="mt-2 price text-base">
                      {formatTZS(i.price)}
                      <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
                        / {i.unit}
                      </span>
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={i.qty}
                        onChange={(e) => setQty(i.id, Number(e.target.value) || 1)}
                        aria-label={`Quantity for ${i.name}`}
                        className="h-9 w-24 rounded-md border border-border bg-surface px-3 text-sm"
                      />
                      <button
                        onClick={() => remove(i.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <p className="price shrink-0 text-base">{formatTZS(i.price * i.qty)}</p>
                </div>
              ))}
              <button onClick={clear} className="text-xs font-semibold text-muted-foreground">
                Clear list
              </button>
            </div>

            <aside className="panel h-fit p-6">
              <h2 className="text-lg">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="price">{formatTZS(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Delivery estimate</dt>
                  <dd className="price">{formatTZS(delivery)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="price">{formatTZS(subtotal + delivery)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-5 flex h-11 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </MainLayout>
  );
}
