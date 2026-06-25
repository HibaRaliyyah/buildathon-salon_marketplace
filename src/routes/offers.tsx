import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Sparkles, Tag } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Exclusive Bengaluru Offers — GlowAI" },
      { name: "description", content: "Limited-time deals at top Bengaluru salons, spas and studios — handpicked for GlowAI members." },
    ],
  }),
  component: OffersPage,
});

const offers = [
  { tag: "Bridal", title: "30% off Royal Bridal Glow", salon: "Maison Bridal · Malleshwaram", code: "GLOW30", color: "from-brand-rose to-brand-rose-deep" },
  { tag: "Hair", title: "₹500 off any Hair Spa", salon: "Atelier Rose · Indiranagar", code: "SPA500", color: "from-brand-lavender to-brand-rose" },
  { tag: "Nails", title: "Buy 1 Get 1 Gel Manicure", salon: "Gloss Studio · Jayanagar", code: "GLOSSBOGO", color: "from-brand-gold to-brand-rose" },
  { tag: "Men's", title: "Free beard sculpt with haircut", salon: "The Old Soul · HSR Layout", code: "OLDSOUL", color: "from-text-main to-brand-rose-deep" },
];

function OffersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRedeem = (code: string) => {
    if (!user) {
      toast.error("Please log in to redeem offers.");
      navigate({ to: "/login" });
      return;
    }
    navigator.clipboard.writeText(code);
    toast.success(`Promo code ${code} copied to clipboard!`);
    setTimeout(() => {
      navigate({ to: "/explore" });
    }, 1500);
  };

  return (
    <SiteLayout>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Exclusive · Bengaluru</span>
          <h1 className="font-serif text-4xl sm:text-5xl mt-2 mb-3">Offers that glow.</h1>
          <p className="text-text-main/60 max-w-2xl">Limited-time deals at hand-picked Bengaluru salons. Members save more.</p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {offers.map((o) => (
              <article key={o.title} className={`relative rounded-3xl overflow-hidden p-8 text-white bg-gradient-to-br ${o.color} shadow-xl`}>
                <div className="absolute -top-12 -right-12 size-48 bg-white/10 rounded-full blur-2xl" />
                <Sparkles className="size-6 mb-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{o.tag}</span>
                <h3 className="font-serif text-3xl mt-2 mb-2">{o.title}</h3>
                <p className="text-white/80 text-sm mb-6">{o.salon}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-2 text-xs font-mono flex items-center gap-2">
                    <Tag className="size-3" /> {o.code}
                  </span>
                  <button 
                    onClick={() => handleRedeem(o.code)}
                    className="bg-white text-text-main rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
                  >
                    Redeem
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
