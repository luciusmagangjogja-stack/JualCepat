import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Pencil, Plus, Settings, Trash2 } from "lucide-react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { Product, formatRupiah } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.title = "Admin — JualCepat";
    if (!loading && !user) nav("/marketplace/auth", { replace: true });
  }, [loading, user, nav]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("products").select("*").order("created_at", { ascending: false }).then(({ data }) =>
      setProducts((data as Product[]) ?? []),
    );
  }, [isAdmin]);

  const remove = async (p: Product) => {
    if (!confirm(`Hapus "${p.title}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) return toast.error(error.message);
    setProducts((xs) => xs.filter((x) => x.id !== p.id));
    toast.success("Produk dihapus");
  };

  const toggleStatus = async (p: Product) => {
    const next = p.status === "available" ? "sold" : "available";
    const { error } = await supabase.from("products").update({ status: next }).eq("id", p.id);
    if (error) return toast.error(error.message);
    setProducts((xs) => xs.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    nav("/marketplace");
  };

  if (loading)
    return (
      <Layout>
        <div className="container p-10">Memuat...</div>
      </Layout>
    );

  if (user && !isAdmin)
    return (
      <Layout>
        <div className="container mx-auto p-10 max-w-md text-center">
          <h1 className="text-xl font-bold">Akses Ditolak</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Akun Anda belum memiliki role <b>admin</b>. Hubungi pemilik untuk diberikan akses.
          </p>
          <p className="text-xs text-muted-foreground mt-4">User ID: {user.id}</p>
          <button onClick={logout} className="mt-6 text-sm text-primary">Logout</button>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-sm text-muted-foreground">Kelola produk & pengaturan situs.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/marketplace/admin/settings" className="inline-flex items-center gap-2 bg-card border px-4 py-2 rounded-lg text-sm hover:border-primary">
              <Settings className="w-4 h-4" /> Pengaturan
            </Link>
            <Link to="/marketplace/admin/produk/baru" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
              <Plus className="w-4 h-4" /> Tambah Produk
            </Link>
            <button onClick={logout} className="inline-flex items-center gap-2 bg-card border px-3 py-2 rounded-lg text-sm">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 bg-card border rounded-xl overflow-hidden">
          {products.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground text-sm">
              Belum ada produk. <Link to="/marketplace/admin/produk/baru" className="text-primary">Tambah sekarang</Link>.
            </div>
          ) : (
            <ul className="divide-y">
              {products.map((p) => (
                <li key={p.id} className="p-3 flex items-center gap-3">
                  <img src={p.images[0] || "/placeholder.svg"} alt="" className="w-14 h-14 rounded-lg object-cover bg-muted" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{p.title}</p>
                      {p.status === "sold" && <span className="text-xs bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">SOLD</span>}
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{p.category} · {formatRupiah(p.price)}</p>
                  </div>
                  <button onClick={() => toggleStatus(p)} className="text-xs px-2 py-1 border rounded hover:border-primary">
                    {p.status === "available" ? "Tandai SOLD" : "Aktifkan"}
                  </button>
                  <Link to={`/marketplace/admin/produk/${p.id}`} className="p-2 hover:text-primary">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button onClick={() => remove(p)} className="p-2 hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Layout>
  );
}