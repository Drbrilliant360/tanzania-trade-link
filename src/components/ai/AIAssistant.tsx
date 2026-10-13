import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Send, X, Sparkles } from "lucide-react";

type Msg = { from: "ai" | "me"; text: string };
const SEED: Msg[] = [
  { from: "ai", text: "Hello! I am Eng.cecilia Ai, your JengaHub assistant. Ask me about materials, prices, suppliers, delivery, payments or your orders." },
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function ask(text: string) {
    const history = [...messages, { from: "me" as const, text }];
    setMessages([...history, { from: "ai", text: "" }]);
    setBusy(true);
    const update = (t: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { from: "ai", text: t }]);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      const res = await fetch("/api/public/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          messages: history.slice(1).map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text })),
        }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => null);
        update(err?.error ?? "Sorry, I could not answer right now. Please try again in a moment.");
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        update(acc);
        endRef.current?.scrollIntoView({ block: "end" });
      }
      if (!acc.trim()) update("Sorry, I could not answer that. Please try again.");
    } catch {
      update("Connection problem — check your internet and try again.");
    } finally {
      setBusy(false);
    }
  }
  const [draft, setDraft] = useState("");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:brightness-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label="Open Eng.cecilia Ai"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex h-[70vh] max-h-[28rem] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[26rem] sm:w-[21rem]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Bot className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">Eng.cecilia Ai</p>
          <p className="text-[11px] text-muted-foreground">Always here to help</p>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close assistant">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
              m.from === "me"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}
          >
            <span className="whitespace-pre-wrap">{m.text || "Thinking…"}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim() || busy) return;
          void ask(draft.trim());
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type your message..."
          className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
        />
        <button disabled={busy} className="flex h-9 w-9 disabled:opacity-50 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
