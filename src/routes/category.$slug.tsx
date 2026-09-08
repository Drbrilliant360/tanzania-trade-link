import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar, EMPTY_FILTERS, applyFilters, type Filters } from "@/components/filters/FilterSidebar";
import { PRODUCTS } from "@/lib/data";
import { CATEGORIES } from "@/lib/constants";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.slug === params.slug);
    const extra = PRODUCTS.find((p) => p.categorySlug === params.slug);
    const name = category?.name ?? extra?.category;
    if (!name) throw notFound();
    return { name, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category unavailable — JengaHub" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} suppliers in Tanzania — JengaHub`;
    const description = `Compare ${loaderData.name.toLowerCase()} prices from verified Tanzanian suppliers, with delivery across every region.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryListingPage,
});

function CategoryListingPage() {
  const { name, slug } = Route.useLoaderData();
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState("relevance");

  const results = useMemo(() => {
    const base = PRODUCTS.filter(
      (p) => p.categorySlug === slug || filters.categories.length > 0,
    );
    const list = applyFilters(base.length ? base : PRODUCTS, filters);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [slug, filters, sort]);

  return (
    <MainLayout>
      <Container className="py-8">
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
          <FilterSidebar filters={filters} onChange={setFilters} />

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl">{name}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{results.length}</span>{" "}
                  quality products from verified Tanzanian suppliers
                </p>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 rounded-md border border-border bg-surface px-3 text-sm outline-none focus:border-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[...filters.categories, ...filters.regions, ...filters.sellerTypes].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>

            {results.length === 0 ? (
              <p className="mt-12 text-sm text-muted-foreground">
                No products match these filters yet. Try clearing a filter.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <div className="mt-12 flex items-center justify-center gap-2">
              {["Previous", "1", "2", "3", "…", "12", "Next"].map((page) => (
                <button
                  key={page}
                  className={`h-9 min-w-9 rounded-md border px-3 text-sm font-medium ${
                    page === "1"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-muted-foreground hover:border-primary"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
