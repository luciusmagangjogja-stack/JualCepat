import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, MapPin, MessageCircle, Share2 } from "lucide-react";
import Layout from "../components/Layout";
import { Product, buildWhatsAppLink, formatRupiah } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const [p, setP] = useState<Product | null>(null);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()
      .then(({ data }) => {
        setP(data as Product | null);
        setLoading(false);
        if (data) document.title = `${(data as Product).title} — JualCepat`;
      });
  }, [slug]);

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="aspect-square bg-muted animate-pulse rounded-xl" />
        </div>
      </Layout>
    );

  if (!p)
    return (
      <Layout>
        <div className="container mx-auto p-10 text-center">
          <p className="text-muted-foreground">Produk tidak ditemukan.</p>
          <Link to="/marketplace" className="text-primary font-medium mt-4 inline-block">← Kembali</Link>
        </div>
      </Layout>
    );

  const url = window.location.href;
  const waLink = buildWhatsAppLink(p.whatsapp, url, p.title);
  const images = p.images.length ? p.images : ["/placeholder.svg"];

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: p.title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link disalin");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-4">
        <Link to="/marketplace/kategori" className="inline-flex items-center text-sm text-muted-foreground gap-1 mb-3">
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-muted rounded-xl overflow-hidden">
              <img src={images[active]} alt={p.title} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      i === active ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              {p.status === "sold" && (
                <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded font-bold">SOLD</span>
              )}
              {p.status === "available" && p.badge !== "none" && (
                <span className={`text-xs px-2 py-0.5 rounded font-semibold ${p.badge === "hot" ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
                  {p.badge === "hot" ? "🔥 HOT" : "✨ BARU"}
                </span>
              )}
              <span className="text-xs text-muted-foreground capitalize">{p.category}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">{p.title}</h1>
            <p className="text-2xl md:text-3xl font-bold text-primary mt-2">{formatRupiah(p.price)}</p>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {p.location || "Lokasi tidak disebutkan"}
            </p>

            <div className="mt-5">
              <h2 className="font-semibold mb-2">Deskripsi</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{p.description || "—"}</p>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90"
              >
                <MessageCircle className="w-5 h-5" /> Chat WhatsApp
              </a>
              <button
                onClick={share}
                className="px-4 bg-card border rounded-lg hover:border-primary"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-16 inset-x-0 p-3 bg-background/95 backdrop-blur border-t z-30">
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold"
        >
          <MessageCircle className="w-5 h-5" /> Chat WhatsApp
        </a>
      </div>
    </Layout>
  );
}