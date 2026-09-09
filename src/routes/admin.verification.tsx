import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { VERIFICATION_QUEUE } from "@/lib/data";

export const Route = createFileRoute("/admin/verification")({
  head: () => ({
    meta: [
      { title: "Verification queue — JengaHub admin" },
      {
        name: "description",
        content:
          "Review supplier and professional licence submissions before approving them for the marketplace.",
      },
      { property: "og:title", content: "Verification queue — JengaHub admin" },
      { property: "og:description", content: "Review supplier and professional licences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminVerificationPage,
});

function AdminVerificationPage() {
  return (
    <DashboardLayout title="Verification" subtitle="Licence and registration checks">
      <div className="space-y-4">
        {VERIFICATION_QUEUE.map((v) => (
          <article key={v.id} className="panel flex flex-wrap items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{v.id}</span>
                <StatusPill tone={toneForStatus(v.status)}>{v.status}</StatusPill>
              </div>
              <h2 className="mt-1 text-lg">{v.applicant}</h2>
              <p className="text-sm text-muted-foreground">
                {v.type} · {v.document} · submitted {v.submitted}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => toast.success(`${v.applicant} approved`)}
                className="h-10 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Approve
              </button>
              <button
                onClick={() => toast(`${v.applicant} rejected`)}
                className="h-10 rounded-md border border-border px-5 text-sm font-semibold"
              >
                Reject
              </button>
            </div>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
}
