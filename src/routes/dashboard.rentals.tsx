import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { SELLER_RENTALS } from "@/lib/data";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/dashboard/rentals")({
  head: () => ({
    meta: [
      { title: "Equipment rentals — JengaHub seller" },
      {
        name: "description",
        content: "Manage your equipment hire calendar, active rentals and daily rates.",
      },
      { property: "og:title", content: "Equipment rentals — JengaHub seller" },
      { property: "og:description", content: "Manage your equipment hire calendar and rates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SellerRentalsPage,
});

function SellerRentalsPage() {
  return (
    <DashboardLayout title="Rentals" subtitle="Machines currently on hire and returned">
      <div className="grid gap-5 lg:grid-cols-2">
        {SELLER_RENTALS.map((r) => (
          <article key={r.id} className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
              <StatusPill tone={toneForStatus(r.status)}>{r.status}</StatusPill>
            </div>
            <h2 className="mt-2 text-lg leading-snug">{r.machine}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{r.customer}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="eyebrow">From</p>
                <p className="mt-1">{r.from}</p>
              </div>
              <div>
                <p className="eyebrow">To</p>
                <p className="mt-1">{r.to}</p>
              </div>
              <div>
                <p className="eyebrow">Daily rate</p>
                <p className="mt-1 price">{formatTZS(r.rate)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
}
