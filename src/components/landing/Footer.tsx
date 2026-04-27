const Footer = () => (
  <footer className="border-t border-border py-10 bg-background">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-gold flex items-center justify-center font-display font-black text-primary-foreground text-sm">J</div>
        <span className="font-display font-bold text-foreground">JualCepat</span>
      </div>
      <div>© {new Date().getFullYear()} JualCepat. Cepat laku, tanpa ribet.</div>
      <div className="flex gap-5">
        <a href="#layanan" className="hover:text-foreground transition-colors">Layanan</a>
        <a href="#harga" className="hover:text-foreground transition-colors">Harga</a>
        <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
      </div>
    </div>
  </footer>
);

export default Footer;
