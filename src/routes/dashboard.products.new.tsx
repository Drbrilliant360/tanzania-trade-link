import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { CATEGORIES, REGIONS } from "@/lib/constants";

export const Route = createFileRoute("/dashboard/products/new")({
  head: () => ({
    meta: [
      { title: "Add a new product — JengaHub seller" },
      {
        name: "description",
        content: "List a new building material with pricing, stock, photos and specifications.",
      },
      { property: "og:title", content: "Add a new product — JengaHub seller" },
      { property: "og:description", content: "List a new material on your JengaHub storefront." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SellerAddProductPage,
});

function SellerAddProductPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Add new product" subtitle="Publish a listing to the marketplace">
      <form
        className="panel max-w-3xl space-y-5 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Product published");
          navigate({ to: "/dashboard/products" });
        }}
      >
        <label className="block text-sm">
          Product name
          <input
            required
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>

        <label className="block text-sm">
          Description
          <textarea
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-border bg-surface p-3 text-sm"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm">
            Price (TZS)
            <input
              required
              type="number"
              min={0}
              className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
          <label className="block text-sm">
            Stock quantity
            <input
              required
              type="number"
              min={0}
              className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
            />
          </label>
          <label className="block text-sm">
            Category
            <select className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm">
              {CATEGORIES.map((c) => (
                <option key={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Region
            <select className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm">
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm">
          Product images
          <input
            type="file"
            multiple
            className="mt-1 w-full rounded-md border border-dashed border-border bg-surface p-4 text-sm"
          />
        </label>

        <label className="block text-sm">
          Technical specifications
          <textarea
            rows={3}
            placeholder="Weight: 50kg per bag&#10;Standard: TZS 727-1"
            className="mt-1 w-full rounded-md border border-border bg-surface p-3 text-sm"
          />
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            Publish product
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard/products" })}
            className="h-11 rounded-md border border-border px-6 text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
