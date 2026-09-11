import { createFileRoute, Link } from "@tanstack/react-router";
import { MainLayout, Container } from "@/layouts/MainLayout";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help centre — JengaHub" },
      {
        name: "description",
        content:
          "Answers on JengaHub escrow payments, delivery times, equipment rental and supplier verification.",
      },
      { property: "og:title", content: "Help centre — JengaHub" },
      { property: "og:description", content: "Payments, delivery, rentals and verification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HelpPage,
});

const FAQS = [
  {
    q: "How does escrow payment work?",
    a: "You pay with M-Pesa, Mixx by Yas, Airtel Money, HaloPesa or bank transfer. JengaHub holds the funds and releases them to the supplier only after you confirm delivery.",
  },
  {
    q: "How long does delivery take?",
    a: "Most Dar es Salaam deliveries arrive within 24-48 hours. Upcountry deliveries to Arusha, Mwanza, Dodoma, Mbeya and Tanga take 2-4 days depending on load size.",
  },
  {
    q: "How do I rent heavy equipment?",
    a: "Open an equipment listing, choose daily, weekly or monthly hire, and submit the request. The owner confirms availability and operator arrangements before payment is captured.",
  },
  {
    q: "What makes a supplier verified?",
    a: "Verified suppliers have submitted TBS certification, CRB registration where required, a valid TIN and business licence. Their badge appears on every listing.",
  },
  {
    q: "Can I return materials?",
    a: "Report damaged or wrong deliveries within 48 hours from the order page. Escrow funds stay held until the issue is resolved.",
  },
];

function HelpPage() {
  return (
    <MainLayout>
      <Container className="py-10">
        <h1 className="text-2xl sm:text-3xl">Help centre</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Common questions from buyers and suppliers on JengaHub.
        </p>

        <div className="mt-8 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="panel p-5">
              <summary className="cursor-pointer text-base font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/orders" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold">
            Track an order
          </Link>
          <Link
            to="/contact"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Contact support
          </Link>
        </div>
      </Container>
    </MainLayout>
  );
}
