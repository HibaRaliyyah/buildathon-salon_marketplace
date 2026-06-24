import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Star, SlidersHorizontal, Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import salonInterior from "@/assets/salon-interior.jpg";
import lookBridal from "@/assets/look-bridal.jpg";
import lookKorean from "@/assets/look-korean.jpg";
import lookGrooming from "@/assets/look-grooming.jpg";
import lookNails from "@/assets/look-nails.jpg";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Salons in Bengaluru — GlowAI" },
      { name: "description", content: "Browse verified beauty salons, spas and studios across Bengaluru with AI match scores." },
    ],
  }),
  component: ExplorePage,
});

const localities = ["All Bengaluru", "Indiranagar", "Koramangala", "Whitefield", "Jayanagar", "HSR Layout", "MG Road", "Malleshwaram"];

const salons = [
  { img: salonInterior, name: "Atelier Rose", area: "Indiranagar", distance: "1.2 km", rating: 4.9, match: 98, price: "₹₹₹", open: true, tag: "Hair · Skin" },
  { img: lookBridal, name: "Maison Bridal", area: "Malleshwaram", distance: "3.1 km", rating: 4.9, match: 96, price: "₹₹₹₹", open: true, tag: "Bridal" },
  { img: lookKorean, name: "Luna Artistry", area: "Koramangala", distance: "2.4 km", rating: 4.8, match: 95, price: "₹₹", open: true, tag: "K-Beauty" },
  { img: salonInterior, name: "Velvet & Co.", area: "Whitefield", distance: "5.1 km", rating: 4.7, match: 89, price: "₹₹₹₹", open: false, tag: "Spa" },
  { img: lookGrooming, name: "The Old Soul", area: "HSR Layout", distance: "4.0 km", rating: 4.6, match: 91, price: "₹₹", open: true, tag: "Men's" },
  { img: lookNails, name: "Gloss Studio", area: "Jayanagar", distance: "2.9 km", rating: 4.8, match: 93, price: "₹₹", open: true, tag: "Nails" },
];

function ExplorePage() {
  return (
    <SiteLayout>
      <section className="px-6 pt-10 pb-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Marketplace</span>
          <h1 className="font-serif text-4xl sm:text-5xl mt-2 mb-4">Explore Bengaluru's finest salons</h1>
          <p className="text-text-main/60 max-w-2xl">Verified studios across every neighborhood, ranked by AI match for your beauty profile.</p>

          <div className="mt-6 glass-panel rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search className="size-4 text-text-main/40" />
              <input className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-text-main/40" placeholder="Search by service or salon name…" />
            </div>
            <button className="bg-text-main text-white rounded-xl px-5 py-3 text-sm font-semibold flex items-center justify-center gap-2">
              <SlidersHorizontal className="size-4" /> Filters
            </button>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {localities.map((l, i) => (
              <button
                key={l}
                className={`shrink-0 px-4 py-2 rounded-full text-sm border transition-colors ${
                  i === 0 ? "bg-text-main text-white border-text-main" : "bg-white/60 border-text-main/10 hover:border-brand-rose"
                }`}
              >
                <MapPin className="inline size-3.5 mr-1" /> {l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((s) => (
            <article key={s.name} className="glass-card rounded-3xl overflow-hidden group hover:shadow-2xl transition-shadow">
              <div className="relative aspect-[5/3] overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-md text-[10px] font-mono font-bold text-brand-rose-deep">
                  {s.match}% MATCH
                </span>
                {s.open ? (
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-semibold uppercase tracking-wider">Open</span>
                ) : (
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-text-main/70 text-white rounded text-[10px] font-semibold uppercase tracking-wider">Closed</span>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl">{s.name}</h3>
                    <p className="text-xs text-text-main/50 flex items-center gap-1 mt-0.5">
                      <MapPin className="size-3" /> {s.area} · {s.distance}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" /> {s.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-text-main/5">
                  <span className="text-xs text-text-main/50">{s.tag} · <span className="font-mono font-bold text-text-main">{s.price}</span></span>
                  <Link to="/salons" className="text-xs font-bold uppercase tracking-wider bg-text-main text-white px-3.5 py-2 rounded-full hover:bg-brand-rose-deep transition-colors">
                    Book
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
