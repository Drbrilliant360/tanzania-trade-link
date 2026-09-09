import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ConditionBadge, VerifiedBadge } from "@/components/common/Badges";
import { EQUIPMENT } from "@/lib/data";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/equipment/")({
  head: () => ({
    meta: [
      { title: "Heavy equipment for sale and hire — JengaHub" },
      {
        name: "description",
        content:
          "Excavators, backhoe loaders and concrete mixers for purchase or daily rental from verified Tanzanian dealers.",
      },
      { property: "og:title", content: "Heavy equipment for sale and hire — JengaHub" },
      {
        property: "og:description",
        content: "Buy or rent construction machinery from verified dealers across Tanzania.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EquipmentListPage,
});

function EquipmentListPage() {
  return (
    <MainLayout>
      <Container className="py-8">
        <h1 className="text-3xl">Heavy equipment</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {EQUIPMENT.length} machines available to buy or hire from verified dealers.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {EQUIPMENT.map((e) => (
            <article key={e.id} className="panel flex flex-col overflow-hidden">
              <img
                src={e.image}
                alt={e.name}
                loading="lazy"
                width={900}
                height={600}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{e.brand}</span>
                  <ConditionBadge condition={e.condition} />
                </div>
                <h2 className="mt-2 text-base leading-snug">{e.name}</h2>
                <p className="mt-2 price text-lg">{formatTZS(e.price)}</p>
                <p className="text-xs text-muted-foreground">
                  or {formatTZS(e.rentPerDay)} per day rental
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {e.location}
                </div>
                <div className="mt-2 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                  <VerifiedBadge label="Dealer" />
                  <span className="truncate">{e.seller}</span>
                </div>
                <Link
                  to="/equipment/$id"
                  params={{ id: e.id }}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-border text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
                >
                  View machine
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </MainLayout>
  );
}
