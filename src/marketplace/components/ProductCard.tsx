import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Product, formatRupiah } from "../types";

export default function ProductCard({ p }: { p: Product }) {
  const img = p.images[0] || "/placeholder.svg";
  return (
    <Link
      to={`/marketplace/produk/${p.slug}`}
      className="group bg-card rounded-xl overflow-hidden border hover:shadow-mp-soft transition-all"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={img}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {p.status === "sold" && (
          <div className="absolute inset-0 bg-foreground/60 grid place-items-center">
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded font-bold text-sm">SOLD</span>
          </div>
        )}
        {p.status === "available" && p.badge !== "none" && (
          <span
            className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded font-semibold ${
              p.badge === "hot" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            {p.badge === "hot" ? "🔥 HOT" : "✨ BARU"}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{p.title}</h3>
        <p className="font-bold text-primary mt-1">{formatRupiah(p.price)}</p>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {p.location || "—"}
        </p>
      </div>
    </Link>
  );
}