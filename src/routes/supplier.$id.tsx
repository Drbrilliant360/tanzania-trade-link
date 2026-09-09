import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { RatingStars, StatusPill } from "@/components/common/Badges";
import { ProductCard } from "@/components/product/ProductCard";
import { getSupplier, PRODUCTS } from "@/lib/data";
import banner from "@/assets/supplier-banner.jpg";

export const Route = createFileRoute("/supplier/$id")({
  loader: ({ params }) => {
    const supplier = getSupplier(params.id);
    if (!supplier) throw notFound();
    return { supplier };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Supplier unavailable — JengaHub" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { supplier } = loaderData;
    const description = `${supplier.name} — ${supplier.tagline} in ${supplier.location}. ${supplier.about}`.slice(
      0,
      155,
    );
    return {
      meta: [
        { title: `${supplier.name} — verified supplier on JengaHub` },
        { name: "description", content: description },
        { property: "og:title", content: `${supplier.name} — verified supplier on JengaHub` },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SupplierProfilePage,
});

const TABS = ["Overview", "Products", "Licences", "Activity"] as const;

function SupplierProfilePage() {
  const { supplier } = Route.useLoaderData();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const products = PRODUCTS.filter((p) => p.sellerId === supplier.id);

  return (
    <MainLayout>
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={banner}
          alt={`${supplier.name} construction project site`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      <Container className="pb-14">
        <div className="panel -mt-16 relative p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="eyebrow">{supplier.tagline}</span>
              <h1 className="mt-1 text-3xl">{supplier.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {supplier.location}
              </p>
              {supplier.verified && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  <ShieldCheck className="h-4 w-4" /> Verified supplier
                </p>
              )}
            </div>
            <RatingStars value={supplier.rating} reviews={supplier.reviews} />
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-4">
            {supplier.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface p-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex flex-wrap gap-2 border-b border-border">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${
                    tab === t
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === "Overview" && (
                <p className="text-sm leading-relaxed text-muted-foreground">{supplier.about}</p>
              )}

              {tab === "Products" && (
                <div className="grid gap-5 sm:grid-cols-2">
                  {products.length ? (
                    products.map((p) => <ProductCard key={p.id} product={p} />)
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      This supplier has no live listings right now.
                    </p>
                  )}
                </div>
              )}

              {tab === "Licences" && (
                <ul className="space-y-3">
                  {supplier.licenses.map((l) => (
                    <li
                      key={l.name}
                      className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 text-sm"
                    >
                      <span className="font-semibold">{l.name}</span>
                      <StatusPill tone="success">{l.status}</StatusPill>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "Activity" && (
                <ul className="space-y-3">
                  {supplier.activity.map((a) => (
                    <li
                      key={a.name}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface p-4 text-sm"
                    >
                      <span>
                        <span className="font-semibold">{a.name}</span>
                        <span className="ml-2 text-xs text-muted-foreground">{a.date}</span>
                      </span>
                      <StatusPill tone={a.status === "Completed" ? "success" : "warn"}>
                        {a.status}
                      </StatusPill>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <aside className="panel h-fit p-6">
            <h2 className="text-lg">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {supplier.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> {supplier.email}
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" /> {supplier.website}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {supplier.address}
              </li>
            </ul>
            <Link
              to="/search"
              search={{ q: supplier.name }}
              className="mt-5 flex h-11 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Browse their materials
            </Link>
          </aside>
        </div>
      </Container>
    </MainLayout>
  );
}
