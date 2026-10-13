import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { CATEGORIES, REGIONS } from "@/lib/constants";
import { PRODUCTS, SUPPLIERS } from "@/lib/data";
import { FAQS, SITE_PAGES } from "@/lib/siteInfo";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type ChatMsg = { role: "user" | "assistant"; content: string };

function shortId(id: string) {
  return `JH-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

function catalogue() {
  const products = PRODUCTS.map(
    (p) =>
      `- ${p.name} | ${p.category} | brand ${p.brand} | TZS ${p.price}/${p.unit} | min ${p.minOrder} | ${p.stock} | ${p.location} | seller ${p.seller} | rating ${p.rating} (${p.reviews}) | link /product/${p.id}`,
  ).join("\n");
  const suppliers = SUPPLIERS.map(
    (s) => `- ${s.name} | ${s.tagline} | ${s.location} | rating ${s.rating} | ${s.verified ? "verified" : "unverified"} | phone ${s.phone} | link /supplier/${s.id}`,
  ).join("\n");
  const faqs = FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n");
  return `SITE PAGES:\n${SITE_PAGES.join("\n")}\n\nHELP / POLICIES:\n${faqs}\n\nCategories: ${CATEGORIES.map((c) => `${c.name} (/category/${c.slug})`).join(", ")}\nRegions: ${REGIONS.join(", ")}\n\nPRODUCTS:\n${products}\n\nSUPPLIERS:\n${suppliers}`;
}

function makeClient(token?: string) {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        h.set("apikey", key);
        if (token) h.set("Authorization", `Bearer ${token}`);
        else h.delete("Authorization");
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function liveData(token?: string) {
  const parts: string[] = [];
  try {
    const db = makeClient();
    const { data } = await db
      .from("listings")
      .select("name, category, price, unit, stock, region, description")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data?.length)
      parts.push(
        "SELLER LISTINGS (live from database):\n" +
          data.map((l) => `- ${l.name} | ${l.category} | TZS ${l.price}/${l.unit} | stock ${l.stock} | ${l.region ?? ""}`).join("\n"),
      );
  } catch (e) {
    console.error("listings fetch failed", e);
  }
  if (token) {
    try {
      const db = makeClient(token);
      const { data: u } = await db.auth.getUser(token);
      if (u.user) {
        const { data: orders } = await db
          .from("orders")
          .select("id, status, escrow, payment_method, region, delivery_type, subtotal, delivery_fee, created_at, order_items(name, qty, unit, price, seller)")
          .eq("buyer_id", u.user.id)
          .order("created_at", { ascending: false })
          .limit(10);
        parts.push(
          "CURRENT USER'S ORDERS (private, only discuss with this user):\n" +
            (orders?.length
              ? orders
                  .map(
                    (o) =>
                      `- ${shortId(o.id)} | ${o.status} | ${o.escrow} | ${o.payment_method} | ${o.delivery_type} to ${o.region} | total TZS ${Number(o.subtotal) + Number(o.delivery_fee)} | ${o.created_at.slice(0, 10)} | items: ${(o.order_items ?? []).map((i) => `${i.qty} ${i.unit} ${i.name}`).join(", ")} | link /orders/${o.id}`,
                  )
                  .join("\n")
              : "No orders yet."),
        );
      }
    } catch (e) {
      console.error("orders fetch failed", e);
    }
  } else {
    parts.push("The user is not signed in; for order questions ask them to sign in at /login.");
  }
  return parts.join("\n\n");
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

        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || undefined;
        const live = await liveData(token);
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
          system: `You are Eng.cecilia Ai, the assistant for JengaHub, Tanzania's construction marketplace. Help buyers choose building materials, estimate quantities, compare suppliers and understand delivery, mobile-money payments and escrow. Prices are in Tanzanian shillings (TZS). Answer questions about products, prices, suppliers, delivery, payments, escrow, returns, verification, the user's own orders and how to use the site. Be concise (under 150 words), practical and friendly. Use only the data below; never invent products, prices or order details, and say when something isn't listed. Mention relevant page links like /product/<id>.\n\n${catalogue()}\n\n${live}`,
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
