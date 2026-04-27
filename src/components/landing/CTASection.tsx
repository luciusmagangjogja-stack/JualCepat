import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const CTASection = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Permintaan diterima!", { description: "Tim kami akan menghubungi via WhatsApp dalam 5 menit." });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <section id="cta" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold opacity-70 pointer-events-none" />
      <div className="container relative">
        <div className="max-w-5xl mx-auto rounded-3xl bg-card border border-primary/30 shadow-elevated p-8 lg:p-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5">
              Mulai Jual Sekarang Sebelum <span className="text-gradient-gold">Ketinggalan Pembeli</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-7 leading-relaxed">
              Slot harian terbatas. Konsultasi gratis via WhatsApp — tim kami balas dalam 5 menit.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="gold" size="xl" asChild>
                <a href="https://wa.me/6281234567890?text=Halo%20JualCepat%2C%20saya%20mau%20jual%20aset" target="_blank" rel="noopener">
                  <MessageCircle /> Chat WhatsApp
                </a>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gradient-gold border-2 border-card" />)}
              </div>
              <span>500+ klien sudah memulai bulan ini</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-background/60 backdrop-blur p-6 rounded-2xl border border-border space-y-4">
            <h3 className="font-display text-xl font-bold mb-1">Atau isi form di bawah</h3>
            <p className="text-xs text-muted-foreground mb-3">Kami akan hubungi via WhatsApp.</p>
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" required placeholder="Nama lengkap" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wa">No. WhatsApp</Label>
              <Input id="wa" type="tel" required placeholder="08xxxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aset">Mau jual apa?</Label>
              <Input id="aset" required placeholder="Motor / barang kos / kontrakan" />
            </div>
            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Mengirim..." : <>Kirim Sekarang <ArrowRight /></>}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
