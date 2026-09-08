export const CATEGORIES = [
  { slug: "cement", name: "Cement" },
  { slug: "steel", name: "Steel" },
  { slug: "tools", name: "Tools" },
  { slug: "paint", name: "Paint" },
  { slug: "electrical", name: "Electrical" },
  { slug: "plumbing", name: "Plumbing" },
  { slug: "roofing", name: "Roofing" },
  { slug: "tiles", name: "Tiles" },
  { slug: "timber", name: "Timber" },
] as const;

export const REGIONS = [
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Dodoma",
  "Mbeya",
  "Zanzibar",
  "Tanga",
  "Kagera",
  "Mtwara",
];

export const SELLER_TYPES = [
  "Verified Suppliers Only",
  "Manufacturers",
  "Individual Sellers",
];

export const PAYMENT_METHODS = [
  { id: "mpesa", name: "Vodacom M-Pesa", detail: "Lipa namba: 5678910" },
  { id: "mixx", name: "Mixx by Yas (Tigo Pesa)", detail: "Lipa namba: 1234567" },
  { id: "airtel", name: "Airtel Money", detail: "Lipa namba: 9876543" },
  { id: "halopesa", name: "HaloPesa", detail: "Lipa namba: 2233445" },
  { id: "bank", name: "Bank Transfer (TISS/EFT)", detail: "CRDB / NMB Marketplace Pay" },
];

export const DELIVERY_TYPES = ["Standard Truck", "Express", "Site Pickup"];
export const CONDITIONS = ["New", "Like New", "Used - Good", "Used - Fair"];
