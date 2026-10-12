import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { CATEGORIES, REGIONS } from "@/lib/constants";
import { PRODUCTS, SUPPLIERS } from "@/lib/data";

type ChatMsg = { role: "user" | "assistant"; content: string };

function catalogue() {
  const products = PRODUCTS.slice(0, 40)
    .map((p) => `- ${p.name} | ${p.category} | TZS ${p.price} per ${p.unit} | id ${p.id}`)
    .join("\n");
  const suppliers = SUPPLIERS.map((s) => `- ${s.name} (${s.id})`).join("\n");
  return `Categories: ${CATEGORIES.map((c) => c.name).join(", ")}\nRegions: ${REGIONS.join(", ")}\nProducts:\n${products}\nSuppliers:\n${suppliers}`;
}

export const Route = createFileRoute("/api/public/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMsg[] };
        try {
          body = (await request.json()) as { messages?: ChatMsg[] };
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
        const messages = (body.messages ?? [])
          .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .slice(-12)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
        if (!messages.length || messages[messages.length - 1]?.role !== "user") {
          return Response.json({ error: "Please type a question." }, { status: 400 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Assistant is not configured." }, { status: 500 });

        let runId: string | undefined;
        const openai = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: async (input, init) => {
            const headers = new Headers(init?.headers);
            if (runId && !headers.has("X-Lovable-AIG-Run-ID")) headers.set("X-Lovable-AIG-Run-ID", runId);
            const res = await fetch(input, { ...init, headers });
            runId ??= res.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
            if (!res.ok) gatewayStatus = res.status;
            return res;
          },
        });
        let gatewayStatus = 0;

        const result = streamText({
          model: openai.responses("openai/gpt-6-astra"),
          abortSignal: request.signal,
          system: `You are the JengaHub assistant for Tanzania's construction marketplace. Help buyers choose building materials, estimate quantities, compare suppliers and understand delivery, mobile-money payments and escrow. Prices are in Tanzanian shillings (TZS). Be concise (under 120 words), practical and friendly. Only recommend items from this catalogue; say when something isn't listed.\n\n${catalogue()}`,
          messages,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
          onError: ({ error }) => console.error("assistant error", gatewayStatus, error),
        });

        return result.toTextStreamResponse();
      },
    },
  },
});
