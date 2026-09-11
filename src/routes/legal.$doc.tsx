import { createFileRoute, Link } from "@tanstack/react-router";
import { MainLayout, Container } from "@/layouts/MainLayout";

export const Route = createFileRoute("/legal/$doc")({
  head: () => ({
    meta: [
      { title: "Legal policies — JengaHub" },
      {
        name: "description",
        content:
          "JengaHub privacy policy, terms of service and vendor agreement for buyers and suppliers in Tanzania.",
      },
      { property: "og:title", content: "Legal policies — JengaHub" },
      { property: "og:description", content: "Privacy, terms and vendor agreement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalPage,
});

const DOCS: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        h: "What we collect",
        p: "Account details, delivery addresses, order history and payment references needed to complete transactions on JengaHub.",
      },
      {
        h: "How we use it",
        p: "To process orders, verify suppliers, prevent fraud and provide delivery updates. We do not sell personal data.",
      },
      {
        h: "Your choices",
        p: "You can request a copy or deletion of your data at any time by writing to support@jengahub.co.tz.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        h: "Using the marketplace",
        p: "Buyers must provide accurate delivery details. Suppliers must list only materials and equipment they can supply.",
      },
      {
        h: "Payments and escrow",
        p: "Payments are held in escrow and released to the supplier after delivery is confirmed or 48 hours pass without a dispute.",
      },
      {
        h: "Disputes",
        p: "Report issues from the order page within 48 hours of delivery. JengaHub mediates and may refund escrow funds.",
      },
    ],
  },
  "vendor-agreement": {
    title: "Vendor Agreement",
    sections: [
      {
        h: "Verification",
        p: "Suppliers submit TBS certification, CRB registration where applicable, a valid TIN and business licence before selling.",
      },
      {
        h: "Listing standards",
        p: "Prices must include VAT where applicable, stock levels must be accurate and images must show the actual product.",
      },
      {
        h: "Payouts",
        p: "Wallet balances are paid out to mobile money or bank accounts weekly, less the JengaHub commission.",
      },
    ],
  },
};

function LegalPage() {
  const { doc } = Route.useParams();
  const content = DOCS[doc] ?? DOCS["terms"]!;

  return (
    <MainLayout>
      <Container className="py-10">
        <h1 className="text-2xl sm:text-3xl">{content.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated 1 September 2026.</p>

        <div className="mt-8 max-w-3xl space-y-6">
          {content.sections.map((s) => (
            <section key={s.h} className="panel p-6">
              <h2 className="text-base">{s.h}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <Link to="/legal/$doc" params={{ doc: "privacy" }} className="rounded-md border border-border px-4 py-2">
            Privacy Policy
          </Link>
          <Link to="/legal/$doc" params={{ doc: "terms" }} className="rounded-md border border-border px-4 py-2">
            Terms of Service
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "vendor-agreement" }}
            className="rounded-md border border-border px-4 py-2"
          >
            Vendor Agreement
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
}
