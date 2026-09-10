import { useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";

const SEED = [
  { from: "ai", text: "Hello! I am your JengaHub assistant. How can I help you find the right building materials today?" },
  { from: "me", text: "I am looking for cement for a residential project in Dar es Salaam." },
  {
    from: "ai",
    text: "We have several options for cement in Dar es Salaam. Would you like me to show the best-rated suppliers or current price trends?",
  },
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(SEED);
  const [draft, setDraft] = useState("");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:brightness-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label="Open JengaHub assistant"
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
          <p className="text-sm font-semibold">JengaHub AI Assistant</p>
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
            {m.text}
          </div>
        ))}
      </div>

      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          setMessages((prev) => [
            ...prev,
            { from: "me", text: draft },
            {
              from: "ai",
              text: "Thanks! Once JengaHub is connected to live pricing I'll pull matching suppliers for that request.",
            },
          ]);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type your message..."
          className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-xs outline-none focus:border-primary"
        />
        <button className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
