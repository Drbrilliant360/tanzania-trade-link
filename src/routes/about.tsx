import { createFileRoute, Link } from "@tanstack/react-router";
import { MainLayout, Container } from "@/layouts/MainLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About JengaHub — Tanzania's construction marketplace" },
      {
        name: "description",
        content:
          "JengaHub connects Tanzanian builders with verified suppliers of cement, blocks, mabati, rebars, aggregates and heavy equipment.",
      },
      { property: "og:title", content: "About JengaHub" },
      {
        property: "og:description",
        content: "Verified materials, equipment and professionals across Tanzania.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Verified supply",
    body: "Every supplier is checked against TBS certification, CRB registration and TIN records before listing.",
  },
  {
    title: "Escrow payments",
    body: "Mobile money and bank payments are held until the buyer confirms delivery on site.",
  },
  {
    title: "Nationwide reach",
    body: "Suppliers in Dar es Salaam, Arusha, Mwanza, Dodoma, Mbeya and Tanga deliver countrywide.",
  },
];

function AboutPage() {
  return (
    <MainLayout>
      <Container className="py-10">
        <h1 className="max-w-3xl text-2xl sm:text-4xl">
          Building Tanzania on verified materials and trusted trade
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          JengaHub is a marketplace for construction materials, heavy equipment rental and licensed
          professionals. We make it simple to compare prices, confirm supplier credentials and pay
          safely from anywhere in the country.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="panel p-6">
              <h2 className="text-base">{v.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/category/$slug"
            params={{ slug: "cement" }}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Browse materials
          </Link>
          <Link
            to="/sell/onboarding"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold"
          >
            Become a supplier
          </Link>
          <Link to="/contact" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold">
            Talk to our team
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
}
