import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { HardHat } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <HardHat className="h-5 w-5" />
        </span>
        <span className="font-display text-2xl font-bold text-ink">JengaHub</span>
      </Link>

      <div className="w-full max-w-md panel p-8">
        <h1 className="text-2xl">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
