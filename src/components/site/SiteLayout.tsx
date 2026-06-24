import type { ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { AIFloatingButton } from "./AIFloatingButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen text-text-main">
      <NavBar />
      <main>{children}</main>
      <Footer />
      <AIFloatingButton />
    </div>
  );
}
