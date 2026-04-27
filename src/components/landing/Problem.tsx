import { Frown, MessageSquareX, TrendingDown, Clock } from "lucide-react";

const problems = [
  { icon: Frown, title: "Sepi Peminat", desc: "Posting berhari-hari, view sedikit, chat nihil." },
  { icon: MessageSquareX, title: "Capek Jawab Chat", desc: "Banyak nanya, ujung-ujungnya cuma PHP." },
  { icon: TrendingDown, title: "Ditawar Sadis", desc: "Harga ditekan terus sampai rugi sendiri." },
  { icon: Clock, title: "Lama Tidak Laku", desc: "Aset menumpuk, modal nyangkut, waktu terbuang." },
];

const Problem = () => (
  <section className="py-20 lg:py-28 bg-gradient-navy">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Masalah</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
          Kenapa Susah Jual <span className="text-gradient-gold">Sendiri?</span>
        </h2>
        <p className="text-muted-foreground text-lg">Ini yang biasanya bikin frustrasi saat coba jual sendiri.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {problems.map((p, i) => (
          <div key={p.title} className="group relative p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all hover:-translate-y-1 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5 text-destructive">
              <p.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Problem;
