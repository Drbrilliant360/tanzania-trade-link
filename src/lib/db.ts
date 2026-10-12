import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import type { BuyerOrder } from "@/lib/orders";

const STATUSES: BuyerOrder["status"][] = ["Processing", "In transit", "Delivered", "Cancelled"];
const ESCROW: BuyerOrder["escrow"][] = ["Held in escrow", "Released", "Refunded"];

type OrderRow = {
  id: string;
  created_at: string;
  status: string;
  escrow: string;
  payment_method: string;
  region: string;
  address: string;
  delivery_fee: number;
  order_items: { name: string; seller: string; unit: string; qty: number; price: number }[];
};

export function shortOrderId(id: string) {
  return `JH-${id.slice(0, 8).toUpperCase()}`;
}

function toBuyerOrder(row: OrderRow): BuyerOrder & { uuid: string } {
  const sellers = [...new Set(row.order_items.map((i) => i.seller))];
  return {
    uuid: row.id,
    id: row.id,
    date: new Date(row.created_at).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    seller: sellers.length > 1 ? `${sellers.length} suppliers` : (sellers[0] ?? "JengaHub supplier"),
    sellerId: "",
    status: STATUSES.find((s) => s === row.status) ?? "Processing",
    escrow: ESCROW.find((s) => s === row.escrow) ?? "Held in escrow",
    payment: row.payment_method,
    region: row.region,
    address: row.address,
    delivery: Number(row.delivery_fee),
    items: row.order_items.map((i) => ({
      name: i.name,
      qty: i.qty,
      unit: i.unit,
      price: Number(i.price),
    })),
  };
}

const ORDER_SELECT =
  "id, created_at, status, escrow, payment_method, region, address, delivery_fee, order_items(name, seller, unit, qty, price)";

export function useMyOrders() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["orders", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(ORDER_SELECT)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data as unknown as OrderRow[]).map(toBuyerOrder);
    },
  });
}

export function useOrder(id: string) {
  const { user } = useAuth();
  const isUuid = /^[0-9a-f-]{36}$/i.test(id);
  return useQuery({
    queryKey: ["order", id, user?.id],
    enabled: Boolean(user) && isUuid,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(ORDER_SELECT)
        .eq("id", id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? toBuyerOrder(data as unknown as OrderRow) : null;
    },
  });
}

export type Listing = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  region: string;
  unit: string;
  specs: string | null;
  created_at: string;
};

export function useMyListings() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["listings", "mine", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("seller_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data as Listing[];
    },
  });
}
