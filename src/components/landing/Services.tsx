import { Bike, Sofa, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bike,
    title: "Jual Motor Bekas",
    benefit: "Cepat laku 3-7 hari, harga tetap bagus.",
    steps: ["Kirim foto & detail motor", "Tim buat konten menarik", "Dipost ke 100+ akun", "Pembeli serius datang"],
  },
  {
    icon: Sofa,
    title: "Jual Barang Kos",
    benefit: "Perabot, elektronik, dll — gak perlu nungguin lama.",
    steps: ["Foto barang", "Tentukan harga bareng tim", "Kami promosikan", "Tinggal closing"],
  },
  {
    icon: Building2,
    title: "Promosi Kos / Kontrakan",
    benefit: "Kamar cepat terisi, hemat biaya iklan.",
    steps: ["Kirim info & foto kos", "Konten dibuat ciamik", "Sebar ke target anak kos", "Calon penghuni datang"],
  },
];

const Services = () => (
  <section id="layanan" className="py-20 lg:py-28 bg-gradient-navy">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Layanan</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
          Apa Saja Yang Bisa <span className="text-gradient-gold">Kami Bantu Jualkan?</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-2 shadow-card flex flex-col">
            <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center text-primary-foreground mb-6 shadow-gold">
              <s.icon className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">{s.title}</h3>
            <p className="text-primary text-sm font-medium mb-5">{s.benefit}</p>

            <ol className="space-y-2 mb-7 flex-1">
              {s.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <Button variant="goldOutline" asChild>
              <a href="#cta">Pilih Layanan <ArrowRight /></a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
