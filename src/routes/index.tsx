import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Camera, MapPin, Search, Sparkles, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroPortrait from "@/assets/hero-portrait.jpg";
import aiConcierge from "@/assets/ai-concierge.jpg";
import lookBridal from "@/assets/look-bridal.jpg";
import lookKorean from "@/assets/look-korean.jpg";
import lookGrooming from "@/assets/look-grooming.jpg";
import lookNails from "@/assets/look-nails.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import lumiereInterior from "@/assets/lumiere-interior.jpg";
import velvetInterior from "@/assets/velvet-interior.jpg";

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
  { id: "maison-bridal", img: lookBridal, title: "Temple Gold Bridal", salon: "Maison Bridal · Malleshwaram", price: "₹8,500", match: 94, tag: "Bridal Glow" },
  { id: "luna-artistry", img: lookKorean, title: "Glass Hair Bob", salon: "Luna Artistry · Koramangala", price: "₹2,200", match: 88, tag: "K-Beauty" },
  { id: "the-old-soul", img: lookGrooming, title: "Tech-City Fade", salon: "The Old Soul · HSR Layout", price: "₹1,500", match: 91, tag: "Grooming" },
  { id: "gloss-studio", img: lookNails, title: "Lavender Haze Nails", salon: "Gloss Studio · Indiranagar", price: "₹1,800", match: 97, tag: "Nails" },
  { id: "maison-bridal", img: lookBridal, title: "Reception Glam", salon: "Maison Bridal · Jayanagar", price: "₹12,000", match: 92, tag: "Bridal" },
];

const salons = [
  { id: "atelier-rose", img: salonInterior, name: "Atelier Rose", area: "Indiranagar", distance: "1.2 km", rating: 4.9, match: 98, price: "₹2,500", open: true },
  { id: "lumiere-studio", img: lumiereInterior, name: "Lumière Studio", area: "Koramangala", distance: "2.8 km", rating: 4.9, match: 96, price: "₹2,200", open: true },
  { id: "velvet-co", img: velvetInterior, name: "Velvet & Co.", area: "Whitefield", distance: "4.5 km", rating: 4.8, match: 92, price: "₹4,500", open: false },
];

function Home() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <SiteLayout>
      <Hero />
      <NeighborhoodStrip selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <AIAnalysis />
      <TrendingCarousel selectedCity={selectedCity} />
      <MarketplaceSection selectedCity={selectedCity} />
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

