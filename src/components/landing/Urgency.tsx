import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const Urgency = () => {
  const [time, setTime] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-navy border border-primary/40 shadow-elevated p-8 lg:p-12">
          <div className="absolute inset-0 bg-radial-gold opacity-60 pointer-events-none" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/15 border border-destructive/30 text-destructive text-xs font-bold mb-4">
                <Flame className="w-3.5 h-3.5" /> SLOT TERBATAS HARI INI
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                Semakin Cepat Dipost, <span className="text-gradient-gold">Semakin Cepat Laku</span>
              </h2>
              <p className="text-muted-foreground">Slot promosi harian terbatas. Sisa waktu hari ini:</p>
            </div>
            <div className="flex gap-3 justify-center">
              {[{l:"Jam",v:time.h},{l:"Menit",v:time.m},{l:"Detik",v:time.s}].map(({l,v}) => (
                <div key={l} className="w-20 text-center">
                  <div className="rounded-xl bg-card border border-primary/30 py-3 font-display text-3xl font-black text-gradient-gold tabular-nums">{pad(v)}</div>
                  <div className="text-xs text-muted-foreground mt-1.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urgency;
