import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, Package, Wallet, Clock } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar, EMPTY_FILTERS, applyFilters, type Filters } from "@/components/filters/FilterSidebar";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : "",
  }),

  head: () => ({
    meta: [
      { title: "Search building materials — JengaHub" },
      {
        name: "description",
        content:
          "Search cement, steel, aggregates and finishes from verified suppliers across Tanzania, with AI project estimates.",
      },
      { property: "og:title", content: "Search building materials — JengaHub" },
      {
        property: "og:description",
        content: "Find materials from verified Tanzanian suppliers with instant project estimates.",
      },
    ],
  }),
  component: SearchResultsPage,
});

function SearchResultsPage() {
  const { q } = Route.useSearch();
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const { add } = useCart();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const base = term
      ? PRODUCTS.filter((p) =>
          `${p.name} ${p.category} ${p.brand} ${p.seller}`.toLowerCase().includes(term),
        )
      : PRODUCTS;
    return applyFilters(base.length ? base : PRODUCTS, filters);
  }, [q, filters]);

  return (
    <MainLayout>
      <Container className="py-8">
        <nav className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">Search results</span>
        </nav>

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <FilterSidebar filters={filters} onChange={setFilters} />

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl">Results for “{q || "all materials"}”</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Found {results.length} items from verified suppliers
            </p>

            <div className="mt-6 rounded-xl border border-primary/30 bg-accent p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg">AI project estimation: 3-bedroom house</h2>
                  <p className="text-xs text-muted-foreground">
                    Based on typical Dar es Salaam builds
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Package, label: "Cement estimate", value: "80 - 100 bags" },
                  { icon: Wallet, label: "Total est. cost", value: "TZS 1.6M - 2.0M" },
                  { icon: Clock, label: "Delivery time", value: "24 - 48 hours" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border bg-surface p-4">
                    <p className="eyebrow flex items-center gap-2">
                      <stat.icon className="h-3.5 w-3.5 text-primary" /> {stat.label}
                    </p>
                    <p className="mt-2 font-mono text-lg font-bold text-ink">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const cement = PRODUCTS[0];
                    if (!cement) return;
                    add(
                      {
                        id: cement.id,
                        name: cement.name,
                        seller: cement.seller,
                        unit: cement.unit,
                        price: cement.price,
                        image: cement.image,
                        kind: "material",
                      },
                      90,
                    );
                    toast.success("Estimate added to cart (90 bags of cement)");
                  }}

                  className="h-10 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  Add estimate to cart
                </button>
                <Link
                  to="/category/$slug"
                  params={{ slug: "cement" }}
                  className="flex h-10 items-center rounded-md border border-border bg-surface px-5 text-sm font-semibold"
                >
                  Compare brands
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
