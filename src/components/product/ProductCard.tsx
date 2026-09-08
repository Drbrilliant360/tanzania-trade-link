import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatTZS } from "@/lib/format";
import { RatingStars, StatusPill, VerifiedBadge, toneForStatus } from "@/components/common/Badges";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden panel transition hover:shadow-lg">
      <div className="relative bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3">
          <StatusPill tone={toneForStatus(product.stock)}>{product.stock}</StatusPill>
        </div>
        {product.verified && (
          <div className="absolute right-3 top-3">
            <VerifiedBadge />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="eyebrow">{product.category}</span>
          <RatingStars value={product.rating} />
        </div>
        <h3 className="mt-2 text-base leading-snug">{product.name}</h3>
        <p className="mt-2 price text-lg">
          {formatTZS(product.price)}
          <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
            / {product.unit}
          </span>
        </p>

        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {product.location}
        </div>
        <div className="mt-2 flex items-center gap-2 border-t border-border pt-3 text-xs">
          <span className="rounded bg-muted px-1.5 py-0.5 font-semibold uppercase tracking-wide text-muted-foreground">
            Seller
          </span>
          <span className="truncate text-muted-foreground">{product.seller}</span>
        </div>

        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-border text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
