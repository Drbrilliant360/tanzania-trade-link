import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

/**
 * Thin bar at the very top of the screen that fills while a page is loading,
 * so a click always produces instant visible feedback.
 */
export function RouteProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setValue(12);
      const id = setInterval(() => {
        setValue((v) => (v < 90 ? v + Math.max(1, (90 - v) / 8) : v));
      }, 180);
      return () => clearInterval(id);
    }
    if (visible) {
      setValue(100);
      const id = setTimeout(() => {
        setVisible(false);
        setValue(0);
      }, 320);
      return () => clearTimeout(id);
    }
    return;
  }, [isLoading, visible]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      aria-valuenow={Math.round(value)}
      className="fixed inset-x-0 top-0 z-[100] h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-primary transition-[width] duration-200 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
