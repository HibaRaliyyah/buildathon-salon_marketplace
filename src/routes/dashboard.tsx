import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Calendar, Gift, Sparkles, MapPin, Star } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import lookBridal from "@/assets/look-bridal.jpg";
import lookKorean from "@/assets/look-korean.jpg";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your GlowAI Dashboard" },
      { name: "description", content: "Your AI beauty profile, upcoming appointments, recommendations and rewards." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <SiteLayout>
      <section className="px-6 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Greeting */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <img src={heroPortrait} alt="Profile" className="size-20 rounded-full object-cover border-4 border-white" />
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Good evening</span>
              <h1 className="font-serif text-3xl sm:text-4xl mt-1">Hello, Riya 🌸</h1>
              <p className="text-sm text-text-main/60">3 new looks matched your profile this week.</p>
            </div>
            <Link to="/ai-consultant" className="bg-text-main text-white px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
              <Sparkles className="size-4" /> Talk to GlowAI
            </Link>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            {/* AI Profile */}
            <div className="glass-card rounded-3xl p-6 lg:col-span-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep mb-3">Your AI Profile</div>
              <ul className="space-y-3 text-sm">
                <Row label="Face shape" value="Heart" />
                <Row label="Skin tone" value="Warm Honey" />
                <Row label="Hair texture" value="Wavy 2B" />
                <Row label="Locality" value="Indiranagar" />
                <Row label="Budget" value="₹1,000–₹3,000" />
              </ul>
              <Link to="/signup" className="block mt-5 text-xs font-bold uppercase tracking-wider text-brand-rose-deep">Edit profile →</Link>
            </div>

            {/* Upcoming */}
            <div className="glass-card rounded-3xl p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep flex items-center gap-2">
                  <Calendar className="size-3" /> Upcoming
                </div>
                <Link to="/explore" className="text-xs text-text-main/60">View all</Link>
              </div>
              <div className="space-y-3">
                {[
                  { date: "Sat 28 Jun", time: "11:00 AM", salon: "Atelier Rose · Indiranagar", svc: "Hair Spa + Cut" },
                  { date: "Fri 4 Jul", time: "5:30 PM", salon: "Gloss Studio · Jayanagar", svc: "Gel Manicure" },
                ].map((b) => (
                  <div key={b.salon} className="flex items-center gap-4 p-4 bg-white/70 rounded-2xl border border-text-main/5">
                    <div className="text-center min-w-16">
                      <div className="font-serif text-lg leading-none">{b.date.split(" ")[1]}</div>
                      <div className="text-[10px] uppercase tracking-widest text-text-main/50 mt-1">{b.date.split(" ")[0]}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{b.svc}</div>
                      <div className="text-xs text-text-main/60 flex items-center gap-1"><MapPin className="size-3" /> {b.salon}</div>
                    </div>
                    <div className="text-sm font-mono">{b.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="lg:col-span-2 glass-card rounded-3xl p-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep mb-4">Recommended for you</div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[lookKorean, lookBridal, salonInterior].map((img, i) => (
                  <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
                    <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 rounded text-[10px] font-mono font-bold text-brand-rose-deep">{95 - i * 2}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-brand-rose to-brand-rose-deep text-white shadow-xl">
              <Gift className="size-6 mb-3" />
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Glow Rewards</div>
              <div className="font-serif text-4xl mt-1">2,450 pts</div>
              <p className="text-xs text-white/80 mt-1">550 points to unlock Gold tier</p>
              <div className="h-1 w-full bg-white/20 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-white w-[81%]" />
              </div>
              <Link to="/offers" className="inline-flex items-center mt-5 text-xs font-bold uppercase tracking-wider bg-white text-text-main px-4 py-2 rounded-full">
                Browse rewards →
              </Link>
            </div>

            {/* Nearby */}
            <div className="glass-card rounded-3xl p-6 lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Salons near you</div>
                <Link to="/salons" className="text-xs text-text-main/60">See all</Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Atelier Rose", area: "Indiranagar", rating: 4.9, img: salonInterior },
                  { name: "Luna Artistry", area: "Koramangala", rating: 4.8, img: lookKorean },
                  { name: "Maison Bridal", area: "Malleshwaram", rating: 4.9, img: lookBridal },
                  { name: "Velvet & Co.", area: "Whitefield", rating: 4.7, img: salonInterior },
                ].map((s) => (
                  <div key={s.name} className="bg-white/70 rounded-2xl overflow-hidden border border-text-main/5">
                    <img src={s.img} alt={s.name} className="aspect-square w-full object-cover" />
                    <div className="p-3">
                      <div className="font-serif">{s.name}</div>
                      <div className="text-xs text-text-main/50 flex items-center justify-between mt-1">
                        <span>{s.area}</span>
                        <span className="flex items-center gap-0.5"><Star className="size-3 fill-amber-400 text-amber-400" /> {s.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between items-center py-2 border-b border-text-main/5 last:border-0">
      <span className="text-text-main/60">{label}</span>
      <span className="font-medium">{value}</span>
    </li>
  );
}
