import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { LicenseBadge, RatingStars } from "@/components/common/Badges";
import { PROFESSIONALS } from "@/lib/data";

export const Route = createFileRoute("/professionals/")({
  head: () => ({
    meta: [
      { title: "Hire verified construction professionals — JengaHub" },
      {
        name: "description",
        content:
          "Browse licensed architects, engineers, quantity surveyors, contractors and tradespeople across Tanzania.",
      },
      { property: "og:title", content: "Hire verified construction professionals — JengaHub" },
      {
        property: "og:description",
        content: "Licensed architects, engineers and contractors ready for your project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfessionalDirectoryPage,
});

function ProfessionalDirectoryPage() {
  return (
    <MainLayout>
      <Container className="py-8">
        <h1 className="text-3xl">Construction professionals</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {PROFESSIONALS.length} licensed experts available across Tanzania.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {PROFESSIONALS.map((p) => (
            <article key={p.id} className="panel flex flex-col p-5">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{p.profession}</span>
                <RatingStars value={p.rating} reviews={p.reviews} />
              </div>
              <h2 className="mt-2 text-lg">{p.name}</h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {p.location}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{p.bio}</p>
              <div className="mt-3">
                <LicenseBadge licence={p.licence} />
              </div>
              <p className="mt-3 price text-base">{p.rate}</p>
              <Link
                to="/professionals/$id"
                params={{ id: p.id }}
                className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-border text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
              >
                View profile
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </MainLayout>
  );
}
