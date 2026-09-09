import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, ShieldCheck, CalendarRange } from "lucide-react";
import { toast } from "sonner";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ConditionBadge, VerifiedBadge } from "@/components/common/Badges";
import { EQUIPMENT, getEquipment } from "@/lib/data";
import { formatTZS } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/equipment/$id")({
  loader: ({ params }) => {
    const machine = getEquipment(params.id);
    if (!machine) throw notFound();
    return { machine };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Equipment unavailable — JengaHub" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { machine } = loaderData;
    const description = `${machine.name} (${machine.year}, ${machine.condition}) from ${machine.seller}. Buy at ${formatTZS(machine.price)} or hire from ${formatTZS(machine.rentPerDay)} per day.`;
    return {
      meta: [
        { title: `${machine.name} — JengaHub` },
        { name: "description", content: description },
        { property: "og:title", content: `${machine.name} — JengaHub` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: EquipmentDetailPage,
});

function EquipmentDetailPage() {
  const { machine } = Route.useLoaderData();
  const { add } = useCart();
  const recommended = EQUIPMENT.filter((e) => e.id !== machine.id).slice(0, 3);

  return (
    <MainLayout>
      <Container className="py-8">
        <nav className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link to="/equipment" className="hover:text-primary">
            Equipment
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{machine.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <img
              src={machine.image}
              alt={machine.name}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={machine.image}
                  alt={`${machine.name} view ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-lg border border-border object-cover"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <ConditionBadge condition={machine.condition} />
              <VerifiedBadge label="Authorized dealer" />
            </div>
            <h1 className="mt-3 text-3xl">{machine.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {machine.brand} · {machine.year} · SKU {machine.sku}
            </p>

            <p className="mt-4 price text-3xl">{formatTZS(machine.price)}</p>
            <p className="text-sm text-muted-foreground">
              Rental from {formatTZS(machine.rentPerDay)} per day
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{machine.note}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  add({
                    id: machine.id,
                    name: machine.name,
                    seller: machine.seller,
                    unit: "Unit",
                    price: machine.price,
                    image: machine.image,
                    kind: "equipment",
                  });
                  toast.success("Machine added to your cart");
                }}
                className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
              >
                Buy this machine
              </button>
              <button
                onClick={() => {
                  add(
                    {
                      id: `${machine.id}-rental`,
                      name: `${machine.name} (14-day hire)`,
                      seller: machine.seller,
                      unit: "Day",
                      price: machine.rentPerDay,
                      image: machine.image,
                      kind: "equipment",
                    },
                    14,
                  );
                  toast.success("14-day rental added to your cart");
                }}
                className="h-11 rounded-md border border-border px-6 text-sm font-semibold"
              >
                Request 14-day rental
              </button>
            </div>

            <div className="mt-6 grid gap-3 rounded-xl border border-border bg-surface p-5 text-sm">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Buyer protection: funds released
                after machine inspection
              </p>
              <p className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4 text-primary" /> Rental calendar managed by the
                dealer
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> {machine.location} · {machine.seller}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl">Technical specifications</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {machine.specs.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface p-4">
                <p className="eyebrow">{s.label}</p>
                <p className="mt-1 font-mono text-sm font-bold text-ink">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl">Recommended equipment</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {recommended.map((e) => (
              <Link
                key={e.id}
                to="/equipment/$id"
                params={{ id: e.id }}
                className="panel overflow-hidden transition hover:shadow-lg"
              >
                <img
                  src={e.image}
                  alt={e.name}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-base leading-snug">{e.name}</h3>
                  <p className="mt-2 price text-lg">{formatTZS(e.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </MainLayout>
  );
}
