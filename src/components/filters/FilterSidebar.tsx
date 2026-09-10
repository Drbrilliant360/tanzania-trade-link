import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, REGIONS, SELLER_TYPES } from "@/lib/constants";
import { formatNumber } from "@/lib/format";

export type Filters = {
  categories: string[];
  regions: string[];
  sellerTypes: string[];
  maxPrice: number;
};

export const EMPTY_FILTERS: Filters = {
  categories: [],
  regions: [],
  sellerTypes: [],
  maxPrice: 500000,
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[oklch(0.653_0.184_42.5)]"
      />
      <span className={checked ? "font-medium text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
    </label>
  );
}

export function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount =
    filters.categories.length + filters.regions.length + filters.sellerTypes.length;

  return (
    <aside className="w-full shrink-0 rounded-xl border border-border p-4 lg:w-64 lg:rounded-none lg:border-0 lg:p-0">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between lg:pb-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 items-center gap-2 text-left lg:pointer-events-none"
        >
          <span className="eyebrow flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" /> Filters
            {activeCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted-foreground transition lg:hidden ${open ? "rotate-180" : ""}`}
          />
        </button>
        <button
          className="shrink-0 text-xs font-semibold text-primary"
          onClick={() => onChange(EMPTY_FILTERS)}
        >
          Clear all
        </button>
      </div>

      <div className={open ? "block" : "hidden lg:block"}>


      <section className="border-t border-border py-5">
        <p className="eyebrow pb-2">Categories</p>
        {CATEGORIES.slice(0, 7).map((c) => (
          <Check
            key={c.slug}
            label={c.name}
            checked={filters.categories.includes(c.name)}
            onChange={() =>
              onChange({ ...filters, categories: toggle(filters.categories, c.name) })
            }
          />
        ))}
      </section>

      <section className="border-t border-border py-5">
        <p className="eyebrow pb-3">Price range (TZS)</p>
        <input
          type="range"
          min={1000}
          max={500000}
          step={1000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[oklch(0.653_0.184_42.5)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Up to <span className="font-semibold text-foreground">{formatNumber(filters.maxPrice)}</span>{" "}
          per unit
        </p>
      </section>

      <section className="border-t border-border py-5">
        <p className="eyebrow pb-2">Location</p>
        {REGIONS.slice(0, 7).map((r) => (
          <Check
            key={r}
            label={r}
            checked={filters.regions.includes(r)}
            onChange={() => onChange({ ...filters, regions: toggle(filters.regions, r) })}
          />
        ))}
      </section>

      <section className="border-t border-border py-5">
        <p className="eyebrow pb-2">Seller type</p>
        {SELLER_TYPES.map((t) => (
          <Check
            key={t}
            label={t}
            checked={filters.sellerTypes.includes(t)}
            onChange={() => onChange({ ...filters, sellerTypes: toggle(filters.sellerTypes, t) })}
          />
        ))}
      </section>
      </div>
    </aside>
  );
}

export function applyFilters<T extends { category: string; location: string; price: number; verified: boolean }>(
  items: T[],
  filters: Filters,
) {
  return items.filter((item) => {
    if (filters.categories.length && !filters.categories.includes(item.category)) return false;
    if (filters.regions.length && !filters.regions.includes(item.location)) return false;
    if (filters.sellerTypes.includes("Verified Suppliers Only") && !item.verified) return false;
    if (item.price > filters.maxPrice && item.price < 100000) return false;
    return true;
  });
}
