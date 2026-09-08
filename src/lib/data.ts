import cement from "@/assets/cement.jpg";
import steel from "@/assets/steel.jpg";
import bricks from "@/assets/bricks.jpg";
import gravel from "@/assets/gravel.jpg";
import sand from "@/assets/sand.jpg";
import excavator from "@/assets/excavator.jpg";

export const IMAGES = { cement, steel, bricks, gravel, sand, excavator };

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  location: string;
  seller: string;
  sellerId: string;
  image: string;
  verified: boolean;
  stock: "In Stock" | "Limited Stock" | "Out of Stock";
  minOrder: number;
  sku: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    id: "dangote-425n",
    name: "Dangote 42.5N Portland Cement",
    category: "Cement",
    categorySlug: "cement",
    brand: "Dangote",
    price: 18500,
    unit: "50kg Bag",
    rating: 4.8,
    reviews: 1240,
    location: "Dar es Salaam",
    seller: "Mwananchi Construction Ltd",
    sellerId: "mwananchi-construction",
    image: cement,
    verified: true,
    stock: "In Stock",
    minOrder: 10,
    sku: "DNG-CM-50",
    description:
      "High-grade Portland limestone cement suited to structural and general purpose work. Compliant with Tanzania Bureau of Standards requirements and delivered across the Dar es Salaam region within 24-48 hours.",
    specs: [
      { label: "Weight", value: "50kg per bag" },
      { label: "Setting time", value: "95 - 120 minutes" },
      { label: "Standard", value: "TZS 727-1 / EN 197-1" },
      { label: "Origin", value: "Mtwara, Tanzania" },
      { label: "Application", value: "Structural & general purpose" },
    ],
  },
  {
    id: "twiga-325r",
    name: "Twiga Extra Ordinary Portland Cement",
    category: "Cement",
    categorySlug: "cement",
    brand: "Twiga",
    price: 18200,
    unit: "50kg Bag",
    rating: 4.7,
    reviews: 950,
    location: "Dar es Salaam",
    seller: "Highland Builders",
    sellerId: "highland-builders",
    image: cement,
    verified: true,
    stock: "In Stock",
    minOrder: 10,
    sku: "TWG-CM-50",
    description:
      "Everyday cement for blockwork, plastering and slabs, milled at Tegeta and stocked in bulk for contract orders.",
    specs: [
      { label: "Weight", value: "50kg per bag" },
      { label: "Setting time", value: "100 - 130 minutes" },
      { label: "Standard", value: "TZS 727-1" },
      { label: "Origin", value: "Tegeta, Dar es Salaam" },
      { label: "Application", value: "General purpose" },
    ],
  },
  {
    id: "simba-tpcc",
    name: "Tanzania Portland Cement (Simba)",
    category: "Cement",
    categorySlug: "cement",
    brand: "Simba",
    price: 19200,
    unit: "50kg Bag",
    rating: 4.6,
    reviews: 820,
    location: "Dar es Salaam",
    seller: "Northern Hardware",
    sellerId: "northern-hardware",
    image: cement,
    verified: true,
    stock: "In Stock",
    minOrder: 20,
    sku: "SMB-CM-50",
    description:
      "Trusted local cement brand with consistent strength gain, widely used on residential projects across the coast.",
    specs: [
      { label: "Weight", value: "50kg per bag" },
      { label: "Setting time", value: "95 - 125 minutes" },
      { label: "Standard", value: "TZS 727-1" },
      { label: "Origin", value: "Wazo Hill, Dar es Salaam" },
      { label: "Application", value: "Structural" },
    ],
  },
  {
    id: "steel-12mm",
    name: "Deformed Steel Bars 12mm",
    category: "Steel",
    categorySlug: "steel",
    brand: "MM Integrated",
    price: 24500,
    unit: "Piece (12m)",
    rating: 4.9,
    reviews: 430,
    location: "Arusha",
    seller: "Kilimanjaro Steel Ltd",
    sellerId: "kilimanjaro-steel",
    image: steel,
    verified: true,
    stock: "Limited Stock",
    minOrder: 25,
    sku: "MMI-ST-12",
    description:
      "Ribbed reinforcement bars for beams, columns and slabs. Mill certificates supplied with every bundle.",
    specs: [
      { label: "Diameter", value: "12 mm" },
      { label: "Length", value: "12 m" },
      { label: "Grade", value: "B500B" },
      { label: "Weight", value: "10.66 kg per bar" },
      { label: "Application", value: "Reinforced concrete" },
    ],
  },
  {
    id: "red-clay-bricks",
    name: "Standard Red Clay Bricks",
    category: "Bricks",
    categorySlug: "bricks",
    brand: "Ujenzi Bora",
    price: 450,
    unit: "Piece",
    rating: 4.2,
    reviews: 210,
    location: "Dodoma",
    seller: "Central Bricks Co.",
    sellerId: "central-bricks",
    image: bricks,
    verified: true,
    stock: "In Stock",
    minOrder: 500,
    sku: "UJB-BR-01",
    description:
      "Kiln-fired clay bricks with even dimensions and low breakage rate, delivered by 7-tonne truck.",
    specs: [
      { label: "Dimensions", value: "230 x 110 x 76 mm" },
      { label: "Compressive strength", value: "7 N/mm²" },
      { label: "Water absorption", value: "< 15%" },
      { label: "Origin", value: "Dodoma" },
      { label: "Application", value: "Walling" },
    ],
  },
  {
    id: "river-sand",
    name: "Clean River Sand - Coarse",
    category: "Sand",
    categorySlug: "sand",
    brand: "Lake Sands",
    price: 380000,
    unit: "7 Ton Truck",
    rating: 4.7,
    reviews: 150,
    location: "Mwanza",
    seller: "Lake Sands & Aggregates",
    sellerId: "lake-sands",
    image: sand,
    verified: true,
    stock: "In Stock",
    minOrder: 1,
    sku: "LSA-SD-7T",
    description:
      "Washed river sand, low silt content, suitable for concrete mixes and plastering.",
    specs: [
      { label: "Load", value: "7 tonnes" },
      { label: "Silt content", value: "< 3%" },
      { label: "Grading", value: "Coarse" },
      { label: "Origin", value: "Mwanza" },
      { label: "Application", value: "Concrete & plaster" },
    ],
  },
  {
    id: "blue-gravel",
    name: "Crushed Blue Gravel (20mm)",
    category: "Gravel",
    categorySlug: "gravel",
    brand: "Coast Quarry",
    price: 420000,
    unit: "7 Ton Truck",
    rating: 4.6,
    reviews: 180,
    location: "Dar es Salaam",
    seller: "Coast Quarry Solutions",
    sellerId: "coast-quarry",
    image: gravel,
    verified: true,
    stock: "In Stock",
    minOrder: 1,
    sku: "CQS-GR-20",
    description:
      "Hard-stone 20mm aggregate for structural concrete, screened and washed at the quarry.",
    specs: [
      { label: "Nominal size", value: "20 mm" },
      { label: "Load", value: "7 tonnes" },
      { label: "Type", value: "Crushed hard stone" },
      { label: "Origin", value: "Mkuranga quarry" },
      { label: "Application", value: "Structural concrete" },
    ],
  },
  {
    id: "paving-blocks",
    name: "Paving Blocks (Zig-Zag)",
    category: "Bricks",
    categorySlug: "bricks",
    brand: "Island Pavers",
    price: 1200,
    unit: "Piece",
    rating: 4.9,
    reviews: 96,
    location: "Zanzibar",
    seller: "Island Pavers",
    sellerId: "island-pavers",
    image: bricks,
    verified: true,
    stock: "In Stock",
    minOrder: 200,
    sku: "ISP-PV-ZZ",
    description:
      "Interlocking concrete pavers for driveways and yards, 60mm thickness, grey finish.",
    specs: [
      { label: "Thickness", value: "60 mm" },
      { label: "Strength", value: "35 N/mm²" },
      { label: "Coverage", value: "39 pieces per m²" },
      { label: "Origin", value: "Zanzibar" },
      { label: "Application", value: "Paving" },
    ],
  },
];

