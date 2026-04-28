import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Category, Product } from "../types";
import { supabase } from "@/integrations/supabase/client";

export default function Catalog({ latestOnly = false }: { latestOnly?: boolean }) {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("cat") as Category) || "all";
  const [cat, setCat] = useState<Category | "all">(initial);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = latestOnly ? "Produk Terbaru — JualCepat" : "Kategori — JualCepat";
  }, [latestOnly]);

  useEffect(() => {
    setLoading(true);
    let q = supabase.from("products").select("*").order("created_at", { ascending: false });
    if (cat !== "all") q = q.eq("category", cat);
    if (latestOnly) q = q.limit(24);
    q.then(({ data }) => {
      setProducts((data as Product[]) ?? []);
      setLoading(false);
    });
    if (cat === "all") params.delete("cat");
    else params.set("cat", cat);
    setParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, latestOnly]);

  const title = useMemo(() => (latestOnly ? "Produk Terbaru" : "Semua Produk"), [latestOnly]);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <div className="mt-4">
          <CategoryFilter value={cat} onChange={setCat} />
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-card border rounded-xl p-10 text-center text-muted-foreground mt-4">
            Tidak ada produk di kategori ini.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}