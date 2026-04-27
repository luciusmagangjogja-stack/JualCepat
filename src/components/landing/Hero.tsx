import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

const Hero = () => (
  <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
    <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

    <div className="container relative grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
      <div className="animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-gold" />
          100+ akun promosi aktif setiap hari
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] mb-6">
          Jual Motor, Barang Kos & <span className="text-gradient-gold">Properti</span> Lebih Cepat Tanpa Ribet
        </h1>

        <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Kami bantu promosikan asetmu ke <strong className="text-foreground">ratusan akun</strong> & ribuan calon pembeli setiap hari. Tinggal duduk manis, biar kami yang jualkan.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <Button variant="gold" size="xl" asChild>
            <a href="#cta">Jual Sekarang <ArrowRight /></a>
          </Button>
          <Button variant="goldOutline" size="xl" asChild>
            <a href="#cta"><MessageCircle /> Konsultasi Gratis</a>
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Sudah terbukti</div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Cepat laku</div>
          <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> Mulai 35rb</div>
        </div>
      </div>

      <div className="relative animate-fade-up [animation-delay:200ms]">
        <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
        <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-primary/20 animate-float">
          <img src={heroImg} alt="Jual motor cepat tanpa ribet bersama JualCepat" width={1024} height={1024} className="w-full h-auto" />
        </div>

        <div className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur border border-border rounded-2xl p-4 shadow-card hidden sm:block">
          <div className="text-xs text-muted-foreground mb-1">Closing rata-rata</div>
          <div className="font-display text-2xl font-bold text-gradient-gold">3-7 hari</div>
        </div>
        <div className="absolute -top-4 -right-4 bg-card/95 backdrop-blur border border-border rounded-2xl px-4 py-3 shadow-card hidden sm:flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gradient-gold border-2 border-card" />)}
          </div>
          <div className="text-sm">
            <div className="font-bold">500+ klien</div>
            <div className="text-xs text-muted-foreground">sudah terbantu</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
