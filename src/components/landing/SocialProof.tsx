import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Andi P.", role: "Penjual Motor Beat", text: "Motor saya laku 4 hari setelah dipromosiin. Padahal sebelumnya 3 minggu sepi peminat!", rating: 5 },
  { name: "Sinta R.", role: "Pemilik Kos Depok", text: "Kamar yang kosong 2 bulan, langsung penuh dalam 10 hari. Sangat membantu!", rating: 5 },
  { name: "Budi H.", role: "Anak Kos Jogja", text: "Kulkas & kasur saya laku cepat sebelum balik kampung. Recommended banget.", rating: 5 },
];

const stats = [
  { value: "100+", label: "Akun promosi aktif" },
  { value: "10.000+", label: "Jangkauan harian" },
  { value: "500+", label: "Klien terbantu" },
  { value: "3-7 hari", label: "Rata-rata closing" },
];

const SocialProof = () => (
  <section className="py-20 lg:py-28">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Bukti Nyata</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4">
          Sudah Banyak Yang <span className="text-gradient-gold">Terbantu</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {stats.map(s => (
          <div key={s.label} className="p-6 rounded-2xl bg-gradient-navy border border-primary/20 text-center shadow-card">
            <div className="font-display text-3xl lg:text-4xl font-black text-gradient-gold mb-1">{s.value}</div>
            <div className="text-xs lg:text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map(t => (
          <div key={t.name} className="relative p-7 rounded-2xl bg-card border border-border shadow-card">
            <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/20" />
            <div className="flex gap-1 mb-4">
              {Array.from({length: t.rating}).map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
            </div>
            <p className="text-foreground/90 mb-5 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
