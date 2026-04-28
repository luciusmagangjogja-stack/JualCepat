import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone } from "lucide-react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, Product, SiteSettings, buildWhatsAppLink } from "../types";
import { supabase } from "@/integrations/supabase/client";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    document.title = "JualCepat — Marketplace Kost, Motor & Barang";
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => setProducts((data as Product[]) ?? []));
    supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setSettings(data as SiteSettings | null));
  }, []);

  const waLink = settings?.whatsapp_admin
    ? buildWhatsAppLink(settings.whatsapp_admin, window.location.href, "Saya ingin pasang iklan")
    : "#";

  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-4 pt-6 md:pt-12">
        <div className="bg-gradient-to-br from-primary/10 via-card to-secondary rounded-2xl p-6 md:p-12 border">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl">
            {settings?.hero_title || "Marketplace Kost, Motor & Barang"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            {settings?.hero_subtitle || "Cari kost, kontrakan, motor bekas, dan barang kos dengan mudah. Langsung chat penjual via WhatsApp."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/marketplace/kategori"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-medium hover:opacity-90"
            >
              Jelajahi Produk <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-card border px-5 py-3 rounded-lg font-medium hover:border-primary"
            >
              <Megaphone className="w-4 h-4" /> Pasang Iklan
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mt-10">
        <h2 className="text-xl font-bold mb-4">Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.value}
              to={`/marketplace/kategori?cat=${c.value}`}
              className="bg-card border rounded-xl p-4 hover:border-primary hover:shadow-mp-soft transition-all"
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="font-semibold mt-2">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest products */}
      <section className="container mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Produk Terbaru</h2>
          <Link to="/marketplace/baru" className="text-sm text-primary font-medium">
            Lihat semua →
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="bg-card border rounded-xl p-10 text-center text-muted-foreground">
            Belum ada produk. Admin bisa menambahkan dari dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 my-12">
        <div className="bg-foreground text-background rounded-2xl p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Mau pasang iklan?</h2>
          <p className="text-background/70 mt-2">Hubungi admin via WhatsApp untuk mulai.</p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex mt-5 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold"
          >
            Hubungi Admin
          </a>
        </div>
      </section>
    </Layout>
  );
}