import { useCallback, useState } from "react";
import { toast } from "sonner";

export type TaskStep = {
  label: string;
  /** Throw an Error to fail the whole task; the message is shown to the user. */
  run: () => Promise<void> | void;
};

type Status = "idle" | "running" | "done" | "error";

/**
 * Runs a list of named steps in order while reporting progress, then shows a
 * confirmation toast. On failure it stops, keeps the error visible and offers a retry.
 */
export function useTaskRunner() {
  const [status, setStatus] = useState<Status>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setStepIndex(0);
    setError(null);
  }, []);

  const run = useCallback(
    async (
      taskSteps: TaskStep[],
      options: { successMessage: string; onSuccess?: () => void; failureHint?: string },
    ) => {
      setSteps(taskSteps.map((s) => s.label));
      setError(null);
      setStatus("running");
      for (let i = 0; i < taskSteps.length; i++) {
        setStepIndex(i);
        try {
          await taskSteps[i]!.run();
        } catch (e) {
          const message = e instanceof Error ? e.message : "Something went wrong.";
          setStatus("error");
          setError(message);
          toast.error(`${taskSteps[i]!.label} failed`, {
            description:
              options.failureHint ??
              `${message} Nothing was charged or saved — you can safely try again.`,
          });
          return false;
        }
      }
      setStepIndex(taskSteps.length);
      setStatus("done");
      toast.success(options.successMessage);
      options.onSuccess?.();
      return true;
    },
    [],
  );

  return {
    run,
    reset,
    status,
    error,
    running: status === "running",
    stepStates: steps.map((label, i) => ({
      label,
      done: stepIndex > i || status === "done",
      active: status === "running" && stepIndex === i,
    })),
    percent: steps.length ? Math.round((Math.min(stepIndex, steps.length) / steps.length) * 100) : 0,
  };
}

/** Small helper to simulate network latency in the sample-data prototype. */
export const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
