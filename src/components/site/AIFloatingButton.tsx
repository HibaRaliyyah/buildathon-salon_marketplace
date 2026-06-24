import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function AIFloatingButton() {
  return (
    <Link
      to="/ai-consultant"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="glass-card rounded-3xl shadow-xl px-4 py-3 flex items-center gap-3 animate-pulse-glow hover:scale-[1.03] transition-transform">
        <div className="size-10 rounded-full bg-gradient-to-tr from-brand-rose to-brand-lavender grid place-items-center text-white">
          <Sparkles className="size-5" />
        </div>
        <div className="pr-2">
          <p className="text-[10px] font-bold text-brand-rose-deep uppercase tracking-wider">Ask GlowAI</p>
          <p className="text-sm font-medium">Find your perfect look</p>
        </div>
      </div>
    </Link>
  );
}
