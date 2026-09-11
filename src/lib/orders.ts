export type BuyerOrderItem = { name: string; qty: number; unit: string; price: number };

export type BuyerOrder = {
  id: string;
  date: string;
  seller: string;
  sellerId: string;
  status: "Processing" | "In transit" | "Delivered" | "Cancelled";
  payment: string;
  escrow: "Held in escrow" | "Released" | "Refunded";
  region: string;
  address: string;
  delivery: number;
  items: BuyerOrderItem[];
};

export const BUYER_ORDERS: BuyerOrder[] = [
  {
    id: "JH-2026-0142",
    date: "8 Sep 2026",
    seller: "Mwananchi Construction Ltd",
    sellerId: "mwananchi-construction",
    status: "In transit",
    payment: "M-Pesa",
    escrow: "Held in escrow",
    region: "Dar es Salaam",
    address: "Plot 45, Nyerere Road, Temeke",
    delivery: 120000,
    items: [
      { name: "Dangote 32.5R Rapid Cement", qty: 120, unit: "bag", price: 18500 },
      { name: "Deformed Rebar 16mm", qty: 40, unit: "piece", price: 42000 },
    ],
  },
  {
    id: "JH-2026-0121",
    date: "29 Aug 2026",
    seller: "Coastal Mabati Ltd",
    sellerId: "coastal-mabati",
    status: "Delivered",
    payment: "Airtel Money",
    escrow: "Released",
    region: "Tanga",
    address: "Bombo Road, Tanga City",
    delivery: 85000,
    items: [{ name: "Corrugated Iron Sheets (Mabati) 28G", qty: 60, unit: "sheet", price: 31500 }],
  },
  {
    id: "JH-2026-0098",
    date: "14 Aug 2026",
    seller: "Ujenzi Block Co.",
    sellerId: "ujenzi-block",
    status: "Delivered",
    payment: "Bank transfer",
    escrow: "Released",
    region: "Dar es Salaam",
    address: "Mji Mwema Road, Kigamboni",
    delivery: 150000,
    items: [{ name: "Hollow Concrete Block 200mm", qty: 900, unit: "block", price: 2200 }],
  },
];

export function orderTotal(order: BuyerOrder) {
  return order.items.reduce((sum, i) => sum + i.qty * i.price, 0) + order.delivery;
}

export function findOrder(id: string) {
  return BUYER_ORDERS.find((o) => o.id.toLowerCase() === id.toLowerCase());
}
