import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { CATEGORIES, REGIONS } from "@/lib/constants";
import { ActionButton } from "@/components/common/ActionButton";
import { ProgressSteps } from "@/components/common/ProgressSteps";
import { useTaskRunner, wait } from "@/hooks/useTaskRunner";

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
  const task = useTaskRunner();

  return (
    <DashboardLayout title="Add new product" subtitle="Publish a listing to the marketplace">
      <form
        className="panel max-w-3xl space-y-5 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void task.run(
            [
              { label: "Saving product details", run: () => wait(600) },
              { label: "Uploading photos", run: () => wait(1400) },
              { label: "Running listing checks", run: () => wait(700) },
              { label: "Publishing to the marketplace", run: () => wait(600) },
            ],
            {
              successMessage: "Product published and live on the marketplace.",
              failureHint: "Your draft details were kept — try publishing again.",
              onSuccess: () => void navigate({ to: "/dashboard/products" }),
            },
          );
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

        {(task.running || task.status === "error") && (
          <div>
            <ProgressSteps steps={task.stepStates} percent={task.percent} />
            {task.error && (
              <p
                role="alert"
                className="mt-3 rounded-md bg-destructive/10 p-3 text-sm text-destructive"
              >
                {task.error} Your details are still here — press Publish product to try again.
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <ActionButton type="submit" loading={task.running} loadingText="Publishing…">
            {task.status === "error" ? "Try publishing again" : "Publish product"}
          </ActionButton>
          <ActionButton
            type="button"
            variant="outline"
            disabled={task.running}
            onClick={() => void navigate({ to: "/dashboard/products" })}
          >
            Cancel
          </ActionButton>
        </div>
      </form>
    </DashboardLayout>
  );
}
