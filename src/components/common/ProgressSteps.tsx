import { CheckCircle2, Loader2 } from "lucide-react";

export type StepState = { label: string; done: boolean; active: boolean };

/**
 * Inline progress report for multi-stage operations (payment, publishing, uploads).
 */
export function ProgressSteps({ steps, percent }: { steps: StepState[]; percent: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            {s.done ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : s.active ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <span className="h-4 w-4 rounded-full border border-border" />
            )}
            <span className={s.done || s.active ? "" : "text-muted-foreground"}>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
