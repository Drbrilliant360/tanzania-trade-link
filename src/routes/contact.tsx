import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { MainLayout, Container } from "@/layouts/MainLayout";
import { ActionButton } from "@/components/common/ActionButton";
import { wait } from "@/hooks/useTaskRunner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact JengaHub support" },
      {
        name: "description",
        content:
          "Reach the JengaHub team in Dar es Salaam for order help, supplier verification and bulk material quotes.",
      },
      { property: "og:title", content: "Contact JengaHub support" },
      { property: "og:description", content: "Order help, verification and bulk quotes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <MainLayout>
      <Container className="py-10">
        <h1 className="text-2xl sm:text-3xl">Contact us</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Our Dar es Salaam team replies within one business day.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <form
            className="panel space-y-4 p-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              setBusy(true);
              setError(null);
              try {
                await wait(900);
                toast.success("Message sent. Our team will reply by email within one business day.");
                setSent(true);
                form.reset();
              } catch {
                setError(
                  "Your message didn't send. Nothing was lost — press Send message again, or email support@jengahub.co.tz.",
                );
                toast.error("Message not sent");
              } finally {
                setBusy(false);
              }
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                Full name
                <input
                  required
                  className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
                />
              </label>
              <label className="text-sm">
                Email
                <input
                  required
                  type="email"
                  className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
                />
              </label>
            </div>
            <label className="block text-sm">
              How can we help?
              <textarea
                required
                rows={5}
                className="mt-1 w-full rounded-md border border-border bg-surface p-3 text-sm"
              />
            </label>
            {error && (
              <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </p>
            )}
            {sent && !error && (
              <p className="rounded-md bg-accent p-3 text-sm">
                Thanks — your message is with our Dar es Salaam team.
              </p>
            )}
            <ActionButton type="submit" loading={busy} loadingText="Sending your message…">
              Send message
            </ActionButton>
          </form>

          <aside className="panel space-y-4 p-6 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> support@jengahub.co.tz
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +255 700 000 000
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Dar es Salaam, Tanzania
            </p>
            <Link
              to="/help"
              className="block rounded-md border border-border px-4 py-2 text-center font-semibold"
            >
              Visit help centre
            </Link>
          </aside>
        </div>
      </Container>
    </MainLayout>
  );
}
