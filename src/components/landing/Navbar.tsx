import { Button } from "@/components/ui/button";

const Navbar = () => (
  <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
    <div className="container flex items-center justify-between h-16">
      <a href="#" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center font-display font-black text-primary-foreground">J</div>
        <span className="font-display text-xl font-bold tracking-tight">JualCepat</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#layanan" className="hover:text-foreground transition-colors">Layanan</a>
        <a href="#cara-kerja" className="hover:text-foreground transition-colors">Cara Kerja</a>
        <a href="#harga" className="hover:text-foreground transition-colors">Harga</a>
        <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
      </nav>
      <Button variant="gold" size="sm" asChild>
        <a href="#cta">Jual Sekarang</a>
      </Button>
    </div>
  </header>
);

export default Navbar;
