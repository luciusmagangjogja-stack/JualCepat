import { Link, NavLink } from "react-router-dom";
import { Store } from "lucide-react";

export default function TopNavbar() {
  const items = [
    { to: "/marketplace", label: "Home", end: true },
    { to: "/marketplace/kategori", label: "Kategori" },
    { to: "/marketplace/baru", label: "Terbaru" },
    { to: "/marketplace/kontak", label: "Kontak" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <Link to="/marketplace" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-9 h-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <Store className="w-5 h-5" />
          </span>
          <span>JualCepat</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {i.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}