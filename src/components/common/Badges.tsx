import { BadgeCheck, Star } from "lucide-react";

export function VerifiedBadge({ label = "Verified" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
      <BadgeCheck className="h-3 w-3" />
      {label}
    </span>
  );
}

export function RatingStars({ value, reviews }: { value: number; reviews?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </span>
  );
}

const TONES: Record<string, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success/15 text-success-foreground",
  warn: "bg-accent text-accent-foreground",
  danger: "bg-destructive/10 text-destructive",
};

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function toneForStatus(status: string): keyof typeof TONES {
  const s = status.toLowerCase();
  if (["delivered", "completed", "approved", "in stock", "active", "returned", "verified"].includes(s))
    return "success";
  if (["cancelled", "rejected", "out of stock"].includes(s)) return "danger";
  if (["limited stock", "pending", "in transit", "awaiting pickup", "ongoing"].includes(s))
    return "warn";
  return "neutral";
}

export function ConditionBadge({ condition }: { condition: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-semibold text-foreground">
      {condition}
    </span>
  );
}

export function LicenseBadge({ licence }: { licence: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[11px] font-semibold text-accent-foreground">
      <BadgeCheck className="h-3.5 w-3.5" />
      {licence}
    </span>
  );
}
