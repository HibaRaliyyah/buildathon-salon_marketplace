import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, MapPin, Search, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroPortrait from "@/assets/hero-portrait.jpg";
import aiConcierge from "@/assets/ai-concierge.jpg";
import lookBridal from "@/assets/look-bridal.jpg";
import lookKorean from "@/assets/look-korean.jpg";
import lookGrooming from "@/assets/look-grooming.jpg";
import lookNails from "@/assets/look-nails.jpg";
import salonInterior from "@/assets/salon-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GlowAI — Discover Bengaluru's Best Beauty Experiences with AI" },
      { name: "description", content: "Upload your selfie for AI-personalized beauty looks and book top-rated salons in Indiranagar, Koramangala, Whitefield and beyond." },
      { property: "og:title", content: "GlowAI — AI Beauty Marketplace for Bengaluru" },
      { property: "og:description", content: "Personalized beauty intelligence and salon booking across Bengaluru." },
    ],
  }),
  component: Home,
});

const hotspots = [
  "Indiranagar", "Koramangala", "Whitefield", "Jayanagar",
  "HSR Layout", "MG Road", "Malleshwaram", "JP Nagar",
];

const trending = [
  { img: lookBridal, title: "Temple Gold Bridal", salon: "The Ritz Salon · Malleshwaram", price: "₹8,500", match: 94, tag: "Bridal Glow" },
  { img: lookKorean, title: "Glass Hair Bob", salon: "Luna Artistry · Koramangala", price: "₹2,200", match: 88, tag: "K-Beauty" },
  { img: lookGrooming, title: "Tech-City Fade", salon: "The Old Soul · HSR Layout", price: "₹1,500", match: 91, tag: "Grooming" },
  { img: lookNails, title: "Lavender Haze Nails", salon: "Gloss Studio · Indiranagar", price: "₹1,800", match: 97, tag: "Nails" },
  { img: lookBridal, title: "Reception Glam", salon: "Bridal Box · Jayanagar", price: "₹12,000", match: 92, tag: "Bridal" },
];

