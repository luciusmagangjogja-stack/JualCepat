import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Sparkles, MessageCircle } from "lucide-react";

const items = [
  { to: "/marketplace", label: "Home", Icon: Home, end: true },
  { to: "/marketplace/kategori", label: "Kategori", Icon: LayoutGrid },
  { to: "/marketplace/baru", label: "Terbaru", Icon: Sparkles },
  { to: "/marketplace/kontak", label: "Kontak", Icon: MessageCircle },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t">
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-xs ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}