import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Apakah aman menggunakan jasa ini?", a: "Aman. Kami hanya membantu mempromosikan, transaksi tetap dilakukan langsung antara kamu dan pembeli. Tidak ada biaya tersembunyi." },
  { q: "Berapa lama biasanya laku?", a: "Rata-rata 3-7 hari untuk motor & barang kos. Untuk kos/kontrakan rata-rata 7-14 hari, tergantung lokasi & harga." },
  { q: "Apakah harga aset saya akan ditentukan kalian?", a: "Tidak. Harga tetap kamu yang menentukan. Tim kami hanya memberi saran agar lebih kompetitif & cepat closing." },
  { q: "Saya di luar kota, apakah bisa?", a: "Bisa. Selama bisa kirim foto & info via WhatsApp, kami bisa promosikan ke market yang sesuai." },
  { q: "Bagaimana cara membayar?", a: "Pembayaran transfer bank / e-wallet. Setelah pembayaran, slot kamu langsung kami siapkan." },
  { q: "Apakah ada garansi laku?", a: "Untuk paket Premium, kami garansi repost otomatis sampai 14 hari. Untuk yang lain, kami selalu optimasi konten agar peluang closing maksimal." },
];

const FAQ = () => (
  <section id="faq" className="py-20 lg:py-28 bg-gradient-navy">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">FAQ</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
          Pertanyaan <span className="text-gradient-gold">Sering Ditanya</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border border-border bg-card rounded-2xl px-6 shadow-card">
            <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