export type Equipment = {
  id: string;
  name: string;
  brand: string;
  price: number;
  rentPerDay: number;
  condition: string;
  year: number;
  location: string;
  seller: string;
  sellerId: string;
  image: string;
  sku: string;
  note: string;
  specs: { label: string; value: string }[];
};

export const EQUIPMENT: Equipment[] = [
  {
    id: "cat-320d",
    name: "CAT 320D Hydraulic Excavator",
    brand: "Caterpillar Inc.",
    price: 85000000,
    rentPerDay: 850000,
    condition: "New",
    year: 2024,
    location: "Kurasini, Dar es Salaam",
    seller: "Mwananchi Construction Ltd",
    sellerId: "mwananchi-construction",
    image: excavator,
    sku: "CAT-320D-2024-TZ",
    note: "Optimised for fuel efficiency and low operating costs in Tanzanian climates. Heavy-duty undercarriage and high-performance hydraulics as standard.",
    specs: [
      { label: "Net power", value: "103 kW / 138 hp" },
      { label: "Engine model", value: "C7.1 ACERT" },
      { label: "Fuel tank", value: "410 litres" },
      { label: "Operating weight", value: "21,500 kg" },
      { label: "Max digging depth", value: "6.72 m" },
      { label: "Transport width", value: "2.98 m" },
    ],
  },
  {
    id: "cat-320gc",
    name: "CAT 320 GC Next Gen Hydraulic",
    brand: "Caterpillar Inc.",
    price: 92000000,
    rentPerDay: 900000,
    condition: "New",
    year: 2025,
    location: "Dar es Salaam",
    seller: "Mwananchi Construction Ltd",
    sellerId: "mwananchi-construction",
    image: excavator,
    sku: "CAT-320GC-2025-TZ",
    note: "Next generation control system with lower fuel burn and simplified servicing intervals.",
    specs: [
      { label: "Net power", value: "90 kW / 121 hp" },
      { label: "Engine model", value: "C4.4" },
      { label: "Fuel tank", value: "360 litres" },
      { label: "Operating weight", value: "20,900 kg" },
      { label: "Max digging depth", value: "6.72 m" },
      { label: "Transport width", value: "2.84 m" },
    ],
  },
  {
    id: "jcb-3dx",
    name: "JCB 3DX Backhoe Loader",
    brand: "JCB",
    price: 64000000,
    rentPerDay: 520000,
    condition: "Used - Good",
    year: 2021,
    location: "Arusha",
    seller: "Kilimanjaro Steel Ltd",
    sellerId: "kilimanjaro-steel",
    image: excavator,
    sku: "JCB-3DX-2021-TZ",
    note: "Well maintained site machine with 3,400 recorded hours and full service history.",
    specs: [
      { label: "Net power", value: "68 kW / 92 hp" },
      { label: "Engine model", value: "JCB EcoMAX" },
      { label: "Fuel tank", value: "160 litres" },
      { label: "Operating weight", value: "7,900 kg" },
      { label: "Max digging depth", value: "4.54 m" },
      { label: "Transport width", value: "2.35 m" },
    ],
  },
  {
    id: "concrete-mixer",
    name: "Self-Loading Concrete Mixer 2.5m³",
    brand: "Fiori",
    price: 118000000,
    rentPerDay: 1100000,
    condition: "Like New",
    year: 2023,
    location: "Mwanza",
    seller: "Lake Sands & Aggregates",
    sellerId: "lake-sands",
    image: excavator,
    sku: "FRI-DB250-2023",
    note: "Self-loading batching mixer for remote sites without a ready-mix plant nearby.",
    specs: [
      { label: "Drum capacity", value: "2.5 m³" },
      { label: "Net power", value: "74 kW / 99 hp" },
      { label: "Fuel tank", value: "120 litres" },
      { label: "Operating weight", value: "9,800 kg" },
      { label: "Discharge height", value: "2.4 m" },
      { label: "Transport width", value: "2.30 m" },
    ],
  },
];

