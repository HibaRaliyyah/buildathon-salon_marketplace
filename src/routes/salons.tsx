import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { MapPin, Star, Filter } from "lucide-react";
import salonInterior from "@/assets/salon-interior.jpg";
import lookBridal from "@/assets/look-bridal.jpg";
import lookKorean from "@/assets/look-korean.jpg";

export const Route = createFileRoute("/salons")({
  head: () => ({
    meta: [
      { title: "Salons in Bengaluru — GlowAI Marketplace" },
      { name: "description", content: "Book verified salons, spas and studios across Bengaluru. AI-matched to your beauty profile." },
    ],
  }),
  component: SalonsPage,
});

const featured = { img: salonInterior, name: "Atelier Rose", area: "100ft Road, Indiranagar", rating: 4.9, match: 98 };
const list = [
  { img: salonInterior, name: "Atelier Rose", area: "Indiranagar", price: "₹2,500+", match: 98, rating: 4.9 },
  { img: lookBridal, name: "Maison Bridal", area: "Malleshwaram", price: "₹8,000+", match: 96, rating: 4.9 },
  { img: lookKorean, name: "Luna Artistry", area: "Koramangala", price: "₹1,200+", match: 95, rating: 4.8 },
  { img: salonInterior, name: "Velvet & Co.", area: "Whitefield", price: "₹3,500+", match: 89, rating: 4.7 },
];

function SalonsPage() {
  return (
    <SiteLayout>
      <section className="px-6 pt-10 pb-16">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Bengaluru Marketplace</span>
          <h1 className="font-serif text-4xl sm:text-5xl mt-2 mb-3">Trusted salons. Personally matched.</h1>

          {/* Featured */}
          <div className="mt-8 glass-panel rounded-3xl overflow-hidden grid md:grid-cols-2">
            <img src={featured.img} alt={featured.name} className="w-full h-full object-cover aspect-[4/3]" />
            <div className="p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Featured · {featured.match}% Match</span>
                <h2 className="font-serif text-3xl mt-2">{featured.name}</h2>
                <p className="text-text-main/60 mt-1 flex items-center gap-1"><MapPin className="size-3.5" /> {featured.area}</p>
                <div className="flex items-center gap-1 mt-2 text-sm"><Star className="size-3.5 fill-amber-400 text-amber-400" /> {featured.rating} · 412 reviews</div>
                <p className="mt-4 text-sm text-text-main/70">Award-winning hair & skin atelier specializing in editorial cuts, balayage, and Korean glass-skin facials.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link to="/salons" className="bg-text-main text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-rose-deep transition-colors">Book Appointment</Link>
                <button className="bg-white/70 border border-text-main/10 px-6 py-3 rounded-full text-sm font-semibold">View Services</button>
              </div>
            </div>
          </div>

          {/* Filters bar */}
          <div className="mt-12 flex items-center justify-between">
            <h3 className="font-serif text-2xl">All salons</h3>
            <button className="text-sm font-medium flex items-center gap-2 px-4 py-2 bg-white/70 border border-text-main/10 rounded-full">
              <Filter className="size-4" /> Locality · Budget · Rating
            </button>
          </div>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((s) => (
              <article key={s.name} className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 rounded text-[10px] font-mono font-bold text-brand-rose-deep">{s.match}%</span>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg">{s.name}</h3>
                  <p className="text-xs text-text-main/50">{s.area}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" /> {s.rating}</span>
                    <span className="text-xs font-mono">{s.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
