import { Megaphone, Target, Users, Sparkles } from "lucide-react";

const items = [
  { icon: Megaphone, title: "Promosi 100+ Akun", desc: "Asetmu di-blast ke ratusan akun aktif dengan jangkauan ribuan view per hari." },
  { icon: Target, title: "Target Market Tepat", desc: "Konten masuk ke audiens yang benar-benar butuh — bukan asal posting." },
  { icon: Users, title: "Tim Bantu Handling", desc: "Chat masuk kami filter & arahkan, kamu tinggal closing dengan pembeli serius." },
  { icon: Sparkles, title: "Optimasi Konten", desc: "Foto & caption dibuat menarik, scroll-stopping, dan terbukti convert." },
];

const Solution = () => (
  <section className="py-20 lg:py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-radial-gold opacity-50 pointer-events-none" />
    <div className="container relative">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Solusi</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
          Kami <span className="text-gradient-gold">Solusinya</span>
        </h2>
        <p className="text-muted-foreground text-lg">Sistem promosi yang sudah teruji bantu ratusan klien cepat closing.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {items.map((it) => (
          <div key={it.title} className="flex gap-5 p-7 rounded-2xl bg-card/60 backdrop-blur border border-border hover:border-primary/40 transition-all shadow-card">
            <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center text-primary-foreground shadow-gold">
              <it.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-2">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Solution;
