import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/ai-consultant", label: "AI Consultant" },
  { to: "/salons", label: "Salons" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-3">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-brand-rose-deep">
          Glow<span className="text-text-main">AI</span>
        </Link>
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-text-main/70">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-brand-rose-deep transition-colors"
              activeProps={{ className: "text-brand-rose-deep" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="text-sm font-medium px-3 py-2 hover:opacity-70 transition-opacity"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium bg-text-main text-white px-4 sm:px-5 py-2.5 rounded-full hover:scale-[1.02] transition-transform"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