export type Supplier = {
  id: string;
  name: string;
  tagline: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  about: string;
  stats: { label: string; value: string }[];
  phone: string;
  email: string;
  website: string;
  address: string;
  licenses: { name: string; status: string }[];
  activity: { name: string; date: string; status: string }[];
};

export const SUPPLIERS: Supplier[] = [
  {
    id: "mwananchi-construction",
    name: "Mwananchi Construction Ltd",
    tagline: "Class I Civil Contractor",
    location: "Kinondoni, Dar es Salaam, Tanzania",
    rating: 4.9,
    reviews: 128,
    verified: true,
    about:
      "Mwananchi Construction Ltd is a Tier-1 civil engineering and building construction firm based in Tanzania. Established in 1998, we have delivered over 200 large-scale infrastructure projects across East Africa, ranging from commercial towers to critical road networks.",
    stats: [
      { label: "Years exp.", value: "25+" },
      { label: "Employees", value: "150+" },
      { label: "Projects", value: "400+" },
      { label: "Awards", value: "12" },
    ],
    phone: "+255 22 211 4455",
    email: "info@mwananchiconstruction.co.tz",
    website: "www.mwananchi.co.tz",
    address: "Plot 42, Sam Nujoma Road, Dar es Salaam",
    licenses: [
      { name: "CRB Registration", status: "Active" },
      { name: "ISO 9001:2015", status: "Verified" },
    ],
    activity: [
      { name: "Kigamboni Bridge Phase 2", date: "June 2026", status: "Ongoing" },
      { name: "Mlimani City Expansion", date: "April 2026", status: "Completed" },
    ],
  },
  {
    id: "kilimanjaro-steel",
    name: "Kilimanjaro Steel Ltd",
    tagline: "Steel manufacturer & stockist",
    location: "Arusha, Tanzania",
    rating: 4.7,
    reviews: 86,
    verified: true,
    about:
      "Northern Tanzania's largest reinforcement bar stockist, supplying mill-certified steel to contractors across Arusha, Kilimanjaro and Manyara.",
    stats: [
      { label: "Years exp.", value: "18" },
      { label: "Employees", value: "70" },
      { label: "Projects", value: "220" },
      { label: "Awards", value: "4" },
    ],
    phone: "+255 27 254 8890",
    email: "sales@kilimanjarosteel.co.tz",
    website: "www.kilimanjarosteel.co.tz",
    address: "Njiro Industrial Area, Arusha",
    licenses: [
      { name: "TBS Certification", status: "Active" },
      { name: "CRB Registration", status: "Verified" },
    ],
    activity: [
      { name: "Arusha Ring Road rebar supply", date: "May 2026", status: "Ongoing" },
      { name: "Moshi Warehouse frame", date: "February 2026", status: "Completed" },
    ],
  },
  {
    id: "coast-quarry",
    name: "Coast Quarry Solutions",
    tagline: "Aggregates & quarry products",
    location: "Mkuranga, Pwani",
    rating: 4.6,
    reviews: 64,
    verified: true,
    about:
      "Hard-stone quarry supplying washed aggregates, ballast and quarry dust with own fleet of tipper trucks serving the Dar es Salaam region.",
    stats: [
      { label: "Years exp.", value: "12" },
      { label: "Employees", value: "95" },
      { label: "Projects", value: "310" },
      { label: "Awards", value: "2" },
    ],
    phone: "+255 22 286 1120",
    email: "orders@coastquarry.co.tz",
    website: "www.coastquarry.co.tz",
    address: "Mkuranga Quarry Road, Pwani",
    licenses: [
      { name: "Mining licence", status: "Active" },
      { name: "NEMC Compliance", status: "Verified" },
    ],
    activity: [
      { name: "Kigamboni aggregate contract", date: "June 2026", status: "Ongoing" },
      { name: "Mbagala road base supply", date: "March 2026", status: "Completed" },
    ],
  },
];

