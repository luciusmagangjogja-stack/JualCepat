import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import { z } from "zod";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { CATEGORIES, Category, Product, ProductBadge, ProductStatus, slugify } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().trim().min(3, "Judul min 3 karakter").max(150),
  price: z.coerce.number().int().min(0),
  description: z.string().max(2000),
  category: z.enum(["kost", "kontrakan", "motor", "barang"]),
  location: z.string().max(150),
  whatsapp: z.string().min(8, "Nomor WhatsApp wajib").max(20),
});

export default function AdminProductForm() {
  const { id } = useParams();
  const isNew = !id || id === "baru";
  const nav = useNavigate();
  const { isAdmin, loading } = useAuth();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("kost");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<ProductStatus>("available");
  const [badge, setBadge] = useState<ProductBadge>("baru");
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    document.title = isNew ? "Tambah Produk — Admin" : "Edit Produk — Admin";
    if (!loading && !isAdmin) nav("/marketplace/auth", { replace: true });
  }, [loading, isAdmin, nav, isNew]);

  useEffect(() => {
    if (isNew || !id) return;
    supabase.from("products").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      if (!data) return;
      const p = data as Product;
      setTitle(p.title);
      setPrice(String(p.price));
      setDescription(p.description);
      setCategory(p.category);
      setLocation(p.location);
      setWhatsapp(p.whatsapp);
      setStatus(p.status);
      setBadge(p.badge);
      setImages(p.images);
    });
  }, [id, isNew]);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} > 5MB, dilewati`);
        continue;
      }
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) {
        toast.error(error.message);
        continue;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    setImages((xs) => [...xs, ...urls]);
    setUploading(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ title, price, description, category, location, whatsapp });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const payload = { ...parsed.data, status, badge, images };
    if (isNew) {
      const { error } = await supabase.from("products").insert({ ...payload, slug: slugify(title) });
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success("Produk dibuat");
      nav("/marketplace/admin");
    } else {
      const { error } = await supabase.from("products").update(payload).eq("id", id!);
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success("Produk diperbarui");
      nav("/marketplace/admin");
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold">{isNew ? "Tambah Produk" : "Edit Produk"}</h1>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Judul">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" required />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga (Rp)">
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input" required />
            </Field>
            <Field label="Kategori">
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} className="input">
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Lokasi">
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="input" placeholder="cth. Jakarta Selatan" />
          </Field>
          <Field label="Nomor WhatsApp (cth. 08123456789)">
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="input" required />
          </Field>
          <Field label="Deskripsi">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)} className="input">
                <option value="available">Tersedia</option>
                <option value="sold">Sold</option>
              </select>
            </Field>
            <Field label="Badge">
              <select value={badge} onChange={(e) => setBadge(e.target.value as ProductBadge)} className="input">
                <option value="none">Tidak ada</option>
                <option value="baru">Baru</option>
                <option value="hot">Hot</option>
              </select>
            </Field>
          </div>

          <Field label="Foto Produk">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {images.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((xs) => xs.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-foreground/70 text-background rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-xs text-muted-foreground cursor-pointer hover:border-primary">
                <ImagePlus className="w-5 h-5 mb-1" />
                {uploading ? "Upload..." : "Tambah"}
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
              </label>
            </div>
          </Field>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => nav(-1)} className="px-5 py-2.5 rounded-lg border">Batal</button>
            <button type="submit" disabled={saving} className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
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