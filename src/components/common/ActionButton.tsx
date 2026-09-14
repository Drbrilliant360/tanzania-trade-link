import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";

export function ActionButton({
  loading = false,
  loadingText,
  variant = "primary",
  className,
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      {...props}
      aria-busy={loading}
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:brightness-110"
          : "border border-border bg-surface hover:bg-accent",
        className,
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      <span>{loading ? (loadingText ?? "Working…") : children}</span>
    </button>
  );
}