export type Professional = {
  id: string;
  name: string;
  profession: string;
  location: string;
  rating: number;
  reviews: number;
  rate: string;
  licence: string;
  bio: string;
  skills: string[];
  projects: { name: string; year: string }[];
};

export const PROFESSIONALS: Professional[] = [
  {
    id: "asha-mrema",
    name: "Asha Mrema",
    profession: "Architect",
    location: "Dar es Salaam",
    rating: 4.9,
    reviews: 62,
    rate: "TZS 250,000 / day",
    licence: "Registered Architect (AQRB)",
    bio: "Residential and mixed-use architect with 14 years of practice across the coast, specialising in climate-responsive housing.",
    skills: ["Concept design", "Council approvals", "Site supervision"],
    projects: [
      { name: "Masaki Duplex Villas", year: "2025" },
      { name: "Mbezi Beach Apartments", year: "2024" },
    ],
  },
  {
    id: "john-kimaro",
    name: "John Kimaro",
    profession: "Civil Engineer",
    location: "Arusha",
    rating: 4.8,
    reviews: 48,
    rate: "TZS 220,000 / day",
    licence: "Registered Engineer (ERB)",
    bio: "Structural design and supervision for commercial frames, bridges and water infrastructure in the northern zone.",
    skills: ["Structural design", "Bill of quantities", "Load testing"],
    projects: [
      { name: "Njiro Office Block", year: "2025" },
      { name: "Themi River Footbridge", year: "2023" },
    ],
  },
  {
    id: "salma-hassan",
    name: "Salma Hassan",
    profession: "Quantity Surveyor",
    location: "Mwanza",
    rating: 4.7,
    reviews: 35,
    rate: "TZS 180,000 / day",
    licence: "Registered QS (AQRB)",
    bio: "Cost planning and contract administration for public sector and donor-funded construction projects.",
    skills: ["Cost planning", "Valuations", "Claims"],
    projects: [
      { name: "Nyamagana Market", year: "2025" },
      { name: "Ilemela Clinic", year: "2024" },
    ],
  },
  {
    id: "peter-mushi",
    name: "Peter Mushi",
    profession: "Contractor",
    location: "Dodoma",
    rating: 4.6,
    reviews: 51,
    rate: "Project based",
    licence: "Class III Building Contractor (CRB)",
    bio: "Turnkey residential builder handling foundations through finishes with an in-house crew of 30.",
    skills: ["Turnkey builds", "Renovation", "Roofing"],
    projects: [
      { name: "Area D Housing Scheme", year: "2026" },
      { name: "Chamwino Retail Row", year: "2024" },
    ],
  },
  {
    id: "grace-ndossi",
    name: "Grace Ndossi",
    profession: "Electrician",
    location: "Dar es Salaam",
    rating: 4.8,
    reviews: 73,
    rate: "TZS 90,000 / day",
    licence: "Class B Electrical Licence (EWURA)",
    bio: "Domestic and commercial electrical installation, solar backup systems and TANESCO connection paperwork.",
    skills: ["Wiring", "Solar backup", "Inspection"],
    projects: [
      { name: "Sinza Apartments rewiring", year: "2026" },
      { name: "Tegeta Warehouse solar", year: "2025" },
    ],
  },
  {
    id: "ibrahim-juma",
    name: "Ibrahim Juma",
    profession: "Plumber",
    location: "Mbeya",
    rating: 4.5,
    reviews: 29,
    rate: "TZS 80,000 / day",
    licence: "Certified Plumber (VETA)",
    bio: "Water reticulation, drainage and pump installation for homes, schools and small industrial sites.",
    skills: ["Reticulation", "Drainage", "Pump install"],
    projects: [
      { name: "Iyunga School water works", year: "2025" },
      { name: "Mbeya Lodge plumbing", year: "2024" },
    ],
  },
];

