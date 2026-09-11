import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Zap,
  Truck,
  ShieldCheck,
  Building2,
  Hammer,
  PaintBucket,
  Plug,
  Droplets,
  Blocks,
  Mountain,
  Layers,
  Grid2x2,
  TreePine,
  Wrench,
} from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS, PROFESSIONALS } from "@/lib/data";
import { CATEGORIES } from "@/lib/constants";
import { RatingStars } from "@/components/common/Badges";
import heroSite from "@/assets/hero-site.jpg";
import supplierBanner from "@/assets/supplier-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JengaHub — Buy Building Materials & Hire Equipment in Tanzania" },
      {
        name: "description",
        content:
          "Compare cement, steel, aggregates and heavy equipment from verified Tanzanian suppliers, and hire licensed construction professionals.",
      },
      { property: "og:title", content: "JengaHub — Tanzania's Construction Marketplace" },
      {
        property: "og:description",
        content:
          "Verified building materials, equipment rentals and licensed professionals across Tanzania.",
      },
    ],
  }),
  component: HomePage,
});

const CATEGORY_ICONS = [
  Building2,
  Wrench,
  Blocks,
  Mountain,
  Layers,
  Hammer,
  PaintBucket,
  Plug,
  Droplets,
  Grid2x2,
  TreePine,
];

function HomePage() {
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroSite}
          alt="Construction site in Dar es Salaam at sunset"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.22_0.032_260/0.72)]" />
        <Container className="relative grid gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              Soko la ujenzi Tanzania
            </span>
            <h1 className="mt-5 max-w-2xl text-4xl leading-[1.05] text-[oklch(0.99_0_0)] sm:text-6xl">
              Build smarter,
              <span className="text-primary"> faster.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-[oklch(0.92_0_0)]">
              Connecting builders with verified suppliers for high-quality materials and equipment
              across East Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/category/$slug"
                params={{ slug: "cement" }}
                className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Start procurement <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/equipment"
                className="inline-flex h-12 items-center rounded-md border border-[oklch(1_0_0/0.4)] px-6 text-sm font-semibold text-[oklch(0.99_0_0)] transition hover:bg-[oklch(1_0_0/0.12)]"
              >
                Rent equipment
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-widest text-[oklch(0.9_0_0)]">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Verified suppliers
              </span>
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Material units
              </span>
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Logistics support
              </span>
            </div>
          </div>

          <div className="self-center rounded-xl border border-[oklch(1_0_0/0.2)] bg-[oklch(0.22_0.032_260/0.85)] p-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-bold text-[oklch(0.99_0_0)]">
                  Instant quote
                </p>
                <p className="text-xs text-[oklch(0.85_0_0)]">Get pricing in under 2 minutes</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Select material type..."
                className="h-11 w-full rounded-md border border-[oklch(1_0_0/0.2)] bg-[oklch(1_0_0/0.08)] px-3 text-sm text-[oklch(0.99_0_0)] outline-none placeholder:text-[oklch(0.8_0_0)] focus:border-primary"
              />
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity needed..."
                className="h-11 w-full rounded-md border border-[oklch(1_0_0/0.2)] bg-[oklch(1_0_0/0.08)] px-3 text-sm text-[oklch(0.99_0_0)] outline-none placeholder:text-[oklch(0.8_0_0)] focus:border-primary"
              />
              <Link
                to="/search"
                search={{ q: material || "cement" }}
                className="flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Check availability
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Container className="py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl">Shop by category</h2>
          <Link
            to="/category/$slug"
            params={{ slug: "cement" }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {CATEGORIES.map((c, i) => {
            const Icon = CATEGORY_ICONS[i] ?? Building2;
            return (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-4 text-center transition hover:border-primary hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-semibold">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* Supplier CTA */}
      <section className="relative overflow-hidden">
        <img
          src={supplierBanner}
          alt="Road construction project"
          loading="lazy"
          width={1600}
          height={560}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[oklch(0.653_0.184_42.5/0.88)]" />
        <Container className="relative flex flex-wrap items-center justify-between gap-6 py-12">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(1_0_0/0.2)] text-[oklch(0.99_0_0)]">
              <Truck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl text-[oklch(0.99_0_0)]">
                Sell your construction materials on JengaHub
              </h2>
              <p className="mt-1 text-sm text-[oklch(0.96_0_0)]">
                Reach thousands of verified contractors and site managers nationwide.
              </p>
            </div>
          </div>
          <Link
            to="/sell/onboarding"
            className="inline-flex h-12 items-center rounded-md bg-[oklch(0.22_0.032_260)] px-6 text-sm font-semibold text-[oklch(0.99_0_0)] transition hover:brightness-125"
          >
            Register as supplier
          </Link>
        </Container>
      </section>

      {/* Featured */}
      <Container className="py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl">Featured materials</h2>
          <Link
            to="/search"
            search={{ q: "" }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
          >
            View catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>

      {/* Professionals */}
      <section className="border-y border-border bg-surface">
        <Container className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Vetted professionals</span>
            <h2 className="mt-3 text-3xl">Find professional construction experts</h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Connect with licensed architects, engineers and contractors for your next project.
              Every professional is background-checked by JengaHub.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary" /> Verified licensing and registration
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary" /> Client reviews and past project
                portfolio
              </li>
            </ul>
            <Link
              to="/professionals"
              className="mt-8 inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
            >
              Browse experts
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {PROFESSIONALS.slice(0, 6).map((pro) => (
              <Link
                key={pro.id}
                to="/professionals/$id"
                params={{ id: pro.id }}
                className="panel p-4 transition hover:border-primary"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-accent-foreground">
                  {pro.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <p className="mt-3 text-sm font-semibold">{pro.name}</p>
                <p className="text-xs text-muted-foreground">{pro.profession}</p>
                <div className="mt-2">
                  <RatingStars value={pro.rating} reviews={pro.reviews} />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Payments */}
      <Container className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-6 panel p-6">
          <div>
            <h3 className="text-lg">Secure payments in Tanzania</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Escrow-backed mobile money and bank transfers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold">
            {["M-Pesa", "Airtel Money", "Mixx by Yas", "HaloPesa", "CRDB", "NMB"].map((m) => (
              <span key={m} className="rounded-md border border-border px-4 py-2">
                {m}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
}
