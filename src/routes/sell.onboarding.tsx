import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthLayout } from "@/layouts/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { REGIONS, SELLER_TYPES } from "@/lib/constants";

export const Route = createFileRoute("/sell/onboarding")({
  head: () => ({
    meta: [
      { title: "Sell on JengaHub — supplier registration" },
      {
        name: "description",
        content:
          "Register your business, upload licences and start selling materials or equipment to verified buyers in Tanzania.",
      },
      { property: "og:title", content: "Sell on JengaHub — supplier registration" },
      {
        property: "og:description",
        content: "Register your construction business and reach verified buyers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SellerOnboardingPage,
});

function SellerOnboardingPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Sell on JengaHub"
      subtitle="Register your business and get verified within 48 hours"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          register(
            String(data.get("business") || "Supplier"),
            String(data.get("email") || "supplier@jengahub.co.tz"),
            "seller",
          );
          toast.success("Application submitted for verification");
          navigate({ to: "/dashboard" });
        }}
      >
        <label className="block text-sm">
          Business name
          <input
            required
            name="business"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          Business email
          <input
            required
            type="email"
            name="email"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          Seller type
          <select
            name="type"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          >
            {SELLER_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Region
          <select
            name="region"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          TIN / licence number
          <input
            required
            name="tin"
            className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-3 text-sm"
          />
        </label>
        <label className="block text-sm">
          Upload licence document
          <input
            type="file"
            name="doc"
            className="mt-1 w-full rounded-md border border-border bg-surface p-2 text-sm"
          />
        </label>
        <button className="h-11 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition hover:brightness-110">
          Submit application
        </button>
      </form>
    </AuthLayout>
  );
}
