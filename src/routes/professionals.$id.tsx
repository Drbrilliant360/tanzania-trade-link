import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { LicenseBadge, RatingStars } from "@/components/common/Badges";
import { getProfessional } from "@/lib/data";

export const Route = createFileRoute("/professionals/$id")({
  loader: ({ params }) => {
    const pro = getProfessional(params.id);
    if (!pro) throw notFound();
    return { pro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Profile unavailable — JengaHub" }, { name: "robots", content: "noindex" }],
      };
    }
    const { pro } = loaderData;
    const description = `${pro.name}, ${pro.profession} in ${pro.location}. ${pro.licence}. ${pro.bio}`;
    return {
      meta: [
        { title: `${pro.name}, ${pro.profession} — JengaHub` },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: `${pro.name}, ${pro.profession} — JengaHub` },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProfessionalProfilePage,
});

function ProfessionalProfilePage() {
  const { pro } = Route.useLoaderData();

  return (
    <MainLayout>
      <Container className="py-8">
        <nav className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Link to="/professionals" className="hover:text-primary">
            Professionals
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{pro.name}</span>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="panel p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="eyebrow">{pro.profession}</span>
                  <h1 className="mt-1 text-3xl">{pro.name}</h1>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {pro.location}
                  </p>
                </div>
                <RatingStars value={pro.rating} reviews={pro.reviews} />
              </div>
              <div className="mt-4">
                <LicenseBadge licence={pro.licence} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pro.bio}</p>
            </div>

            <section className="mt-8">
              <h2 className="text-2xl">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {pro.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-surface px-3 py-1 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl">Recent projects</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {pro.projects.map((p) => (
                  <div key={p.name} className="rounded-lg border border-border bg-surface p-4">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.year}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="panel h-fit p-6">
            <h2 className="text-lg">Engage {pro.name.split(" ")[0]}</h2>
            <p className="mt-2 price text-xl">{pro.rate}</p>
            <button className="mt-4 h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110">
              Request availability
            </button>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" /> Contact shared after request
            </p>
          </aside>
        </div>
      </Container>
    </MainLayout>
  );
}