const salons = [
  { img: salonInterior, name: "Atelier Rose", area: "Indiranagar", distance: "1.2 km", rating: 4.9, match: 98, price: "₹₹₹", open: true },
  { img: salonInterior, name: "Lumière Studio", area: "Koramangala", distance: "2.4 km", rating: 4.8, match: 95, price: "₹₹", open: true },
  { img: salonInterior, name: "Velvet & Co.", area: "Whitefield", distance: "5.1 km", rating: 4.7, match: 89, price: "₹₹₹₹", open: false },
];

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <NeighborhoodStrip />
      <AIAnalysis />
      <TrendingCarousel />
      <MarketplaceSection />
      <ConsultantSection />
      <BookingFlow />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative pt-12 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8 animate-fade-in-up">
          <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm border border-white/60 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">
            Bengaluru's Premier AI Beauty Hub
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] text-balance">
            Discover Bengaluru's <br />
            best <span className="italic text-brand-rose-deep">beauty experiences</span> with AI
          </h1>
          <p className="text-lg text-text-main/60 max-w-md text-pretty">
            Upload your selfie, receive personalized beauty recommendations,
            and book trusted salons across Bengaluru in minutes.
          </p>

          <form className="glass-panel rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search className="size-4 text-text-main/40" />
              <input
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-text-main/40"
                placeholder="Haircut in Indiranagar, Bridal Makeup in Koramangala…"
              />
            </div>
            <button
              type="submit"
              className="bg-text-main text-white rounded-xl px-5 py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-brand-rose-deep transition-colors"
            >
              Find My Look <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/ai-consultant"
              className="group flex items-center gap-3 bg-white border border-brand-rose/30 p-1.5 pr-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <div className="size-11 bg-gradient-to-tr from-brand-rose to-brand-rose-deep rounded-full grid place-items-center text-white">
                <Camera className="size-5" />
              </div>
              <span className="font-semibold text-sm">Upload Selfie</span>
            </Link>
            <Link
              to="/explore"
              className="px-6 py-3.5 rounded-full border border-text-main/10 text-sm font-semibold hover:bg-white/60 transition-colors"
            >
              Browse Salons
            </Link>
          </div>
        </div>

        <div className="relative animate-float-y">
          <img
            src={heroPortrait}
            alt="AI beauty analysis preview"
            width={1024}
            height={1280}
            className="w-full aspect-[4/5] object-cover rounded-[40px] shadow-2xl border-[10px] border-white/60 backdrop-blur-sm"
          />
          <div className="absolute -bottom-6 -left-4 sm:-left-8 p-5 glass-card rounded-3xl shadow-xl space-y-3 w-60 animate-pulse-glow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-tighter text-text-main/50">Face Shape Detected</span>
              <span className="text-xs font-mono text-brand-rose-deep">98%</span>
            </div>
            <div className="text-lg font-serif italic">Soft Heart Shape</div>
            <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-gradient-to-r from-brand-rose to-brand-lavender"></div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 hidden sm:block p-4 glass-card rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand-rose-deep" />
              <span className="text-xs font-bold">3 Looks Matched</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NeighborhoodStrip() {
  return (
    <section className="px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep mb-1">
                Bengaluru Beauty Hotspots
              </div>
              <h3 className="font-serif text-2xl">Where the city glows</h3>
            </div>
            <Link to="/explore" className="text-sm text-text-main/60 hover:text-brand-rose-deep flex items-center gap-1">
              View map <ArrowRight className="size-3" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {hotspots.map((h) => (
              <Link
                key={h}
                to="/explore"
                className="flex items-center gap-1.5 px-4 py-2 bg-white/60 border border-white/70 rounded-full text-sm font-medium hover:bg-brand-rose hover:text-white transition-colors"
              >
                <MapPin className="size-3.5" /> {h}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AIAnalysis() {
  const traits = [
    { label: "Face Shape", value: "Heart / Oval", conf: 98 },
    { label: "Skin Tone", value: "Warm Honey", conf: 94 },
    { label: "Hair Texture", value: "Wavy 2B", conf: 91 },
    { label: "Skin Type", value: "Combination", conf: 89 },
  ];
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-brand-rose-deep font-semibold tracking-widest text-xs uppercase mb-4 block">
            AI Beauty Analysis
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-5">
            Your unique beauty, mapped.
          </h2>
          <p className="text-text-main/60 mb-8 max-w-md">
            Our vision model reads 128 facial landmarks to recommend cuts, palettes,
            and treatments calibrated for Bengaluru's humidity and your features.
          </p>
          <div className="space-y-3">
            {traits.map((t) => (
              <div key={t.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-text-main/5">
                <div className="size-10 rounded-full bg-brand-lavender/40 grid place-items-center text-xs font-mono font-semibold">
                  {t.conf}%
                </div>
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-text-main/40">{t.label}</div>
                  <div className="font-medium">{t.value}</div>
                </div>
                <Sparkles className="size-4 text-brand-rose-deep" />
              </div>
            ))}
          </div>
          <Link
            to="/ai-consultant"
            className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-text-main text-white rounded-full text-sm font-semibold hover:bg-brand-rose-deep transition-colors"
          >
            Start your analysis <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border-[10px] border-white/60 shadow-2xl">
          <img src={heroPortrait} alt="Face analysis sample" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
          <div className="absolute top-8 left-8 glass-card p-3 rounded-xl">
            <div className="text-[10px] uppercase tracking-tighter text-brand-rose-deep font-semibold">Face Shape</div>
            <div className="text-sm font-medium">Heart / Oval</div>
          </div>
          <div className="absolute bottom-8 right-8 glass-card p-3 rounded-xl">
            <div className="text-[10px] uppercase tracking-tighter text-brand-rose-deep font-semibold">Undertone</div>
            <div className="text-sm font-medium">Warm</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingCarousel() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Personalized</span>
          <h2 className="text-3xl sm:text-4xl font-serif mt-1">Trending in Bengaluru</h2>
          <p className="text-text-main/50 text-sm mt-1">Most booked looks in Indiranagar and MG Road this week.</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button className="size-10 rounded-full border border-text-main/10 grid place-items-center hover:bg-white transition-colors">
            <ChevronLeft className="size-4" />
          </button>
          <button className="size-10 rounded-full border border-text-main/10 grid place-items-center hover:bg-white transition-colors">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 pb-8 no-scrollbar">
        {trending.map((c) => (
          <article key={c.title} className="flex-none w-72 group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-2xl transition-all">
              <img src={c.img} alt={c.title} loading="lazy" width={600} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur shadow-sm rounded-md text-[10px] font-mono font-bold text-brand-rose-deep">
                {c.match}% MATCH
              </span>
              <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur text-white rounded text-[9px] uppercase tracking-widest">
                {c.tag}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-xs text-text-main/50 mt-0.5">{c.salon}</p>
              </div>
              <span className="text-sm font-medium font-mono whitespace-nowrap">{c.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MarketplaceSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Marketplace</span>
            <h2 className="text-3xl sm:text-4xl font-serif mt-1">Verified salons near you</h2>
          </div>
          <Link to="/salons" className="text-sm font-medium text-text-main/60 hover:text-brand-rose-deep">See all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {salons.map((s) => (
            <article key={s.name} className="glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative aspect-[5/3] overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" width={1200} height={800} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-md text-[10px] font-mono font-bold text-brand-rose-deep">
                  {s.match}% AI MATCH
                </span>
                {s.open && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-semibold uppercase tracking-wider">
                    Open now
                  </span>
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
                  <span className="text-xs text-text-main/50">From <span className="font-mono font-bold text-text-main">{s.price}</span></span>
                  <Link to="/salons" className="text-xs font-bold uppercase tracking-wider bg-text-main text-white px-3.5 py-2 rounded-full hover:bg-brand-rose-deep transition-colors">
                    Book
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultantSection() {
  return (
    <section className="py-24 bg-white/40 backdrop-blur-3xl">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">AI Concierge</span>
          <h2 className="text-4xl sm:text-5xl font-serif">Meet your beauty assistant.</h2>
          <p className="text-text-main/60">Available 24/7 — by chat or voice — to find your perfect look and book it instantly across Bengaluru.</p>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-text-main/5">
              <p className="text-[10px] font-bold text-brand-rose-deep uppercase mb-1">You</p>
              <p className="text-sm">I have a wedding in Bengaluru next weekend with a budget of ₹3,000.</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-brand-rose/10 to-brand-lavender/10 rounded-2xl shadow-sm border border-brand-rose/10">
              <p className="text-[10px] font-bold text-text-main/40 uppercase mb-1">GlowAI Concierge</p>
              <p className="text-sm italic">
                "Based on your heart face shape, I recommend soft curls with nude makeup. Here are
                the highest-rated salons near Koramangala and Indiranagar that match your budget…"
              </p>
            </div>
          </div>
          <Link
            to="/ai-consultant"
            className="inline-flex items-center gap-2 py-3.5 px-7 bg-text-main text-white rounded-full font-semibold hover:bg-brand-rose-deep transition-colors"
          >
            Start a conversation <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-rose/20 to-brand-gold/20 rounded-full blur-3xl opacity-60 animate-pulse" />
          <img src={aiConcierge} alt="GlowAI Neural Engine" loading="lazy" width={800} height={800} className="relative w-full h-full object-cover rounded-3xl border border-white/60 shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

function BookingFlow() {
  const steps = ["Choose Style", "Choose Salon", "Select Beautician", "Date & Time", "Payment", "Confirmation"];
  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Seamless Booking</span>
        <h2 className="text-3xl sm:text-4xl font-serif mt-2 mb-12">From discovery to chair, in six taps.</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {steps.map((s, i) => (
            <div key={s} className="glass-card rounded-2xl p-4 text-left">
              <div className="text-xs font-mono text-brand-rose-deep mb-2">0{i + 1}</div>
              <div className="text-sm font-medium">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
