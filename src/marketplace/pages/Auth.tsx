import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Layout from "../components/Layout";

const schema = z.object({
  email: z.string().email("Email tidak valid").max(255),
  password: z.string().min(6, "Minimal 6 karakter").max(72),
});

export default function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Berhasil login");
      nav("/marketplace/admin");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/marketplace/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Akun dibuat. Silakan login.");
      setMode("login");
    }
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10 max-w-sm">
        <h1 className="text-2xl font-bold">{mode === "login" ? "Login Admin" : "Daftar Admin"}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Akses dashboard untuk mengelola produk.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border bg-card focus:outline-none focus:border-primary"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border bg-card focus:outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Memproses..." : mode === "login" ? "Login" : "Daftar"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-sm text-primary"
        >
          {mode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
        </button>
        <p className="mt-6 text-xs text-muted-foreground">
          Catatan: setelah daftar, akun perlu diberi role <b>admin</b> dari backend agar bisa mengelola produk.
        </p>
      </section>
    </Layout>
  );
}