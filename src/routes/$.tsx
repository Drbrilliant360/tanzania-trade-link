import { createFileRoute, Link } from "@tanstack/react-router";
import { MainLayout, Container } from "@/layouts/MainLayout";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — JengaHub" },
      { name: "description", content: "The page you were looking for is not available." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Page not found — JengaHub" },
      { property: "og:description", content: "The page you were looking for is not available." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <MainLayout>
      <Container className="py-24 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-2 text-4xl">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you were looking for has moved or never existed.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Back to home
        </Link>
      </Container>
    </MainLayout>
  );
}
