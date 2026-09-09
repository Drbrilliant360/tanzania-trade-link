import { createFileRoute } from "@tanstack/react-router";
import { Users, ShieldCheck, Receipt, Wallet } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { VERIFICATION_QUEUE } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin overview — JengaHub" },
      {
        name: "description",
        content: "Marketplace health, verification queue and platform revenue at a glance.",
      },
      { property: "og:title", content: "Admin overview — JengaHub" },
      { property: "og:description", content: "Marketplace health and verification queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  return (
    <DashboardLayout title="Admin overview" subtitle="Platform health across the marketplace">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active users" value="4,182" delta="+9%" icon={Users} />
        <StatCard label="Pending verifications" value="12" icon={ShieldCheck} />
        <StatCard label="Orders (30 days)" value="1,043" delta="+14%" icon={Receipt} />
        <StatCard label="Escrow held" value="TZS 214M" icon={Wallet} />
      </div>

      <section className="mt-8 panel overflow-x-auto">
        <h2 className="p-6 pb-0 text-lg">Latest verification requests</h2>
        <table className="mt-4 w-full min-w-[640px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Ref</th>
              <th className="px-6 py-3">Applicant</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Document</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {VERIFICATION_QUEUE.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="px-6 py-3 font-mono text-xs">{v.id}</td>
                <td className="px-6 py-3">{v.applicant}</td>
                <td className="px-6 py-3 text-muted-foreground">{v.type}</td>
                <td className="px-6 py-3 text-muted-foreground">{v.document}</td>
                <td className="px-6 py-3">
                  <StatusPill tone={toneForStatus(v.status)}>{v.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardLayout>
  );
}
