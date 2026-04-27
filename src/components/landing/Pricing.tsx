import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Hemat",
    price: "35rb",
    desc: "Cocok untuk barang kos / item ringan.",
    features: ["Posting di 30 akun", "Konten standard", "Durasi 3 hari", "Support WhatsApp"],
    cta: "Pilih Hemat",
  },
  {
    name: "Standard",
    price: "99rb",
    desc: "Paling banyak dipilih untuk motor & kos.",
    features: ["Posting di 70+ akun", "Konten premium", "Durasi 7 hari", "Filter chat masuk", "Repost otomatis"],
    cta: "Pilih Standard",
    popular: true,
  },
  {
    name: "Premium",
    price: "249rb",
    desc: "Maksimal eksposur & closing tercepat.",
    features: ["Posting di 100+ akun", "Konten premium + video", "Durasi 14 hari", "Handle chat full", "Optimasi harian", "Garansi repost"],
    cta: "Pilih Premium",
  },
];

const Pricing = () => (
  <section id="harga" className="py-20 lg:py-28">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Harga</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
          Mulai dari <span className="text-gradient-gold">35rb</span> Saja
        </h2>
        <p className="text-muted-foreground text-lg">Pilih paket yang paling pas untuk kebutuhanmu.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map(p => (
          <div key={p.name} className={`relative p-8 rounded-3xl border transition-all ${p.popular ? "bg-gradient-navy border-primary/60 shadow-elevated lg:-translate-y-4 lg:scale-105" : "bg-card border-border shadow-card hover:border-primary/30"}`}>
            {p.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold shadow-gold">
                <Sparkles className="w-3.5 h-3.5" /> PALING POPULER
              </div>
            )}
            <h3 className="font-display text-2xl font-bold mb-1">{p.name}</h3>
            <p className="text-muted-foreground text-sm mb-5">{p.desc}</p>
            <div className="flex items-baseline gap-1 mb-7">
              <span className="font-display text-5xl font-black text-gradient-gold">{p.price}</span>
              <span className="text-muted-foreground text-sm">/ aset</span>
            </div>
            <ul className="space-y-3 mb-8">
              {p.features.map(f => (
                <li key={f} className="flex gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button variant={p.popular ? "gold" : "goldOutline"} className="w-full" size="lg" asChild>
              <a href="#cta">{p.cta}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
