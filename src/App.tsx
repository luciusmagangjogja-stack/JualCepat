import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import MpHome from "./marketplace/pages/Home";
import MpCatalog from "./marketplace/pages/Catalog";
import MpDetail from "./marketplace/pages/ProductDetail";
import MpContact from "./marketplace/pages/Contact";
import MpAuth from "./marketplace/pages/Auth";
import MpAdmin from "./marketplace/pages/Admin";
import MpAdminForm from "./marketplace/pages/AdminProductForm";
import MpAdminSettings from "./marketplace/pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<MpHome />} />
          <Route path="/marketplace/kategori" element={<MpCatalog />} />
          <Route path="/marketplace/baru" element={<MpCatalog latestOnly />} />
          <Route path="/marketplace/produk/:slug" element={<MpDetail />} />
          <Route path="/marketplace/kontak" element={<MpContact />} />
          <Route path="/marketplace/auth" element={<MpAuth />} />
          <Route path="/marketplace/admin" element={<MpAdmin />} />
          <Route path="/marketplace/admin/settings" element={<MpAdminSettings />} />
          <Route path="/marketplace/admin/produk/:id" element={<MpAdminForm />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
