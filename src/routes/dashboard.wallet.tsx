import { createFileRoute } from "@tanstack/react-router";
import { Wallet, ArrowDownToLine, Clock } from "lucide-react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/dashboard/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet and payouts — JengaHub seller" },
      {
        name: "description",
        content:
          "View your available balance, escrow held funds and mobile money payout history on JengaHub.",
      },
      { property: "og:title", content: "Wallet and payouts — JengaHub seller" },
      { property: "og:description", content: "Balances, escrow funds and payout history." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SellerWalletPage,
});

const PAYOUTS = [
  { id: "PO-2210", date: "06 Sep 2026", method: "Vodacom M-Pesa", amount: 4200000, status: "Completed" },
  { id: "PO-2204", date: "30 Aug 2026", method: "CRDB Bank", amount: 6850000, status: "Completed" },
  { id: "PO-2198", date: "24 Aug 2026", method: "Airtel Money", amount: 1900000, status: "Pending" },
];

function SellerWalletPage() {
  return (
    <DashboardLayout
      title="Wallet"
      subtitle="Escrow balances and payouts"
      actions={
        <button className="h-10 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground">
          Withdraw funds
        </button>
      }
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Available balance" value="TZS 8.4M" icon={Wallet} />
        <StatCard label="Held in escrow" value="TZS 3.1M" icon={Clock} />
        <StatCard label="Paid out (30 days)" value="TZS 12.9M" icon={ArrowDownToLine} />
      </div>

      <section className="mt-8 panel overflow-x-auto">
        <h2 className="p-6 pb-0 text-lg">Payout history</h2>
        <table className="mt-4 w-full min-w-[600px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Reference</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Method</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PAYOUTS.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-6 py-3 font-mono text-xs">{p.id}</td>
                <td className="px-6 py-3 text-muted-foreground">{p.date}</td>
                <td className="px-6 py-3">{p.method}</td>
                <td className="px-6 py-3 price">{formatTZS(p.amount)}</td>
                <td className="px-6 py-3">
                  <StatusPill tone={toneForStatus(p.status)}>{p.status}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DashboardLayout>
  );
}
