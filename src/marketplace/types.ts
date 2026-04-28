export type Category = "kost" | "kontrakan" | "motor" | "barang";
export type ProductStatus = "available" | "sold";
export type ProductBadge = "none" | "hot" | "baru";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  location: string;
  whatsapp: string;
  images: string[];
  status: ProductStatus;
  badge: ProductBadge;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  whatsapp_admin: string;
  instagram_url: string;
  tiktok_url: string;
}

export const CATEGORIES: { value: Category; label: string; emoji: string; desc: string }[] = [
  { value: "kost", label: "Kost", emoji: "🏠", desc: "Cari kost nyaman" },
  { value: "kontrakan", label: "Kontrakan", emoji: "🏘️", desc: "Sewa kontrakan" },
  { value: "motor", label: "Motor Bekas", emoji: "🏍️", desc: "Motor berkualitas" },
  { value: "barang", label: "Barang Kos", emoji: "🛏️", desc: "Perabot & elektronik" },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const buildWhatsAppLink = (phone: string, productUrl: string, title: string) => {
  const cleaned = phone.replace(/[^0-9]/g, "").replace(/^0/, "62");
  const msg = `Halo, saya tertarik dengan produk ini:\n\n*${title}*\n${productUrl}`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(msg)}`;
};

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80) +
  "-" + Math.random().toString(36).slice(2, 7);