export const SELLER_ORDERS = [
  { id: "JH-10241", buyer: "Ascent Builders", item: "Dangote 42.5N Cement x 200", total: 3700000, status: "In Transit", date: "07 Sep 2026" },
  { id: "JH-10238", buyer: "Kizota Homes", item: "Deformed Steel Bars 12mm x 60", total: 1470000, status: "Awaiting Pickup", date: "06 Sep 2026" },
  { id: "JH-10235", buyer: "Bahari Developers", item: "Crushed Blue Gravel x 3 trucks", total: 1260000, status: "Delivered", date: "04 Sep 2026" },
  { id: "JH-10230", buyer: "Msasani Villas", item: "Paving Blocks x 1,400", total: 1680000, status: "Delivered", date: "02 Sep 2026" },
  { id: "JH-10226", buyer: "Tumaini Contractors", item: "Clean River Sand x 2 trucks", total: 760000, status: "Cancelled", date: "31 Aug 2026" },
];

export const SELLER_RENTALS = [
  { id: "RN-4410", machine: "CAT 320D Hydraulic Excavator", customer: "Kigamboni Bridge JV", from: "05 Sep 2026", to: "19 Sep 2026", rate: 850000, status: "Active" },
  { id: "RN-4402", machine: "JCB 3DX Backhoe Loader", customer: "Arusha Ring Road", from: "28 Aug 2026", to: "11 Sep 2026", rate: 520000, status: "Active" },
  { id: "RN-4391", machine: "Self-Loading Concrete Mixer", customer: "Nyamagana Market", from: "12 Aug 2026", to: "26 Aug 2026", rate: 1100000, status: "Returned" },
];

export const SALES_TREND = [
  { day: "Mon", value: 1.3 },
  { day: "Tue", value: 1.1 },
  { day: "Wed", value: 1.6 },
  { day: "Thu", value: 2.1 },
  { day: "Fri", value: 1.9 },
  { day: "Sat", value: 2.5 },
  { day: "Sun", value: 1.8 },
];

export const VERIFICATION_QUEUE = [
  { id: "VR-881", applicant: "Highland Builders", type: "Supplier", document: "CRB Registration", submitted: "06 Sep 2026", status: "Pending" },
  { id: "VR-877", applicant: "Grace Ndossi", type: "Professional", document: "Electrical Licence", submitted: "05 Sep 2026", status: "Pending" },
  { id: "VR-874", applicant: "Island Pavers", type: "Supplier", document: "TBS Certificate", submitted: "04 Sep 2026", status: "Approved" },
  { id: "VR-869", applicant: "Tumaini Contractors", type: "Professional", document: "CRB Class IV", submitted: "01 Sep 2026", status: "Rejected" },
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getEquipment(id: string) {
  return EQUIPMENT.find((e) => e.id === id);
}

export function getSupplier(id: string) {
  return SUPPLIERS.find((s) => s.id === id);
}

export function getProfessional(id: string) {
  return PROFESSIONALS.find((p) => p.id === id);
}
