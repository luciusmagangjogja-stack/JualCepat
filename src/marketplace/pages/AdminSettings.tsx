import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { SiteSettings } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AdminSettings() {
  const { isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [s, setS] = useState<Partial<SiteSettings>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) nav("/marketplace/auth", { replace: true });
  }, [loading, isAdmin, nav]);

  useEffect(() => {
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle().then(({ data }) => {
      if (data) setS(data as SiteSettings);
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        hero_title: s.hero_title ?? "",
        hero_subtitle: s.hero_subtitle ?? "",
        hero_image: s.hero_image ?? "",
        whatsapp_admin: s.whatsapp_admin ?? "",
        instagram_url: s.instagram_url ?? "",
        tiktok_url: s.tiktok_url ?? "",
      })
      .eq("id", 1);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Pengaturan disimpan");
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold">Pengaturan Situs</h1>
        <form onSubmit={save} className="mt-6 space-y-4">
          <Field label="Hero Title">
            <input value={s.hero_title ?? ""} onChange={(e) => setS({ ...s, hero_title: e.target.value })} className="input" />
          </Field>
          <Field label="Hero Subtitle">
            <textarea value={s.hero_subtitle ?? ""} onChange={(e) => setS({ ...s, hero_subtitle: e.target.value })} rows={3} className="input" />
          </Field>
          <Field label="WhatsApp Admin (cth. 08123456789)">
            <input value={s.whatsapp_admin ?? ""} onChange={(e) => setS({ ...s, whatsapp_admin: e.target.value })} className="input" />
          </Field>
          <Field label="Instagram URL">
            <input value={s.instagram_url ?? ""} onChange={(e) => setS({ ...s, instagram_url: e.target.value })} className="input" placeholder="https://instagram.com/..." />
          </Field>
          <Field label="TikTok URL">
            <input value={s.tiktok_url ?? ""} onChange={(e) => setS({ ...s, tiktok_url: e.target.value })} className="input" placeholder="https://tiktok.com/@..." />
          </Field>
          <button type="submit" disabled={saving} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold disabled:opacity-50">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </section>
    </Layout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}