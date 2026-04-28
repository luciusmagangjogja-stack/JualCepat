import { ReactNode } from "react";
import TopNavbar from "./TopNavbar";
import BottomNav from "./BottomNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mp-theme min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <footer className="hidden md:block border-t bg-card">
        <div className="container mx-auto py-8 text-sm text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Marketplace</span>
          <span>Powered by JualCepat</span>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
}