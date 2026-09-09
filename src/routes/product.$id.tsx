import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ShieldCheck, Truck } from "lucide-react";
import { toast } from "sonner";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { RatingStars, StatusPill, VerifiedBadge, toneForStatus } from "@/components/common/Badges";
import { PRODUCTS, getProduct } from "@/lib/data";
import { formatTZS } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — JengaHub" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const description = `${product.name} from ${product.seller}, ${product.location}. ${formatTZS(product.price)} per ${product.unit}.`;
    return {
      meta: [
        { title: `${product.name} — JengaHub` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — JengaHub` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(product.minOrder);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <MainLayout>
      <Container className="py-8">
        <nav className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link
            to="/category/$slug"
            params={{ slug: product.categorySlug }}
            className="hover:text-primary"
          >
            {product.category}
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <img
              src={product.image}
              alt={product.name}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-lg border border-border object-cover"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill tone={toneForStatus(product.stock)}>{product.stock}</StatusPill>
              {product.verified && <VerifiedBadge label="Verified Supplier" />}
            </div>
            <h1 className="mt-3 text-3xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <RatingStars value={product.rating} reviews={product.reviews} />
              <span className="text-xs text-muted-foreground">SKU {product.sku}</span>
            </div>

            <p className="mt-4 price text-3xl">
              {formatTZS(product.price)}
              <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">
                / {product.unit}
              </span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <label className="text-sm font-semibold" htmlFor="qty">
                Quantity
              </label>
              <input
                id="qty"
                type="number"
                min={product.minOrder}
                value={qty}
                onChange={(e) => setQty(Math.max(product.minOrder, Number(e.target.value) || 0))}
                className="h-10 w-28 rounded-md border border-border bg-surface px-3 text-sm"
              />
              <span className="text-xs text-muted-foreground">
                Min order {product.minOrder} {product.unit}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  add(
                    {
                      id: product.id,
                      name: product.name,
                      seller: product.seller,
                      unit: product.unit,
                      price: product.price,
                      image: product.image,
                      kind: "material",
                    },
                    qty,
                  );
                  toast.success("Added to your procurement list");
                }}
                className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Add to procurement list
              </button>
              <Link
                to="/cart"
                className="flex h-11 items-center rounded-md border border-border px-6 text-sm font-semibold"
              >
                Request a quote
              </Link>
            </div>

            <div className="mt-6 grid gap-3 rounded-xl border border-border bg-surface p-5 text-sm">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Payment held in escrow until
                delivery is confirmed
              </p>
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Delivery in 24 - 48 hours within{" "}
                {product.location}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Sold by{" "}
                <Link
                  to="/supplier/$id"
                  params={{ id: product.sellerId }}
                  className="font-semibold text-primary hover:underline"
                >
                  {product.seller}
                </Link>
              </p>
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl">Specifications</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((s, i) => (
                  <tr key={s.label} className={i % 2 ? "bg-surface" : "bg-muted/40"}>
                    <th className="w-1/3 px-4 py-3 text-left font-semibold">{s.label}</th>
                    <td className="px-4 py-3 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl">Related materials</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </Container>
    </MainLayout>
  );
}
