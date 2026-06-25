import { Link } from "@tanstack/react-router";

const localities = [
  "Indiranagar", "Koramangala", "Whitefield", "Jayanagar",
  "HSR Layout", "JP Nagar", "Malleshwaram", "MG Road",
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-text-main/5 bg-white/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="font-serif text-2xl font-bold text-brand-rose-deep">GlowAI</div>
          <p className="text-sm text-text-main/60 max-w-sm leading-relaxed">
            Personalized beauty intelligence for the modern Bengaluru resident.
            Discover, match and book trusted salons in minutes.
          </p>
          <form className="flex gap-2 max-w-sm pt-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/70 border border-text-main/10 rounded-full px-4 py-2.5 text-sm outline-none focus:border-brand-rose"
            />
            <button className="bg-text-main text-white px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              Join
            </button>
          </form>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-text-main/40 mb-4">
            Bengaluru Coverage
          </div>
          <ul className="space-y-2 text-sm text-text-main/70">
            {localities.map((l) => (
              <li key={l}><Link to="/explore" className="hover:text-brand-rose-deep">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-text-main/40 mb-4">
            Platform
          </div>
          <ul className="space-y-2 text-sm text-text-main/70">
            <li><Link to="/ai-consultant" className="hover:text-brand-rose-deep">AI Consultant</Link></li>
            <li><Link to="/explore" className="hover:text-brand-rose-deep">Find a Salon</Link></li>
            <li><Link to="/offers" className="hover:text-brand-rose-deep">Offers</Link></li>
            <li><Link to="/about" className="hover:text-brand-rose-deep">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand-rose-deep">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-text-main/5 px-6 py-6 text-center text-xs text-text-main/40 uppercase tracking-widest">
        © 2026 GlowAI Beauty Technologies · Bengaluru, KA
      </div>
    </footer>
  );
}
