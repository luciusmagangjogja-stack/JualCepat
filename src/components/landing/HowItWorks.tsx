import { Send, FileEdit, Share2, Handshake } from "lucide-react";

const steps = [
  { icon: Send, title: "Kirim Data", desc: "Kasih kami foto & info aset via WhatsApp." },
  { icon: FileEdit, title: "Tim Buat Konten", desc: "Caption & visual menarik kami siapkan." },
  { icon: Share2, title: "Sebar Ke Banyak Akun", desc: "Posting serentak ke 100+ akun aktif." },
  { icon: Handshake, title: "Calon Pembeli Datang", desc: "Tinggal closing — kami bantu sampai laku." },
];

const HowItWorks = () => (
  <section id="cara-kerja" className="py-20 lg:py-28 bg-gradient-navy">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Cara Kerja</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
          4 Langkah, <span className="text-gradient-gold">Aset Cepat Laku</span>
        </h2>
      </div>

      <div className="relative grid md:grid-cols-4 gap-6">
        <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {steps.map((s, i) => (
          <div key={s.title} className="relative text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-gold text-primary-foreground mb-5 shadow-gold">
              <s.icon className="w-7 h-7" />
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border-2 border-primary text-primary text-xs font-bold flex items-center justify-center">
                {i+1}
              </div>
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
