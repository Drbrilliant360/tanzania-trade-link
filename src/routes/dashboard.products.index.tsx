import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { StatusPill, toneForStatus } from "@/components/common/Badges";
import { PRODUCTS } from "@/lib/data";
import { formatTZS } from "@/lib/format";

export const Route = createFileRoute("/dashboard/products/")({
  head: () => ({
    meta: [
      { title: "My products — JengaHub seller" },
      {
        name: "description",
        content: "Manage your listed building materials, pricing and stock levels on JengaHub.",
      },
      { property: "og:title", content: "My products — JengaHub seller" },
      { property: "og:description", content: "Manage listings, pricing and stock on JengaHub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SellerProductsPage,
});

function SellerProductsPage() {
  return (
    <DashboardLayout
      title="Products"
      subtitle={`${PRODUCTS.length} listings in your catalogue`}
      actions={
        <Link
          to="/dashboard/products/new"
          className="flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Add product
        </Link>
      }
    >
      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">SKU</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-6 py-3">
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="font-semibold hover:text-primary"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="px-6 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-6 py-3 price">{formatTZS(p.price)}</td>
                <td className="px-6 py-3 font-mono text-xs">{p.sku}</td>
                <td className="px-6 py-3">
                  <StatusPill tone={toneForStatus(p.stock)}>{p.stock}</StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
