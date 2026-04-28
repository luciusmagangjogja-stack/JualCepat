import { useEffect, useState } from "react";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import Layout from "../components/Layout";
import { SiteSettings, buildWhatsAppLink } from "../types";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [s, setS] = useState<SiteSettings | null>(null);
  useEffect(() => {
    document.title = "Kontak — JualCepat";
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle().then(({ data }) => setS(data as SiteSettings | null));
  }, []);

  const wa = s?.whatsapp_admin ? buildWhatsAppLink(s.whatsapp_admin, window.location.origin, "Halo admin") : null;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8 max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold">Hubungi Kami</h1>
        <p className="text-muted-foreground mt-2">
          Punya pertanyaan atau ingin pasang iklan? Hubungi kami lewat channel berikut.
        </p>
        <div className="mt-6 space-y-3">
          {wa && (
            <a href={wa} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-card border rounded-xl hover:border-primary">
              <span className="w-10 h-10 grid place-items-center bg-primary text-primary-foreground rounded-lg">
                <MessageCircle className="w-5 h-5" />
              </span>
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-sm text-muted-foreground">{s?.whatsapp_admin}</div>
              </div>
            </a>
          )}
          {s?.instagram_url && (
            <a href={s.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-card border rounded-xl hover:border-primary">
              <span className="w-10 h-10 grid place-items-center bg-foreground text-background rounded-lg">
                <Instagram className="w-5 h-5" />
              </span>
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-muted-foreground truncate">{s.instagram_url}</div>
              </div>
            </a>
          )}
          {s?.tiktok_url && (
            <a href={s.tiktok_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-card border rounded-xl hover:border-primary">
              <span className="w-10 h-10 grid place-items-center bg-foreground text-background rounded-lg">
                <Music2 className="w-5 h-5" />
              </span>
              <div>
                <div className="font-semibold">TikTok</div>
                <div className="text-sm text-muted-foreground truncate">{s.tiktok_url}</div>
              </div>
            </a>
          )}
          {!wa && !s?.instagram_url && !s?.tiktok_url && (
            <p className="text-sm text-muted-foreground">Admin belum mengatur kontak.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}