function NeighborhoodStrip({ selectedCity, setSelectedCity }: { selectedCity: string | null, setSelectedCity: (city: string | null) => void }) {
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
              <button
                key={h}
                onClick={() => setSelectedCity(selectedCity === h ? null : h)}
                className={`flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                  selectedCity === h
                    ? "bg-brand-rose text-white border-brand-rose"
                    : "bg-white/60 border-white/70 hover:bg-brand-rose hover:text-white"
                }`}
              >
                <MapPin className="size-3.5" /> {h}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faceShapes = ["Heart / Oval", "Square / Angular", "Round", "Diamond"];
const skinTones = ["Warm Honey", "Cool Ivory", "Deep Bronze", "Olive Golden"];
const hairTextures = ["Wavy 2B", "Curly 3A", "Straight 1C", "Coily 4C"];
const skinTypes = ["Combination", "Dry", "Oily", "Normal", "Sensitive"];

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomConf = () => Math.floor(Math.random() * (99 - 85 + 1) + 85);

function AIAnalysis() {
  const [traits, setTraits] = useState([
    { label: "Face Shape", value: "Heart / Oval", conf: 98 },
    { label: "Skin Tone", value: "Warm Honey", conf: 94 },
    { label: "Hair Texture", value: "Wavy 2B", conf: 91 },
    { label: "Skin Type", value: "Combination", conf: 89 },
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setCameraActive(true);
      setCapturedImage(null);
      setHasAnalyzed(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check your browser permissions.");
    }
  };

  useEffect(() => {
    if (cameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraActive, stream]);

  const stopCamera = (currentStream: MediaStream | null) => {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
    setStream(null);
  };

  const captureAndAnalyze = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Mirror the canvas context since the video preview is mirrored (-scale-x-100)
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(imgDataUrl);
      }
    }
    stopCamera(stream);

    if (isAnalyzing) return;
    setIsAnalyzing(true);
    setHasAnalyzed(false);

    let iterations = 0;
    const interval = setInterval(() => {
      setTraits([
        { label: "Face Shape", value: getRandom(faceShapes), conf: getRandomConf() },
        { label: "Skin Tone", value: getRandom(skinTones), conf: getRandomConf() },
        { label: "Hair Texture", value: getRandom(hairTextures), conf: getRandomConf() },
        { label: "Skin Type", value: getRandom(skinTypes), conf: getRandomConf() },
      ]);
      iterations++;
      if (iterations > 15) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setHasAnalyzed(true);
      }
    }, 100);
  };
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
          {!hasAnalyzed && !cameraActive && !isAnalyzing ? (
            <button
              onClick={openCamera}
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-text-main text-white rounded-full text-sm font-semibold hover:bg-brand-rose-deep transition-colors"
            >
              <Camera className="size-4" /> Open Camera to Analyze
            </button>
          ) : cameraActive && !isAnalyzing ? (
            <button
              onClick={captureAndAnalyze}
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-brand-rose-deep text-white rounded-full text-sm font-semibold hover:bg-brand-rose-deep/90 transition-colors shadow-lg shadow-brand-rose-deep/20"
            >
              <Sparkles className="size-4" /> Capture & Analyze
            </button>
          ) : isAnalyzing ? (
            <button
              disabled
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-text-main text-white rounded-full text-sm font-semibold disabled:opacity-70 disabled:cursor-wait"
            >
              Analyzing <Loader2 className="size-4 animate-spin" />
            </button>
          ) : (
            <Link
              to="/ai-consultant"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-brand-rose-deep text-white rounded-full text-sm font-semibold hover:bg-brand-rose-deep/90 transition-colors shadow-lg shadow-brand-rose-deep/20"
            >
              Talk to your AI Consultant <Sparkles className="size-4" />
            </Link>
          )}
        </div>
        <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border-[10px] border-white/60 shadow-2xl bg-zinc-900">
          {cameraActive ? (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover -scale-x-100" />
          ) : capturedImage ? (
            <img src={capturedImage} alt="Captured face" className="w-full h-full object-cover" />
          ) : (
            <img src={heroPortrait} alt="Face analysis sample" loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
          )}
          <canvas ref={canvasRef} className="hidden" />
          <div className="absolute top-8 left-8 glass-card p-3 rounded-xl transition-all duration-300">
            <div className="text-[10px] uppercase tracking-tighter text-brand-rose-deep font-semibold">Face Shape</div>
            <div className="text-sm font-medium">{traits[0].value}</div>
          </div>
          <div className="absolute bottom-8 right-8 glass-card p-3 rounded-xl transition-all duration-300">
            <div className="text-[10px] uppercase tracking-tighter text-brand-rose-deep font-semibold">Undertone</div>
            <div className="text-sm font-medium">{traits[1].value}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendingCarousel({ selectedCity }: { selectedCity: string | null }) {
  const displayTrending = selectedCity 
    ? trending.filter(t => t.salon.includes(selectedCity))
    : trending;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Personalized</span>
          <h2 className="text-3xl sm:text-4xl font-serif mt-1">Trending in {selectedCity || "Bengaluru"}</h2>
          <p className="text-text-main/50 text-sm mt-1">Most booked looks {selectedCity ? `in ${selectedCity}` : "in Indiranagar and MG Road"} this week.</p>
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
        {displayTrending.length > 0 ? (
          displayTrending.map((c) => (
            <Link to="/salons/$salonId" params={{ salonId: c.id }} key={c.title} className="block flex-none w-72 group cursor-pointer">
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
            </Link>
          ))
        ) : (
          <div className="w-full text-center py-12 text-text-main/50 glass-panel rounded-3xl">
            No trending looks found in {selectedCity} right now.
          </div>
        )}
      </div>
    </section>
  );
}

function MarketplaceSection({ selectedCity }: { selectedCity: string | null }) {
  const displaySalons = selectedCity ? salons.filter(s => s.area === selectedCity) : salons;
  
  return (
    <section className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Marketplace</span>
          </div>
          <Link to="/explore" className="text-sm font-medium text-text-main/60 hover:text-brand-rose-deep">See all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {displaySalons.length > 0 ? (
            displaySalons.map((s) => (
            <Link to="/salons/$salonId" params={{ salonId: s.id }} key={s.name} className="block glass-card rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group">
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
                  <span className="text-xs font-bold uppercase tracking-wider bg-text-main text-white px-3.5 py-2 rounded-full group-hover:bg-brand-rose-deep transition-colors">
                    Book
                  </span>
                </div>
              </div>
            </Link>
          ))) : (
            <div className="col-span-3 text-center py-20 text-text-main/60 glass-panel rounded-3xl">
              No salons found in {selectedCity} yet. Check back later or clear the filter!
            </div>
          )}
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
