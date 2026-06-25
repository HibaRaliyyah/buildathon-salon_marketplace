import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth } from "@/lib/auth-context";
import { createBooking } from "@/api/bookings";
import { toast } from "react-toastify";
import { MapPin, Star, ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import salonInterior from "@/assets/salon-interior.jpg";
import lookBridal from "@/assets/look-bridal.jpg";
import lookKorean from "@/assets/look-korean.jpg";
import lumiereInterior from "@/assets/lumiere-interior.jpg";
import velvetInterior from "@/assets/velvet-interior.jpg";
import lookGrooming from "@/assets/look-grooming.jpg";
import lookNails from "@/assets/look-nails.jpg";

export const Route = createFileRoute("/salons/$salonId")({
  component: SalonShowPage,
});

const allSalons = [
  { id: "atelier-rose", img: salonInterior, name: "Atelier Rose", area: "Indiranagar", distance: "1.2 km", rating: 4.9, match: 98, price: "₹2,500", open: true, tag: "Hair · Skin", description: "Award-winning hair & skin atelier specializing in editorial cuts, balayage, and Korean glass-skin facials." },
  { id: "maison-bridal", img: lookBridal, name: "Maison Bridal", area: "Malleshwaram", distance: "3.1 km", rating: 4.9, match: 96, price: "₹12,000", open: true, tag: "Bridal", description: "Bengaluru's premier bridal studio. Royal bridal glow packages, airbrush makeup and mehendi." },
  { id: "luna-artistry", img: lookKorean, name: "Luna Artistry", area: "Koramangala", distance: "2.4 km", rating: 4.8, match: 95, price: "₹1,800", open: true, tag: "K-Beauty", description: "Korean beauty specialists. Glass hair, glass skin, GRWM packages and trending K-beauty looks." },
  { id: "lumiere-studio", img: lumiereInterior, name: "Lumière Studio", area: "Koramangala", distance: "2.8 km", rating: 4.9, match: 96, price: "₹2,200", open: true, tag: "Aesthetics", description: "Modern aesthetic clinic offering laser hair reduction, medi-facials, and advanced skin treatments." },
  { id: "velvet-co", img: velvetInterior, name: "Velvet & Co.", area: "Whitefield", distance: "4.5 km", rating: 4.8, match: 92, price: "₹4,500", open: false, tag: "Spa", description: "Luxury spa and wellness centre with Ayurvedic treatments, deep tissue massage and facials." },
  { id: "the-old-soul", img: lookGrooming, name: "The Old Soul", area: "HSR Layout", distance: "4.0 km", rating: 4.6, match: 91, price: "₹1,200", open: true, tag: "Men's", description: "Classic barbershop meets modern grooming. Fades, beard sculpts and hot towel shaves." },
  { id: "gloss-studio", img: lookNails, name: "Gloss Studio", area: "Jayanagar", distance: "2.9 km", rating: 4.8, match: 93, price: "₹1,500", open: true, tag: "Nails", description: "Nail art specialists. Gel manicures, nail extensions, nail art and pedicures." },
];

function SalonShowPage() {
  const { salonId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const salon = allSalons.find((s) => s.id === salonId) || allSalons[0];

  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    purpose: "",
    couponCode: "",
  });

  const handleBookNow = async () => {
    if (!user) {
      toast.error("Please log in to book an appointment.");
      navigate({ to: "/login" });
      return;
    }
    if (!bookingData.date || !bookingData.time || !bookingData.purpose) {
      toast.warning("Please fill in the date, time, and purpose.");
      return;
    }
    setIsBooking(true);
    try {
      await createBooking({
        data: {
          userId: user.id,
          salonName: salon.name,
          service: `${salon.tag} - ${bookingData.purpose}`,
          date: bookingData.date,
          time: bookingData.time,
        }
      });
      setIsBooked(true);
      toast.success("Booking confirmed! Check your dashboard for details.");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-text-main/60 hover:text-text-main mb-6 transition-colors">
          <ArrowLeft className="size-4" /> Back to Explore
        </Link>
        
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
          <div className="h-64 sm:h-96 relative">
            <img src={salon.img} alt={salon.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className="px-3 py-1 bg-brand-rose-deep/90 backdrop-blur rounded-full text-xs font-bold tracking-wider uppercase mb-3 inline-block">
                {salon.match}% AI Match
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif text-white">{salon.name}</h1>
              <p className="mt-2 flex items-center gap-2 text-white/90">
                <MapPin className="size-4" /> {salon.area} · {salon.distance}
              </p>
            </div>
          </div>
          
          <div className="p-8 grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-serif mb-3">About</h2>
                <p className="text-text-main/80 leading-relaxed">{salon.description}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif mb-4">Highlights</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 glass-card rounded-2xl">
                    <Star className="size-5 text-amber-400 fill-amber-400" />
                    <div>
                      <div className="font-bold">{salon.rating} Rating</div>
                      <div className="text-xs text-text-main/60">Based on 120+ reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass-card rounded-2xl">
                    <Sparkles className="size-5 text-brand-rose-deep" />
                    <div>
                      <div className="font-bold">Expert AI Match</div>
                      <div className="text-xs text-text-main/60">Highly recommended</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl sticky top-24">
                <h3 className="text-xl font-serif mb-4">Booking Details</h3>
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex items-center justify-between border-b border-text-main/5 pb-3">
                    <span className="text-text-main/60 flex items-center gap-2"><Clock className="size-4" /> Status</span>
                    <span className={salon.open ? "text-emerald-600 font-medium" : "text-text-main/50"}>
                      {salon.open ? "Open Now" : "Closed"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-text-main/5 pb-3">
                    <span className="text-text-main/60 flex items-center gap-2"><MapPin className="size-4" /> Distance</span>
                    <span className="font-medium">{salon.distance}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-text-main/5">
                    <span className="text-text-main/60 flex items-center gap-2">Starting Price</span>
                    <span className="font-mono font-bold text-brand-rose-deep">{salon.price}</span>
                  </div>

                  {!isBooked && (
                    <div className="pt-2 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-text-main/70 mb-1">Date</label>
                        <input 
                          type="date" 
                          min={new Date().toISOString().split("T")[0]}
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="w-full bg-white/50 border border-text-main/10 rounded-lg px-3 py-2 outline-none focus:border-brand-rose-deep transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-main/70 mb-1">Time</label>
                        <input 
                          type="time" 
                          value={bookingData.time}
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="w-full bg-white/50 border border-text-main/10 rounded-lg px-3 py-2 outline-none focus:border-brand-rose-deep transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-main/70 mb-1">Purpose / Service</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Haircut, Consultation"
                          value={bookingData.purpose}
                          onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                          className="w-full bg-white/50 border border-text-main/10 rounded-lg px-3 py-2 outline-none focus:border-brand-rose-deep transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-main/70 mb-1">Promo / Coupon Code</label>
                        <input 
                          type="text" 
                          placeholder="e.g. GLOW30 (Optional)"
                          value={bookingData.couponCode}
                          onChange={(e) => setBookingData({ ...bookingData, couponCode: e.target.value.toUpperCase() })}
                          className="w-full bg-white/50 border border-text-main/10 rounded-lg px-3 py-2 outline-none focus:border-brand-rose-deep transition-colors uppercase placeholder:normal-case"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleBookNow}
                  disabled={isBooking || isBooked || !salon.open}
                  className="w-full bg-text-main text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-rose-deep transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Calendar className="size-4" /> 
                  {isBooked ? "Booking Confirmed" : isBooking ? "Processing..." : "Book Now"}
                </button>
                {!isBooked && <p className="text-center text-xs text-text-main/40 mt-3">Free cancellation up to 24h before</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
